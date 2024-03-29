import md5 from 'md5'

const zip = <A extends PropertyKey, B extends PropertyKey>(as: A[]) => (
  bs: B[]
) =>
  as.reduce<any>(
    (receiver, x, i) =>
      bs[i] ? Object.assign(receiver, { [x]: bs[i] }) : receiver,
    {}
  )

const encodePtbk = ([privateUniqid, publicUniqid]: [string, string]) =>
  privateUniqid + publicUniqid

const decodePtbk = (ptbk: string): [string, string] => {
  const m = ptbk.length / 2
  const privateUniqid = ptbk.slice(0, m)
  const publicUniqid = ptbk.slice(m)
  return [privateUniqid, publicUniqid]
}

export type PtbkType = {
  ptbk: string
  auth: string
  data: string
  secret?: string
}

export type EncodeFunc = ([privateUniqid, publicUniqid]: [
  string,
  string
]) => string
export type DecodeFunc = (ptbk: string) => [string, string]

export class Ptbk {
  public create(encodePtbk: EncodeFunc, decodePtbk: DecodeFunc) {
    return new Ptbk(encodePtbk, decodePtbk)
  }

  public isPtbk(data: any) {
    const ptbk = data as PtbkType
    return !!(ptbk?.auth && ptbk?.data && ptbk?.ptbk)
  }

  public constructor(
    private encodePtbk: EncodeFunc,
    private decodePtbk: DecodeFunc,
    private auth = 'bWFkZSBieSAxMDI5OTg1Nzk5QHFxLmNvbQ=='
  ) { }

  private enable = true
  public setEnable = (enable = true) => {
    this.enable = enable
  }

  private createPtbkMap = (ptbk: string, encode = false) => {
    const [key, value] = this.decodePtbk(ptbk)
    const ks = Array.from(key)
    const vs = Array.from(value)
    return encode ? zip(ks)(vs) : zip(vs)(ks)
  }

  private decodeDataFromPtbk = (ptbk: string, data: string) => {
    const dict = this.createPtbkMap(ptbk)
    return Array.from(data)
      .map(k => dict[k])
      .join('')
  }

  private encodeDataFromPtbk = (ptbk: string, data: string) => {
    const dict = this.createPtbkMap(ptbk, true)
    return Array.from(data)
      .map(k => dict[k])
      .join('')
  }

  private createPrivateUniqid = (data: string) =>
    Array.from(new Set(Array.from(data))).join('')

  private createPublicUniqid = (privateUniqid: string) => {
    const num = privateUniqid.length
    const arr = privateUniqid
    const arrLen = arr.length
    const tmp = []
    for (; ;) {
      tmp.push(arr[Math.floor(Math.random() * arrLen)])
      const set = Array.from(new Set(tmp))
      if (set.length === num) {
        return set.join('')
      }
    }
  }

  private createPtbk = (data: string) => {
    const privateUniqid = this.createPrivateUniqid(data)
    const publicUniqid = this.createPublicUniqid(privateUniqid)
    return this.encodePtbk([privateUniqid, publicUniqid])
  }

  public encode = (data: any, input?: string) => {
    if (!this.enable) {
      return data
    }
    if (this.isPtbk(data)) {
      return data
    }
    const result: PtbkType = {
      ptbk: null,
      auth: this.auth,
      data: null,
      secret: input ? md5(input) : null
    }
    const dataStr = encodeURI(JSON.stringify(data))
    const ptbk = this.createPtbk(dataStr)
    result.ptbk = ptbk
    result.data = this.encodeDataFromPtbk(ptbk, dataStr)
    return result
  }

  public decode = (data: any, input?: string) => {
    if (!this.enable) {
      return data
    }
    if (this.isPtbk(data)) {
      const ptbkData = data as PtbkType
      if (ptbkData.secret) {
        if(!input) throw new Error('secret need input!')
        if (md5(input) !== ptbkData.secret) {
          throw new Error('input missmatch with secret!')
        }
      }
      return JSON.parse(
        decodeURI(this.decodeDataFromPtbk(ptbkData?.ptbk, ptbkData?.data))
      )
    } else {
      return data
    }
  }

  // defaults
  public static instance = new Ptbk(encodePtbk, decodePtbk)
  public static isPtbk(data: any) {
    return Ptbk.instance.isPtbk(data)
  }
  public static encode(data: any, input?: string) {
    return Ptbk.instance.encode(data, input)
  }
  public static decode(data: any, input?: string) {
    return Ptbk.instance.decode(data, input)
  }
  public static setEnable(enable = true) {
    return Ptbk.instance.setEnable(enable)
  }
  public static create(encodePtbk: EncodeFunc, decodePtbk: DecodeFunc) {
    return Ptbk.instance.create(encodePtbk, decodePtbk)
  }
}
export default Ptbk