var expect = require('chai').expect;
var SimpleMatrix = require('../index');

var goodMatrix5x5 = [
	[0, 6, -2, -1, 5],
	[0, 0, 0, -9, -7],
	[0, 15, 35, 0, 0],
	[0, -1, -11, -2, 1],
	[-2, -2, 3, 0, -2]
];

var goodMatrix3x5 = [
	[0, 6, -2, -1, 5],
	[0, 0, 0, -9, -7],
	[0, 15, 35, 0, 0]
];

var badMatrix = [
	[0, 6, -2],
	[0, 0, 0],
	[0, 15, 35, 0]
];

describe('SimpleMatrix.dimension()', function() {

	describe('valid 5x5 matrix', function() {
		it('should return array: [5, 5]', function() {
			expect(SimpleMatrix.dimension(goodMatrix5x5)).to.be.an('array').of.length(2).and.to.have.ordered.members([5, 5]);
		});
	});

	describe('valid 3x5 matrix', function() {
		it('should return array: [3, 5]', function() {
			expect(SimpleMatrix.dimension(goodMatrix3x5)).to.be.an('array').of.length(2).and.to.have.ordered.members([3, 5]);
		});
	});

	describe('invalid matrix', function() {
		it('should throw Error', function() {
			expect(function() {
				SimpleMatrix.dimension(badMatrix)
			}).to.throw(Error, 'Invalid matrix specification.');
		});
	});

	describe('bad matrix array', function() {
		it('should throw Error', function() {
			expect(function() {
				SimpleMatrix.dimension([0, 6, -2]);
			}).to.throw(Error, 'Invalid matrix specification.');
		});
	});

	describe('non-array argument', function() {
		it('should throw TypeError', function() {
			expect(function() {
				SimpleMatrix.dimension(5);
			}).to.throw(TypeError);
		});
	});

});
