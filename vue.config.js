module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/styles/_shared.scss";`
      }
    }
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
