const { defineConfig } = require('@vue/cli-service');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      // * 以/api开头的请求
      '/api': {
        // * 目标地址
        target: 'http://49.235.98.65:8889',
        ws: true,
        // * 是否跨域
        changeOrigin: true,
        // * 路径重写
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
  },
});
