const stacks = require("../lambda/stacks");
const machine = require("../lambda/machine");
const { createNumber } = require("./numbers.tests");

it("Should access an element by index correctly", () => {
  const l = machine.push(
    machine.push(machine.push(machine.list, createNumber(1)), createNumber(2)),
    createNumber(3)
  );

  expect(machine.toDecimals(stacks.read(l, machine.zero))).toBe(3);
  expect(machine.toDecimals(stacks.read(l, createNumber(1)))).toBe(2);
  expect(machine.toDecimals(stacks.read(l, createNumber(2)))).toBe(1);
  expect(machine.toDecimals(stacks.read(l, createNumber(3)))).toBe("MISSING");
});
