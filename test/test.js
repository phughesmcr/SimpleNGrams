(async () => {
  'use strict';
  const ngrams = require('../index.js');

  /**
   * @param {any} a
   * @param {any} b
   * @return {boolean}
   */
  const deepCompare = (a, b) => {
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
  const simpleStr = 'In the beginning God created the heavens and the earth.';

  /* EXPECTED TEST OUTPUTS */
  const simpleBigramResults = [
    ['In', 'the'],
    ['the', 'beginning'],
    ['beginning', 'God'],
    ['God', 'created'],
    ['created', 'the'],
    ['the', 'heavens'],
    ['heavens', 'and'],
    ['and', 'the'],
    ['the', 'earth'],
    ['earth', '.'],
  ];
  const simpleBigramResultsPadded = [
    [null, 'In'],
    ['In', 'the'],
    ['the', 'beginning'],
    ['beginning', 'God'],
    ['God', 'created'],
    ['created', 'the'],
    ['the', 'heavens'],
    ['heavens', 'and'],
    ['and', 'the'],
    ['the', 'earth'],
    ['earth', '.'],
    ['.', null],
  ];
  const simpleBigramResultsCustom = [
    ['In', 'the'],
    ['the', 'beginning'],
    ['beginning', 'God'],
    ['God', 'created'],
    ['created', 'the'],
    ['the', 'heavens'],
    ['heavens', 'and'],
    ['and', 'the'],
    ['the', 'earth'],
    ['earth', '.'],
    ['.', 'END'],
  ];
  const simpleTrigramResults = [
    ['In', 'the', 'beginning'],
    ['the', 'beginning', 'God'],
    ['beginning', 'God', 'created'],
    ['God', 'created', 'the'],
    ['created', 'the', 'heavens'],
    ['the', 'heavens', 'and'],
    ['heavens', 'and', 'the'],
    ['and', 'the', 'earth'],
    ['the', 'earth', '.'],
  ];
  const simpleTrigramResultsPadded = [
    [null, null, 'In'],
    [null, 'In', 'the'],
    ['In', 'the', 'beginning'],
    ['the', 'beginning', 'God'],
    ['beginning', 'God', 'created'],
    ['God', 'created', 'the'],
    ['created', 'the', 'heavens'],
    ['the', 'heavens', 'and'],
    ['heavens', 'and', 'the'],
    ['and', 'the', 'earth'],
    ['the', 'earth', '.'],
    ['earth', '.', null],
    ['.', null, null],
  ];
  const simpleTrigramResultsCustom = [
    ['START', 'START', 'In'],
    ['START', 'In', 'the'],
    ['In', 'the', 'beginning'],
    ['the', 'beginning', 'God'],
    ['beginning', 'God', 'created'],
    ['God', 'created', 'the'],
    ['created', 'the', 'heavens'],
    ['the', 'heavens', 'and'],
    ['heavens', 'and', 'the'],
    ['and', 'the', 'earth'],
    ['the', 'earth', '.'],
    ['earth', '.', 'END'],
    ['.', 'END', 'END'],
  ];

  /* eslint-disable indent */
  /** TESTS */

    /** SIMPLE */

      /** ASYNC */

        /** BIGRAM */

          /** DEFAULT */
          console.log('START - simple - async - bigram - default');
          const asyncBigramDef = await ngrams.from(simpleStr, 2);
          deepCompare(asyncBigramDef, simpleBigramResults);
          console.log('END   - simple - async - bigram - default');

          /** PADDED */
          console.log('START - simple - async - bigram - padded');
          const asyncBigramPadded = await ngrams.from(simpleStr, 2, true);
          deepCompare(asyncBigramPadded, simpleBigramResultsPadded);
          console.log('END   - simple - async - bigram - padded');

          /** CUSTOM PADDED */
          console.log('START - simple - async - bigram - custom');
          const asyncBigramCustom = await ngrams.from(simpleStr, 2, [undefined, 'END']);
          deepCompare(asyncBigramCustom, simpleBigramResultsCustom);
          console.log('END   - simple - async - bigram - custom');

        /** TRIGRAM */

          /** DEFAULT */
          console.log('START - simple - async - trigram - default');
          const asyncTrigramDef = await ngrams.from(simpleStr, 3);
          deepCompare(asyncTrigramDef, simpleTrigramResults);
          console.log('END   - simple - async - trigram - default');

          /** PADDED */
          console.log('START - simple - async - trigram - padded');
          const asyncTrigramPadded = await ngrams.from(simpleStr, 3, true);
          deepCompare(asyncTrigramPadded, simpleTrigramResultsPadded);
          console.log('END   - simple - async - trigram - padded');

          /** CUSTOM PADDED */
          console.log('START - simple - async - trigram - custom');
          const asyncTrigramCustom = await ngrams.from(simpleStr, 3, ['START', 'END']);
          deepCompare(asyncTrigramCustom, simpleTrigramResultsCustom);
          console.log('END   - simple - async - trigram - custom');

      /** SYNC */

        /** BIGRAM */

          /** DEFAULT */
          console.log('START - simple - sync - bigram - default');
          const syncBigramDef = ngrams.fromSync(simpleStr, 2);
          deepCompare(syncBigramDef, simpleBigramResults);
          console.log('END   - simple - sync - bigram - default');

          /** PADDED */
          console.log('START - simple - async - bigram - padded');
          const syncBigramPadded = ngrams.fromSync(simpleStr, 2, true);
          deepCompare(syncBigramPadded, simpleBigramResultsPadded);
          console.log('END   - simple - sync - bigram - padded');

          /** CUSTOM PADDED */
          console.log('START - simple - sync - bigram - custom');
          const syncBigramCustom = ngrams.fromSync(simpleStr, 2, [undefined, 'END']);
          deepCompare(syncBigramCustom, simpleBigramResultsCustom);
          console.log('END   - simple - sync - bigram - custom');

        /** TRIGRAM */

          /** DEFAULT */
          console.log('START - simple - sync - trigram - default');
          const syncTrigramDef = ngrams.fromSync(simpleStr, 3);
          deepCompare(syncTrigramDef, simpleTrigramResults);
          console.log('END   - simple - sync - trigram - default');

          /** PADDED */
          console.log('START - simple - sync - trigram - padded');
          const syncTrigramPadded = ngrams.fromSync(simpleStr, 3, true);
          deepCompare(syncTrigramPadded, simpleTrigramResultsPadded);
          console.log('END   - simple - sync - trigram - padded');

          /** CUSTOM PADDED */
          console.log('START - simple - sync - trigram - custom');
          const syncTrigramCustom = ngrams.fromSync(simpleStr, 3, ['START', 'END']);
          deepCompare(syncTrigramCustom, simpleTrigramResultsCustom);
          console.log('END   - simple - sync - trigram - custom');
})();
