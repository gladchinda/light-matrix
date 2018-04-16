const { expect } = require('chai');
const lightmatrix = require('../lib');

const matrix5x5 = [
  [0, 6, -2, -1, 5],
  [0, 0, 0, -9, -7],
  [0, 15, 35, 0, 0],
  [0, -1, -11, -2, 1],
  [-2, -2, 3, 0, -2]
];

const adjointMatrix5x5 = [
  [305, 335, -398, -1660, -1240],
  [-1610, -630, 1052, 3640, 0],
  [690, 270, -380, -1560, 0],
  [-1820, -820, 952, 3360, 0],
  [2340, 700, -1224, -4320, 0]
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

describe('lightmatrix.adjoint()', () => {

  describe('unit matrix(2x2)', () => {
    it('should return 2x2 unit matrix', () => {
      expect(lightmatrix.adjoint(unitMatrix2x2)).to.be.an('array').of.length(2).and.to.have.deep.ordered.members(unitMatrix2x2);
    });
  });

  describe('square matrix(5x5)', () => {
    it('should return 5x5 adjoint matrix', () => {
      expect(lightmatrix.adjoint(matrix5x5)).to.be.an('array').of.length(5).and.to.have.deep.ordered.members(adjointMatrix5x5);
    });
  });

  describe('non-square matrix(3x5)', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.adjoint(matrix3x5);
      }).to.throw(Error, 'Square matrix required.');
    });
  });

  describe('invalid matrix argument', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.adjoint(badMatrix);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

  describe('bad matrix array', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.adjoint([0, 6, -2]);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

  describe('non-array argument', () => {
    it('should throw Error', () => {
      expect(() => {
        lightmatrix.adjoint(5);
      }).to.throw(Error, 'Invalid matrix specification.');
    });
  });

});
