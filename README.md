# 🗿 SimleNGrams

The easiest way to get an array of n-grams from a string or array of tokens!

No dependencies!

## Install
```bash
  npm install --production --save simplengrams
```

`UMD`, `IIFE`, `CJS` and `ESM` builds are available in the `./dist` directory.

## Usage

SimpleNGrams exports one function: `nGram()`.

The function take the following arguments:

* `input` - a string or array of strings to be split into ngrams.
* `n`     - the ngram size as a number. Defaults to 2 (i.e. bigrams).
* `pad`   - optional padding parameter. Takes a boolean or an array. Defaults to false (i.e. no padding). See [Padding](#padding) below.
* `splitPattern`  - optional pattern as string or RegExp to split input string by. Defaults to spaces. See [Pattern](#pattern) below.

## Example
### Input

#### Module
```javascript
import { nGram } from 'simplengrams';
const text = 'In the beginning God created the heavens and the earth.';
const bigrams = nGram(text);
console.log(bigrams);
```

#### Node
```javascript
const simplengrams = require('simplengrams');
const text = 'In the beginning God created the heavens and the earth.';
const bigrams = simplengrams.nGram(text);
console.log(bigrams);
```

#### Browser
Browser builds in UMD and IIFE formats can be found in the `./dist` directory.

```html
<script src="pathTo/simplengrams.min.js"></script>
<script>
  const text = 'In the beginning God created the heavens and the earth.';
  const bigrams = simplengrams.nGram(text);
  console.log(bigrams);
</script>
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

<a name="padding">

## Padding
Custom padding options can be used to add right and left padding to the output array.

The padding argument is the third argument in both `.from()` and `.fromSync()`. It takes a boolean (i.e. `true` or `false`) or an array.

The padding option defaults to `false` if it is not supplied.

Some examples:

* `false` = padding is not applied.

* `true` = `null` is used as padding.

* `['FOO', 'BAR']` = The string `'FOO'` is used as left padding and the string `'BAR'` is used as right padding.

* `['FOOBAR']` = The string `'FOOBAR'` is used as both left and right padding.

You can disable individual padding by using `undefined` like so:

* `[undefined, 'BAR']` will disable left padding and use `'BAR'` as right padding.

N.B. `null` will cause the padder to use the `null` element literally. Use `undefined` only to disable padding.

N.B. Simply use `false` instead of `[undefined, undefined]` - it results in the same output but is slightly faster.

### Examples

#### pad = true

```javascript
import { nGram } from 'simplengrams';
const text = 'In the beginning God created the heavens and the earth.';
const bigrams = nGram(text, 2, true);
console.log(bigrams);
```

```javascript
[
  [ null, 'In' ],
  [ 'In', 'the' ],
  [ 'the', 'beginning' ],
  [ 'beginning', 'God' ],
  [ 'God', 'created' ],
  [ 'created', 'the' ],
  [ 'the', 'heavens' ],
  [ 'heavens', 'and' ],
  [ 'and', 'the' ],
  [ 'the', 'earth' ],
  [ 'earth', '.' ],
  [ '.', null ]
]
```

#### pad = [undefined, 'END']

```javascript
import { nGram } from 'simplengrams';
const text = 'In the beginning God created the heavens and the earth.';
const bigrams = nGram(text, 2, [undefined, 'END']);
console.log(bigrams);
```

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
  [ 'earth', '.' ],
  [ '.', 'END' ]
]
```

<a name="pattern">

## Pattern
The pattern argument is an optional fourth argument.

It defaults to `/\s+/` and can take a string or a RegExp.

If your input is an array, the pattern argument is ignored.

For string inputs, the pattern argument is used to split the string into tokens, exactly like `string.split()`.

## Testing
Use `npm run test` to check any development changes against expected outputs.

## License
&copy; 2017-21 [P. Hughes](https://www.phugh.es). All rights reserved.

Shared under the [MIT license](http://creativecommons.org/licenses/by-nc-sa/3.0/) license.