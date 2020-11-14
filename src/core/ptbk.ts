const zip = <A extends PropertyKey, B extends PropertyKey>(as: A[]) => (
  bs: B[]
) =>
  as.reduce<any>(
    (receiver, x, i) =>
      bs[i] ? Object.assign(receiver, { [x]: bs[i] }) : receiver,
    {}
  )

const createPtbkMap = (ptbk: string, encode = false) => {
  const m = ptbk.length / 2;
  const key = ptbk.slice(0, m).split("");
  const value = ptbk.slice(m).split("");
  return encode ? zip(key)(value) : zip(value)(key)
};

const decodeDataFromPtbk = (ptbk: string, data: string) => {
  const dict = createPtbkMap(ptbk);
  return data
    .split("")
    .map(k => dict[k])
    .join("");
};

const encodeDataFromPtbk = (ptbk: string, data: string) => {
  const dict = createPtbkMap(ptbk, true);
  return data
    .split("")
    .map(k => dict[k])
    .join("");
};

const createPrivateUniqid = (data: string) => Array.from(new Set(data.split(''))).join('')

function createPublicUniqid(privateUniqid: string) {
  const num = privateUniqid.length
  const arr = privateUniqid.split('')
  const tmp = []
  for (; ;) {
    tmp.push(arr[Math.floor(Math.random() * arr.length)])
    if ([...new Set(tmp)].length == num) {
      return [...new Set(tmp)].join('')
    }
  }
}

const createPtbk = (data: string) => {
  const privateUniqid = createPrivateUniqid(data)
  const publicUniqid = createPublicUniqid(privateUniqid)
  return privateUniqid + publicUniqid
}

export type PtbkResponse = {
  ptbk: string
  data: string
  auth: string
}

export const encodePtbkResponse = (json: any) => {
  const result: PtbkResponse = {
    ptbk: null,
    data: null,
    auth: 'bWFkZSBieSAxMDI5OTg1Nzk5QHFxLmNvbQ=='
  }
  const dataStr = encodeURIComponent(JSON.stringify(json))
  const ptbk = createPtbk(dataStr)
  result.ptbk = ptbk
  result.data = encodeDataFromPtbk(ptbk, dataStr)
  return result
}

export const decodePtbkResponse = (ptbkResponse: PtbkResponse) => JSON.parse(decodeURIComponent(decodeDataFromPtbk(ptbkResponse?.ptbk, ptbkResponse?.data)))

export default {
  encodePtbkResponse, decodePtbkResponse
}