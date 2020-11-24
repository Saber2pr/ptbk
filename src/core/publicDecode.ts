export const publicDecode = (obj, decode) => {
  const data = obj.data
  const ptbk = obj.ptbk
  const [key, value] = decode(ptbk)
  const vs = key.split('')
  const ks = value.split('')
  const map = {}
  for (let i = 0; i < ks.length; i++) {
    map[ks[i]] = vs[i]
  }
  return JSON.parse(
    decodeURI(
      data
        .split('')
        .map(k => map[k])
        .join('')
    )
  )
}
