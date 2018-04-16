const { expect } = require('chai');
const lightmatrix = require('../lib');

const unitMatrix2x2 = [
  [1, 0],
  [0, 1]
];

const unitMatrix5x5 = [
  [1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1]
];

describe('lightmatrix.unit()', () => {

  describe('with dimension (0)', () => {
    it('should return 2x2 unit matrix', () => {
      expect(lightmatrix.unit(0)).to.be.an('array').of.length(2).and.to.have.deep.ordered.members(unitMatrix2x2);
    });
  });

  describe('with dimension (1)', () => {
    it('should return 1x1 unit matrix', () => {
      expect(lightmatrix.unit(1)).to.be.an('array').of.length(1).and.to.have.deep.ordered.members([[1]]);
    });
  });

  describe('with dimension (5)', () => {
    it('should return 5x5 unit matrix', () => {
      expect(lightmatrix.unit('5')).to.be.an('array').of.length(5).and.to.have.deep.ordered.members(unitMatrix5x5);
    });
  });

  describe('non-numeric argument', () => {
    it('should return 2x2 unit matrix', () => {
      expect(lightmatrix.unit([])).to.be.an('array').of.length(2).and.to.have.deep.ordered.members(unitMatrix2x2);
    });
  });

});
