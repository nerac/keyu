![logo](logo.png)

[![Build Status](https://travis-ci.org/nerac/keyu.svg?branch=master)](https://travis-ci.org/nerac/keyu)
[![Coverage Status](https://coveralls.io/repos/github/nerac/keyu/badge.svg?branch=master)](https://coveralls.io/github/nerac/keyu?branch=master)
[![install size](https://packagephobia.now.sh/badge?p=keyu)](https://packagephobia.now.sh/result?p=keyu)
[![Known Vulnerabilities](https://snyk.io/test/npm/keyu/badge.svg)](https://snyk.io/test/npm/keyu)

[![NPM](https://nodei.co/npm/keyu.png)](https://nodei.co/npm/keyu/)

**Keyu** (key utilities) provides **flexible** utilities to help you build **solid** projects <u>without repeating yourself</u>.

With this utilities you will be able to:

- Build some functional programming code.
- Work with asyncronous code like if it was syncronous\*.
- Iterate objects in same way you iterate arrays.
- Apply some advanced concurrency patterns ([Rob Pike](https://www.youtube.com/watch?v=f6kdp27TYZs)).
- Convert integers, floats or json correctly and safetly.

<small>\*compose functions independently if they return promises or actual values</small>

## Utilities

### Functional programming

#### Compose

Compose N functions, works with promises too.

```
const {compose} = require('keyu');

const sum1 = x => x+1;
const mult2 = x => x*2;
const dbSum = x => Promise.resolve(x+1);

const sumAndMult = compose(mult2,sum1);
const sumAndMultDB = compose(dbSum,mult2,sum1);

sumAndMult(1) // 4
sumAndMultDB(1) // Promise(5)
```

#### Pipe

Compose N functions in reverse order, works promises too.

```
const {pipe} = require('keyu');

const sum1 = x => x+1;
const mult2 = x => x*2;
const dbSum = x => Promise.resolve(x+1);

const sumAndMult = pipe(sum1,mult2);
const sumAndMultDB = pipe(sum1, mult2, dbSum);

sumAndMult(1) // 4
sumAndMultDB(1) // Promise(5)
```

### Objects

#### Map

Maps an object based on the mapping function passed.

```
let obj = {a:1,b:2,c:3};

console.log(obj.map(value => value+1)) // {a:2}
console.log(obj.map((value, key) => `${key}:${value+1}`)) // {a:'a:2'}
```

functional programmming implementation:

```
const {map,compose} = require('keyu');

const sum1 = compose(map(x => x+1))

sum1([1]) // [2]
sum1({a:1}) // {a:2}
```

#### Filter

Filters an object based on the filter function passed.

```
let obj = {a:1,b:2,c:3};

console.log(obj.filter(value => value > 2)) // {c:3}

console.log(obj.filter((value, key) => value > 1 && key === 'c')) // {c:3}
```

functional programmming implementation:

```
const {filter,compose} = require('keyu');

const greaterThan5 = compose(filter(x => x > 5 ))

greaterThan5([1,2,3,4,5,6,7,8]) // [6,7,8]
greaterThan5({a:1,b:2,c:3,d:4,e:5,f:6,g:7}) // {f:6,g:7}
```

#### Reduce

### Concurrency

#### Promise.any

Promise.all executes an array of promises in parallel and returns all of them either they are sucessful or not without failing.

```
Promise.any([Promise.resolve(1),Promise.reject(2), Promise.resolve(3)]).then(console.log) // [ { value: 1 }, { error: 2 }, { value: 3 } ]
```

#### Promise.best

Promise.best execute an array of promises in parallel and returns the first one to be sucessful.

```
Promise.best([Promise.reject(1),Promise.resolve(2), Promise.resolve(3)]).then(console.log) // 2

Promise.best([Promise.reject(1),Promise.reject(2), Promise.reject(3)]).catch(console.log) // [1,2,3]
```

### Conversions

#### jsonOr

Converts safetly any input into a json, if it fails returns the default function value.

```
jsonOr(33)('{"a":1}') // -> {a:1}
jsonOr(33)(null) // -> 33
jsonOr(value => 33)(null) // -> 33
```

#### floatOr

Converts safetly any input into a float, if it fails returns the default function value.

```
floatOr(33)('11.33') // -> 11.33
floatOr(33)(null) // -> 33
floatOr(value => 33)(null) // -> 33
```

#### intOr

Converts safetly any input into an integer, if it fails returns the default function value.

```
intOr(33)('11') // -> 11
intOr(33)(null) // -> 33
intOr(value => 33)(null) // -> 33
```

#### setPrecision

Set the amount of decimals for any given float safelty or returns cero precision.

```
setPrecision(3,'1.1234') // -> 1.234
```

### Logic

#### Either

Is a try/catch in a functional way, it will try to execute the first function and if this one throws an exception will return the value of the second one.

```
let parser = either(JSON.parse,33);

parser("") // => 33
parser('{}') // => {}

```

#### fnOrValue

Detects if the value passed is a function or a value and returns the function applied to the value or the value itself.

### Identity

Function that given the same input returns the same output.

### Not

Negates any function that recieves
