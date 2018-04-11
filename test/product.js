var expect = require('chai').expect;
var SimpleMatrix = require('../index');

var matrix5x5 = [
	[0, 6, -2, -1, 5],
	[0, 0, 0, -9, -7],
	[0, 15, 35, 0, 0],
	[0, -1, -11, -2, 1],
	[-2, -2, 3, 0, -2]
];

var squareMatrix5x5 = [
	[-10, -39, -44, -52, -53],
	[14, 23, 78, 18, 5],
	[0, 525, 1225, -135, -105],
	[-2, -165, -360, 13, 3],
	[4, 37, 103, 20, 8]
];

var matrix3x5 = [
	[0, 6, -2, -1, 5],
	[0, 0, 0, -9, -7],
	[0, 15, 35, 0, 0]
];

var _10Matrix3x5 = [
	[0, -60, 20, 10, -50],
	[0, 0, 0, 90, 70],
	[0, -150, -350, 0, 0]
];

var matrix3x5_matrix5x5 = [
	[100, 390, 440, 520, 530],
	[-140, -230, -780, -180, -50],
	[0, -5250, -12250, 1350, 1050]
];

var badMatrix = [
	[0, 6, -2],
	[0, 0, 0],
	[0, 15, 35, 0]
];

describe('SimpleMatrix.product()', function() {

	describe('scalar numeric arguments', function() {
		it('should return arithmetic product (number)', function() {
			expect(SimpleMatrix.product(4, -10)).to.be.a('number').and.to.equal(-40);
		});
	});

	describe('matrix(3x5) and scalar(-10) arguments', function() {
		it('should return 3x5 matrix: -10X given matrix', function() {
			expect(SimpleMatrix.product(matrix3x5, -10)).to.be.an('array').of.length(3).and.to.have.deep.ordered.members(_10Matrix3x5);
		});
	});

	describe('equal 5x5 matrix arguments', function() {
		it('should return squared 5x5 matrix', function() {
			expect(SimpleMatrix.product(matrix5x5, matrix5x5)).to.be.an('array').of.length(5).and.to.have.deep.ordered.members(squareMatrix5x5);
		});
	});

	describe('matrix arguments(A,B) with cols(A) == rows(B)', function() {
		it('should return matrix with dimension: [rows(A), cols(B)]', function() {
			expect(SimpleMatrix.product(matrix3x5, matrix5x5)).to.be.an('array').of.length(3).and.to.have.deep.ordered.members(matrix3x5_matrix5x5);
		});
	});

	describe('matrix arguments(A,B) with cols(A) != rows(B)', function() {
		it('should throw Error', function() {
			expect(function() {
				SimpleMatrix.product(matrix5x5, matrix3x5);
			}).to.throw(Error, 'Matrices not compatible.');
		});
	});

	describe('invalid matrix argument', function() {
		it('should throw Error', function() {
			expect(function() {
				SimpleMatrix.product(badMatrix, matrix3x5);
			}).to.throw(Error, 'Invalid arguments supplied.');
		});
	});

	describe('bad matrix array', function() {
		it('should throw Error', function() {
			expect(function() {
				SimpleMatrix.product([0, 6, -2], matrix3x5);
			}).to.throw(Error, 'Invalid arguments supplied.');
		});
	});

	describe('non-array and non-number arguments', function() {
		it('should throw TypeError', function() {
			expect(function() {
				SimpleMatrix.product('string', matrix3x5);
			}).to.throw(TypeError);
		});
	});

});
