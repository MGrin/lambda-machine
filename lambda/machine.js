const missing = () => missing;
const zero = () => zero;

const list = () => [missing, missing];
const push = (list, el) => () => [el, list];
const head = (list) => list()[0];
const tail = (list) => list()[1];

const isMissing = (n) => (n === missing ? succ(zero) : zero);
const succ = (n) => () => n;
const identity = (n) => n;
const prec = (n) => n();
const ifElse = (cond, truthy, falsy) => {
  if (cond === zero) {
    return falsy();
  }

  return truthy();
};
const createCarOp = (op, args) => () => op(...args);
const create2CarOp = (op, firstArg) => (secondArg) => op(firstArg, secondArg);
const toDecimals = (n) => {
  if (n === missing) {
    return "MISSING";
  }
  let value = 0;
  let fn = n;
  while (fn !== zero) {
    fn = fn();
    value += 1;
  }
  return value;
};
const toBoolean = (n) => {
  return n !== zero;
};
const listAsStr = (l) => {
  let val = l();
  let str = "(";
  while (val[1] !== missing) {
    str += toDecimals(val[0]) + " <- ";
    val = val[1]();
  }
  str = (str.length > 4 ? str.substring(0, str.length - 4) : str) + ")";
  return str;
};

module.exports = {
  missing,
  zero,
  isMissing,
  succ,
  identity,
  prec,
  ifElse,
  createCarOp,
  create2CarOp,
  list,
  push,
  head,
  tail,
  toDecimals,
  toBoolean,
  listAsStr,
};
