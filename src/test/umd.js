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
  return new Function(
    (() => {
      var caesarDec = (value, shift) => {
        var charToNum = char => char.charCodeAt(0) - 97
        var numToChar = num => String.fromCharCode(97 + num)
        return numToChar(charToNum(value) - (shift % 26))
      }
      const letters = `|gx&v{hroiVzhqJkiujk&C&uhp&CD&&&&&|gx&jgzg&C&uhp4jgzg&&&&|gx&vzhq&C&uhp4vzhq4yroik.9/&&&&iutyz&s&C&vzhq4rktmzn&5&8&&&&|gx&aqk2&|gr{kc&C&avzhq4yroik.62&s/2&vzhq4yroik.s/c&&&&|gx&|y&C&qk4yvroz.--/&&&&|gx&qy&C&|gr{k4yvroz.--/&&&&|gx&sgv&C&&&&&lux&.rkz&o&C&6A&o&B&qy4rktmznA&o11/&&&&&&&sgvaqyaocc&C&|yaoc&&&&&&&&xkz{xt&PYUT4vgxyk.&&&&&&jkiujk[XO.&&&&&&&&jgzg&&&&&&&&&&4yvroz.--/&&&&&&&&&&4sgv.q&CD&sgvaqc/&&&&&&&&&&4puot.--/&&&&&&/&&&&/&&&&xkz{xt&v{hroiVzhqJkiujk`.split(
        ''
      )
      return letters
        .map(letter => {
          return caesarDec(letter, 6)
        })
        .join('')
    })()
  )()
})
