const Calculator = require('./calculator');

/**
 * Main application entry point
 */
function main() {
  const calc = new Calculator();
  
  console.log('Starting calculator demo...');
  
  // Perform some calculations
  const num1 = 10;
  const num2 = 5;
  
  console.log(`Adding ${num1} + ${num2}`);
  const addResult = calc.add(num1, num2);
  console.log(`Result: ${addResult}`);
  
  console.log(`Subtracting ${num1} - ${num2}`);
  const subResult = calc.subtract(num1, num2);
  console.log(`Result: ${subResult}`);
  
  console.log(`Multiplying ${num1} * ${num2}`);
  const mulResult = calc.multiply(num1, num2);
  console.log(`Result: ${mulResult}`);
  
  try {
    console.log(`Dividing ${num1} / ${num2}`);
    const divResult = calc.divide(num1, num2);
    console.log(`Result: ${divResult}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  console.log('Calculator demo complete.');
}

// Handle async operations
async function asyncExample() {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  console.log('Starting async operation...');
  await delay(1000);
  console.log('Async operation complete.');
}

// Export functions
module.exports = { main, asyncExample };

// Run if this is the main module
if (require.main === module) {
  main();
  asyncExample();
}