const machine = require("./machine");

const boolInverse = (a) =>
  machine.ifElse(
    a,
    machine.createCarOp(machine.identity, [machine.zero]),
    machine.createCarOp(machine.succ, [machine.zero])
  );

const or = (a, b) =>
  machine.ifElse(
    a,
    machine.createCarOp(machine.succ, [machine.zero]),
    machine.createCarOp(machine.ifElse, [
      b,
      machine.createCarOp(machine.succ, [machine.zero]),
      machine.createCarOp(machine.identity, [machine.zero]),
    ])
  );

const and = (a, b) =>
  machine.ifElse(
    a,
    machine.createCarOp(machine.ifElse, [
      b,
      machine.createCarOp(machine.succ, [machine.zero]),
      machine.createCarOp(machine.identity, [machine.zero]),
    ]),
    machine.createCarOp(machine.identity, [machine.zero])
  );

module.exports = {
  boolInverse,
  or,
  and,
};
