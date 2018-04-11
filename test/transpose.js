var expect = require('chai').expect;
var SimpleMatrix = require('../index');

var matrix5x5 = [
	[0, 6, -2, -1, 5],
	[0, 0, 0, -9, -7],
	[0, 15, 35, 0, 0],
	[0, -1, -11, -2, 1],
	[-2, -2, 3, 0, -2]
];

var transposeMatrix5x5 = [
	[0, 0, 0, 0, -2],
	[6, 0, 15, -1, -2],
	[-2, 0, 35, -11, 3],
	[-1, -9, 0, -2, 0],
	[5, -7, 0, 1, -2]
];

var matrix3x5 = [
	[0, 6, -2, -1, 5],
	[0, 0, 0, -9, -7],
	[0, 15, 35, 0, 0]
];

var transposeMatrix5x3 = [
	[0, 0, 0],
	[6, 0, 15],
	[-2, 0, 35],
	[-1, -9, 0],
	[5, -7, 0]
];

var badMatrix = [
	[0, 6, -2],
	[0, 0, 0],
	[0, 15, 35, 0]
];

describe('SimpleMatrix.transpose()', function() {

	describe('valid 5x5 matrix', function() {
		it('should return transposed 5x5 matrix', function() {
			expect(SimpleMatrix.transpose(matrix5x5)).to.be.an('array').of.length(5).and.to.have.deep.ordered.members(transposeMatrix5x5);
		});
	});

	describe('valid 3x5 matrix', function() {
		it('should return transposed 5x3 matrix', function() {
			expect(SimpleMatrix.transpose(matrix3x5)).to.be.an('array').of.length(5).and.to.have.deep.ordered.members(transposeMatrix5x3);
		});
	});

	describe('invalid matrix argument', function() {
		it('should throw Error', function() {
			expect(function() {
				SimpleMatrix.transpose(badMatrix);
			}).to.throw(Error, 'Invalid matrix specification.');
		});
	});

	describe('bad matrix array', function() {
		it('should throw Error', function() {
			expect(function() {
				SimpleMatrix.transpose([0, 6, -2]);
			}).to.throw(Error, 'Invalid matrix specification.');
		});
	});

	describe('non-array argument', function() {
		it('should throw TypeError', function() {
			expect(function() {
				SimpleMatrix.transpose(5);
			}).to.throw(TypeError);
		});
	});

});
