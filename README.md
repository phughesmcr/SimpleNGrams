# SimleNGrams

The easiest way of getting an array of n-grams from a string!

## Useage
```javascript
const sng = require('simplengrams');
const txt = 'A string of text...';
const bigrams = sng(text, 2);
const trigrams = sng(text, 3);
console.log(bigrams, trigrams);
```

## Example
### Input
```javascript
const sng = require('simplengrams');
const text = 'In the beginning God created the heavens and the earth.';
const bigrams = sng(text, 2);
console.log(bigrams);
```

### Bigram Output
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

## Licence
(C) 2017 [P. Hughes](https://www.phugh.es).

[Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported](http://creativecommons.org/licenses/by-nc-sa/3.0/).