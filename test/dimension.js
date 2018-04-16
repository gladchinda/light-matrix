const { expect } = require('chai');
const lightmatrix = require('../lib');

const goodMatrix5x5 = [
  [0, 6, -2, -1, 5],
  [0, 0, 0, -9, -7],
  [0, 15, 35, 0, 0],
  [0, -1, -11, -2, 1],
  [-2, -2, 3, 0, -2]
];

const goodMatrix3x5 = [
  [0, 6, -2, -1, 5],
  [0, 0, 0, -9, -7],
  [0, 15, 35, 0, 0]
];

const badMatrix = [
  [0, 6, -2],
  [0, 0, 0],
  [0, 15, 35, 0]
];

describe('lightmatrix.dimension()', () => {

  describe('valid 5x5 matrix', () => {
    it('should return array: [5, 5]', () => {
      expect(lightmatrix.dimension(goodMatrix5x5)).to.be.an('array').of.length(2).and.to.have.ordered.members([5, 5]);
    });
  });

  describe('valid 3x5 matrix', () => {
    it('should return array: [3, 5]', () => {
      expect(lightmatrix.dimension(goodMatrix3x5)).to.be.an('array').of.length(2).and.to.have.ordered.members([3, 5]);
    });
  });

  describe('invalid matrix', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.dimension(badMatrix);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

  describe('bad matrix array', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.dimension([0, 6, -2]);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

  describe('non-array argument', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.dimension(5);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

});
