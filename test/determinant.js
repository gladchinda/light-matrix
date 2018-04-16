const { expect } = require('chai');
const lightmatrix = require('../lib');

const matrix5x5 = [
  [0, 6, -2, -1, 5],
  [0, 0, 0, -9, -7],
  [0, 15, 35, 0, 0],
  [0, -1, -11, -2, 1],
  [-2, -2, 3, 0, -2]
];

const unitMatrix2x2 = [
  [1, 0],
  [0, 1]
];

const singularMatrix2x2 = [
  [3, 2],
  [6, 4]
];

const matrix3x5 = [
  [0, 6, -2, -1, 5],
  [0, 0, 0, -9, -7],
  [0, 15, 35, 0, 0]
];

const badMatrix = [
  [0, 6, -2],
  [0, 0, 0],
  [0, 15, 35, 0]
];

describe('lightmatrix.determinant()', () => {

  describe('square matrix(1x1)', () => {
    it('should return determinant (n[1][1] => number)', () => {
      expect(lightmatrix.determinant([[5]])).to.be.a('number').and.to.equal(5);
    });
  });

  describe('unit matrix(2x2)', () => {
    it('should return determinant (1)', () => {
      expect(lightmatrix.determinant(unitMatrix2x2)).to.be.a('number').and.to.equal(1);
    });
  });

  describe('singular matrix(2x2)', () => {
    it('should return determinant (0)', () => {
      expect(lightmatrix.determinant(singularMatrix2x2)).to.be.a('number').and.to.equal(0);
    });
  });

  describe('square matrix(5x5)', () => {
    it('should return determinant (number)', () => {
      expect(lightmatrix.determinant(matrix5x5)).to.be.a('number').and.to.equal(2480);
    });
  });

  describe('non-square matrix(3x5)', () => {
    it('should return determinantd 5x3 matrix', () => {
      expect(() => {
        lightmatrix.determinant(matrix3x5);
      }).to.throw(Error, 'Square matrix required.');
    });
  });

  describe('invalid matrix argument', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.determinant(badMatrix);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

  describe('bad matrix array', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.determinant([0, 6, -2]);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

  describe('non-array argument', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.determinant(5);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

});
