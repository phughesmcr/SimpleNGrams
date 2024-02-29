/**
 * SimpleNGrams
 * v4.0.3
 *
 * Help me make this better:
 * https://github.com/phughesmcr/simplengrams
 *
 * @module       SimpleNGrams
 * @description  Returns a 2d array of n-grams
 * @version      4.0.3
 * @exports      nGram
 * @author       P. Hughes <github@phugh.es> (https://www.phugh.es)
 * @copyright    2017-24 P. Hughes. All rights reserved.
 * @license      MIT
 *
 * @example
 * ```javascript
 * import { nGram } from 'simplengrams';
 * const txt = 'A string of text';
 * const bigrams = nGram(txt);
 * console.log(bigrams); // [['A', 'string'], ['string', 'of'], ['of', 'text']]
 * const trigrams = nGram(txt, 3);
 * console.log(trigrams); // [['A', 'string', 'of'], ['string', 'of', 'text']]
 * ```
 */

/** @internal */
function _pad(tokens: (string | null)[], n: number, pad: boolean | string[]): (string | null)[] {
  let start: string | null = null;
  let end: string | null = null;
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

/** @internal */
function _split(tokens: (string | null)[], n: number, pad: boolean | string[]): (string | null)[][] {
  const output: (string | null)[][] = [];
  if (pad === true || Array.isArray(pad)) {
    tokens = _pad(tokens, n, pad);
  }
  const len = (tokens.length - n) + 1;
  for (let i = 0; i < len; i++) {
    const grams: (string | null)[] = [];
    for (let j = 0; j < n; j++) {
      grams.push(tokens[i + n + (j - n)] ?? null);
    }
    output.push(grams);
  }
  return output;
}

/**
 * Split a string or array of strings into ngram chunks
 * @param input the string or array of tokens to gram
 * @param n the gram number to return (e.g. bigrams = 2, trigrams = 3, etc.). Defaults to 2.
 * @param pad pad the output array? Defaults to false.
 * @param splitPattern pattern used to split strings into tokens. Defaults to /\s+/.
 * @returns array of ngrams
 *
 * @example
 * ```javascript
 * import { nGram } from 'simplengrams';
 * const txt = 'A string of text';
 * const bigrams = nGram(txt);
 * console.log(bigrams); // [['A', 'string'], ['string', 'of'], ['of', 'text']]
 * const trigrams = nGram(txt, 3);
 * console.log(trigrams); // [['A', 'string', 'of'], ['string', 'of', 'text']]
 * ```
 */
export function nGram(input: string | string[], n = 2, pad: boolean | string[] = false, splitPattern: string | RegExp = /\s+/): (string | null)[][] {
  const arr = Array.isArray(input) ? input : input.split(splitPattern);
  if (n > arr.length && pad === false) {
    return [[...arr]];
  } else {
    return _split(arr, n, pad);
  }
}
