const QiniuWebpackPlugin = require('./plugins/Qiniu.webpack.plugin')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  baseUrl: isProduction ? 'http://cdn' : '/',
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/styles/_shared.scss";`
      }
    }
  },
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(new QiniuWebpackPlugin({
        ACCESS_KEY: '',
        SECRET_KEY: ''
      }))
    } else {}
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
