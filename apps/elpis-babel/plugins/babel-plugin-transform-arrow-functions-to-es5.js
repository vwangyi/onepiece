// 把 () => {} 转为 function() {}
module.exports = function (babel) {
  const { types: t } = babel;
  return {
    name: 'babel-plugin-transform-arrow-functions-to-es5',
    visitor: {
      // 当你的节点类型为箭头函数表达式的时候
      // 执行特定的方法
      ArrowFunctionExpression(path) {
        let body; // 存储函数体

        if (path.node.body.type !== 'BlockStatement') {
          // 进入此 if，说明箭头函数是一个表达式，需要将 body 部分转为返回语句
          // a => b
          // function(a){return b}
          body = t.blockStatement([t.returnStatement(path.node.body)]);
        } else {
          // 可以直接使用箭头函数的方法体
          body = path.node.body;
        }
        // 该方法创建一个普通函数表达式的 AST 节点（  function(){} ）
        const functionExpression = t.functionExpression(
          null, // 函数名
          path.node.params, // 表示函数参数，和箭头函数的参数是一致的
          body, // 函数方法体
          false, // 表示不是一个生成器函数
          path.node.async // 表示是否是异步函数，和箭头函数是一致的
        );

        path.replaceWith(functionExpression);
      }
    }
  };
};
