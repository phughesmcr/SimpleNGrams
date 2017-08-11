/**
 * SimpleNgrams
 * v0.0.1
 *
 * Help me make this better:
 * https://github.com/phugh/simplengrams
 *
 * (C) 2017 P. Hughes
 * Licence : Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 * http://creativecommons.org/licenses/by-nc-sa/3.0/
 *
 * Usage example:
 * const sng = require('simplengrams');
 * const txt = "A string of text, any text what so ever!"
 * const bigrams = sng(txt, 2);
 * const trigrams = sng(txt, 3);
 * console.log(bigrams, trigrams);
 *
 * @param {string} str input string
 * @param {number} n number of grams - unigrams = 1, bigrams = 2 etc.
 * @return {Array} array of n-grams
 */

'use strict'
;(function () {
  const root = this
  const previous = root.simplengrams
  let tokenizer = root.tokenizer

  if (typeof lexicon === 'undefined') {
    if (typeof require !== 'undefined') {
      tokenizer = require('happynodetokenizer')
    } else throw new Error('simplengrams requires happynodetokenizer')
  }

  function getNgrams (arr, n) {
    n -= 1
    const ngrams = []
    const mainLoop = i => {
      const a = []
      let h = 0
      const x = n + 1
      for (h; h < x; h++) {
        a.push(arr[(i + n) + (h - n)])
      }
      return a
    }
    for (let i = 0; i < (arr.length - n); i++) {
      ngrams.push(mainLoop(i))
    }
    return ngrams
  }

  /**
   * @function simplengrams
   * @param  {string} str input string
   * @param  {number} n number of grams
   * @return {Array} array of n-grams
   */
  function simplengrams (str, n) {
    // error prevention
    if (str == null) return null
    if (typeof str !== 'string') str = str.toString()
    if (n == null) n = 2 // default to bigrams
    if (typeof num !== 'number') n = Number(n)
    // convert our string to tokens
    const tokens = tokenizer(str)
    // Get those n-grams!
    const grams = getNgrams(tokens, n)
    // return grams array
    return grams
  }

  simplengrams.noConflict = function () {
    root.simplengrams = previous
    return simplengrams
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = simplengrams
    }
    exports.simplengrams = simplengrams
  } else {
    root.simplengrams = simplengrams
  }
  console.log(simplengrams("In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.", 2))
}).call(this)
