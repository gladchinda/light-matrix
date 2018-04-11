var expect = require('chai').expect;
var SimpleMatrix = require('../index');

var goodMatrix5x5 = [
	[0, 6, -2, -1, 5],
	[0, 0, 0, -9, -7],
	[0, 15, 35, 0, 0],
	[0, -1, -11, -2, 1],
	[-2, -2, 3, 0, -2]
];

var anotherGoodMatrix5x5 = [
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

describe('SimpleMatrix.equal()', function() {

	describe('same dimension matrices', function() {
		it('should return true', function() {
			expect(SimpleMatrix.equal(goodMatrix5x5, anotherGoodMatrix5x5)).to.be.a('boolean').and.to.be.true;
		});
	});

	describe('different dimension matrices', function() {
		it('should return false', function() {
			expect(SimpleMatrix.equal(goodMatrix3x5, anotherGoodMatrix5x5)).to.be.a("boolean").and.to.be.false;
		});
	});

	describe('invalid matrix argument', function() {
		it('should throw Error', function() {
			expect(function() {
				SimpleMatrix.equal(badMatrix, goodMatrix3x5);
			}).to.throw(Error, 'Invalid matrix specification.');
		});
	});

	describe('bad matrix array', function() {
		it('should throw Error', function() {
			expect(function() {
				SimpleMatrix.equal([0, 6, -2], goodMatrix3x5);
			}).to.throw(Error, 'Invalid matrix specification.');
		});
	});

	describe('non-array argument', function() {
		it('should throw TypeError', function() {
			expect(function() {
				SimpleMatrix.equal(5, goodMatrix3x5);
			}).to.throw(TypeError);
		});
	});

});
