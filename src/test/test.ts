import { decodePtbkResponse, encodePtbkResponse } from '..'

const data = {
  中文: '妖梦~',
  'Konpaku Youmu': 'qwq妖梦qaq',
  1: 'aa',
  '%': 'aaa',
  34: '啊啊'
}

console.log(decodePtbkResponse(encodePtbkResponse(data)))