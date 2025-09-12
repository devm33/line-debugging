// Sample calculator module
console.log('DEBUG: calculator.js:2');
console.log('DEBUG: calculator.js:3');
console.log('DEBUG: calculator.processed.js:4');
class Calculator {
  console.log('DEBUG: calculator.js:3');
  console.log('DEBUG: calculator.js:5');
  console.log('DEBUG: calculator.processed.js:7');
  constructor() {
    console.log('DEBUG: calculator.js:4');
    console.log('DEBUG: calculator.js:7');
    console.log('DEBUG: calculator.processed.js:10');
    this.result = 0;
  }

  console.log('DEBUG: calculator.js:7');
  console.log('DEBUG: calculator.js:11');
  console.log('DEBUG: calculator.processed.js:15');
  add(a, b) {
    console.log('DEBUG: calculator.js:8');
    console.log('DEBUG: calculator.js:13');
    console.log('DEBUG: calculator.processed.js:18');
    const sum = a + b;
    console.log('DEBUG: calculator.js:9');
    console.log('DEBUG: calculator.js:15');
    console.log('DEBUG: calculator.processed.js:21');
    this.result = sum;
    console.log('DEBUG: calculator.js:10');
    console.log('DEBUG: calculator.js:17');
    console.log('DEBUG: calculator.processed.js:24');
    return sum;
  }

  console.log('DEBUG: calculator.js:13');
  console.log('DEBUG: calculator.js:21');
  console.log('DEBUG: calculator.processed.js:29');
  subtract(a, b) {
    console.log('DEBUG: calculator.js:14');
    console.log('DEBUG: calculator.js:23');
    console.log('DEBUG: calculator.processed.js:32');
    const difference = a - b;
    console.log('DEBUG: calculator.js:15');
    console.log('DEBUG: calculator.js:25');
    console.log('DEBUG: calculator.processed.js:35');
    this.result = difference;
    console.log('DEBUG: calculator.js:16');
    console.log('DEBUG: calculator.js:27');
    console.log('DEBUG: calculator.processed.js:38');
    return difference;
  }

  console.log('DEBUG: calculator.js:19');
  console.log('DEBUG: calculator.js:31');
  console.log('DEBUG: calculator.processed.js:43');
  multiply(a, b) {
    console.log('DEBUG: calculator.js:20');
    console.log('DEBUG: calculator.js:33');
    console.log('DEBUG: calculator.processed.js:46');
    const product = a * b;
    console.log('DEBUG: calculator.js:21');
    console.log('DEBUG: calculator.js:35');
    console.log('DEBUG: calculator.processed.js:49');
    this.result = product;
    console.log('DEBUG: calculator.js:22');
    console.log('DEBUG: calculator.js:37');
    console.log('DEBUG: calculator.processed.js:52');
    return product;
  }

  console.log('DEBUG: calculator.js:25');
  console.log('DEBUG: calculator.js:41');
  console.log('DEBUG: calculator.processed.js:57');
  divide(a, b) {
    console.log('DEBUG: calculator.js:26');
    console.log('DEBUG: calculator.js:43');
    console.log('DEBUG: calculator.processed.js:60');
    if (b === 0) {
      console.log('DEBUG: calculator.js:27');
      console.log('DEBUG: calculator.js:45');
      console.log('DEBUG: calculator.processed.js:63');
      throw new Error('Division by zero');
    }
    console.log('DEBUG: calculator.js:29');
    console.log('DEBUG: calculator.js:48');
    console.log('DEBUG: calculator.processed.js:67');
    const quotient = a / b;
    console.log('DEBUG: calculator.js:30');
    console.log('DEBUG: calculator.js:50');
    console.log('DEBUG: calculator.processed.js:70');
    this.result = quotient;
    console.log('DEBUG: calculator.js:31');
    console.log('DEBUG: calculator.js:52');
    console.log('DEBUG: calculator.processed.js:73');
    return quotient;
  }

  console.log('DEBUG: calculator.js:34');
  console.log('DEBUG: calculator.js:56');
  console.log('DEBUG: calculator.processed.js:78');
  getResult() {
    console.log('DEBUG: calculator.js:35');
    console.log('DEBUG: calculator.js:58');
    console.log('DEBUG: calculator.processed.js:81');
    return this.result;
  }

  console.log('DEBUG: calculator.js:38');
  console.log('DEBUG: calculator.js:62');
  console.log('DEBUG: calculator.processed.js:86');
  reset() {
    console.log('DEBUG: calculator.js:39');
    console.log('DEBUG: calculator.js:64');
    console.log('DEBUG: calculator.processed.js:89');
    this.result = 0;
  }
}

console.log('DEBUG: calculator.js:43');
console.log('DEBUG: calculator.js:69');
console.log('DEBUG: calculator.processed.js:95');
module.exports = Calculator;