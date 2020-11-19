import Ptbk from '..'

const data = {
  中文: '妖梦~',
  'Konpaku Youmu': 'qwq妖梦qaq',
  1: 'aa',
  '%': 'aaa',
  34: '啊啊',
}

const myPtbk = Ptbk.create(
  ([pri, pub]) => {
    return pri + pub
  },
  ptbk => {
    const m = ptbk.length / 2
    return [ptbk.slice(0, m), ptbk.slice(m)]
  }
)

const ptbkRes = myPtbk.encode(data)
console.log(ptbkRes)
console.log(myPtbk.decode(ptbkRes))
