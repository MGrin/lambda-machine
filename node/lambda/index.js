const stacks = require("../lambda/stacks");
const machine = require("../lambda/machine");

let l = machine.list;
console.log(machine.listAsStr(l));
l = machine.push(l, machine.zero);
console.log(machine.listAsStr(l));
l = machine.push(l, machine.succ(machine.zero));
console.log(machine.listAsStr(l));
l = machine.push(l, machine.succ(machine.succ(machine.zero)));
console.log(machine.listAsStr(l));

console.log(machine.toDecimals(machine.head(l)));
console.log(machine.listAsStr(machine.tail(l)));

console.log(
  machine.toDecimals(stacks.read(l, machine.succ(machine.succ(machine.zero))))
);
