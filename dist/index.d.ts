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
export declare function nGram(input: string | string[], n?: number, pad?: boolean | string[], splitPattern?: string | RegExp): (string | null)[][];
//# sourceMappingURL=index.d.ts.map