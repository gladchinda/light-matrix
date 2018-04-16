# lightmatrix

> Lightweight JavaScript library for basic matrix computations.

1. [Installation and Usage](#installation-and-usage)
	- [Node Usage](#node-usage)
	- [Browser Usage](#browser-usage)
2. [API Reference](#api-reference)
	- [Matrix Specification](#matrix-specification)
	- [`lightmatrix` Methods](#lightmatrix-methods)
3. [License](#license)

<br/>

## Installation and Usage

### Node Usage

You can install the package in Node using either `npm` or `yarn`. Simply run any of the following command on your terminal. For `npm`, run the following command.

```shell
npm install lightmatrix --save
```

If you are using `yarn`, run the following command instead.

```shell
yarn add lightmatrix
```

You can also install the package with `bower` using the following command.

```shell
bower install lightmatrix
```

If you installed the package using `npm` or `yarn`, you can then require it in your code as follows.

```js
const lightmatrix = require('lightmatrix');

const matrix = [
  [1, 2],
  [3, 4]
];

console.log(lightmatrix.determinant(matrix)); // -2
```

Note that installing the package with `bower` will place the package files in the `bower_components` directory of your project.

### Browser Usage

On the browser, you can use the package by adding the following `<script>` tag to your code.

```html
<script src="https://unpkg.com/lightmatrix/dist/lightmatrix.js"></script>
```

**Minified**  
At the moment, the minified version of the package is approximately (~3KB).

```html
<script src="https://unpkg.com/lightmatrix/dist/lightmatrix.min.js"></script>
```

The package adds the namespace: `lightmatrix` to the global `window` object when used in the browser and all its methods can be accessed via that namespace. Hence, you can do the following somewhere else in your script:

```js
if (lightmatrix in window) {

  var matrix = [
    [1, 2],
    [3, 4]
  ];

  console.log(lightmatrix.determinant(matrix)); // -2

}
```

## API Reference

### Matrix Specification

A _matrix_ is specified using the array literal notation. The `matrix` is an **array of rows**, whereas each `row` is an **array of column elements**. A `column element` must be a `numeric` or `number` value.

Here is a valid 2x3 matrix (2 rows, 3 cols):

```js
var matrix = [
  [1, 2, 3], // Row 1 (3 column elements)
  [4, 5, 6] // Row 2 (3 column elements)
];
```

### `lightmatrix` Methods

Here are the available methods of the `lightmatrix` module:

- [ok](#lightmatrixokmatrix)
- [dimension](#lightmatrixdimensionmatrix)
- [unit](#lightmatrixunitdimension)
- [equal](#lightmatrixequalmatrixa-matrixb)
- [sum](#lightmatrixsummatrixa-matrixb)
- [product](#lightmatrixproductmatrixorscalara-matrixorscalarb)
- [transpose](#lightmatrixtransposematrix)
- [determinant](#lightmatrixdeterminantmatrix)
- [minors](#lightmatrixminorsmatrix)
- [cofactors](#lightmatrixcofactorsmatrix)
- [adjoint](#lightmatrixadjointmatrix)
- [inverse](#lightmatrixinversematrix)

#### `lightmatrix.ok(matrix)`

**Alias:** `lightmatrix.valid`

Tests the input `matrix` argument to verify it is a valid matrix. It returns `true` if it is a valid matrix, otherwise it returns `false`. However, if the `matrix` argument has a `non-array` value, a `TypeError` is thrown.

```js
var matrix = [
  [1, 2],
  [3, 4]
];

console.log(lightmatrix.ok(matrix)); // true
console.log(lightmatrix.valid([1, 2, 3])); // false

console.log(lightmatrix.valid(5)); // throws TypeError
```

#### `lightmatrix.dimension(matrix)`

**Alias:** `lightmatrix.order`

Returns the order of the `matrix` argument as an array of the format `[rows, cols]`. However, if the `matrix` argument is an `array` but invalid, an `Error` is thrown. If the `matrix` argument has a `non-array` value, a `TypeError` is thrown.

```js
var matrix = [
  [1, 2, 3],
  [4, 5, 6]
];

console.log(lightmatrix.dimension(matrix)); // [2, 3]

console.log(lightmatrix.order([1, 2, 3])); // throws Error
console.log(lightmatrix.order(5)); // throws TypeError
```

#### `lightmatrix.unit(dimension)`

**Alias:** `lightmatrix.identity`

Returns a new _identity or unit matrix_ matrix of the specified dimension. If the `dimension` argument is `0` or any `non-numeric` value, then a 2x2 identity matrix is returned by default.

```js
console.log(lightmatrix.unit(3)); // [ [1, 0, 0], [0, 1, 0], [0, 0, 1] ]
console.log(lightmatrix.identity(0)); // [ [1, 0], [0, 1] ]
```

#### `lightmatrix.equal(matrixA, matrixB)`

**Alias:** `lightmatrix.same`

Compares the two input matrix arguments `matrixA` and `matrixB` to verify they are of the same order and contain the same elements at all positions. It returns `true` these conditions are met, otherwise it returns `false`. However, if any of the matrix arguments is an `array` but invalid, an `Error` is thrown. If any of the matrix arguments has a `non-array` value, a `TypeError` is thrown.

```js
var matrixA = [
  [1, 2],
  [4, 5]
];

var matrixB = [
  [1, 2, 3],
  [4, 5, 6]
];

console.log(lightmatrix.equal(matrixA, matrixB)); // false
console.log(lightmatrix.same(matrixB, matrixB)); // true
```

#### `lightmatrix.sum(matrixA, matrixB)`

**Alias:** `lightmatrix.add`

Adds the two input matrix arguments `matrixA` and `matrixB` and returns the resulting matrix provided that the input matrices are of the same order. However, if the input matrices are of different orders, an `Error` is thrown. If any of the matrix arguments is an `array` but invalid, an `Error` is thrown. Also, if any of the matrix arguments has a `non-array` value, a `TypeError` is thrown.

```js
var matrixA = [
  [1, 2],
  [4, 5]
];

var matrixB = [
  [1, 2, 3],
  [4, 5, 6]
];

console.log(lightmatrix.sum(matrixA, matrixB)); // throws Error
console.log(lightmatrix.add(matrixA, matrixA)); // [ [2, 4], [8, 10] ]
```

#### `lightmatrix.product(matrixOrScalarA, matrixOrScalarB)`

**Alias:** `lightmatrix.multiply`

Multiplies the two input matrix/scalar arguments `matrixOrScalarA` and `matrixOrScalarB`.

If _two scalars_ are supplied, then the arithmetic product of the scalars is returned. If _one scalar_ and _one matrix_ are supplied, then the resulting scalar product matrix is returned. However, if _two matrices_ are supplied, it returns the resulting product matrix provided that the matrix product `matrixOrScalarA * matrixOrScalarB` is possible, otherwise an `Error` is thrown.

> **Note:** The scalar is required to strictly be of the `number` type.

If any of the matrix arguments is an `array` but invalid, an `Error` is thrown. Also, if any of the matrix arguments has a `non-array` value or is not a `number`, a `TypeError` is thrown.

```js
var matrixA = [
  [1, 2],
  [4, 5]
];

var matrixB = [
  [1, 2, 3],
  [4, 5, 6]
];

var matrixC = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log(lightmatrix.multiply(-5, 10)); // -50
console.log(lightmatrix.multiply(-5, matrixA)); // [ [-5, -10], [-20, -25] ]
console.log(lightmatrix.product(matrixA, matrixB)); // [ [9, 12, 15], [24, 33, 42] ]
console.log(lightmatrix.product(matrixA, matrixC)); // throws Error
```

#### `lightmatrix.transpose(matrix)`

Transposes the input `matrix` argument and returns the transposed matrix provided that the input matrix is valid. However, if the `matrix` argument is an `array` but invalid, an `Error` is thrown. If the `matrix` argument has a `non-array` value, a `TypeError` is thrown.

```js
var matrix = [
  [1, 2, 3],
  [4, 5, 6]
];

console.log(lightmatrix.transpose(matrix)); // [ [1, 4], [2, 5], [3, 6] ]
console.log(lightmatrix.transpose([1, 2, 3])); // throws Error
```

#### `lightmatrix.determinant(matrix)`

Computes and returns the _determinant_ of the `matrix` argument provided that the input matrix is valid and is a square matrix.

> **Note:** The matrix must be a _square matrix_ to be able to compute its determinant otherwise an `Error` will be thrown.
  
> **Note:** The determinant is `0` for a _singular matrix_ which means the _inverse_ of such a matrix does not exist.

If the `matrix` argument is an `array` but invalid, an `Error` is thrown. If the `matrix` argument has a `non-array` value, a `TypeError` is thrown.

```js
var matrixA = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

var matrixB = [
  [1, 2, 3],
  [4, 5, 6]
];

console.log(lightmatrix.determinant(matrixA)); // 0 (singular matrix)
console.log(lightmatrix.determinant(matrixB)); // throws Error (non-square matrix)
```

#### `lightmatrix.minors(matrix)`

Computes the _minor_ of each element of the `matrix` argument and returns a matrix of the minors provided that the input matrix is valid and is a square matrix.

> **Note:** The matrix must be a _square matrix_ to be able to compute its minors otherwise an `Error` will be thrown.

If the `matrix` argument is an `array` but invalid, an `Error` is thrown. If the `matrix` argument has a `non-array` value, a `TypeError` is thrown.

```js
var matrixA = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

var matrixB = [
  [1, 2, 3],
  [4, 5, 6]
];

console.log(lightmatrix.minors(matrixA)); // [ [-3, -6, -3], [-6, -12, -6], [-3, -6, -3] ]
console.log(lightmatrix.minors(matrixB)); // throws Error (non-square matrix)
```

#### `lightmatrix.cofactors(matrix)`

Computes the _cofactor_ of each element of the `matrix` argument and returns a matrix of the cofactors provided that the input matrix is valid and is a square matrix.

> **Note:** The matrix must be a _square matrix_ to be able to compute its cofactors otherwise an `Error` will be thrown.

If the `matrix` argument is an `array` but invalid, an `Error` is thrown. If the `matrix` argument has a `non-array` value, a `TypeError` is thrown.

```js
var matrixA = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

var matrixB = [
  [1, 2, 3],
  [4, 5, 6]
];

console.log(lightmatrix.cofactors(matrixA)); // [ [-3, 6, -3], [6, -12, 6], [-3, 6, -3] ]
console.log(lightmatrix.cofactors(matrixB)); // throws Error (non-square matrix)
```

#### `lightmatrix.adjoint(matrix)`

Computes and returns the _adjoint_ (transpose of the cofactors matrix) of the `matrix` argument provided that the input matrix is valid and is a square matrix.

> **Note:** The matrix must be a _square matrix_ to be able to compute its adjoint otherwise an `Error` will be thrown.

If the `matrix` argument is an `array` but invalid, an `Error` is thrown. If the `matrix` argument has a `non-array` value, a `TypeError` is thrown.

```js
var matrixA = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

var matrixB = [
  [1, 2, 3],
  [4, 5, 6]
];

console.log(lightmatrix.adjoint(matrixA)); // [ [-3, 6, -3], [6, -12, 6], [-3, 6, -3] ]
console.log(lightmatrix.adjoint(matrixB)); // throws Error (non-square matrix)
```

#### `lightmatrix.inverse(matrix)`

Computes and returns the _inverse_ (scalar product of the adjoint matrix and the reciprocal of the determinant) of the `matrix` argument provided that the input matrix is valid and is a square matrix.

> **Note:** The matrix must be a _square matrix_ to be able to compute its inverse otherwise an `Error` will be thrown.

> **Note:** The inverse cannot be computed for a _singular matrix_ since its determinant is `0`. Attempting to compute the inverse throws an `Error`.

If the `matrix` argument is an `array` but invalid, an `Error` is thrown. If the `matrix` argument has a `non-array` value, a `TypeError` is thrown.

```js
var matrixA = [
  [-8, 10],
  [-4, 4]
];

var matrixB = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

var matrixC = [
  [1, 2, 3],
  [4, 5, 6]
];

console.log(lightmatrix.inverse(matrixA)); // [ [0.5, -1.25], [0.5, -1] ]
console.log(lightmatrix.inverse(matrixB)); // throws Error (singular matrix)
console.log(lightmatrix.inverse(matrixC)); // throws Error (non-square matrix)
```

## License

The `lightmatrix` package is covered by the **MIT License**.
