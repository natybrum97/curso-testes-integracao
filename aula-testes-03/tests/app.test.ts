import calculator from "../src/calculator";

describe("Teste das funções da calculadora", () => {
  it("Deve somar corretamente", () => {
    expect(calculator.sum(1, 2)).toBe(3);
  });

  it("Deve subtrair corretamente", () => {
    expect(calculator.sub(1, 2)).toBe(-1);
  });

  it("Deve multiplicar corretamente", () => {
    expect(calculator.mul(1, 2)).toBe(2);
  });

  it("Deve dividir corretamente", () => {
    expect(calculator.div(1, 2)).toBe(0.5);
  });
});
