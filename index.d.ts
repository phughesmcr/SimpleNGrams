/**
 * Split a string or array of strings into ngram chunks
 * @param {string | string[]} input the string or array of tokens to gram
 * @param {number} [n=2] the gram number to return (e.g. bigrams = 2, trigrams = 3, etc.). Defaults to 2.
 * @param {boolean | string[]} [pad=false] pad the output array? Defaults to false.
 * @param {string | RegExp} [splitPattern=/\s+/] pattern used to split strings into tokens. Defaults to /\s+/.
 * @returns {(string | null)[][]} array of ngrams
 */
export function nGram(input: string | string[], n?: number | undefined, pad?: boolean | string[] | undefined, splitPattern?: string | RegExp | undefined): (string | null)[][];
//# sourceMappingURL=index.d.ts.map