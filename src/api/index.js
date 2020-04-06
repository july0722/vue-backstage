/* eslint-disable */
const api = {}
const requireElement = require.context('../api', true, /\.js$/)
requireElement.keys().forEach(fileName => {
  if (!fileName.endsWith('index.js')) {
    api[
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
        .replace(/\-(\w)/g, (all, letter) => letter.toUpperCase())
    ] = requireElement(fileName).default
  }
})

export default api
