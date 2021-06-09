/*! *****************************************************************************
 *
 * simplengrams
 * v3.1.0
 *
 * MIT License
 * 
 * Copyright (C) 2020 Peter Hughes<https://www.phugh.es>, all rights reserved.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
***************************************************************************** */

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
/**
 * Split a string or array of strings into ngram chunks
 * @param input the string or array of tokens to gram
 * @param n the gram number to return (e.g. bigrams = 2, trigrams = 3, etc.). Defaults to 2.
 * @param pad pad the output array? Defaults to false.
 * @param splitPattern pattern used to split strings into tokens. Defaults to /\s+/.
 */
declare function nGram(input: string | string[], n?: number, pad?: boolean | string[], splitPattern?: string | RegExp): (string | null)[][];
/**
 * Split a string or array of strings into ngram chunks
 * @param input the string or array of tokens to gram
 * @param n the gram number to return (e.g. bigrams = 2, trigrams = 3, etc.). Defaults to 2.
 * @param pad pad the output array? Defaults to false.
 * @param splitPattern pattern used to split strings into tokens. Defaults to /\s+/.
 */
declare function ngram(input: string | string[], n?: number, pad?: boolean | string[], splitPattern?: string | RegExp): (string | null)[][];

export { nGram, ngram };
