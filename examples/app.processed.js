console.log('DEBUG: app.js:1');
console.log('DEBUG: app.js:2');
console.log('DEBUG: app.processed.js:3');
const Calculator = require('./calculator');

/**
 * Main application entry point
 */
console.log('DEBUG: app.js:6');
console.log('DEBUG: app.js:8');
console.log('DEBUG: app.processed.js:10');
function main() {
  console.log('DEBUG: app.js:7');
  console.log('DEBUG: app.js:10');
  console.log('DEBUG: app.processed.js:13');
  const calc = new Calculator();
  
  console.log('Starting calculator demo...');
  
  // Perform some calculations
  console.log('DEBUG: app.js:12');
  console.log('DEBUG: app.js:16');
  console.log('DEBUG: app.processed.js:20');
  const num1 = 10;
  console.log('DEBUG: app.js:13');
  console.log('DEBUG: app.js:18');
  console.log('DEBUG: app.processed.js:23');
  const num2 = 5;
  
  console.log(`Adding ${num1} + ${num2}`);
  console.log('DEBUG: app.js:16');
  console.log('DEBUG: app.js:22');
  console.log('DEBUG: app.processed.js:28');
  const addResult = calc.add(num1, num2);
  console.log(`Result: ${addResult}`);
  
  console.log(`Subtracting ${num1} - ${num2}`);
  console.log('DEBUG: app.js:20');
  console.log('DEBUG: app.js:27');
  console.log('DEBUG: app.processed.js:34');
  const subResult = calc.subtract(num1, num2);
  console.log(`Result: ${subResult}`);
  
  console.log(`Multiplying ${num1} * ${num2}`);
  console.log('DEBUG: app.js:24');
  console.log('DEBUG: app.js:32');
  console.log('DEBUG: app.processed.js:40');
  const mulResult = calc.multiply(num1, num2);
  console.log(`Result: ${mulResult}`);
  
  console.log('DEBUG: app.js:27');
  console.log('DEBUG: app.js:36');
  console.log('DEBUG: app.processed.js:45');
  try {
    console.log(`Dividing ${num1} / ${num2}`);
    console.log('DEBUG: app.js:29');
    console.log('DEBUG: app.js:39');
    console.log('DEBUG: app.processed.js:49');
    const divResult = calc.divide(num1, num2);
    console.log(`Result: ${divResult}`);
  console.log('DEBUG: app.js:31');
  console.log('DEBUG: app.js:42');
  console.log('DEBUG: app.processed.js:53');
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  console.log('Calculator demo complete.');
}

// Handle async operations
console.log('DEBUG: app.js:39');
console.log('DEBUG: app.js:51');
console.log('DEBUG: app.processed.js:63');
async function asyncExample() {
  console.log('DEBUG: app.js:40');
  console.log('DEBUG: app.js:53');
  console.log('DEBUG: app.processed.js:66');
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  console.log('Starting async operation...');
  console.log('DEBUG: app.js:43');
  console.log('DEBUG: app.js:57');
  console.log('DEBUG: app.processed.js:71');
  await delay(1000);
  console.log('Async operation complete.');
}

// Export functions
console.log('DEBUG: app.js:48');
console.log('DEBUG: app.js:63');
console.log('DEBUG: app.processed.js:78');
module.exports = { main, asyncExample };

// Run if this is the main module
console.log('DEBUG: app.js:51');
console.log('DEBUG: app.js:67');
console.log('DEBUG: app.processed.js:83');
if (require.main === module) {
  console.log('DEBUG: app.js:52');
  console.log('DEBUG: app.js:69');
  console.log('DEBUG: app.processed.js:86');
  main();
  console.log('DEBUG: app.js:53');
  console.log('DEBUG: app.js:71');
  console.log('DEBUG: app.processed.js:89');
  asyncExample();
}