console.log('DEBUG: app.js:1');
const Calculator = require('./calculator');

/**
 * Main application entry point
 */
console.log('DEBUG: app.js:6');
function main() {
  console.log('DEBUG: app.js:7');
  const calc = new Calculator();
  
  console.log('Starting calculator demo...');
  
  // Perform some calculations
  console.log('DEBUG: app.js:12');
  const num1 = 10;
  console.log('DEBUG: app.js:13');
  const num2 = 5;
  
  console.log(`Adding ${num1} + ${num2}`);
  console.log('DEBUG: app.js:16');
  const addResult = calc.add(num1, num2);
  console.log(`Result: ${addResult}`);
  
  console.log(`Subtracting ${num1} - ${num2}`);
  console.log('DEBUG: app.js:20');
  const subResult = calc.subtract(num1, num2);
  console.log(`Result: ${subResult}`);
  
  console.log(`Multiplying ${num1} * ${num2}`);
  console.log('DEBUG: app.js:24');
  const mulResult = calc.multiply(num1, num2);
  console.log(`Result: ${mulResult}`);
  
  console.log('DEBUG: app.js:27');
  try {
    console.log(`Dividing ${num1} / ${num2}`);
    console.log('DEBUG: app.js:29');
    const divResult = calc.divide(num1, num2);
    console.log(`Result: ${divResult}`);
  console.log('DEBUG: app.js:31');
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  console.log('Calculator demo complete.');
}

// Handle async operations
console.log('DEBUG: app.js:39');
async function asyncExample() {
  console.log('DEBUG: app.js:40');
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  console.log('Starting async operation...');
  console.log('DEBUG: app.js:43');
  await delay(1000);
  console.log('Async operation complete.');
}

// Export functions
console.log('DEBUG: app.js:48');
module.exports = { main, asyncExample };

// Run if this is the main module
console.log('DEBUG: app.js:51');
if (require.main === module) {
  console.log('DEBUG: app.js:52');
  main();
  console.log('DEBUG: app.js:53');
  asyncExample();
}