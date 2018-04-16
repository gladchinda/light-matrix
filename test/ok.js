const { expect } = require('chai');
const lightmatrix = require('../lib');

const goodMatrix = [
  [0, 6, -2, -1, 5],
  [0, 0, 0, -9, -7],
  [0, 15, 35, 0, 0],
  [0, -1, -11, -2, 1],
  [-2, -2, 3, 0, -2]
];

const badMatrix = [
  [0, 6, -2],
  [0, 0, 0],
  [0, 15, 35, 0],
];

describe('lightmatrix.ok()', () => {

  describe('valid matrix', () => {
    it('should return true', () => {
      expect(lightmatrix.ok(goodMatrix)).to.be.a('boolean').and.to.be.true;
    });
  });

  describe('invalid matrix', () => {
    it('should return false', () => {
      expect(lightmatrix.ok(badMatrix)).to.be.a('boolean').and.to.be.false;
    });
  });

  describe('bad matrix array', () => {
    it('should return false', () => {
      expect(lightmatrix.ok([0, 6, -2])).to.be.a('boolean').and.to.be.false;
    });
  });

  describe('non-array argument', () => {
    it('should return false', () => {
      expect(lightmatrix.ok(5)).to.be.a('boolean').and.to.be.false;
    });
  });

});
