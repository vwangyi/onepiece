/**
 * FSD 架构约束 —— 本地 ESLint 插件（零外部依赖）
 *
 * 为什么不用 @feature-sliced/eslint-config？
 *   官方那个包停留在 0.1.1（两年前）、只支持 eslintrc 旧格式、
 *   且依赖早已停更的 eslint-plugin-boundaries，无法在 ESLint 10 flat config 上使用。
 *   完整 FSD 检查以steiger 为准，本插件只负责编辑器里的实时反馈。
 *
 * 三条规则对应 FSD 的三条铁律：
 *   1. no-layer-inversion   —— 只能向下依赖，不能向上
 *   2. no-cross-imports     —— 同层切片之间禁止横向引用
 *   3. no-public-api-sidestep —— 必须走切片公共API，不能摸内部文件
 */

/** 层级顺序：下标越大越高层。shared 最低，app 最高。 */
const LAYER_ORDER = [
  'shared',
  'entities',
  'features',
  'widgets',
  'pages',
  'app'
];

/** 无切片概念的层：里面的目录直接就是 segment。 */
const SLICELESS_LAYERS = new Set(['shared', 'app']);

/**
 * 这些顶层目录不属于 FSD 规范（历史遗留），跳过检查。
 * 等它们各自归位（store 拆进 slice 的 model/、类型并入 shared/lib）后再从这里移除。
 */
const LEGACY_TOP_DIRS = new Set([
  'model',
  'types',
  'components',
  'router',
  'views',
  'config'
]);

const SRC_ROOT = 'src';
const ALIAS_PREFIX = '@/';

/** app-vue 的 src 目录标识，用于把绝对路径转成 src-relative 形式 */
const SRC_MARKER = '/apps/app-vue/src/';

/**
 * 把当前文件的绝对/相对路径转成 "src/xxx/yyy" 形式。
 * @returns {string | null} 不在 app-vue/src 内时返回 null
 */
function toSrcRelative(filePath) {
  if (!filePath) return null;
  const normalized = filePath.replace(/\\/g, '/');

  if (normalized.includes(SRC_MARKER)) {
    return `src/${normalized.split(SRC_MARKER)[1]}`;
  }
  if (normalized.startsWith('apps/app-vue/src/')) {
    return `src/${normalized.slice('apps/app-vue/src/'.length)}`;
  }
  return null;
}

/**
 * 把 import 路径归一化成 "src/xxx/yyy" 形式，去掉扩展名。
 * 处理两种来源：@/ 别名、以及相对路径（相对当前文件的 src-relative 路径）。
 * @param {string} importPath import 语句里的路径字符串
 * @param {string} srcPath 当前文件的 src-relative 路径
 * @returns {string | null} 归一化后的路径；裸包名等无法识别时返回 null
 */
function normalizePath(importPath, srcPath) {
  let raw = importPath;

  if (raw.startsWith(ALIAS_PREFIX)) {
    raw = `${SRC_ROOT}/${raw.slice(ALIAS_PREFIX.length)}`;
  } else if (raw.startsWith('./') || raw.startsWith('../')) {
    const fileDir = srcPath.split('/').slice(0, -1);
    for (const seg of raw.split('/')) {
      if (seg === '.' || seg === '') continue;
      if (seg === '..') fileDir.pop();
      else fileDir.push(seg);
    }
    raw = fileDir.join('/');
  } else {
    // 裸包名（vue、ant-design-vue 等），不是内部引用
    return null;
  }

  // 去扩展名：index.vue / store.ts / styles/index.css
  raw = raw.replace(/\.(vue|tsx?|jsx?|scss|css|less|mjs|cjs|json)$/, '');
  if (raw.endsWith('/index')) raw = raw.slice(0, -'/index'.length);

  return raw;
}

/**
 * 解析路径归属的层与切片。
 * @returns {{layer: string, slice: string | null, depth: number} | null}
 */
function resolveOwner(path) {
  // normalizePath 对裸包名（vue、dayjs 等）返回 null
  if (!path) return null;
  const parts = path.split('/');
  // 期望形如 src/<layer>/<slice>/<segment>/...
  if (parts[0] !== SRC_ROOT) return null;
  const layer = parts[1];
  if (!LAYER_ORDER.includes(layer)) return null;
  if (LEGACY_TOP_DIRS.has(layer)) return null;

  const slice = SLICELESS_LAYERS.has(layer) ? null : parts[2];
  return { layer, slice, depth: parts.length };
}

