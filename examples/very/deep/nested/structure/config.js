// Very deep nested file
console.log('DEBUG: examples/very/deep/nested/structure/config.js:2');
const config = {
  console.log('DEBUG: examples/very/deep/nested/structure/config.js:3');
  debug: true,
  console.log('DEBUG: examples/very/deep/nested/structure/config.js:4');
  level: 'verbose'
console.log('DEBUG: examples/very/deep/nested/structure/config.js:5');
};

console.log('DEBUG: examples/very/deep/nested/structure/config.js:7');
function initializeDeepModule() {
  console.log('DEBUG: examples/very/deep/nested/structure/config.js:8');
  return config;
}