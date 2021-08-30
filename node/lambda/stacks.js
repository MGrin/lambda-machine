const machine = require("./machine");

const read = (l, idx) =>
  machine.ifElse(
    idx,
    machine.createCarOp(read, [machine.tail(l), machine.prec(idx)]),
    machine.createCarOp(machine.head, [l])
  );

module.exports = {
  read,
};
