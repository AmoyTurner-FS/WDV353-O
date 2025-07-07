const math = require("./math");

describe("Math Module", () => {
  test("adds two numbers", () => {
    expect(math.add(2, 3)).toBe(5);
  });

  test("subtracts two numbers", () => {
    expect(math.subtract(5, 2)).toBe(3);
  });

  test("multiplies two numbers", () => {
    expect(math.multiply(4, 3)).toBe(12);
  });

  test("divides two numbers", () => {
    expect(math.divide(10, 2)).toBe(5);
  });

  test("throws error on divide by zero", () => {
    expect(() => math.divide(10, 0)).toThrow("Cannot divide by zero");
  });

  test("returns square root", () => {
    expect(math.sqrt(25)).toBe(5);
  });

  test("returns max of two numbers", () => {
    expect(math.max(4, 9)).toBe(9);
  });
});
