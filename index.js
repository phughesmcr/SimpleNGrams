/**
 * @preserve
 * SimpleNGrams
 * v2.0.2
 *
 * Help me make this better:
 * https://github.com/phugh/simplengrams
 *
 * (C) 2017-20 P. Hughes
 * License : Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 * http://creativecommons.org/licenses/by-nc-sa/3.0/
 *
 * @name         SimpleNGrams
 * @file         index.js
 * @description  Returns a 2d array of n-grams
 * @version      2.0.2
 * @exports      (from|fromSync)
 * @requires     happynodetokenizer
 * @author       P. Hughes <peter@phugh.es> (https://www.phugh.es)
 * @copyright    2017-20 P. Hughes. All rights reserved.
 * @license      CC-BY-NC-SA-3.0
 *
 * @example
 *  const ngrams = require('simplengrams');
 *  const txt = 'A string of text, any text what so ever!';
 *  const bigrams = await ngrams.from(txt);
 *  const trigrams = ngrams.fromSync(txt, 3);
 *  console.log(bigrams, trigrams);
 */

// eslint-disable-next-line no-extra-semi
;(() => {
  'use strict';

  /**
   * Pad an array
   * @function _pad
   * @private
   * @param {Array} arr
   * @param {number} n gram size
   * @param {boolean | Array<any>} pad add padding to start and end of output
   * @return {Array} padded array
   */
  const _pad = (arr, n, pad) => {
    let start = null;
    let end = null;
    if (Array.isArray(pad)) {
      if (pad.length === 2) {
        start = pad[0];
        end = pad[1];
      } else if (pad.length === 1) {
        start = end = pad[0];
      } else {
        throw new Error(`Wrong number of elements in pad array. Expected 1 or 2, found ${pad.length}.`);
      }
    }
    for (let i = 1; i < n; i++) {
      if (start !== undefined) arr.unshift(start);
      if (end !== undefined) arr.push(end);
    }
    return arr;
  }

  /**
   * @function _splitter
   * @private
   * @param {Array<string>} tokens array of strings
   * @param {number} n gram size
   * @param {boolean | Array<any>} pad add padding to start and end of output
   * @return {Array<Array<string>>} array of n-grams
   */
  const _splitter = (tokens, n, pad) => {
    const output = [];
    // pad array if requested
    if (pad === true || Array.isArray(pad)) {
      tokens = _pad(tokens, n, pad);
    }

    const len = (tokens.length - n) + 1;
    for (let i = 0; i < len; i++) {
      const grams = [];
      for (let j = 0; j < n; j++) {
        grams.push(tokens[i + n + (j - n)]);
      }
      output.push(grams);
    }
    return output;
  };

  /**
   * @function _isInputValid
   * @private
   * @param {string | Array<string>} input input to test
   * @return {boolean} returns true if input is valid
   */
  const _isInputValid = (input) => {
    if (
      !input ||
      (!Array.isArray(input) && typeof input !== 'string') ||
      (typeof input === 'string' && !input.trim()) ||
      (Array.isArray(input) && input.length === 0) ||
      (Array.isArray(input) && (input.filter((x) => typeof x !== 'string').length > 0))
    ) {
      return false;
    } else {
      return true;
    }
  };

  /**
   * @function fromSync
   * @public
   * @param {string | Array<string>} input non-empty string or array of strings
   * @param {number} [n=2] gram size - defaults to bigrams (n=2)
   * @param {boolean | Array<any>} [pad=false] pad start and end of output?
   * @param {string | RegExp} [splitPattern=" "] pattern used to split strings into tokens - defaults to spaces
   * @return {Array<Array<string>>}
   */
  const fromSync = (input, n = 2, pad = false, splitPattern = ' ') => {
    if (!_isInputValid(input)) {
      throw new TypeError(`No valid input found. Expected non-empty string or array of non-empty strings, found ${typeof input}.`);
    } else {
      let tokens;
      if (typeof input === 'string') {
        tokens = input.split(splitPattern);
      } else {
        tokens = input;
      }
      if (n > tokens.length && pad === false) {
        return [[...tokens]];
      } else {
        return _splitter(tokens, n, pad);
      }
    }
  };

  /**
   * @function from
   * @public
   * @async
   * @param {string | Array<string>} input non-empty string or array of strings
   * @param {number} [n=2] gram size - defaults to bigrams (n=2)
   * @param {boolean | Array<any>} [pad=false] pad start and end of output?
   * @param {string | RegExp} [splitPattern=" "] pattern used to split strings into tokens - defaults to spaces
   * @return {Promise<Array<Array<string>>>}
   */
  const from = async (input, n = 2, pad = false, splitPattern = ' ') => {
    return fromSync(input, n, pad, splitPattern);
  };

  // export!
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = {
        from: from,
        fromSync: fromSync,
      };
    }
    exports.from = from;
    exports.fromSync = fromSync;
  }
})();
