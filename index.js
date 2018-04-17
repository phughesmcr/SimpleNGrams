/**
 * SimpleNgrams
 * v0.3.1
 *
 * Help me make this better:
 * https://github.com/phugh/simplengrams
 *
 * (C) 2017-18 P. Hughes
 * License : Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 * http://creativecommons.org/licenses/by-nc-sa/3.0/
 *
 * Usage example:
 * const ngrams = require('simplengrams');
 * const txt = 'A string of text, any text what so ever!';
 * const opts = {logs: 3};
 * const bigrams = ngrams(txt, 2, opts);
 * const trigrams = ngrams(txt, 3, opts);
 * console.log(bigrams, trigrams);
 * 
 * Options:
 * 
 *    "logs": 3,          // 0 = suppress all logs
 *                        // 1 = print errors only
 *                        // 2 = print errors and warnings
 *                        // 3 = print all console logs
 *
 * @param {string} str  input string
 * @param {Number} n    size of ngrams - unigrams = 1, bigrams = 2 etc.
 * @param {Object} opts options object
 * @return {Array} array of n-grams
 */

(function() {
  'use strict';
  const tokenizer = require('happynodetokenizer');

  /**
   * @function getNgrams
   * @param {Array} arr  array of tokens
   * @param {Number} n   size of n-grams
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
   * @param {string} str input string
   * @param {Number} n   n-gram size
   * @param {Object} opts options object
   * @return {Array} array of n-grams
   */
  function simplengrams(str, n = 2, opts = {}) {
    // default options
    opts.logs = (typeof opts.logs !== 'undefined') ? opts.logs : 3;
    n = (typeof n !== 'undefined') ? n : 2; // default to bigrams
    // error handling
    if (!str) {
      if (opts.logs > 0) console.error('simpleNGrams needs input! Returning empty 2d array: [[]].');
      return [[]];
    }
    if (typeof str !== 'string') str = str.toString();
    if (typeof n !== 'number') n = Number(n);
    // tokenize!
    const tokens = tokenizer(str);
    if (!tokens) {
      if (opts.logs > 1) console.warn('simpleNGrams found no tokens. Returning empty 2d array: [[]].');
      return [[]];
    }
    // return n-gram arrays!
    if (n > tokens.length && opts.logs > 1) console.warn('simpleNgrams: \'n\' is greater than length of text. Returning empty 2d array: [[]]');
    return getNgrams(tokens, n);
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = simplengrams;
    }
    exports.simplengrams = simplengrams;
  } else {
    global.simplengrams = simplengrams;
  }
})();
