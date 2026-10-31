/**
 * 一键启动开发环境：
 *   1. nest:dev      —— NestJS（tsc watch），等端口可连后再继续
 *   2. packages:dev  —— rollup watch 打包子包，等首次打包完成后继续
 *   3. vue:dev       —— Vite 前端（依赖子包 dist 产物，所以必须最后启动）
 *
 * 整个过程共用一个终端，日志带 [nest] / [pkg] / [vue] 前缀。
 * Ctrl+C 会结束全部子进程（含 nest 启动的 tsc / node 孙进程）。
 */
import { spawn } from 'node:child_process';
import net from 'node:net';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const isWin = process.platform === 'win32';

const color = (code, text) => `\x1b[${code}m${text}\x1b[0m`;
const gray = text => color(90, text);
const now = () => new Date().toLocaleTimeString('zh-CN', { hour12: false });

const log = (tag, message, code = 90) =>
  console.log(`${gray(now())} ${color(code, `[${tag}]`)} ${message}`);

/** 用当前 pnpm 启动脚本，避免 PATH 里找不到 pnpm */
function resolvePnpm(script) {
  const execPath = process.env.npm_execpath;
  if (execPath && /pnpm/i.test(execPath)) {
    return { cmd: process.execPath, args: [execPath, 'run', script] };
  }
  return { cmd: 'pnpm', args: ['run', script] };
}

const tasks = [
  {
    tag: 'nest',
    colorCode: 36,
    script: 'nest:dev',
    // Nest 启动成功或端口已监听；自定义 winston 日志可能吞掉内置提示，所以两者取其一
    readyPatterns: [
      /Nest application successfully started/i,
      /Application is running on/i
    ],
    readyPort: Number(process.env.PORT ?? 3000),
    readyTimeout: 180_000
  },
  {
    tag: 'pkg',
    colorCode: 35,
    script: 'packages:dev',
    readyPatterns: [/打包完成/, /BUNDLE_END/],
    readyTimeout: 120_000,
    settle: 300 // 首次产物落盘留一点余量
  },
  {
    tag: 'vue',
    colorCode: 32,
    script: 'vue:dev'
  }
];

const children = [];
let shuttingDown = false;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function killTree(state, signal) {
  if (!state.child.pid || state.exited) return;
  try {
    // detached:true 让子进程独占进程组，负号 pid 才能把整棵进程树一起干掉
    if (isWin) state.child.kill(signal);
    else process.kill(-state.child.pid, signal);
  } catch {
    try {
      state.child.kill(signal);
    } catch {
      /* 已退出 */
    }
  }
}

async function shutdown(code, reason) {
  if (shuttingDown) return;
  shuttingDown = true;
  log('dev', `正在停止所有进程${reason ? `（${reason}）` : ''}...`, 33);
  for (const state of children) killTree(state, 'SIGTERM');
  await delay(1500);
  for (const state of children) killTree(state, 'SIGKILL');
  process.exit(code);
}

function startTask(task) {
  const { cmd, args } = resolvePnpm(task.script);
  const child = spawn(cmd, args, {
    cwd: ROOT,
    env: { ...process.env, FORCE_COLOR: '1' },
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: !isWin
  });

  const state = {
    def: task,
    child,
    buffer: '',
    exited: false,
    onExit: [],
    markReady: null
  };
  children.push(state);

  const prefix = color(task.colorCode, `[${task.tag}]`);
  const write = line => {
    console.log(`${prefix} ${line}`);
    for (const pattern of task.readyPatterns ?? []) {
      if (pattern.test(line) && state.markReady) state.markReady();
    }
  };

  const handleChunk = chunk => {
    state.buffer += chunk;
    const lines = state.buffer.split(/\r?\n/);
    state.buffer = lines.pop() ?? '';
    for (const line of lines) write(line);
  };

  child.stdout.setEncoding('utf8');
  child.stderr.setEncoding('utf8');
  child.stdout.on('data', handleChunk);
  child.stderr.on('data', handleChunk);

  child.on('error', error => {
    log(task.tag, color(31, `启动失败: ${error.message}`));
  });

  child.on('exit', (code, signal) => {
    state.exited = true;
    for (const fn of state.onExit) fn();
    if (!shuttingDown) {
      log(task.tag, color(31, `进程已退出 code=${code} signal=${signal}`));
      shutdown(code === 0 ? 0 : 1, `${task.tag} 退出`);
    }
  });

  return state;
}

/** 等任务就绪：日志命中 / 端口可连 / 超时兜底 */
function waitReady(state) {
  const {
    readyPatterns = [],
    readyPort,
    readyTimeout = 0,
    settle = 0
  } = state.def;

  return new Promise(resolve => {
    let settled = false;
    let timer = null;
    let poller = null;

    const finish = status => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      if (poller) clearInterval(poller);
      const done = () => resolve(status);
      // settle > 0 ? setTimeout(done, settle) : done();
      if (settle > 0) {
        setTimeout(done, settle);
      } else {
        done();
      }
    };

    state.markReady = () => finish('ready');
    state.onExit.push(() => finish('exit'));

    if (!readyPatterns.length && !readyPort) {
      finish('ready');
      return;
    }

    timer = setTimeout(() => finish('timeout'), readyTimeout);

    if (readyPort) {
      poller = setInterval(() => {
        const socket = net.connect({ port: readyPort, host: '127.0.0.1' });
        socket.once('connect', () => {
          socket.destroy();
          finish('ready');
        });
        socket.once('error', () => socket.destroy());
      }, 500);
    }
  });
}

process.on('SIGINT', () => shutdown(0, 'Ctrl+C'));
process.on('SIGTERM', () => shutdown(0, 'SIGTERM'));
// 直接关终端/IDE 结束会话时是 SIGHUP，一起处理，避免子进程变成孤儿
process.on('SIGHUP', () => shutdown(0, '终端关闭'));
// 兜底：无论如何退出，都同步补一刀，防止 detached 子进程残留
process.on('exit', () => {
  for (const state of children) killTree(state, 'SIGKILL');
});

async function main() {
  for (const task of tasks) {
    log('dev', `启动 ${color(task.colorCode, task.tag)} (${task.script})`);
    const state = startTask(task);
    const status = await waitReady(state);

    if (status === 'exit') {
      log('dev', color(31, `${task.tag} 未就绪就退出了，终止后续启动`));
      await shutdown(1, `${task.tag} 启动失败`);
      return;
    }
    if (status === 'timeout') {
      log('dev', color(33, `${task.tag} 等待就绪超时，不再阻塞，继续下一步`));
      continue;
    }
    log('dev', `${task.tag} 已就绪`, 32);
  }

  log('dev', color(32, '开发环境已全部启动，按 Ctrl+C 结束'), 32);
}

main();
