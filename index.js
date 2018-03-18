/**
 * SimpleNgrams
 * v0.1.3
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
 * @param {number} n    size of ngrams - unigrams = 1, bigrams = 2 etc.
 * @return {Array} array of n-grams
 */

(function() {
  'use strict';
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
   * @param  {Number} n   size of n-grams
   * @return {Array} array of n-grams
   */
  function getNgrams(arr, n) {
    const ngrams = [];

    /**
     * @function mainLoop
     * @param  {number} i
     * @return {array} array of n-grams
     */
    function mainLoop(i) {
      const a = [];
      for (let h = 0; h < n; h++) {
        a.push(arr[(i + n) + (h - n)]);
      }
      return a;
    }

    const len = arr.length - n + 1;
    for (let i = 0; i < len; i++) {
      ngrams.push(mainLoop(i));
    }
    return ngrams;
  }

  /**
   * @function simplengrams
   * @param  {string} str input string
   * @param  {number} n   n-gram size
   * @return {Array} array of n-grams
   */
  function simplengrams(str, n) {
    // error handling
    if (!str) {
      console.error('simpleNGrams needs input! Returning null.');
      return null;
    }
    if (typeof str !== 'string') str = str.toString();
    n = n || 2; // default to bigrams
    if (typeof n !== 'number') n = Number(n);
    // tokenize!
    const tokens = tokenizer(str);
    if (!tokens) {
      console.warn('simpleNGrams found no tokens. Returning null.');
      return null;
    }
    // return n-gram arrays!
    if (n > tokens.length) console.warn('simpleNgrams: \'n\' is greater than length of text. Returning empty array!');
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
