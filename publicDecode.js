;(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define(factory)
  } else if (typeof define === 'function' && define.cmd) {
    define(function (require, exports, module) {
      module.exports = factory()
    })
  } else {
    root.publicPtbkDecode = factory()
  }
})(this, function () {
  var publicPtbkDecode = (obj, decode) => {
    var data = obj.data
    var ptbk = obj.ptbk
    var [key, value] = decode(ptbk)
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
  return publicPtbkDecode
})
