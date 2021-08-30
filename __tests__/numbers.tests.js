const numbers = require("../lambda/numbers");
const machine = require("../lambda/machine");

const createNumber = (n) => {
  let v = machine.zero;
  for (let i = 0; i < n; i++) {
    v = machine.succ(v);
  }

  return v;
};

it("Should print valid numbers", () => {
  const a = createNumber(12);
  expect(machine.toDecimals(a)).toBe(12);
});

it("Should check the equality correctly", () => {
  const a = createNumber(12);
  const b = createNumber(15);
  expect(numbers.eq(a, b)).toBe(machine.zero);
  expect(numbers.eq(a, a)).not.toBe(machine.zero);
});

it("Should compare numbers correctly", () => {
  const a = createNumber(12);
  const b = createNumber(15);
  expect(numbers.isBigger(a, a)).toBe(machine.zero);
  expect(numbers.isBigger(a, b)).toBe(machine.zero);
  expect(numbers.isBigger(b, a)).not.toBe(machine.zero);

  expect(numbers.isSmaller(a, a)).toBe(machine.zero);
  expect(numbers.isSmaller(a, b)).not.toBe(machine.zero);
  expect(numbers.isSmaller(b, a)).toBe(machine.zero);
});

it("Should add numbers correctly", () => {
  const a = createNumber(12);
  const b = createNumber(15);

  const aPb = numbers.add(a, b);
  const bPa = numbers.add(b, a);
  const aPa = numbers.add(a, a);
  const aPz = numbers.add(a, machine.zero);
  const zPa = numbers.add(machine.zero, a);

  expect(machine.toDecimals(aPb)).toBe(27);
  expect(machine.toDecimals(bPa)).toBe(27);
  expect(machine.toDecimals(aPa)).toBe(24);
  expect(machine.toDecimals(aPz)).toBe(12);
  expect(machine.toDecimals(zPa)).toBe(12);
});

it("Should remove numbers correctly", () => {
  const a = createNumber(12);
  const b = createNumber(15);

  const aRb = numbers.remove(a, b);
  const bRa = numbers.remove(b, a);
  const aRa = numbers.remove(a, a);
  const aRz = numbers.remove(a, machine.zero);
  const zRa = numbers.remove(machine.zero, a);

  expect(machine.toDecimals(aRb)).toBe(0);
  expect(machine.toDecimals(bRa)).toBe(3);
  expect(machine.toDecimals(aRa)).toBe(0);
  expect(machine.toDecimals(aRz)).toBe(12);
  expect(machine.toDecimals(zRa)).toBe(0);
});

it("Should multiply numbers correctly", () => {
  const a = createNumber(12);
  const b = createNumber(15);

  const aMb = numbers.multiply(a, b);
  const bMa = numbers.multiply(b, a);
  const aMa = numbers.multiply(a, a);
  const aMz = numbers.multiply(a, machine.zero);
  const zMa = numbers.multiply(machine.zero, a);

  expect(machine.toDecimals(aMb)).toBe(180);
  expect(machine.toDecimals(bMa)).toBe(180);
  expect(machine.toDecimals(aMa)).toBe(144);
  expect(machine.toDecimals(aMz)).toBe(0);
  expect(machine.toDecimals(zMa)).toBe(0);
});

module.exports = {
  createNumber,
};
