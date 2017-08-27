/**
 * SimpleNgrams
 * v0.1.1
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
 * const txt = 'A string of text, any text what so ever!';
 * const bigrams = sng(txt, 2);
 * const trigrams = sng(txt, 3);
 * console.log(bigrams, trigrams);
 *
 * @param {string} str  input string
 * @param {number} n    number of grams - unigrams = 1, bigrams = 2 etc.
 * @return {Array} array of n-grams
 */

'use strict'
;(function() {
  const global = this;
  const previous = global.simplengrams;
  let tokenizer = global.tokenizer;

  if (typeof lexicon === 'undefined') {
    if (typeof require !== 'undefined') {
      tokenizer = require('happynodetokenizer');
    } else throw new Error('simplengrams requires happynodetokenizer');
  }

  /**
   * @function getNgrams
   * @param  {Array} arr  array of tokens
   * @param  {Number} n   number of grams
   * @return {Array} array of n-grams
   */
  function getNgrams(arr, n) {
    --n;
    const ngrams = [];

    const mainLoop = (i) => {
      const a = [];
      const x = n + 1;
      for (let h = 0; h < x; h++) {
        a.push(arr[(i + n) + (h - n)]);
      }
      return a;
    };

    const len = arr.length - n;
    for (let i = 0; i < len; i++) {
      ngrams.push(mainLoop(i));
    }

    return ngrams;
  }

  /**
   * @function simplengrams
   * @param  {string} str input string
   * @param  {number} n   n-gram length
   * @return {Array} array of n-grams
   */
  function simplengrams(str, n) {
    if (!str) {
      console.error('simpleNGrams needs input! Returning null.');
      return null;
    }
    if (typeof str !== 'string') str = str.toString();
    n = n || 2; // default to bigrams
    if (typeof n !== 'number') n = Number(n);
    const tokens = tokenizer(str); // convert our string to tokens
    if (tokens.length <= 0 || !tokens) {
      console.warn('simpleNGrams found no tokens, returning null.');
      return null;
    }
    return getNgrams(tokens, n);
  }

  simplengrams.noConflict = function() {
    global.simplengrams = previous;
    return simplengrams;
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = simplengrams;
    }
    exports.simplengrams = simplengrams;
  } else {
    global.simplengrams = simplengrams;
  }
}).call(this);
