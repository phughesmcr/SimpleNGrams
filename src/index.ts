/**
 * @preserve
 * SimpleNGrams
 * v3.0.0
 *
 * Help me make this better:
 * https://github.com/phugh/simplengrams
 *
 * @name         SimpleNGrams
 * @file         index.js
 * @description  Returns a 2d array of n-grams
 * @version      3.0.0
 * @exports      nGram
 * @author       P. Hughes <peter@phugh.es> (https://www.phugh.es)
 * @copyright    2017-21 P. Hughes. All rights reserved.
 * @license      MIT
 *
 * @example
 *  import { nGram } from 'simplengrams';
 *  const txt = 'A string of text, any text what so ever!';
 *  const bigrams = nGram(txt);
 *  const trigrams = nGram(txt, 3);
 *  console.log(bigrams, trigrams);
 */

"use strict";

function _pad(tokens: (string | null)[], n: number, pad: boolean | string[]): (string | null)[] {
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
  let returnedArray = tokens;
  if (start !== undefined) {
    returnedArray = new Array(n - 1).fill(start).concat(tokens) as (string | null)[];
  }
  if (end !== undefined) {
    const endArray = new Array(n - 1).fill(end);
    returnedArray = returnedArray.concat(endArray);
  }
  return returnedArray;
}

function _split(tokens: (string | null)[], n: number, pad: boolean | string[]): (string | null)[][] {
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
}

function _isInputValid(input: unknown, n: unknown, pad: unknown, splitPattern: unknown): boolean {
  return Boolean(
    // input
    (input != undefined && (typeof input === 'string' || Array.isArray(input))) &&
    // n
    (n != undefined && (typeof n === 'number' && !(Number.isNaN(n)))) &&
    // pad
    (pad != undefined && (typeof pad === 'boolean' || Array.isArray(pad))) &&
    // splitPattern
    (splitPattern != undefined && (typeof splitPattern === 'string' || splitPattern instanceof RegExp))
  );
}

/**
 * Split a string or array of strings into ngram chunks
 * @param input the string or array of tokens to gram
 * @param n the gram number to return (e.g. bigrams = 2, trigrams = 3, etc.). Defaults to 2.
 * @param pad pad the output array? Defaults to false.
 * @param splitPattern pattern used to split strings into tokens. Defaults to /\s+/.
 */
export function nGram(input: string | string[], n = 2, pad: boolean | string[] = false, splitPattern: string | RegExp = /\s+/): (string | null)[][] {
  if (_isInputValid(input, n, pad, splitPattern)) {
    if (typeof input === 'string') {
      input = input.split(splitPattern);
    }
    if (n > input.length && pad === false) {
      return [Array.from(input)];
    } else {
      return _split(input, n, pad);
    }
  } else {
    throw new TypeError(
      'Invalid arguments. Expected nGram(string | string[], number, boolean | string[], string | RegExp)'
    );
  }
}

/**
 * Split a string or array of strings into ngram chunks
 * @param input the string or array of tokens to gram
 * @param n the gram number to return (e.g. bigrams = 2, trigrams = 3, etc.). Defaults to 2.
 * @param pad pad the output array? Defaults to false.
 * @param splitPattern pattern used to split strings into tokens. Defaults to /\s+/.
 */
export function ngram(input: string | string[], n = 2, pad: boolean | string[] = false, splitPattern: string | RegExp = /\s+/): (string | null)[][] {
  return nGram(input, n, pad, splitPattern);
}