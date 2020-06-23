import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)

Object.defineProperty(Vue.prototype, '$_confirm', {
  value: ({
    type = 'warning',
    name,
    operateText = '删除',
    operate,
    callback
  }) => {
    let response
    Element.MessageBox({
      title: '提示',
      message: `<span>此操作将<b style="padding: 0 2px;color: #333;">${operateText}</b>该项<b style="color: teal;padding-left:4px;">${name}</b>，是否继续？</span>`,
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true,
      type: type,
      beforeClose: (action, instance, done) => {
        if (instance.confirmButtonLoading) {

        } else if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = '执行中...'
          operate()
            .then(res => {
              response = res
              done()
            })
            .finally(() => {
              instance.confirmButtonLoading = false
              instance.confirmButtonText = '确定'
            })
        } else {
          done()
        }
      }
    })
      .then(() => {
        callback && callback(response)
      })
      .catch(() => {})
  }
})
