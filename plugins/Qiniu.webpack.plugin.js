require('colors')
const qiniu = require('qiniu')
const path = require('path')

class QiniuWebpackPlugin {
  constructor(options) {
    qiniu.conf.ACCESS_KEY = options.ACCESS_KEY
    qiniu.conf.SECRET_KEY = options.SECRET_KEY

    this.config = new qiniu.conf.Config()
    this.config.zone = qiniu.zone.Zone_z0
    this.formUploader = new qiniu.form_up.FormUploader(this.config)
  }

  fillTasks(assets) {
    const tasks = [];
    Object.keys(assets).filter(fileName => !fileName.endsWith('.map') && !fileName.endsWith('.html')).map(fileName => {
      const promise = new Promise((resolve, reject) => {
        this.formUploader.putFile(
          new qiniu.rs.PutPolicy({
            scope: 'minisite'
          }).uploadToken(new qiniu.auth.digest.Mac(
            qiniu.conf.ACCESS_KEY,
            qiniu.conf.SECRET_KEY
          )),
          `hcs/vue-demo/${fileName}`,
          path.join(__dirname, '../dist', fileName),
          new qiniu.form_up.PutExtra(),
          (respErr, respBody, respInfo) => {
            if (respErr) {
              reject({
                respErr,
                respBody,
                respInfo
              })
            }
            if (respInfo.statusCode == 200) {
              console.log(`upload success: ${fileName}`.green)
            } else {
              console.log(`upload error: ${fileName}`.red)
            }
            resolve({
              respErr,
              respBody,
              respInfo
            })
          }
        )
      })
      tasks.push(promise)
    })
    return tasks
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('QiniuWebpackPlugin', (compilation, callback) => {
      console.log('\nUpload start.'.magenta)
      Promise.all(this.fillTasks(compilation.assets)).then(() => {
        console.log('Upload complete.'.magenta)
        callback()
      })
    })
  }
}

module.exports = QiniuWebpackPlugin
