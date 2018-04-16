const { expect } = require('chai');
const lightmatrix = require('../lib');

const goodMatrix5x5 = [
  [0, 6, -2, -1, 5],
  [0, 0, 0, -9, -7],
  [0, 15, 35, 0, 0],
  [0, -1, -11, -2, 1],
  [-2, -2, 3, 0, -2]
];

const anotherGoodMatrix5x5 = [
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

describe('lightmatrix.equal()', () => {

  describe('same dimension matrices', () => {
    it('should return true', () => {
      expect(lightmatrix.equal(goodMatrix5x5, anotherGoodMatrix5x5)).to.be.a('boolean').and.to.be.true;
    });
  });

  describe('different dimension matrices', () => {
    it('should return false', () => {
      expect(lightmatrix.equal(goodMatrix3x5, anotherGoodMatrix5x5)).to.be.a('boolean').and.to.be.false;
    });
  });

  describe('invalid matrix argument', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.equal(badMatrix, goodMatrix3x5);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

  describe('bad matrix array', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.equal([0, 6, -2], goodMatrix3x5);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

  describe('non-array argument', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.equal(5, goodMatrix3x5);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

});
