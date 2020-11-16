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
    return 'yes' + pri + pub
  },
  ptbk => {
    ptbk = ptbk.slice(3)
    const m = ptbk.length / 2
    return [ptbk.slice(0, m), ptbk.slice(m)]
  }
)

const ptbkRes = myPtbk.encode(data)
console.log(ptbkRes)
console.log(myPtbk.decode(ptbkRes))

// 如果被破解，请更改以下加密方法
export const ptbk = Ptbk.create(
  ([pri, pub]) => {
    const boundary_prefix = pri.slice(pri.length - 3)
    return boundary_prefix + pri + pub
  },
  ptbk => {
    ptbk = ptbk.slice(3)
    const m = ptbk.length / 2
    return [ptbk.slice(0, m), ptbk.slice(m)]
  }
)

const ptbkRes2 = ptbk.encode({})
console.log(ptbkRes2)
console.log(ptbk.decode(ptbkRes2))
console.log('isPtbk', ptbk.isPtbk(ptbkRes2))
console.log('isPtbk', ptbk.isPtbk({}))
