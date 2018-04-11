var expect = require('chai').expect;
var SimpleMatrix = require('../index');

var matrix5x5 = [
	[0, 6, -2, -1, 5],
	[0, 0, 0, -9, -7],
	[0, 15, 35, 0, 0],
	[0, -1, -11, -2, 1],
	[-2, -2, 3, 0, -2]
];

var inverseMatrix5x5 = [
	[0.12298387096774194, 0.1350806451612903, -0.16048387096774194, -0.6693548387096774, -0.5],
	[-0.6491935483870968, -0.2540322580645161, 0.4241935483870968, 1.467741935483871, 0],
	[0.2782258064516129, 0.10887096774193548, -0.1532258064516129, -0.6290322580645161, 0],
	[-0.7338709677419355, -0.33064516129032256, 0.38387096774193546, 1.3548387096774193, 0],
	[0.9435483870967742, 0.28225806451612906, -0.4935483870967742, -1.7419354838709677, 0]
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

describe('SimpleMatrix.inverse()', function() {

	describe('unit matrix(2x2)', function() {
		it('should return 2x2 unit matrix', function() {
			expect(SimpleMatrix.inverse(unitMatrix2x2)).to.be.an('array').of.length(2).and.to.have.deep.ordered.members(unitMatrix2x2);
		});
	});

	describe('square matrix(5x5)', function() {
		it('should return inversed 5x5 matrix', function() {
			expect(SimpleMatrix.inverse(matrix5x5)).to.be.an('array').of.length(5).and.to.have.deep.ordered.members(inverseMatrix5x5);
		});
	});

	describe('singular matrix(2x2)', function() {
		it('should throw Error', function() {
			expect(function() {
				SimpleMatrix.inverse(singularMatrix2x2);
			}).to.throw(Error, 'Cannot compute inverse of singular matrix.');
		});
	});

	describe('non-square matrix(3x5)', function() {
		it('should throw Error', function() {
			expect(function() {
				SimpleMatrix.inverse(matrix3x5);
			}).to.throw(Error, 'Square matrix required.');
		});
	});

	describe('invalid matrix argument', function() {
		it('should throw Error', function() {
			expect(function() {
				SimpleMatrix.inverse(badMatrix);
			}).to.throw(Error, 'Invalid matrix specification.');
		});
	});

	describe('bad matrix array', function() {
		it('should throw Error', function() {
			expect(function() {
				SimpleMatrix.inverse([0, 6, -2]);
			}).to.throw(Error, 'Invalid matrix specification.');
		});
	});

	describe('non-array argument', function() {
		it('should throw TypeError', function() {
			expect(function() {
				SimpleMatrix.inverse(5);
			}).to.throw(TypeError);
		});
	});

});
