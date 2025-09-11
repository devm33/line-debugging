// Utility functions for data manipulation
export const ArrayUtils = {
  // Remove duplicates from array
  console.log('DEBUG: utils.js:4');
  console.log('DEBUG: utils.debug.js:5');
  unique(arr) {
    console.log('DEBUG: utils.js:5');
    console.log('DEBUG: utils.debug.js:7');
    return [...new Set(arr)];
  console.log('DEBUG: utils.js:6');
  console.log('DEBUG: utils.debug.js:9');
  },

  // Sort array in ascending order
  console.log('DEBUG: utils.js:9');
  console.log('DEBUG: utils.debug.js:13');
  sortAsc(arr) {
    console.log('DEBUG: utils.js:10');
    console.log('DEBUG: utils.debug.js:15');
    return arr.slice().sort((a, b) => a - b);
  console.log('DEBUG: utils.js:11');
  console.log('DEBUG: utils.debug.js:17');
  },

  // Sort array in descending order  
  console.log('DEBUG: utils.js:14');
  console.log('DEBUG: utils.debug.js:21');
  sortDesc(arr) {
    console.log('DEBUG: utils.js:15');
    console.log('DEBUG: utils.debug.js:23');
    return arr.slice().sort((a, b) => b - a);
  console.log('DEBUG: utils.js:16');
  console.log('DEBUG: utils.debug.js:25');
  },

  // Find maximum value
  console.log('DEBUG: utils.js:19');
  console.log('DEBUG: utils.debug.js:29');
  max(arr) {
    console.log('DEBUG: utils.js:20');
    console.log('DEBUG: utils.debug.js:31');
    return Math.max(...arr);
  console.log('DEBUG: utils.js:21');
  console.log('DEBUG: utils.debug.js:33');
  },

  // Find minimum value
  console.log('DEBUG: utils.js:24');
  console.log('DEBUG: utils.debug.js:37');
  min(arr) {
    console.log('DEBUG: utils.js:25');
    console.log('DEBUG: utils.debug.js:39');
    return Math.min(...arr);
  console.log('DEBUG: utils.js:26');
  console.log('DEBUG: utils.debug.js:41');
  },

  // Calculate sum
  console.log('DEBUG: utils.js:29');
  console.log('DEBUG: utils.debug.js:45');
  sum(arr) {
    console.log('DEBUG: utils.js:30');
    console.log('DEBUG: utils.debug.js:47');
    return arr.reduce((total, num) => total + num, 0);
  console.log('DEBUG: utils.js:31');
  console.log('DEBUG: utils.debug.js:49');
  },

  // Calculate average
  console.log('DEBUG: utils.js:34');
  console.log('DEBUG: utils.debug.js:53');
  average(arr) {
    console.log('DEBUG: utils.js:35');
    console.log('DEBUG: utils.debug.js:55');
    return this.sum(arr) / arr.length;
  }
console.log('DEBUG: utils.js:37');
console.log('DEBUG: utils.debug.js:58');
};

export default ArrayUtils;