export const makeRegexp = (reg: string | RegExp) => {
  if (reg instanceof RegExp) {
    return reg
  } else if (/^(?:matchRegexp:)?\/(.+)\/([gimuy]*)$/.test(reg)) {
    return new RegExp(RegExp.$1, RegExp.$2 || '')
  } else if (typeof reg === 'string') {
    return new RegExp(reg)
  }
  return /^$/
}
