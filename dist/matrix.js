// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({3:[function(require,module,exports) {
var castArgs = function castArgs(args) {
	return Array.prototype.slice.call(args, 0);
};

var copyArray = function copyArray(a) {
	var i,
	    copy = [];
	for (i = 0; i < a.length; i++) {
		copy[i] = a[i] instanceof Array ? copyArray(a[i]) : a[i];
	}
	return copy;
};

var isNumber = function isNumber(num) {
	return typeof num === 'number' && !isNaN(num);
};

var isNumeric = function isNumeric(num) {
	return num = Number(String(num instanceof Object ? true : num)), isNumber(num);
};

var reciprocal = function reciprocal(num) {
	return 1 / num;
};

var normalizeNumber = function normalizeNumber(num) {
	return num === 0 ? 0 : num;
};

var isMatrix = function isMatrix() {
	var args = castArgs(arguments),
	    row,
	    cols;

	if (args.length === 0) return false;

	while (args.length > 0) {
		row = args.shift();
		cols = cols || row.length;

		if (!(row instanceof Array && row.length === cols && row.filter(function (e) {
			return isNumeric(e);
		}).length === cols)) {

			return false;
		}
	}

	return true;
};

var pivotMatrix = function pivotMatrix(matrix, row, col) {
	var i,
	    j,
	    newMatrix = [],
	    newRow;

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

var scalarProduct = function scalarProduct(n, matrix) {
	var i,
	    j,
	    dim = [matrix.length, matrix[0].length];

	for (i = 0; i < dim[0]; i++) {
		for (j = 0; j < dim[1]; j++) {
			matrix[i][j] = normalizeNumber(matrix[i][j] * n);
		}
	}

	return matrix;
};

var matrixProduct = function matrixProduct(matA, matB) {
	var i,
	    j,
	    k,
	    s,
	    dimA = [matA.length, matA[0].length],
	    dimB = [matB.length, matB[0].length],
	    matrix = [];

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

var _sum = function _sum(a, b) {

	var i,
	    j,
	    dimA,
	    dimB,
	    matrix = [];

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

var _product = function _product(a, b) {

	if (isNumber(a)) {

		if (isNumber(b)) return a * b;else if (isMatrix.apply(null, b)) return scalarProduct(a, b);
	} else if (isMatrix.apply(null, a)) {

		if (isNumber(b)) return scalarProduct(b, a);else if (isMatrix.apply(null, b)) return matrixProduct(a, b);
	}

	throw new Error('Invalid arguments supplied.');
};

var operation = function operation(fn) {
	return function () {
		var args = castArgs(arguments),
		    matrix = fn.apply(null, args.splice(0, 2));
		while (args.length < 0) {
			matrix = fn.call(null, matrix, args.shift());
		}
		return matrix;
	};
};

var use = function use(scope) {
	return function (fn, args) {
		if (args instanceof Array) {
			return scope[fn].apply(scope, args);
		}
	};
};

var extend = function extend(parent, child) {
	var i,
	    child = child || {};
	for (i in parent) {
		if (parent.hasOwnProperty(i)) {
			child[i] = parent[i];
		}
	}
	return child;
};

var matrix = {

	ok: function ok() {
		return isMatrix.apply(null, arguments);
	},

	dimension: function dimension() {
		var args = castArgs(arguments);
		if (use(this)('ok', args)) {
			return [args.length, args[0].length];
		}
		throw new Error('Invalid matrix specification.');
	},

	unit: function unit(dim) {
		var i,
		    j,
		    dim = dim >= 1 && dim || 2,
		    matrix = [];

		for (i = 0; i < dim; i++) {
			matrix[i] = [];
			for (j = 0; j < dim; j++) {
				matrix[i][j] = i === j ? 1 : 0;
			}
		}

		return matrix;
	},

	equal: function equal(a, b) {
		var i,
		    j,
		    dimA = use(this)('dimension', a),
		    dimB = use(this)('dimension', b);

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

	sum: function sum() {
		return operation(_sum).apply(null, castArgs(arguments));
	},

	product: function product() {
		return operation(_product).apply(null, castArgs(arguments));
	},

	transpose: function transpose() {
		var i,
		    j,
		    args = castArgs(arguments),
		    dim = use(this)('dimension', args).reverse(),
		    matrix = [];

		for (i = 0; i < dim[0]; i++) {
			matrix[i] = [];
			for (j = 0; j < dim[1]; j++) {
				matrix[i][j] = normalizeNumber(args[j][i]);
			}
		}

		return matrix;
	},

	determinant: function determinant() {
		var i,
		    args = castArgs(arguments),
		    dim = use(this)('dimension', args),
		    det;

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

	minors: function minors() {
		var i,
		    j,
		    args = castArgs(arguments),
		    dim = use(this)('dimension', args),
		    matrix = [];

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

	cofactors: function cofactors() {
		var i,
		    j,
		    args = castArgs(arguments),
		    dim = use(this)('dimension', args),
		    matrix = use(this)('minors', args);

		for (i = 0; i < dim[0]; i++) {
			for (j = 0; j < dim[0]; j++) {
				matrix[i][j] = normalizeNumber(matrix[i][j] * ((i + j & 1) === 0 ? 1 : -1));
			}
		}

		return matrix;
	},

	adjoint: function adjoint() {
		return use(this)('transpose', use(this)('cofactors', castArgs(arguments)));
	},

	inverse: function inverse() {
		var args = castArgs(arguments),
		    determinant = use(this)('determinant', args);

		if (determinant === 0) {
			throw new Error('Cannot compute inverse of singular matrix.');
		}

		return use(this)('product', [reciprocal(determinant), use(this)('adjoint', args)]);
	}

};

module.exports = matrix;
},{}],1:[function(require,module,exports) {
var Matrix = require('./src/matrix');

var withoutMatrix = function withoutMatrix(method) {
	return Matrix[method].bind(Matrix);
};

var withMatrix = function withMatrix(method) {
	return function (matrix) {
		return Matrix[method].apply(Matrix, matrix);
	};
};

var _matrix = {
	ok: withMatrix('ok'),
	dimension: withMatrix('dimension'),
	unit: withoutMatrix('unit'),
	equal: withoutMatrix('equal'),
	sum: withoutMatrix('sum'),
	product: withoutMatrix('product'),
	transpose: withMatrix('transpose'),
	determinant: withMatrix('determinant'),
	minors: withMatrix('minors'),
	cofactors: withMatrix('cofactors'),
	adjoint: withMatrix('adjoint'),
	inverse: withMatrix('inverse')
};

if (typeof window !== "undefined") {
	var LightMatrix = window.LightMatrix || _matrix;
	window.LightMatrix = LightMatrix;
}

module.exports = _matrix;
},{"./src/matrix":3}]},{},[1])
//# sourceMappingURL=/matrix.map