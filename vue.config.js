const RouterWebpackPlugin = require('./plugins/router.webpack.plugin')

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/styles/_shared.scss";'
      }
    }
  },
  configureWebpack: config => {
    config.plugins.push(new RouterWebpackPlugin())
  },
  devServer: {
    proxy: {
      '/api/manager': {
        target: 'https://www.easy-mock.com/mock/598a6b4aa1d30433d85a1155',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
