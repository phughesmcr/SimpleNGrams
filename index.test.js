"use strict";
import { nGram } from "./index.ts";

/**
 * @param {Array} a the input
 * @param {Array} b the example to test against
 * @return {boolean}
 */
const deepCompare = (a, b) => {
  if (typeof a !== typeof b) {
    throw new Error(
      `Cannot compare elements of different types. Expected ${typeof b}, got ${typeof a}.`,
    );
  } else if (Array.isArray(a) && Array.isArray(b) && (a.length !== b.length)) {
    throw new Error(
      `Arrays were different lengths! Expected ${b.length}, got ${a.length}.`,
    );
  }
  for (let i = 0; i < a.length; i++) {
    if (Array.isArray(a[i]) && Array.isArray(b[i])) {
      return deepCompare(a[i], b[i]);
    }
    if (a[i] !== b[i]) {
      throw new Error(`Found ${a[i]}, expected ${b[i]}`);
    }
  }
  return true;
};

/* TEST INPUTS */
const simpleStr = "In the beginning God created the heavens and the earth.";

/* EXPECTED TEST OUTPUTS */
const simpleBigramResults = [
  ["In", "the"],
  ["the", "beginning"],
  ["beginning", "God"],
  ["God", "created"],
  ["created", "the"],
  ["the", "heavens"],
  ["heavens", "and"],
  ["and", "the"],
  ["the", "earth."],
];
const simpleBigramResultsPadded = [
  [null, "In"],
  ["In", "the"],
  ["the", "beginning"],
  ["beginning", "God"],
  ["God", "created"],
  ["created", "the"],
  ["the", "heavens"],
  ["heavens", "and"],
  ["and", "the"],
  ["the", "earth."],
  ["earth.", null],
];
const simpleBigramResultsCustom = [
  ["In", "the"],
  ["the", "beginning"],
  ["beginning", "God"],
  ["God", "created"],
  ["created", "the"],
  ["the", "heavens"],
  ["heavens", "and"],
  ["and", "the"],
  ["the", "earth."],
  ["earth.", "END"],
];
const simpleTrigramResults = [
  ["In", "the", "beginning"],
  ["the", "beginning", "God"],
  ["beginning", "God", "created"],
  ["God", "created", "the"],
  ["created", "the", "heavens"],
  ["the", "heavens", "and"],
  ["heavens", "and", "the"],
  ["and", "the", "earth."],
];
const simpleTrigramResultsPadded = [
  [null, null, "In"],
  [null, "In", "the"],
  ["In", "the", "beginning"],
  ["the", "beginning", "God"],
  ["beginning", "God", "created"],
  ["God", "created", "the"],
  ["created", "the", "heavens"],
  ["the", "heavens", "and"],
  ["heavens", "and", "the"],
  ["and", "the", "earth"],
  ["the", "earth.", null],
  ["earth.", null, null],
];
const simpleTrigramResultsCustom = [
  ["START", "START", "In"],
  ["START", "In", "the"],
  ["In", "the", "beginning"],
  ["the", "beginning", "God"],
  ["beginning", "God", "created"],
  ["God", "created", "the"],
  ["created", "the", "heavens"],
  ["the", "heavens", "and"],
  ["heavens", "and", "the"],
  ["and", "the", "earth."],
  ["the", "earth.", "END"],
  ["earth.", "END", "END"],
];

/* eslint-disable indent */

/** SIMPLE */

/** BIGRAM */

/** DEFAULT */
console.log("START - simple - bigram - default");
const syncBigramDef = nGram(simpleStr, 2);
deepCompare(syncBigramDef, simpleBigramResults);
console.log("END   - simple - bigram - default");

/** PADDED */
console.log("START - simple - bigram - padded");
const syncBigramPadded = nGram(simpleStr, 2, true);
deepCompare(syncBigramPadded, simpleBigramResultsPadded);
console.log("END   - simple - bigram - padded");

/** CUSTOM PADDED */
console.log("START - simple - bigram - custom");
const syncBigramCustom = nGram(simpleStr, 2, [undefined, "END"]);
deepCompare(syncBigramCustom, simpleBigramResultsCustom);
console.log("END   - simple - bigram - custom");

/** TRIGRAM */

/** DEFAULT */
console.log("START - simple - trigram - default");
const syncTrigramDef = nGram(simpleStr, 3);
deepCompare(syncTrigramDef, simpleTrigramResults);
console.log("END   - simple - trigram - default");

/** PADDED */
console.log("START - simple - trigram - padded");
const syncTrigramPadded = nGram(simpleStr, 3, true);
deepCompare(syncTrigramPadded, simpleTrigramResultsPadded);
console.log("END   - simple - trigram - padded");

/** CUSTOM PADDED */
console.log("START - simple - trigram - custom");
const syncTrigramCustom = nGram(simpleStr, 3, ["START", "END"]);
deepCompare(syncTrigramCustom, simpleTrigramResultsCustom);
console.log("END   - simple - trigram - custom");
