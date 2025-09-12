// Sample calculator module
console.log('DEBUG: calculator.js:2');
class Calculator {
  console.log('DEBUG: calculator.js:3');
  constructor() {
    console.log('DEBUG: calculator.js:4');
    this.result = 0;
  }

  console.log('DEBUG: calculator.js:7');
  add(a, b) {
    console.log('DEBUG: calculator.js:8');
    const sum = a + b;
    console.log('DEBUG: calculator.js:9');
    this.result = sum;
    console.log('DEBUG: calculator.js:10');
    return sum;
  }

  console.log('DEBUG: calculator.js:13');
  subtract(a, b) {
    console.log('DEBUG: calculator.js:14');
    const difference = a - b;
    console.log('DEBUG: calculator.js:15');
    this.result = difference;
    console.log('DEBUG: calculator.js:16');
    return difference;
  }

  console.log('DEBUG: calculator.js:19');
  multiply(a, b) {
    console.log('DEBUG: calculator.js:20');
    const product = a * b;
    console.log('DEBUG: calculator.js:21');
    this.result = product;
    console.log('DEBUG: calculator.js:22');
    return product;
  }

  console.log('DEBUG: calculator.js:25');
  divide(a, b) {
    console.log('DEBUG: calculator.js:26');
    if (b === 0) {
      console.log('DEBUG: calculator.js:27');
      throw new Error('Division by zero');
    }
    console.log('DEBUG: calculator.js:29');
    const quotient = a / b;
    console.log('DEBUG: calculator.js:30');
    this.result = quotient;
    console.log('DEBUG: calculator.js:31');
    return quotient;
  }

  console.log('DEBUG: calculator.js:34');
  getResult() {
    console.log('DEBUG: calculator.js:35');
    return this.result;
  }

  console.log('DEBUG: calculator.js:38');
  reset() {
    console.log('DEBUG: calculator.js:39');
    this.result = 0;
  }
}

console.log('DEBUG: calculator.js:43');
module.exports = Calculator;