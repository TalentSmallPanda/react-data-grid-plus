// postcss.config.cjs
// const postcssLayerPolyfill = require('@csstools/postcss-cascade-layers')({
//   // onRevertLayerKeyword: 'warn', // 处理嵌套层警告
//   // onImportLayerRule: 'rewrite', // 修复@import中的层
// });

module.exports = {
  plugins: [
    // postcssLayerPolyfill,
    require('postcss-nested'),
    require('autoprefixer'),
    require('cssnano')
  ]
};
