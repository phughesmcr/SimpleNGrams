# SimleNGrams

The easiest way of getting an array of n-grams from a string!

## Useage
```javascript
const sng = require('simplengrams')
const txt = "A string of text..."
const bigrams = sng(text, 2)
const trigrams = sng(text, 3)
console.log(bigrams, trigrams)
```

## Example
### Input
```javascript
const sng = require('simplengrams')
const text = "In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters."
const bigrams = sng(text, 2)
console.log(bigrams)
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
  [ 'earth', '.' ],
  [ '.', 'Now' ],
  [ 'Now', 'the' ],
  [ 'the', 'earth' ],
  [ 'earth', 'was' ],
  [ 'was', 'formless' ],
  [ 'formless', 'and' ],
  [ 'and', 'empty' ],
  [ 'empty', ',' ],
  [ ',', 'darkness' ],
  [ 'darkness', 'was' ],
  [ 'was', 'over' ],
  [ 'over', 'the' ],
  [ 'the', 'surface' ],
  [ 'surface', 'of' ],
  [ 'of', 'the' ],
  [ 'the', 'deep' ],
  [ 'deep', ',' ],
  [ ',', 'and' ],
  [ 'and', 'the' ],
  [ 'the', 'Spirit' ],
  [ 'Spirit', 'of' ],
  [ 'of', 'God' ],
  [ 'God', 'was' ],
  [ 'was', 'hovering' ],
  [ 'hovering', 'over' ],
  [ 'over', 'the' ],
  [ 'the', 'waters' ],
  [ 'waters', '.' ]
]
```

## Licence
[P. Hughes](https://www.phugh.es) (C) 2017.

[Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported](http://creativecommons.org/licenses/by-nc-sa/3.0/).