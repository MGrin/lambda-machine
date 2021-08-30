const machine = require("./machine");
const booleans = require("./booleans");
const functions = require("./functions");

const eq = (a, b = machine.missing) =>
  machine.ifElse(
    machine.isMissing(b),
    machine.createCarOp(machine.create2CarOp, [booleans.eq, a]),
    machine.createCarOp(machine.ifElse, [
      booleans.or(booleans.boolInverse(a), booleans.boolInverse(b)),
      machine.createCarOp(booleans.and, [
        booleans.boolInverse(a),
        booleans.boolInverse(b),
      ]),
      machine.createCarOp(eq, [machine.prec(a), machine.prec(b)]),
    ])
  );

const isBigger = (a, b = machine.missing) =>
  machine.ifElse(
    machine.isMissing(b),
    machine.createCarOp(machine.create2CarOp, [isBigger, a]),
    machine.createCarOp(machine.ifElse, [
      eq(a, b),
      machine.createCarOp(machine.identity, [machine.zero]),
      machine.createCarOp(machine.ifElse, [
        booleans.and(a, b),
        machine.createCarOp(isBigger, [machine.prec(a), machine.prec(b)]),
        machine.createCarOp(machine.ifElse, [
          a,
          machine.createCarOp(machine.succ, [machine.zero]),
          machine.createCarOp(machine.identity, [machine.zero]),
        ]),
      ]),
    ])
  );

const isSmaller = (a, b = machine.missing) =>
  machine.ifElse(
    eq(a, b),
    machine.createCarOp(machine.identity, [machine.zero]),
    machine.createCarOp(booleans.boolInverse, [isBigger(a, b)])
  );

const add = (a, b = machine.missing) =>
  machine.ifElse(
    machine.isMissing(b),
    machine.createCarOp(machine.create2CarOp, [add, a]),
    machine.createCarOp(machine.ifElse, [
      b,
      machine.createCarOp(add, [machine.succ(a), machine.prec(b)]),
      machine.createCarOp(machine.identity, [a]),
    ])
  );

const remove = (a, b) =>
  machine.ifElse(
    machine.isMissing(b),
    machine.createCarOp(machine.create2CarOp, [remove, a]),
    machine.createCarOp(machine.ifElse, [
      b,
      machine.createCarOp(remove, [machine.prec(a), machine.prec(b)]),
      machine.createCarOp(machine.identity, [a]),
    ])
  );

const multiply = (a, b) =>
  machine.ifElse(
    isSmaller(a, b),
    machine.createCarOp(multiply, [b, a]),
    machine.createCarOp(machine.ifElse, [
      machine.isMissing(b),
      machine.createCarOp(machine.create2CarOp, [multiply, a]),
      machine.createCarOp(functions.repeat, [a, add(b), b]),
    ])
  );

module.exports = {
  eq,
  isBigger,
  isSmaller,
  add,
  remove,
  multiply,
};
