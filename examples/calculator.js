// Sample calculator module
class Calculator {
  constructor() {
    this.result = 0;
  }

  add(a, b) {
    const sum = a + b;
    this.result = sum;
    return sum;
  }

  subtract(a, b) {
    const difference = a - b;
    this.result = difference;
    return difference;
  }

  multiply(a, b) {
    const product = a * b;
    this.result = product;
    return product;
  }

  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    const quotient = a / b;
    this.result = quotient;
    return quotient;
  }

  getResult() {
    return this.result;
  }

  reset() {
    this.result = 0;
  }
}

module.exports = Calculator;