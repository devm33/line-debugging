// Simple service in nested folder
console.log('DEBUG: examples/nested/service.js:2');
class DataService {
  console.log('DEBUG: examples/nested/service.js:3');
  getData() {
    console.log('DEBUG: examples/nested/service.js:4');
    const data = this.fetchFromAPI();
    console.log('DEBUG: examples/nested/service.js:5');
    return this.processData(data);
  }

  console.log('DEBUG: examples/nested/service.js:8');
  fetchFromAPI() {
    console.log('DEBUG: examples/nested/service.js:9');
    return { id: 1, name: 'test' };
  }

  console.log('DEBUG: examples/nested/service.js:12');
  processData(data) {
    console.log('DEBUG: examples/nested/service.js:13');
    return { ...data, processed: true };
  }
}

console.log('DEBUG: examples/nested/service.js:17');
module.exports = DataService;