const { expect } = require('chai');
const lightmatrix = require('../lib');

const matrix5x5 = [
  [0, 6, -2, -1, 5],
  [0, 0, 0, -9, -7],
  [0, 15, 35, 0, 0],
  [0, -1, -11, -2, 1],
  [-2, -2, 3, 0, -2]
];

const minorsMatrix5x5 = [
  [305, 1610, 690, 1820, 2340],
  [-335, -630, -270, -820, -700],
  [-398, -1052, -380, -952, -1224],
  [1660, 3640, 1560, 3360, 4320],
  [-1240, 0, 0, 0, 0]
];

const unitMatrix2x2 = [
  [1, 0],
  [0, 1]
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

describe('lightmatrix.minors()', () => {

  describe('unit matrix(2x2)', () => {
    it('should return 2x2 unit matrix', () => {
      expect(lightmatrix.minors(unitMatrix2x2)).to.be.an('array').of.length(2).and.to.have.deep.ordered.members(unitMatrix2x2);
    });
  });

  describe('square matrix(5x5)', () => {
    it('should return 5x5 minors matrix', () => {
      expect(lightmatrix.minors(matrix5x5)).to.be.an('array').of.length(5).and.to.have.deep.ordered.members(minorsMatrix5x5);
    });
  });

  describe('non-square matrix(3x5)', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.minors(matrix3x5);
      }).to.throw(Error, 'Square matrix required.');
    });
  });

  describe('invalid matrix argument', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.minors(badMatrix);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

  describe('bad matrix array', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.minors([0, 6, -2]);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

  describe('non-array argument', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.minors(5);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

});
