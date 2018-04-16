const isNumber = num => (typeof num === 'number' && !isNaN(num));

const isNumeric = num => {
  const number = Number(String(num instanceof Object ? true : num));
  return isNumber(number);
};

const reciprocal = num => 1 / num;

const normalizeNumber = num => ((num === 0) ? 0 : num);

const isMatrix = (matrix) => {

  if (!(matrix instanceof Array) || matrix.length === 0) return false;

  let cols;
  const [...cloneMatrix] = matrix;

  while (cloneMatrix.length > 0) {
    const row = cloneMatrix.shift();
    const isArrayRow = row instanceof Array;

    if (!isArrayRow) return false;

    cols = cols || row.length;

    const sameRowCols = row.length === cols;
    const numericRowElements = row.filter(e => isNumeric(e)).length === cols;

    if (!(sameRowCols && numericRowElements)) return false;
  }

  return true;

};

const pivotMatrix = (matrix, row, col) => {
  const newMatrix = [];

  for (let i = 0; i < matrix.length; i += 1) {
    if (i !== row) {
      const newRow = [];
      for (let j = 0; j < matrix[0].length; j += 1) {
        if (j !== col) {
          newRow.push(normalizeNumber(matrix[i][j]));
        }
      }
      newMatrix.push(newRow);
    }
  }

  return newMatrix;
};

const scalarProduct = (n, matrix) => {
  const [...newMatrix] = matrix;
  const dim = [matrix.length, matrix[0].length];

  for (let i = 0; i < dim[0]; i += 1) {
    for (let j = 0; j < dim[1]; j += 1) {
      newMatrix[i][j] = normalizeNumber(matrix[i][j] * n);
    }
  }

  return newMatrix;
};

const matrixProduct = (matA, matB) => {

  const dimA = [matA.length, matA[0].length];
  const dimB = [matB.length, matB[0].length];
  const matrix = [];

  if (dimA[1] === dimB[0]) {
    for (let i = 0; i < dimA[0]; i += 1) {
      matrix[i] = [];
      for (let j = 0; j < dimB[1]; j += 1) {
        let s = 0;

        for (let k = 0; k < dimA[1]; k += 1) {
          s += matA[i][k] * matB[k][j];
        }

        matrix[i][j] = normalizeNumber(s);
      }
    }
    return matrix;
  }

  throw new Error('Matrices not compatible.');

};

const sum = (a, b) => {

  if (!(isMatrix(a) && isMatrix(b))) {
    throw new Error('Invalid matrix specification.');
  }

  const matrix = [];
  const dimA = [a.length, a[0].length];
  const dimB = [b.length, b[0].length];

  if (!(dimA[0] === dimB[0] && dimA[1] === dimB[1])) {
    throw new Error('Matrices not compatible.');
  }

  for (let i = 0; i < dimA[0]; i += 1) {
    matrix[i] = [];
    for (let j = 0; j < dimA[1]; j += 1) {
      matrix[i][j] = normalizeNumber(a[i][j] + b[i][j]);
    }
  }

  return matrix;

};

const product = (a, b) => {

  if (isNumber(a)) {
    if (isNumber(b)) return a * b;
    else if (isMatrix(b)) return scalarProduct(a, b);
  }

  else if (isMatrix(a)) {
    if (isNumber(b)) return scalarProduct(b, a);
    else if (isMatrix(b)) return matrixProduct(a, b);
  }

  throw new Error('Invalid arguments supplied.');

};

export default {

  ok: isMatrix,

  dimension(matrix) {
    if (this.ok(matrix)) {
      return [matrix.length, matrix[0].length];
    }
    throw new Error('Invalid matrix specification.');
  },

  unit(dimension) {
    const dim = (dimension >= 1 && dimension) || 2;
    const unitmatrix = [];

    for (let i = 0; i < dim; i += 1) {
      unitmatrix[i] = [];
      for (let j = 0; j < dim; j += 1) {
        unitmatrix[i][j] = (i === j) ? 1 : 0;
      }
    }

    return unitmatrix;
  },

  equal(a, b) {
    const dimA = this.dimension(a);
    const dimB = this.dimension(b);

    if (!(dimA[0] === dimB[0] && dimA[1] === dimB[1])) return false;

    for (let i = 0; i < dimA[0]; i += 1) {
      for (let j = 0; j < dimA[1]; j += 1) {
        if (a[i][j] !== b[i][j]) return false;
      }
    }

    return true;
  },

  sum,

  product,

  transpose(matrix) {
    const dim = this.dimension(matrix).reverse();
    const newmatrix = [];

    for (let i = 0; i < dim[0]; i += 1) {
      newmatrix[i] = [];
      for (let j = 0; j < dim[1]; j += 1) {
        newmatrix[i][j] = normalizeNumber(matrix[j][i]);
      }
    }

    return newmatrix;
  },

  determinant(matrix) {

    let det;
    const dim = this.dimension(matrix);

    if (dim[0] !== dim[1]) throw new Error('Square matrix required.');

    if (dim[0] === 1) return matrix[0][0];

    for (let i = 0; i < matrix[0].length; i += 1) {
      det = det || 0;
      det += ((i & 1) === 0 ? 1 : -1) * matrix[0][i] * this.determinant(pivotMatrix(matrix, 0, i));
    }

    return det;

  },

  minors(matrix) {

    const dim = this.dimension(matrix);
    const newmatrix = [];

    if (dim[0] !== dim[1]) throw new Error('Square matrix required.');

    for (let i = 0; i < dim[0]; i += 1) {
      newmatrix[i] = [];
      for (let j = 0; j < dim[0]; j += 1) {
        newmatrix[i][j] = normalizeNumber(this.determinant(pivotMatrix(matrix, i, j)));
      }
    }

    return newmatrix;

  },

  cofactors(matrix) {
    const dim = this.dimension(matrix);
    const newmatrix = this.minors(matrix);

    for (let i = 0; i < dim[0]; i += 1) {
      for (let j = 0; j < dim[0]; j += 1) {
        newmatrix[i][j] = normalizeNumber(newmatrix[i][j] * (((i + j) & 1) === 0 ? 1 : -1));
      }
    }

    return newmatrix;
  },

  adjoint(matrix) {
    return this.transpose(this.cofactors(matrix));
  },

  inverse(matrix) {
    const det = this.determinant(matrix);

    if (det === 0) throw new Error('Cannot compute inverse of singular matrix.');

    return this.product(reciprocal(det), this.adjoint(matrix));
  }

};
