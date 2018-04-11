var expect = require('chai').expect;
var SimpleMatrix = require('../index');

var goodMatrix = [
	[0, 6, -2, -1, 5],
	[0, 0, 0, -9, -7],
	[0, 15, 35, 0, 0],
	[0, -1, -11, -2, 1],
	[-2, -2, 3, 0, -2]
];

var badMatrix = [
	[0, 6, -2],
	[0, 0, 0],
	[0, 15, 35, 0],
];

describe('SimpleMatrix.ok()', function() {

	describe('valid matrix', function() {
		it('should return true', function() {
			expect(SimpleMatrix.ok(goodMatrix)).to.be.a("boolean").and.to.be.true;
		});
	});

	describe('invalid matrix', function() {
		it('should return false', function() {
			expect(SimpleMatrix.ok(badMatrix)).to.be.a("boolean").and.to.be.false;
		});
	});

	describe('bad matrix array', function() {
		it('should return false', function() {
			expect(SimpleMatrix.ok([0, 6, -2])).to.be.a("boolean").and.to.be.false;
		});
	});

	describe('non-array argument', function() {
		it('should throw TypeError', function() {
			expect(function() {
				SimpleMatrix.ok(5)
			}).to.throw(TypeError);
		});
	});

});
