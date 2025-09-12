// Helper in deeply nested folder
console.log('DEBUG: examples/nested/deeply/nested/helper.js:2');
function formatOutput(data) {
  console.log('DEBUG: examples/nested/deeply/nested/helper.js:3');
  const formatted = JSON.stringify(data);
  console.log('DEBUG: examples/nested/deeply/nested/helper.js:4');
  return formatted.toUpperCase();
}

console.log('DEBUG: examples/nested/deeply/nested/helper.js:7');
function validateInput(input) {
  console.log('DEBUG: examples/nested/deeply/nested/helper.js:8');
  return input && typeof input === 'object';
}

console.log('DEBUG: examples/nested/deeply/nested/helper.js:11');
module.exports = { formatOutput, validateInput };