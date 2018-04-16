const { expect } = require('chai');
const lightmatrix = require('../lib');

const matrix5x5 = [
  [0, 6, -2, -1, 5],
  [0, 0, 0, -9, -7],
  [0, 15, 35, 0, 0],
  [0, -1, -11, -2, 1],
  [-2, -2, 3, 0, -2]
];

const transposeMatrix5x5 = [
  [0, 0, 0, 0, -2],
  [6, 0, 15, -1, -2],
  [-2, 0, 35, -11, 3],
  [-1, -9, 0, -2, 0],
  [5, -7, 0, 1, -2]
];

const matrix3x5 = [
  [0, 6, -2, -1, 5],
  [0, 0, 0, -9, -7],
  [0, 15, 35, 0, 0]
];

const transposeMatrix5x3 = [
  [0, 0, 0],
  [6, 0, 15],
  [-2, 0, 35],
  [-1, -9, 0],
  [5, -7, 0]
];

const badMatrix = [
  [0, 6, -2],
  [0, 0, 0],
  [0, 15, 35, 0]
];

describe('lightmatrix.transpose()', () => {

  describe('valid 5x5 matrix', () => {
    it('should return transposed 5x5 matrix', () => {
      expect(lightmatrix.transpose(matrix5x5)).to.be.an('array').of.length(5).and.to.have.deep.ordered.members(transposeMatrix5x5);
    });
  });

  describe('valid 3x5 matrix', () => {
    it('should return transposed 5x3 matrix', () => {
      expect(lightmatrix.transpose(matrix3x5)).to.be.an('array').of.length(5).and.to.have.deep.ordered.members(transposeMatrix5x3);
    });
  });

  describe('invalid matrix argument', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.transpose(badMatrix);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

  describe('bad matrix array', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.transpose([0, 6, -2]);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

  describe('non-array argument', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.transpose(5);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

});
