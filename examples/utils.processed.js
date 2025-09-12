// Utility functions for data manipulation
export const ArrayUtils = {
  // Remove duplicates from array
  console.log('DEBUG: utils.js:4');
  console.log('DEBUG: utils.js:5');
  console.log('DEBUG: utils.processed.js:6');
  unique(arr) {
    console.log('DEBUG: utils.js:5');
    console.log('DEBUG: utils.js:7');
    console.log('DEBUG: utils.processed.js:9');
    return [...new Set(arr)];
  console.log('DEBUG: utils.js:6');
  console.log('DEBUG: utils.js:9');
  console.log('DEBUG: utils.processed.js:12');
  },

  // Sort array in ascending order
  console.log('DEBUG: utils.js:9');
  console.log('DEBUG: utils.js:13');
  console.log('DEBUG: utils.processed.js:17');
  sortAsc(arr) {
    console.log('DEBUG: utils.js:10');
    console.log('DEBUG: utils.js:15');
    console.log('DEBUG: utils.processed.js:20');
    return arr.slice().sort((a, b) => a - b);
  console.log('DEBUG: utils.js:11');
  console.log('DEBUG: utils.js:17');
  console.log('DEBUG: utils.processed.js:23');
  },

  // Sort array in descending order  
  console.log('DEBUG: utils.js:14');
  console.log('DEBUG: utils.js:21');
  console.log('DEBUG: utils.processed.js:28');
  sortDesc(arr) {
    console.log('DEBUG: utils.js:15');
    console.log('DEBUG: utils.js:23');
    console.log('DEBUG: utils.processed.js:31');
    return arr.slice().sort((a, b) => b - a);
  console.log('DEBUG: utils.js:16');
  console.log('DEBUG: utils.js:25');
  console.log('DEBUG: utils.processed.js:34');
  },

  // Find maximum value
  console.log('DEBUG: utils.js:19');
  console.log('DEBUG: utils.js:29');
  console.log('DEBUG: utils.processed.js:39');
  max(arr) {
    console.log('DEBUG: utils.js:20');
    console.log('DEBUG: utils.js:31');
    console.log('DEBUG: utils.processed.js:42');
    return Math.max(...arr);
  console.log('DEBUG: utils.js:21');
  console.log('DEBUG: utils.js:33');
  console.log('DEBUG: utils.processed.js:45');
  },

  // Find minimum value
  console.log('DEBUG: utils.js:24');
  console.log('DEBUG: utils.js:37');
  console.log('DEBUG: utils.processed.js:50');
  min(arr) {
    console.log('DEBUG: utils.js:25');
    console.log('DEBUG: utils.js:39');
    console.log('DEBUG: utils.processed.js:53');
    return Math.min(...arr);
  console.log('DEBUG: utils.js:26');
  console.log('DEBUG: utils.js:41');
  console.log('DEBUG: utils.processed.js:56');
  },

  // Calculate sum
  console.log('DEBUG: utils.js:29');
  console.log('DEBUG: utils.js:45');
  console.log('DEBUG: utils.processed.js:61');
  sum(arr) {
    console.log('DEBUG: utils.js:30');
    console.log('DEBUG: utils.js:47');
    console.log('DEBUG: utils.processed.js:64');
    return arr.reduce((total, num) => total + num, 0);
  console.log('DEBUG: utils.js:31');
  console.log('DEBUG: utils.js:49');
  console.log('DEBUG: utils.processed.js:67');
  },

  // Calculate average
  console.log('DEBUG: utils.js:34');
  console.log('DEBUG: utils.js:53');
  console.log('DEBUG: utils.processed.js:72');
  average(arr) {
    console.log('DEBUG: utils.js:35');
    console.log('DEBUG: utils.js:55');
    console.log('DEBUG: utils.processed.js:75');
    return this.sum(arr) / arr.length;
  }
console.log('DEBUG: utils.js:37');
console.log('DEBUG: utils.js:58');
console.log('DEBUG: utils.processed.js:79');
};

export default ArrayUtils;