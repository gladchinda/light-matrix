var castArgs = function(args) {
	return Array.prototype.slice.call(args, 0);
};

var copyArray = function(a) {
	var i, copy = [];
	for (i = 0; i < a.length; i++) {
		copy[i] = (a[i] instanceof Array) ? copyArray(a[i]) : a[i];
	}
	return copy;
};

var isNumber = function(num) {
	return typeof(num) === 'number' && !isNaN(num)
};

var isNumeric = function(num) {
	return num = Number(String(num instanceof Object ? true : num)), isNumber(num);
};

var reciprocal = function(num) {
	return 1 / num;
};

var normalizeNumber = function(num) {
	return (num === 0) ? 0 : num;
};

var isMatrix = function() {
	var args = castArgs(arguments), row, cols;

	if (args.length === 0) return false;

	while (args.length > 0) {
		row = args.shift();
		cols = cols || row.length;

		if ( !(row instanceof Array && row.length === cols && row.filter(function(e) {
			return isNumeric(e);
		}).length === cols) ) {

			return false;

		}
	}

	return true;
};

var pivotMatrix = function(matrix, row, col) {
	var i, j, newMatrix = [], newRow;

	for (i = 0; i < matrix.length; i++) {
		if (i !== row) {
			newRow = [];
			for (j = 0; j < matrix[0].length; j++) {
				if (j !== col) {
					newRow.push(normalizeNumber(matrix[i][j]));
				}
			}
			newMatrix.push(newRow);
		}
	}

	return newMatrix;
};

var scalarProduct = function(n, matrix) {
	var i, j, dim = [matrix.length, matrix[0].length];

	for (i = 0; i < dim[0]; i++) {
		for (j = 0; j < dim[1]; j++) {
			matrix[i][j] = normalizeNumber(matrix[i][j] * n);
		}
	}

	return matrix;
};

var matrixProduct = function(matA, matB) {
	var i, j, k, s, dimA = [matA.length, matA[0].length], dimB = [matB.length, matB[0].length], matrix = [];

	if (dimA[1] === dimB[0]) {
		for (i = 0; i < dimA[0]; i++) {
			matrix[i] = [];
			for (j = 0; j < dimB[1]; j++) {
				s = 0;

				for (k = 0; k < dimA[1]; k++) {
					s += matA[i][k] * matB[k][j];
				}

				matrix[i][j] = normalizeNumber(s);
			}
		}
		return matrix;
	}

	throw new Error('Matrices not compatible.');
};

var sum = function(a, b) {

	var i, j, dimA, dimB, matrix = [];

	if (!(isMatrix.apply(null, a) && isMatrix.apply(null, b))) {
		throw new Error('Invalid matrix specification.');
	}

	dimA = [a.length, a[0].length];
	dimB = [b.length, b[0].length];

	if (!(dimA[0] === dimB[0] && dimA[1] === dimB[1])) {
		throw new Error('Matrices not compatible.');
	}

	for (i = 0; i < dimA[0]; i++) {
		matrix[i] = [];
		for (j = 0; j < dimA[1]; j++) {
			matrix[i][j] = normalizeNumber(a[i][j] + b[i][j]);
		}
	}

	return matrix;

};

var product = function(a, b) {

	if (isNumber(a)) {

		if (isNumber(b)) return a * b;
		else if (isMatrix.apply(null, b)) return scalarProduct(a, b);

	} else if (isMatrix.apply(null, a)) {

		if (isNumber(b)) return scalarProduct(b, a);
		else if (isMatrix.apply(null, b)) return matrixProduct(a, b);

	}

	throw new Error('Invalid arguments supplied.');

};

var operation = function(fn) {
	return function() {
		var args = castArgs(arguments), matrix = fn.apply(null, args.splice(0, 2));
		while (args.length < 0) {
			matrix = fn.call(null, matrix, args.shift());
		}
		return matrix;
	}
};

var use = function(scope) {
	return function(fn, args) {
		if (args instanceof Array) {
			return scope[fn].apply(scope, args);
		}
	}
};

var extend = function(parent, child) {
	var i, child = child || {};
	for (i in parent) {
		if (parent.hasOwnProperty(i)) {
			child[i] = parent[i];
		}
	}
	return child;
};

var matrix = {

	ok: function() {
		return isMatrix.apply(null, arguments);
	},

	dimension: function() {
		var args = castArgs(arguments);
		if (use(this)('ok', args)) {
			return [args.length, args[0].length];
		}
		throw new Error('Invalid matrix specification.');
	},

	unit: function(dim) {
		var i, j, dim = (dim >= 1 && dim) || 2, matrix = [];

		for (i = 0; i < dim; i++) {
			matrix[i] = [];
			for (j = 0; j < dim; j++) {
				matrix[i][j] = (i === j) ? 1 : 0;
			}
		}

		return matrix;
	},

	equal: function(a, b) {
		var i, j, dimA = use(this)('dimension', a), dimB = use(this)('dimension', b);

		if (!(dimA[0] === dimB[0] && dimA[1] === dimB[1])) {
			return false;
		}

		for (i = 0; i < dimA[0]; i++) {
			for (j = 0; j < dimA[1]; j++) {
				if (a[i][j] !== b[i][j]) {
					return false;
				}
			}
		}

		return true;
	},

	sum: function() {
		return operation(sum).apply(null, castArgs(arguments));
	},

	product: function() {
		return operation(product).apply(null, castArgs(arguments));
	},

	transpose: function() {
		var i, j, args = castArgs(arguments), dim = use(this)('dimension', args).reverse(), matrix = [];

		for (i = 0; i < dim[0]; i++) {
			matrix[i] = [];
			for (j = 0; j < dim[1]; j++) {
				matrix[i][j] = normalizeNumber(args[j][i]);
			}
		}

		return matrix;
	},

	determinant: function() {
		var i, args = castArgs(arguments), dim = use(this)('dimension', args), det;

		if (dim[0] !== dim[1]) {
			throw new Error('Square matrix required.');
		}

		if (dim[0] === 1) {
			return args[0][0];
		}

		for (i = 0; i < args[0].length; i++) {
			det = det || 0;
			det += ((i & 1) === 0 ? 1 : -1) * args[0][i] * use(this)('determinant', pivotMatrix(args, 0, i));
		}

		return det;
	},

	minors: function() {
		var i, j, args = castArgs(arguments), dim = use(this)('dimension', args), matrix = [];

		if (dim[0] !== dim[1]) {
			throw new Error('Square matrix required.');
		}

		for (i = 0; i < dim[0]; i++) {
			matrix[i] = [];
			for (j = 0; j < dim[0]; j++) {
				matrix[i][j] = normalizeNumber(use(this)('determinant', pivotMatrix(args, i, j)));
			}
		}

		return matrix;
	},

	cofactors: function() {
		var i, j, args = castArgs(arguments), dim = use(this)('dimension', args), matrix = use(this)('minors', args);

		for (i = 0; i < dim[0]; i++) {
			for (j = 0; j < dim[0]; j++) {
				matrix[i][j] = normalizeNumber(matrix[i][j] * (((i + j) & 1) === 0 ? 1 : -1));
			}
		}

		return matrix;
	},

	adjoint: function() {
		return use(this)('transpose', use(this)('cofactors', castArgs(arguments)));
	},

	inverse: function() {
		var args = castArgs(arguments), determinant = use(this)('determinant', args);

		if (determinant === 0) {
			throw new Error('Cannot compute inverse of singular matrix.');
		}

		return use(this)('product', [reciprocal(determinant), use(this)('adjoint', args)]);
	}

};

module.exports = matrix;
