// Utility functions for data manipulation
export const ArrayUtils = {
  // Remove duplicates from array
  unique(arr) {
    return [...new Set(arr)];
  },

  // Sort array in ascending order
  sortAsc(arr) {
    return arr.slice().sort((a, b) => a - b);
  },

  // Sort array in descending order  
  sortDesc(arr) {
    return arr.slice().sort((a, b) => b - a);
  },

  // Find maximum value
  max(arr) {
    return Math.max(...arr);
  },

  // Find minimum value
  min(arr) {
    return Math.min(...arr);
  },

  // Calculate sum
  sum(arr) {
    return arr.reduce((total, num) => total + num, 0);
  },

  // Calculate average
  average(arr) {
    return this.sum(arr) / arr.length;
  }
};

export default ArrayUtils;