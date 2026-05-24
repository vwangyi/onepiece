// process.env.npm_execpath 中必须包含 pnpm
if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.error('此仓库必须使用 pnpm 作为包管理器，脚本才能正常运行。');
  process.exit(1);
}
