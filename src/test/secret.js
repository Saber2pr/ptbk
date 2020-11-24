const charToNum = char => {
  return char.charCodeAt(0) - 97
}
const numToChar = num => {
  return String.fromCharCode(97 + num)
}
const caesarDec = (value, shift) => {
  return numToChar(charToNum(value) - (shift % 26))
}
const decrypt = (value, shift) => {
  const letters = value.split('')
  return letters
    .map(letter => {
      return caesarDec(letter, shift)
    })
    .join('')
}
const caesar = (value, shift) => {
  return numToChar(charToNum(value) + (shift % 26))
}
const encrypt = (value, shift) => {
  const letters = value.split('')
  return letters
    .map(letter => {
      return caesar(letter, shift)
    })
    .join('')
}

let res = encrypt(
  `var publicPtbkDecode = obj => {
    var data = obj.data
    var ptbk = obj.ptbk.slice(3)
    const m = ptbk.length / 2
    var [key, value] = [ptbk.slice(0, m), ptbk.slice(m)]
    var vs = key.split('')
    var ks = value.split('')
    var map = {}
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
  return publicPtbkDecode`,
  6
)
console.log(res)
console.log(decrypt(res, 6))
