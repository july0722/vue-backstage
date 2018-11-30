module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/styles/_shared.scss";`
      }
    }
  },
  // devServer: {
  //   proxy: {
  //     '/api/manager': {
  //       // target: 'http://test.t-learning.huikefu.com',
  //       target: 'http://localhost:8580',
  //       ws: true,
  //       changeOrigin: true
  //     }
  //   }
  // }
};
