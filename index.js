/**
 * @preserve
 * SimpleNGrams
 * v1.0.0
 *
 * Help me make this better:
 * https://github.com/phugh/simplengrams
 *
 * (C) 2017-19 P. Hughes
 * License : Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 * http://creativecommons.org/licenses/by-nc-sa/3.0/
 *
 * @name         SimpleNGrams
 * @file         index.js
 * @description  Returns a 2d array of n-grams
 * @version      1.0.0
 * @exports      (simplengrams|simplengramsSync)
 * @requires     happynodetokenizer
 * @author       P. Hughes <peter@phugh.es> (https://www.phugh.es)
 * @copyright    2017-19 P. Hughes. All rights reserved.
 * @license      CC-BY-NC-SA-3.0
 *
 * @example
 *  const ngrams = require('simplengrams');
 *  const txt = 'A string of text, any text what so ever!';
 *  const opts = {logs: 3, normalize: true, strict: true};
 *  const bigrams = ngrams(txt, 2, opts);
 *  const trigrams = ngrams(txt, 3, opts);
 *  console.log(bigrams, trigrams);
 *
 * Options: {
 *    "logs": 3,          // 0 = suppress all logs
 *                        // 1 = print errors only
 *                        // 2 = print errors and warnings
 *                        // 3 = print all console logs
 *    "normalize": true,  // false = don't normalize string
 *                        // true = apply string.prototype.normalize()
 *    "strict": false,    // false = don't throw errors
 *                        // true  = throw errors
 * }
 */

(() => {
  'use strict';
  const tokenizer = require('happynodetokenizer');

  /**
   * @function _getter
   * @private
   * @param {Array} tokens  array of tokens
   * @param {Number} n   size of n-grams
   * @return {Array} array of n-grams
   */
  const _getter = (tokens, n) => {
    const output = [];
    const len = (tokens.length - n) + 1;
    let i = 0;
    for (i; i < len; i++) {
      const grams = [];
      let j = 0;
      for (j; j < n; j++) {
        grams.push(tokens[(i + n) + (j - n)]);
      }
      output.push(grams);
    }
    return output;
  };

  /**
   * @function ngrams
   * @public
   * @async
   * @param {string} str    input string
   * @param {Number} [n=2]  n-gram size
   * @param {Object} [opts] options object
   * @return {Promise} array of n-grams
   */
  const ngrams = async (str, n = 2, opts = {}) => {
    return ngramsSync(str, n, opts, async (err, data) => {
      if (err) throw new Error(err);
      return data;
    });
  };

  /**
   * @function ngramsSync
   * @public
   * @param {string} str    input string
   * @param {Number} [n=2]  n-gram size
   * @param {Object} [opts={}] options object
   * @param {function} [cb] callback function
   * @return {Array} array of n-grams
   */
  const ngramsSync = (str, n = 2, opts = {}, cb = undefined) => {
    // error handling
    if (!str) {
      if (opts.strict) {
        throw new Error('simpleNGrams: no valid input found.');
      } else {
        if (opts.logs > 0) console.error('simpleNGrams: no valid input found. Returning empty 2d array: [[]].');
        return [[]];
      }
    }
    // default options
    str = (typeof str === 'string') ? str : str.toString();
    n = (typeof n !== 'undefined' && typeof n === 'number') ? n : 2; // default to bigrams
    opts.logs = (typeof opts.logs !== 'undefined' && typeof opts.logs === 'number') ? opts.logs : 3;
    opts.normalize = (typeof opts.normalize !== 'undefined' && typeof opts.normalize === 'boolean') ? opts.normalize : true;
    opts.strict = (typeof opts.strict !== 'undefined' && typeof opts.strict === 'boolean') ? opts.strict : false;
    // tokenize!
    const tokens = tokenizer.tokenizeSync(str, {logs: opts.logs, normalize: opts.normalize, strict: opts.strict});
    if (!tokens) {
      if (opts.strict) {
        if (cb && typeof cb === 'function') {
          return cb('simpleNGrams: no tokens returned from input.');
        } else {
          throw new Error('simpleNGrams: no tokens returned from input.');
        }
      } else {
        if (opts.logs > 1) console.warn('simpleNGrams: no tokens returned from input. Returning empty 2d array: [[]].');
        if (cb && typeof cb === 'function') {
          return cb(null, [[]]);
        } else {
          return [[]];
        }
      }
    }
    // handle n > tokens
    if (n > tokens.length && opts.logs > 1) {
      if (opts.strict) {
        if (cb && typeof cb === 'function') {
          return cb('simpleNGrams: \'n\' is greater than length of input.');
        } else {
          throw new Error('simpleNGrams: \'n\' is greater than length of input.');
        }
      } else {
        if (opts.logs > 1) console.warn('simpleNGrams: \'n\' is greater than length of input. Returning empty 2d array: [[]]');
        if (cb && typeof cb === 'function') {
          return cb(null, [[]]);
        } else {
          return [[]];
        }
      }
    }
    // return n-gram arrays
    if (cb && typeof cb === 'function') {
      return cb(null, _getter(tokens, n));
    } else {
      return _getter(tokens, n);
    }
  };

  // export!
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = {
        ngrams: ngrams,
        ngramsSync: ngramsSync,
      };
    }
    exports.ngrams = ngrams;
    exports.ngramsSync = ngramsSync;
  } else {
    global.ngrams = ngrams;
    global.ngramsSync = ngramsSync;
  }
})();
