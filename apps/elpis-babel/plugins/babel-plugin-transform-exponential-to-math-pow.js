// 该插件负责将 ** --> Math.pow
// 例如 2 ** 3 ---> Math.pow(2, 3)

module.exports = function (babel) {
  const { types: t } = babel;
  return {
    name: 'babel-plugin-transform-exponential-to-math-pow',
    visitor: {
      // 当你遍历 AST 节点的时候
      // 遍历到二元表达式的时候会自动执行该方法
      // BinaryExpression钩子 遍历到 二元表达式自动执行BinaryExpression钩子
      BinaryExpression(path) {
        const { left, operator, right } = path.node; // 2 ** 3
        if (operator !== '**') {
          return;
        }
        // 把pow作为Math对象的属性
        const callee = t.memberExpression(
          t.identifier('Math'),
          t.identifier('pow')
        );
        const args = [left, right];
        // 创建新的AST
        const newASTNode = t.callExpression(callee, args);
        // 用新的 AST 节点替换旧的 AST 节点
        path.replaceWith(newASTNode);
      }
    }
  };
};
