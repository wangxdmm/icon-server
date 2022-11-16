export const unescapeUnicode = str => {
  return str.replace(/\\u[\dA-F]{4}/gi, match => {
    return parseInt(match.replace(/\\u/g, ''), 16)
  })
}
