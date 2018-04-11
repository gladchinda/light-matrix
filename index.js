var Matrix = require('./src/matrix');

var withoutMatrix = function(method) {
	return Matrix[method].bind(Matrix);
};

var withMatrix = function(method) {
	return function(matrix) {
		return Matrix[method].apply(Matrix, matrix)
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
	var lightmatrix = window.lightmatrix || _matrix;
	window.lightmatrix = lightmatrix;
}

module.exports = _matrix;
