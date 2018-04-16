import Matrix from './matrix';

const bindMatrix = method => Matrix[method].bind(Matrix);

const lightmatrix = {
  ok: bindMatrix('ok'),
  valid: bindMatrix('ok'),
  order: bindMatrix('dimension'),
  dimension: bindMatrix('dimension'),
  unit: bindMatrix('unit'),
  identity: bindMatrix('unit'),
  equal: bindMatrix('equal'),
  same: bindMatrix('equal'),
  sum: bindMatrix('sum'),
  add: bindMatrix('sum'),
  product: bindMatrix('product'),
  multiply: bindMatrix('product'),
  transpose: bindMatrix('transpose'),
  determinant: bindMatrix('determinant'),
  minors: bindMatrix('minors'),
  cofactors: bindMatrix('cofactors'),
  adjoint: bindMatrix('adjoint'),
  inverse: bindMatrix('inverse')
};

export default lightmatrix;
