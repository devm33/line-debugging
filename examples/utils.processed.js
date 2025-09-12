// Utility functions for data manipulation
export const ArrayUtils = {
  // Remove duplicates from array
  console.log('DEBUG: examples/utils.processed.js:4');
  unique(arr) {
    console.log('DEBUG: examples/utils.processed.js:5');
    return [...new Set(arr)];
  console.log('DEBUG: examples/utils.processed.js:6');
  },

  // Sort array in ascending order
  console.log('DEBUG: examples/utils.processed.js:9');
  sortAsc(arr) {
    console.log('DEBUG: examples/utils.processed.js:10');
    return arr.slice().sort((a, b) => a - b);
  console.log('DEBUG: examples/utils.processed.js:11');
  },

  // Sort array in descending order  
  console.log('DEBUG: examples/utils.processed.js:14');
  sortDesc(arr) {
    console.log('DEBUG: examples/utils.processed.js:15');
    return arr.slice().sort((a, b) => b - a);
  console.log('DEBUG: examples/utils.processed.js:16');
  },

  // Find maximum value
  console.log('DEBUG: examples/utils.processed.js:19');
  max(arr) {
    console.log('DEBUG: examples/utils.processed.js:20');
    return Math.max(...arr);
  console.log('DEBUG: examples/utils.processed.js:21');
  },

  // Find minimum value
  console.log('DEBUG: examples/utils.processed.js:24');
  min(arr) {
    console.log('DEBUG: examples/utils.processed.js:25');
    return Math.min(...arr);
  console.log('DEBUG: examples/utils.processed.js:26');
  },

  // Calculate sum
  console.log('DEBUG: examples/utils.processed.js:29');
  sum(arr) {
    console.log('DEBUG: examples/utils.processed.js:30');
    return arr.reduce((total, num) => total + num, 0);
  console.log('DEBUG: examples/utils.processed.js:31');
  },

  // Calculate average
  console.log('DEBUG: examples/utils.processed.js:34');
  average(arr) {
    console.log('DEBUG: examples/utils.processed.js:35');
    return this.sum(arr) / arr.length;
  }
console.log('DEBUG: examples/utils.processed.js:37');
};

export default ArrayUtils;