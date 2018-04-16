const { expect } = require('chai');
const lightmatrix = require('../lib');

const matrix5x5 = [
  [0, 6, -2, -1, 5],
  [0, 0, 0, -9, -7],
  [0, 15, 35, 0, 0],
  [0, -1, -11, -2, 1],
  [-2, -2, 3, 0, -2]
];

const doubleMatrix5x5 = [
  [0, 12, -4, -2, 10],
  [0, 0, 0, -18, -14],
  [0, 30, 70, 0, 0],
  [0, -2, -22, -4, 2],
  [-4, -4, 6, 0, -4]
];

const matrix3x5 = [
  [0, 6, -2, -1, 5],
  [0, 0, 0, -9, -7],
  [0, 15, 35, 0, 0]
];

const doubleMatrix3x5 = [
  [0, 12, -4, -2, 10],
  [0, 0, 0, -18, -14],
  [0, 30, 70, 0, 0]
];

const badMatrix = [
  [0, 6, -2],
  [0, 0, 0],
  [0, 15, 35, 0]
];

describe('lightmatrix.sum()', () => {

  describe('equal 5x5 matrix arguments', () => {
    it('should return doubled 5x5 matrix', () => {
      expect(lightmatrix.sum(matrix5x5, matrix5x5)).to.be.an('array').of.length(5).and.to.have.deep.ordered.members(doubleMatrix5x5);
    });
  });

  describe('equal 3x5 matrix arguments', () => {
    it('should return doubled 3x5 matrix', () => {
      expect(lightmatrix.sum(matrix3x5, matrix3x5)).to.be.an('array').of.length(3).and.to.have.deep.ordered.members(doubleMatrix3x5);
    });
  });

  describe('different dimension matrix arguments', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.sum(matrix5x5, matrix3x5);
      }).to.throw(Error, 'Matrices not compatible.');
    });
  });

  describe('invalid matrix argument', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.sum(badMatrix, matrix3x5);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

  describe('bad matrix array', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.sum([0, 6, -2], matrix3x5);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

  describe('non-array argument', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.sum(5, matrix3x5);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

});
