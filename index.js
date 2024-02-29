/** !
 * SimpleNGrams
 * v4.0.1
 *
 * Help me make this better:
 * https://github.com/phughesmcr/simplengrams
 *
 * @module       SimpleNGrams
 * @description  Returns a 2d array of n-grams
 * @version      4.0.1
 * @exports      nGram
 * @author       P. Hughes <github@phugh.es> (https://www.phugh.es)
 * @copyright    2017-24 P. Hughes. All rights reserved.
 * @license      MIT
 *
 * @example
 * ```javascript
 *  import { nGram } from 'simplengrams';
 *  const txt = 'A string of text, any text what so ever!';
 *  const bigrams = nGram(txt);
 *  const trigrams = nGram(txt, 3);
 *  console.log(bigrams, trigrams);
 * ```
 */

/**
 * @internal
 * @param {(string | null)[]} tokens
 * @param {number} n
 * @param {boolean | string[]} pad
 * @returns {(string | null)[]}
 */
function _pad(tokens, n, pad) {
  let start = null;
  let end = null;
  if (Array.isArray(pad)) {
    if (pad.length === 2) {
      start = pad[0];
      end = pad[1];
    } else if (pad.length === 1) {
      start = end = pad[0];
    } else {
      throw new SyntaxError(
        `Wrong number of elements in pad array. Expected 1 or 2, found ${pad.length}.`,
      );
    }
  }
  let returnedArray = tokens;
  if (start !== undefined) {
    returnedArray = new Array(n - 1).fill(start).concat(tokens);
  }
  if (end !== undefined) {
    const endArray = new Array(n - 1).fill(end);
    returnedArray = returnedArray.concat(endArray);
  }
  return returnedArray;
}

/**
 * @internal
 * @param {(string | null)[]} tokens
 * @param {number} n
 * @param {boolean | string[]} pad
 * @returns {(string | null)[][]}
 */
function _split(tokens, n, pad) {
  const output = [];
  if (pad === true || Array.isArray(pad)) {
    tokens = _pad(tokens, n, pad);
  }
  const len = (tokens.length - n) + 1;
  for (let i = 0; i < len; i++) {
    const grams = [];
    for (let j = 0; j < n; j++) {
      grams.push(tokens[i + n + (j - n)] ?? null);
    }
    output.push(grams);
  }
  return output;
}

/**
 * Split a string or array of strings into ngram chunks
 * @param {string | string[]} input the string or array of tokens to gram
 * @param {number} [n=2] the gram number to return (e.g. bigrams = 2, trigrams = 3, etc.). Defaults to 2.
 * @param {boolean | string[]} [pad=false] pad the output array? Defaults to false.
 * @param {string | RegExp} [splitPattern=/\s+/] pattern used to split strings into tokens. Defaults to /\s+/.
 * @returns {(string | null)[][]} array of ngrams
 *
 * @example
 * ```javascript
 * import { nGram } from 'simplengrams';
 * const txt = 'A string of text';
 * const bigrams = nGram(txt);
 * console.log(bigrams); // [['A', 'string'], ['string', 'of'], ['of', 'text']]
 * ```
 */
export function nGram(input, n = 2, pad = false, splitPattern = /\s+/) {
  const arr = Array.isArray(input) ? input : input.split(splitPattern);
  if (n > arr.length && pad === false) {
    return [[...arr]];
  } else {
    return _split(arr, n, pad);
  }
}
//# sourceMappingURL=index.js.map
