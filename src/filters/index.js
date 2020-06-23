export function datetime(date, format = 'yyyy-MM-dd HH:mm:ss') {
  if (!date) {
    return ''
  }
  typeof date === 'string' && (date = +date.replace(/\/Date\((\d+)\)\//, '$1'))
  typeof date === 'number' && (date = new Date(date))
  const obj = {
    // yyyy-MM-dd 第q季度 www HH:mm:ss:SSS
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    q: Math.floor((date.getMonth() + 3) / 3),
    w: date.getDay(),
    H: date.getHours(),
    h: date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    m: date.getMinutes(),
    s: date.getSeconds(),
    S: date.getMilliseconds()
  }
  const _week = ['日', '一', '二', '三', '四', '五', '六']
  for (const i in obj) {
    format = format.replace(new RegExp(i + '+', 'g'), m => {
      let val = obj[i] + ''
      if (i === 'w') return (m.length > 2 ? '星期' : '周') + _week[val]
      for (let j = 0, len = val.length; j < m.length - len; j++) val = '0' + val
      return m.length === 1 ? val : val.substring(val.length - m.length)
    })
  }
  return format
}