/** 提取 import 节点里的路径字符串（跳过 type-only 的 type 关键字形式） */
function getImportPath(node) {
  return node.source && typeof node.source.value === 'string'
    ? node.source.value
    : null;
}

// ============ 规则 1：层级方向 ============
const noLayerInversion = {
  meta: {
    type: 'problem',
    docs: { description: 'FSD：只能向下依赖，禁止引用更高层' },
    messages: {
      upward:
        'FSD 层级约束：{{from}} 不能引用更高层的 {{to}}。请通过 props/事件向上传递数据，或将该逻辑下沉到 {{to}} 层。'
    },
    schema: []
  },
  create(context) {
    const srcPath = toSrcRelative(context.filename ?? context.getFilename());
    if (!srcPath) return {};

    const owner = resolveOwner(srcPath);
    if (!owner) return {};
    const fromIndex = LAYER_ORDER.indexOf(owner.layer);

    return {
      ImportDeclaration(node) {
        const raw = getImportPath(node);
        if (!raw) return;
        const target = resolveOwner(normalizePath(raw, srcPath));
        if (!target) return;

        const toIndex = LAYER_ORDER.indexOf(target.layer);
        // app 层可以引用所有层；其余层只能引用下标不大于自己的层
        if (fromIndex >= toIndex) return;

        context.report({
          node,
          messageId: 'upward',
          data: { from: owner.layer, to: target.layer }
        });
      }
    };
  }
};

// ============ 规则 2 & 3：跨切片 + 公共 API ============
const noCrossImports = {
  meta: {
    type: 'problem',
    docs: { description: 'FSD：同层切片之间禁止横向引用' },
    messages: {
      cross:
        'FSD 跨切片引用：{{fromLayer}}/{{fromSlice}} 不能引用同层的 {{toLayer}}/{{toSlice}}。若确实需要共享，请把公共部分下沉到 shared。'
    },
    schema: []
  },
  create(context) {
    const srcPath = toSrcRelative(context.filename ?? context.getFilename());
    if (!srcPath) return {};

    const owner = resolveOwner(srcPath);
    if (!owner) return {};

    return {
      ImportDeclaration(node) {
        const raw = getImportPath(node);
        if (!raw) return;
        const target = resolveOwner(normalizePath(raw, srcPath));
        if (!target) return;

        // 只管有切片概念的层（entities/features/widgets/pages）
        if (target.layer !== owner.layer) return;
        if (!target.slice || !owner.slice) return;
        if (target.slice === owner.slice) return;

        context.report({
          node,
          messageId: 'cross',
          data: {
            fromLayer: owner.layer,
            fromSlice: owner.slice,
            toLayer: target.layer,
            toSlice: target.slice
          }
        });
      }
    };
  }
};

const noPublicApiSidestep = {
  meta: {
    type: 'problem',
    docs: { description: 'FSD：必须经由切片公共 API 引用，禁止直接摸内部文件' },
    messages: {
      sidestep:
        'FSD 公共 API：{{layer}}/{{slice}} 的内部文件不可被外部直接引用。请在 {{layer}}/{{slice}}/index.ts 中 re-export，并通过它引用。'
    },
    schema: []
  },
  create(context) {
    const srcPath = toSrcRelative(context.filename ?? context.getFilename());
    if (!srcPath) return {};

    const owner = resolveOwner(srcPath);
    if (!owner) return {};

    return {
      ImportDeclaration(node) {
        const raw = getImportPath(node);
        if (!raw) return;
        const normalized = normalizePath(raw, srcPath);
        const target = resolveOwner(normalized);
        if (!target) return;

        // shared / app 没有切片概念，不适用公共 API 规则
        if (!target.slice) return;
        // 切片内部文件之间的相对引用是合法的
        if (target.slice === owner.slice) return;
        // depth > 3 说明引用到了切片内部（src/<layer>/<slice>/<segment>...）
        if (target.depth <= 3) return;

        context.report({
          node,
          messageId: 'sidestep',
          data: { layer: target.layer, slice: target.slice }
        });
      }
    };
  }
};

/** ESLint 插件对象。配置里用 `plugins: { fsd: fsdPlugin }` 注册。 */
export const fsdPlugin = {
  rules: {
    'no-layer-inversion': noLayerInversion,
    'no-cross-imports': noCrossImports,
    'no-public-api-sidestep': noPublicApiSidestep
  }
};
