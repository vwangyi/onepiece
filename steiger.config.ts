/**
 * steiger — FSD 官方架构 linter 配置
 *
 * 跑法：pnpm fsd           单次全量检查
 *      pnpm fsd:watch     改代码时实时重跑
 *      pnpm fsd:fix       自动修可修的（补 index.ts 公共 API、改复数命名）
 *
 * 注意：扫描范围由 package.json 里的脚本参数指定（apps/app-vue/src），
 * 不用在配置里写 files。因为 steiger 要求每个配置块必须携带
 * rules / ignores / meta 之一，单独一个只含 files 的块会被判为无效配置。
 */
import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,

  /* ============ 存量代码豁免 ============
   * 下面这些规则对存量项目偏严格，一次性全开会阻塞日常开发，
   * 先关掉或降级，等对应重构做完再收紧。
   */

  // shared 下按「本质」命名的目录（assets/hooks/services/utils）是历史包袱。
  // FSD 建议改按「用途」命名（如 lib/todo-store），但改动面太大，先不拦截。
  {
    files: ['**/shared/**'],
    rules: {
      'fsd/segments-by-purpose': 'off'
    }
  },

  // shared/assets、shared/styles 是纯静态目录，不会被 import，
  // 要求它们补 index.ts 公共 API 没有意义。
  // shared/workers 同理：worker 入口靠 vite 的 ?worker 后缀加载，不是普通 import，
  // 加 index.ts 出口反而是噪声。
  // hooks / wasm 有真实引用，public-api 检查保留。
  {
    files: [
      '**/shared/assets/**',
      '**/shared/styles/**',
      '**/shared/workers/**'
    ],
    rules: {
      'fsd/public-api': 'off'
    }
  },

  // 实体名复数形式：当前是 user（单数），FSD 建议统一复数。
  //
  // ⚠️ 这里必须显式关闭而不是降级为 warn：
  // inconsistent-naming 是可自动修的，若设为 warn，`pnpm fsd:fix` 仍会执行重命名，
  // 把entities/goods 直接改名成 entities/good —— 静默改目录名，风险很高。
  // 想改名时请手动做，并同步修好所有引用。
  {
    files: ['**/entities/**'],
    rules: {
      'fsd/inconsistent-naming': 'off'
    }
  },

  /* ============ insignificant-slice：暂时关闭 ============
   * 报的是「切片只有 0~1 处引用」，但本项目这4 个切片不是垃圾，而是有意的在建骨架：
   *   entities/user         — 有完整 store，只是还没接入页面
   *   features/add-to-card  — 有完整实现（组件 + store + api），只是没挂到页面
   *   entities/cart         — 被 add-to-card 引用，属于合理的一处引用
   *   widgets/order-header  — 全是注释占位，等 Logo / UserAvatar / SearchBar 就位
   * 对它们报「考虑删除」是误报，删掉即丢失在建工作，故关闭。
   *
   * ⚠️ 什么时候该重开：等这批切片真正接入页面后，把本块删掉，
   *若届时仍有零引用切片，说明是真死代码，应该删。
   */
  {
    rules: {
      'fsd/insignificant-slice': 'off'
    }
  },

  /* ============ 不检查的文件 ============ */
  {
    ignores: ['**/dist/**', '**/*.d.ts']
  }
]);
