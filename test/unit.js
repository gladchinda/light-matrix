var expect = require('chai').expect;
var SimpleMatrix = require('../index');

var unitMatrix2x2 = [
	[1, 0],
	[0, 1]
];

var unitMatrix5x5 = [
	[1, 0, 0, 0, 0],
	[0, 1, 0, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 0, 1, 0],
	[0, 0, 0, 0, 1]
];

describe('SimpleMatrix.unit()', function() {

	describe('with dimension (0)', function() {
		it('should return 2x2 unit matrix', function() {
			expect(SimpleMatrix.unit(2)).to.be.an("array").of.length(2).and.to.have.deep.ordered.members(unitMatrix2x2);
		});
	});

	describe('with dimension (1)', function() {
		it('should return 1x1 unit matrix', function() {
			expect(SimpleMatrix.unit(1)).to.be.an("array").of.length(1).and.to.have.deep.ordered.members([[1]]);
		});
	});

	describe('with dimension (5)', function() {
		it('should return 5x5 unit matrix', function() {
			expect(SimpleMatrix.unit('5')).to.be.an("array").of.length(5).and.to.have.deep.ordered.members(unitMatrix5x5);
		});
	});

	describe('non-numeric argument', function() {
		it('should return 2x2 unit matrix', function() {
			expect(SimpleMatrix.unit([])).to.be.an("array").of.length(2).and.to.have.deep.ordered.members(unitMatrix2x2);
		});
	});

});
