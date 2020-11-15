const zip = <A extends PropertyKey, B extends PropertyKey>(as: A[]) => (
  bs: B[]
) =>
  as.reduce<any>(
    (receiver, x, i) =>
      bs[i] ? Object.assign(receiver, { [x]: bs[i] }) : receiver,
    {}
  );

const encodePtbk = ([privateUniqid, publicUniqid]: [string, string]) =>
  privateUniqid + publicUniqid;

const decodePtbk = (ptbk: string): [string, string] => {
  const m = ptbk.length / 2;
  const privateUniqid = ptbk.slice(0, m);
  const publicUniqid = ptbk.slice(m);
  return [privateUniqid, publicUniqid];
};

export type PtbkResponse = {
  ptbk: string;
  auth: string;
  data: string;
};

type EncodeFunc = ([privateUniqid, publicUniqid]: [string, string]) => string;
type DecodeFunc = (ptbk: string) => [string, string];

export class Ptbk {
  public create(encodePtbk: EncodeFunc, decodePtbk: DecodeFunc) {
    return new Ptbk(encodePtbk, decodePtbk);
  }

  public constructor(
    private encodePtbk: EncodeFunc,
    private decodePtbk: DecodeFunc,
    private auth = "bWFkZSBieSAxMDI5OTg1Nzk5QHFxLmNvbQ=="
  ) {}

  private createPtbkMap = (ptbk: string, encode = false) => {
    const [key, value] = this.decodePtbk(ptbk);
    const ks = Array.from(key);
    const vs = Array.from(value);
    return encode ? zip(ks)(vs) : zip(vs)(ks);
  };

  private decodeDataFromPtbk = (ptbk: string, data: string) => {
    const dict = this.createPtbkMap(ptbk);
    return Array.from(data)
      .map((k) => dict[k])
      .join("");
  };

  private encodeDataFromPtbk = (ptbk: string, data: string) => {
    const dict = this.createPtbkMap(ptbk, true);
    return Array.from(data)
      .map((k) => dict[k])
      .join("");
  };

  private createPrivateUniqid = (data: string) =>
    Array.from(new Set(Array.from(data))).join("");

  private createPublicUniqid = (privateUniqid: string) => {
    const num = privateUniqid.length;
    const arr = privateUniqid;
    const arrLen = arr.length;
    const tmp = [];
    for (;;) {
      tmp.push(arr[Math.floor(Math.random() * arrLen)]);
      const set = Array.from(new Set(tmp));
      if (set.length === num) {
        return set.join("");
      }
    }
  };

  private createPtbk = (data: string) => {
    const privateUniqid = this.createPrivateUniqid(data);
    const publicUniqid = this.createPublicUniqid(privateUniqid);
    return this.encodePtbk([privateUniqid, publicUniqid]);
  };

  public encode = (json: any) => {
    const result: PtbkResponse = {
      ptbk: null,
      auth: this.auth,
      data: null,
    };
    const dataStr = encodeURIComponent(JSON.stringify(json));
    const ptbk = this.createPtbk(dataStr);
    result.ptbk = ptbk;
    result.data = this.encodeDataFromPtbk(ptbk, dataStr);
    return result;
  };

  public decode = (ptbkResponse: PtbkResponse) =>
    JSON.parse(
      decodeURIComponent(
        this.decodeDataFromPtbk(ptbkResponse?.ptbk, ptbkResponse?.data)
      )
    );
}

const ptbk = new Ptbk(encodePtbk, decodePtbk);
export const encode = ptbk.encode.bind(ptbk);
export const decode = ptbk.decode.bind(ptbk);
export default ptbk;
