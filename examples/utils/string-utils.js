// String utilities
console.log('DEBUG: examples/utils/string-utils.js:2');
function capitalize(str) {
  console.log('DEBUG: examples/utils/string-utils.js:3');
  return str.charAt(0).toUpperCase() + str.slice(1);
}

console.log('DEBUG: examples/utils/string-utils.js:6');
function reverse(str) {
  console.log('DEBUG: examples/utils/string-utils.js:7');
  return str.split('').reverse().join('');
}

console.log('DEBUG: examples/utils/string-utils.js:10');
module.exports = { capitalize, reverse };