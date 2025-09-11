// Sample calculator module
console.log('DEBUG: calculator.js:2');
console.log('DEBUG: calculator.js:3');
class Calculator {
  console.log('DEBUG: calculator.js:3');
  console.log('DEBUG: calculator.js:5');
  constructor() {
    console.log('DEBUG: calculator.js:4');
    console.log('DEBUG: calculator.js:7');
    this.result = 0;
  }

  console.log('DEBUG: calculator.js:7');
  console.log('DEBUG: calculator.js:11');
  add(a, b) {
    console.log('DEBUG: calculator.js:8');
    console.log('DEBUG: calculator.js:13');
    const sum = a + b;
    console.log('DEBUG: calculator.js:9');
    console.log('DEBUG: calculator.js:15');
    this.result = sum;
    console.log('DEBUG: calculator.js:10');
    console.log('DEBUG: calculator.js:17');
    return sum;
  }

  console.log('DEBUG: calculator.js:13');
  console.log('DEBUG: calculator.js:21');
  subtract(a, b) {
    console.log('DEBUG: calculator.js:14');
    console.log('DEBUG: calculator.js:23');
    const difference = a - b;
    console.log('DEBUG: calculator.js:15');
    console.log('DEBUG: calculator.js:25');
    this.result = difference;
    console.log('DEBUG: calculator.js:16');
    console.log('DEBUG: calculator.js:27');
    return difference;
  }

  console.log('DEBUG: calculator.js:19');
  console.log('DEBUG: calculator.js:31');
  multiply(a, b) {
    console.log('DEBUG: calculator.js:20');
    console.log('DEBUG: calculator.js:33');
    const product = a * b;
    console.log('DEBUG: calculator.js:21');
    console.log('DEBUG: calculator.js:35');
    this.result = product;
    console.log('DEBUG: calculator.js:22');
    console.log('DEBUG: calculator.js:37');
    return product;
  }

  console.log('DEBUG: calculator.js:25');
  console.log('DEBUG: calculator.js:41');
  divide(a, b) {
    console.log('DEBUG: calculator.js:26');
    console.log('DEBUG: calculator.js:43');
    if (b === 0) {
      console.log('DEBUG: calculator.js:27');
      console.log('DEBUG: calculator.js:45');
      throw new Error('Division by zero');
    }
    console.log('DEBUG: calculator.js:29');
    console.log('DEBUG: calculator.js:48');
    const quotient = a / b;
    console.log('DEBUG: calculator.js:30');
    console.log('DEBUG: calculator.js:50');
    this.result = quotient;
    console.log('DEBUG: calculator.js:31');
    console.log('DEBUG: calculator.js:52');
    return quotient;
  }

  console.log('DEBUG: calculator.js:34');
  console.log('DEBUG: calculator.js:56');
  getResult() {
    console.log('DEBUG: calculator.js:35');
    console.log('DEBUG: calculator.js:58');
    return this.result;
  }

  console.log('DEBUG: calculator.js:38');
  console.log('DEBUG: calculator.js:62');
  reset() {
    console.log('DEBUG: calculator.js:39');
    console.log('DEBUG: calculator.js:64');
    this.result = 0;
  }
}

console.log('DEBUG: calculator.js:43');
console.log('DEBUG: calculator.js:69');
module.exports = Calculator;