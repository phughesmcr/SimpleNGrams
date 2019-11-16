# SimleNGrams

The easiest way to get an array of n-grams from a string!

## Usage

### Asynchronous
```javascript
const sng = require('simplengrams');
const text = 'A string of text...';
const opts = {logs: 3, strict: false};
const bigrams = await sng.ngrams(text, 2, opts);
console.log(bigrams);
```

Or, with `.then()` and `.catch()`:

```javascript
const sng = require('simplengrams');
const text = 'A string of text...';
const opts = {logs: 3, strict: false};
sng.ngrams(text, 3, opts)
  .then((arr) => {
    console.log(trigrams);
  })
  .catch((err) => {
    throw new Error(err);
  });

```

### Synchronous
```javascript
const sng = require('simplengrams');
const text = 'A string of text...';
const opts = {logs: 3, strict: false};
const bigrams = sng.ngramsSync(text, 2, opts);
console.log(bigrams);
```

Errors return an empty two-dimensional array, i.e. `[[]]`

If the n-gram size (i.e. '2' in the example above) is greater than the length of the input string, an empty two-dimensional array is returned, i.e. `[[]]`.

### Callback
```javascript
const sng = require('simplengrams');
const text = 'A string of text...';
const opts = {logs: 3, strict: false};
ngramsSync(text, 2, opts, function(err, bigrams) {
  console.log(bigrams);
});
```

## Example
### Input
```javascript
const sng = require('simplengrams');
const text = 'In the beginning God created the heavens and the earth.';
const opts = {logs: 3, strict: false};
const bigrams = sng(text, 2, opts);
console.log(bigrams);
```

### Output
```javascript
[
  [ 'In', 'the' ],
  [ 'the', 'beginning' ],
  [ 'beginning', 'God' ],
  [ 'God', 'created' ],
  [ 'created', 'the' ],
  [ 'the', 'heavens' ],
  [ 'heavens', 'and' ],
  [ 'and', 'the' ],
  [ 'the', 'earth' ],
  [ 'earth', '.' ]
]
```

## The Options Object
The options object is optional, the defaults are:
```
{
  logs: 3,
  normalize: true,
  strict: false
}
```

### logs
**Number - valid options: 0, 1, 2, 3 (default)**

Used to control console.log, console.warn, and console.error outputs.
* 0 = suppress all logs
* 1 = print errors only
* 2 = print errors and warnings
* 3 = print all console logs

### normalize
**boolean - valid options: `true` (default), or `false`**

[Normalise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize) strings. E.g. when set to `true`, 'mañana' become 'manana'.

### strict
**Boolean - valid options: true, false (default)**

When `strict` is set to `true` functions `throw` errors.
* `false` = functions return empty arrays on error
* `true`  = functions `throw` on error

## License
(C) 2017-19 [P. Hughes](https://www.phugh.es). All rights reserved.

Shared under the [Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported](http://creativecommons.org/licenses/by-nc-sa/3.0/) license.