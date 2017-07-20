export function validateMobilePhone(str) {
  return /^1(?:3[0-9]|5[012356789]|8[0-9]|7[0-9])\d{8}$/.test(str)
}

export function validateEmail(str) {
  return /(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/.test(str)
}
