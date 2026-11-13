/**
 * Prettier 插件：让 Markdown（VitePress / VuePress）里直接写的 <script setup> 也能被格式化。
 *
 * 背景：Prettier 的 markdown printer 只对「围栏代码块」(```js) 做 embedded language formatting，
 * 裸 HTML 块（<script setup>...</script>）属于 opaque 内容，会原样输出，所以里面的代码永远不会被格式化。
 *
 * 实现：注册一个新的 parser（markdown-vitepress）+ printer（mdast-vitepress），
 * 复用官方 markdown 的解析/打印逻辑，只额外为 <script> 块补上 embed 能力。
 * 使用方式见 prettier.config.js 里的 overrides：*.md -> parser "markdown-vitepress"。
 */
import { builders } from 'prettier/doc';
import { parsers, printers } from 'prettier/plugins/markdown';
const { hardline } = builders;

const PARSER_NAME = 'markdown-vitepress';
const AST_FORMAT = 'mdast-vitepress';

const { embed: markdownEmbed, ...markdownPrinter } = printers.mdast;

// 命中 <script> / <script setup> / <script setup lang="ts">
const SCRIPT_BLOCK_RE = /^(<script\b[^>]*>)([\s\S]*?)(<\/script>)\s*$/i;

function resolveParser(openTag) {
  const lang = /\blang\s*=\s*["']?([\w-]+)/i.exec(openTag)?.[1]?.toLowerCase();
  if (lang === 'ts' || lang === 'tsx' || lang === 'typescript') {
    return 'typescript';
  }
  return 'babel';
}

function embed(path, options) {
  const node = path.node ?? path.getValue?.();

  if (node?.type === 'html' && typeof node.value === 'string') {
    // 只处理顶格的 <script> 块，缩进在列表里的不动，避免破坏缩进
    const isTopLevel =
      !node.position?.start?.column || node.position.start.column === 1;
    const matched = SCRIPT_BLOCK_RE.exec(node.value.trim());

    if (isTopLevel && matched) {
      const [, openTag, code, closeTag] = matched;

      if (code.trim()) {
        return async textToDoc => {
          try {
            const codeDoc = await textToDoc(code, {
              parser: resolveParser(openTag),
            });
            return [openTag, hardline, codeDoc, hardline, closeTag];
          } catch {
            // 语法有误时不打断整体格式化，保持原样
            return undefined;
          }
        };
      }
    }
  }

  return markdownEmbed?.(path, options);
}

export default {
  languages: [
    {
      name: 'Markdown (VitePress)',
      parsers: [PARSER_NAME],
      extensions: ['.md'],
      // 让 VS Code 的 prettier 扩展把 markdown 语言也注册进来
      vscodeLanguageIds: ['markdown'],
    },
  ],
  parsers: {
    [PARSER_NAME]: {
      ...parsers.markdown,
      astFormat: AST_FORMAT,
    },
  },
  printers: {
    [AST_FORMAT]: {
      ...markdownPrinter,
      embed,
    },
  },
};
