const machine = require("./machine");

const repeat = (n, op, arg) =>
  machine.ifElse(
    machine.prec(n),
    machine.createCarOp(repeat, [machine.prec(n), op, op(arg)]),
    machine.createCarOp(machine.identity, [arg])
  );

module.exports = {
  repeat,
};
