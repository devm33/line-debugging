console.log('DEBUG: examples/app.processed.js:1');
const Calculator = require('./calculator');

/**
 * Main application entry point
 */
console.log('DEBUG: examples/app.processed.js:6');
function main() {
  console.log('DEBUG: examples/app.processed.js:7');
  const calc = new Calculator();
  
  console.log('Starting calculator demo...');
  
  // Perform some calculations
  console.log('DEBUG: examples/app.processed.js:12');
  const num1 = 10;
  console.log('DEBUG: examples/app.processed.js:13');
  const num2 = 5;
  
  console.log(`Adding ${num1} + ${num2}`);
  console.log('DEBUG: examples/app.processed.js:16');
  const addResult = calc.add(num1, num2);
  console.log(`Result: ${addResult}`);
  
  console.log(`Subtracting ${num1} - ${num2}`);
  console.log('DEBUG: examples/app.processed.js:20');
  const subResult = calc.subtract(num1, num2);
  console.log(`Result: ${subResult}`);
  
  console.log(`Multiplying ${num1} * ${num2}`);
  console.log('DEBUG: examples/app.processed.js:24');
  const mulResult = calc.multiply(num1, num2);
  console.log(`Result: ${mulResult}`);
  
  console.log('DEBUG: examples/app.processed.js:27');
  try {
    console.log(`Dividing ${num1} / ${num2}`);
    console.log('DEBUG: examples/app.processed.js:29');
    const divResult = calc.divide(num1, num2);
    console.log(`Result: ${divResult}`);
  console.log('DEBUG: examples/app.processed.js:31');
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  console.log('Calculator demo complete.');
}

// Handle async operations
console.log('DEBUG: examples/app.processed.js:39');
async function asyncExample() {
  console.log('DEBUG: examples/app.processed.js:40');
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  console.log('Starting async operation...');
  console.log('DEBUG: examples/app.processed.js:43');
  await delay(1000);
  console.log('Async operation complete.');
}

// Export functions
console.log('DEBUG: examples/app.processed.js:48');
module.exports = { main, asyncExample };

// Run if this is the main module
console.log('DEBUG: examples/app.processed.js:51');
if (require.main === module) {
  console.log('DEBUG: examples/app.processed.js:52');
  main();
  console.log('DEBUG: examples/app.processed.js:53');
  asyncExample();
}