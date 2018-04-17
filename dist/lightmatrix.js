(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.lightmatrix = factory());
}(this, (function () { 'use strict';

  function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

  var isNumber = function isNumber(num) {
    return typeof num === 'number' && !isNaN(num);
  };

  var isNumeric = function isNumeric(num) {
    var number = Number(String(num instanceof Object ? true : num));
    return isNumber(number);
  };

  var reciprocal = function reciprocal(num) {
    return 1 / num;
  };

  var normalizeNumber = function normalizeNumber(num) {
    return num === 0 ? 0 : num;
  };

  var isMatrix = function isMatrix(matrix) {

    if (!(matrix instanceof Array) || matrix.length === 0) return false;

    var cols = void 0;

    var _matrix = _toArray(matrix),
        cloneMatrix = _matrix.slice(0);

    while (cloneMatrix.length > 0) {
      var row = cloneMatrix.shift();
      var isArrayRow = row instanceof Array;

      if (!isArrayRow) return false;

      cols = cols || row.length;

      var sameRowCols = row.length === cols;
      var numericRowElements = row.filter(function (e) {
        return isNumeric(e);
      }).length === cols;

      if (!(sameRowCols && numericRowElements)) return false;
    }

    return true;
  };

  var pivotMatrix = function pivotMatrix(matrix, row, col) {
    var newMatrix = [];

    for (var i = 0; i < matrix.length; i += 1) {
      if (i !== row) {
        var newRow = [];
        for (var j = 0; j < matrix[0].length; j += 1) {
          if (j !== col) {
            newRow.push(normalizeNumber(matrix[i][j]));
          }
        }
        newMatrix.push(newRow);
      }
    }

    return newMatrix;
  };

  var scalarProduct = function scalarProduct(n, matrix) {
    var _matrix2 = _toArray(matrix),
        newMatrix = _matrix2.slice(0);

    var dim = [matrix.length, matrix[0].length];

    for (var i = 0; i < dim[0]; i += 1) {
      for (var j = 0; j < dim[1]; j += 1) {
        newMatrix[i][j] = normalizeNumber(matrix[i][j] * n);
      }
    }

    return newMatrix;
  };

  var matrixProduct = function matrixProduct(matA, matB) {

    var dimA = [matA.length, matA[0].length];
    var dimB = [matB.length, matB[0].length];
    var matrix = [];

    if (dimA[1] === dimB[0]) {
      for (var i = 0; i < dimA[0]; i += 1) {
        matrix[i] = [];
        for (var j = 0; j < dimB[1]; j += 1) {
          var s = 0;

          for (var k = 0; k < dimA[1]; k += 1) {
            s += matA[i][k] * matB[k][j];
          }

          matrix[i][j] = normalizeNumber(s);
        }
      }
      return matrix;
    }

    throw new Error('Matrices not compatible.');
  };

  var sum = function sum(a, b) {

    if (!(isMatrix(a) && isMatrix(b))) {
      throw new Error('Invalid matrix specification.');
    }

    var matrix = [];
    var dimA = [a.length, a[0].length];
    var dimB = [b.length, b[0].length];

    if (!(dimA[0] === dimB[0] && dimA[1] === dimB[1])) {
      throw new Error('Matrices not compatible.');
    }

    for (var i = 0; i < dimA[0]; i += 1) {
      matrix[i] = [];
      for (var j = 0; j < dimA[1]; j += 1) {
        matrix[i][j] = normalizeNumber(a[i][j] + b[i][j]);
      }
    }

    return matrix;
  };

  var product = function product(a, b) {

    if (isNumber(a)) {
      if (isNumber(b)) return a * b;else if (isMatrix(b)) return scalarProduct(a, b);
    } else if (isMatrix(a)) {
      if (isNumber(b)) return scalarProduct(b, a);else if (isMatrix(b)) return matrixProduct(a, b);
    }

    throw new Error('Invalid arguments supplied.');
  };

  var Matrix = {

    ok: isMatrix,

    dimension: function dimension(matrix) {
      if (this.ok(matrix)) {
        return [matrix.length, matrix[0].length];
      }
      throw new Error('Invalid matrix specification.');
    },
    unit: function unit(dimension) {
      var dim = dimension >= 1 && dimension || 2;
      var unitmatrix = [];

      for (var i = 0; i < dim; i += 1) {
        unitmatrix[i] = [];
        for (var j = 0; j < dim; j += 1) {
          unitmatrix[i][j] = i === j ? 1 : 0;
        }
      }

      return unitmatrix;
    },
    equal: function equal(a, b) {
      var dimA = this.dimension(a);
      var dimB = this.dimension(b);

      if (!(dimA[0] === dimB[0] && dimA[1] === dimB[1])) return false;

      for (var i = 0; i < dimA[0]; i += 1) {
        for (var j = 0; j < dimA[1]; j += 1) {
          if (a[i][j] !== b[i][j]) return false;
        }
      }

      return true;
    },


    sum: sum,

    product: product,

    transpose: function transpose(matrix) {
      var dim = this.dimension(matrix).reverse();
      var newmatrix = [];

      for (var i = 0; i < dim[0]; i += 1) {
        newmatrix[i] = [];
        for (var j = 0; j < dim[1]; j += 1) {
          newmatrix[i][j] = normalizeNumber(matrix[j][i]);
        }
      }

      return newmatrix;
    },
    determinant: function determinant(matrix) {

      var det = void 0;
      var dim = this.dimension(matrix);

      if (dim[0] !== dim[1]) throw new Error('Square matrix required.');

      if (dim[0] === 1) return matrix[0][0];

      for (var i = 0; i < matrix[0].length; i += 1) {
        det = det || 0;
        det += ((i & 1) === 0 ? 1 : -1) * matrix[0][i] * this.determinant(pivotMatrix(matrix, 0, i));
      }

      return det;
    },
    minors: function minors(matrix) {

      var dim = this.dimension(matrix);
      var newmatrix = [];

      if (dim[0] !== dim[1]) throw new Error('Square matrix required.');

      for (var i = 0; i < dim[0]; i += 1) {
        newmatrix[i] = [];
        for (var j = 0; j < dim[0]; j += 1) {
          newmatrix[i][j] = normalizeNumber(this.determinant(pivotMatrix(matrix, i, j)));
        }
      }

      return newmatrix;
    },
    cofactors: function cofactors(matrix) {
      var dim = this.dimension(matrix);
      var newmatrix = this.minors(matrix);

      for (var i = 0; i < dim[0]; i += 1) {
        for (var j = 0; j < dim[0]; j += 1) {
          newmatrix[i][j] = normalizeNumber(newmatrix[i][j] * ((i + j & 1) === 0 ? 1 : -1));
        }
      }

      return newmatrix;
    },
    adjoint: function adjoint(matrix) {
      return this.transpose(this.cofactors(matrix));
    },
    inverse: function inverse(matrix) {
      var det = this.determinant(matrix);

      if (det === 0) throw new Error('Cannot compute inverse of singular matrix.');

      return this.product(reciprocal(det), this.adjoint(matrix));
    }
  };

  var bindMatrix = function bindMatrix(method) {
    return Matrix[method].bind(Matrix);
  };

  var lightmatrix = {
    ok: bindMatrix('ok'),
    valid: bindMatrix('ok'),
    order: bindMatrix('dimension'),
    dimension: bindMatrix('dimension'),
    unit: bindMatrix('unit'),
    identity: bindMatrix('unit'),
    equal: bindMatrix('equal'),
    same: bindMatrix('equal'),
    sum: bindMatrix('sum'),
    add: bindMatrix('sum'),
    product: bindMatrix('product'),
    multiply: bindMatrix('product'),
    transpose: bindMatrix('transpose'),
    determinant: bindMatrix('determinant'),
    minors: bindMatrix('minors'),
    cofactors: bindMatrix('cofactors'),
    adjoint: bindMatrix('adjoint'),
    inverse: bindMatrix('inverse')
  };

  return lightmatrix;

})));
//# sourceMappingURL=lightmatrix.js.map
