#!/usr/bin/env node
/**
 * 端口占用清理工具（零依赖）
 *
 * 用法：
 *   node scripts/kill-port.mjs            # 默认清理 5020
 *   node scripts/kill-port.mjs 5020 4000  # 同时清理多个端口
 *   pnpm kill-port 5020 3000
 *
 * 行为：
 *   1. 先发 SIGTERM 优雅退出，等待最多 3s
 *   2. 仍未退出则 SIGKILL 强杀
 *   3. 最后复检端口，确保已释放
 */
import { execFileSync } from 'node:child_process';

const DEFAULT_PORTS = ['5020'];
const ports = process.argv.slice(2).length
  ? process.argv.slice(2)
  : DEFAULT_PORTS;
const isWin = process.platform === 'win32';

const color = (code, text) => `\x1b[${code}m${text}\x1b[0m`;
const ok = text => color(32, text);
const warn = text => color(33, text);
const err = text => color(31, text);

/** 找出监听指定 TCP 端口（IPv4 + IPv6）的进程 PID 列表 */
function findPids(port) {
  if (isWin) {
    // netstat -ano 输出: TCP  0.0.0.0:5020  0.0.0.0:0  LISTENING  <pid>
    let out;
    try {
      out = execFileSync('netstat', ['-ano', '-p', 'TCP'], {
        encoding: 'utf8',
      });
    } catch {
      return [];
    }
    const pids = new Set();
    for (const line of out.split('\n')) {
      const cols = line.trim().split(/\s+/);
      if (
        cols.length >= 5 &&
        cols[3] === 'LISTENING' &&
        cols[1].endsWith(`:${port}`)
      ) {
        pids.add(cols[4]);
      }
    }
    return [...pids];
  }

  // macOS / Linux：tcp:port 同时匹配 IPv4/IPv6，-sTCP:LISTEN 只看监听态
  let out;
  try {
    out = execFileSync('lsof', ['-ti', `tcp:${port}`, '-sTCP:LISTEN'], {
      encoding: 'utf8',
    });
  } catch {
    return []; // 没占用时 lsof 退出码非 0
  }
  return [...new Set(out.split('\n').filter(Boolean))];
}

function kill(pid, signal) {
  execFileSync('kill', [signal, pid], { stdio: 'ignore' });
}

let exitCode = 0;

for (const port of ports) {
  const pids = findPids(port);

  if (!pids.length) {
    console.log(ok(`✓ 端口 ${port} 未被占用`));
    continue;
  }

  const describe = pids
    .map(pid => {
      try {
        const cmd = execFileSync('ps', ['-o', 'comm=', '-p', pid], {
          encoding: 'utf8',
        }).trim();
        return `${pid}(${cmd})`;
      } catch {
        return pid;
      }
    })
    .join(', ');
  console.log(warn(`→ 端口 ${port} 被占用: ${describe}`));

  // 先优雅退出
  for (const pid of pids) {
    try {
      kill(pid, '-TERM');
    } catch {
      /* 进程可能刚好自己退了 */
    }
  }

  // 等待退出，超时强杀
  const deadline = Date.now() + 3000;
  let alive = pids;
  while (Date.now() < deadline) {
    alive = findPids(port);
    if (!alive.length) break;
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 200);
  }

  if (alive.length) {
    for (const pid of alive) {
      try {
        kill(pid, '-KILL');
      } catch {
        /* ignore */
      }
    }
    console.log(err(`✗ SIGTERM 超时，已强制 SIGKILL: ${alive.join(', ')}`));
  }

  // 复检
  const rest = findPids(port);
  if (rest.length) {
    console.log(
      err(
        `✗ 端口 ${port} 仍被占用（可能是系统进程，需手动处理）: ${rest.join(', ')}`,
      ),
    );
    exitCode = 1;
  } else {
    console.log(ok(`✓ 端口 ${port} 已释放`));
  }
}

process.exit(exitCode);
