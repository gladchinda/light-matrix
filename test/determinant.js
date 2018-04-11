var expect = require('chai').expect;
var SimpleMatrix = require('../index');

var matrix5x5 = [
	[0, 6, -2, -1, 5],
	[0, 0, 0, -9, -7],
	[0, 15, 35, 0, 0],
	[0, -1, -11, -2, 1],
	[-2, -2, 3, 0, -2]
];

var unitMatrix2x2 = [
	[1, 0],
	[0, 1]
];

var singularMatrix2x2 = [
	[3, 2],
	[6, 4]
];

var matrix3x5 = [
	[0, 6, -2, -1, 5],
	[0, 0, 0, -9, -7],
	[0, 15, 35, 0, 0]
];

var badMatrix = [
	[0, 6, -2],
	[0, 0, 0],
	[0, 15, 35, 0]
];

describe('SimpleMatrix.determinant()', function() {

	describe('square matrix(1x1)', function() {
		it('should return determinant (n[1][1] => number)', function() {
			expect(SimpleMatrix.determinant([[5]])).to.be.a('number').and.to.equal(5);
		});
	});

	describe('unit matrix(2x2)', function() {
		it('should return determinant (1)', function() {
			expect(SimpleMatrix.determinant(unitMatrix2x2)).to.be.a('number').and.to.equal(1);
		});
	});

	describe('singular matrix(2x2)', function() {
		it('should return determinant (0)', function() {
			expect(SimpleMatrix.determinant(singularMatrix2x2)).to.be.a('number').and.to.equal(0);
		});
	});

	describe('square matrix(5x5)', function() {
		it('should return determinant (number)', function() {
			expect(SimpleMatrix.determinant(matrix5x5)).to.be.a('number').and.to.equal(2480);
		});
	});

	describe('non-square matrix(3x5)', function() {
		it('should return determinantd 5x3 matrix', function() {
			expect(function() {
				SimpleMatrix.determinant(matrix3x5);
			}).to.throw(Error, 'Square matrix required.');
		});
	});

	describe('invalid matrix argument', function() {
		it('should throw Error', function() {
			expect(function() {
				SimpleMatrix.determinant(badMatrix);
			}).to.throw(Error, 'Invalid matrix specification.');
		});
	});

	describe('bad matrix array', function() {
		it('should throw Error', function() {
			expect(function() {
				SimpleMatrix.determinant([0, 6, -2]);
			}).to.throw(Error, 'Invalid matrix specification.');
		});
	});

	describe('non-array argument', function() {
		it('should throw TypeError', function() {
			expect(function() {
				SimpleMatrix.determinant(5);
			}).to.throw(TypeError);
		});
	});

});
