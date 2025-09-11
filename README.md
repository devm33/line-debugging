# Line Debugger

A Node.js tool that adds `console.log` statements with line numbers and file names to JavaScript files for debugging purposes.

## Features

- 🎯 **Precise Line Tracking**: Adds console.log statements showing exact line numbers and file names
- 📁 **Batch Processing**: Process entire directories or individual files
- 🛡️ **Safe by Default**: Creates `.debug` versions of files, preserving originals
- 🎨 **Customizable**: Configure output format, prefixes, and behavior
- 🚫 **Smart Filtering**: Skips comments, imports, exports, and other non-executable lines
- ⚡ **Fast**: Efficiently processes large codebases

## Installation

Clone this repository and navigate to the directory:

```bash
git clone <your-repo-url>
cd line-debugging
```

## Usage

### Basic Usage

```bash
# Process a single file
node line-debugger.js examples/app.js

# Process an entire directory
node line-debugger.js examples/

# Process multiple files
node line-debugger.js file1.js file2.js src/
```

### Using npm scripts

```bash
# Process the examples directory
npm run debug-examples

# Use the debug script directly
npm run debug -- examples/app.js
```

### Command Line Options

| Option | Description | Default |
|--------|-------------|---------|
| `--help`, `-h` | Show help message | - |
| `--no-preserve` | Overwrite original files instead of creating .debug versions | false |
| `--suffix <suffix>` | Custom suffix for output files | `.debug` |
| `--include-empty` | Include console.log for empty lines | false |
| `--prefix <prefix>` | Custom prefix for log messages | `DEBUG` |

### Examples

```bash
# Overwrite original files
node line-debugger.js --no-preserve src/

# Use custom suffix
node line-debugger.js --suffix .logged examples/

# Include empty lines and custom prefix
node line-debugger.js --include-empty --prefix TRACE app.js

# Combine multiple options
node line-debugger.js --no-preserve --prefix LINE examples/
```

## How It Works

The script processes JavaScript files and adds `console.log` statements like this:

**Before:**
```javascript
function calculateSum(a, b) {
  const result = a + b;
  return result;
}
```

**After:**
```javascript
function calculateSum(a, b) {
  console.log('DEBUG: calculator.js:1');
  const result = a + b;
  console.log('DEBUG: calculator.js:2');
  return result;
  console.log('DEBUG: calculator.js:3');
}
```

## Smart Line Filtering

The tool automatically skips these types of lines to avoid cluttering:
- Single-line and multi-line comments (`//`, `/* */`)
- Import and export statements
- Existing console.log statements
- Empty lines (unless `--include-empty` is used)
- Opening/closing braces (to avoid excessive logging)
- JSDoc comments

## File Structure

```
line-debugging/
├── line-debugger.js     # Main script
├── package.json         # Project configuration
├── README.md           # This file
└── examples/           # Sample files for testing
    ├── app.js
    ├── calculator.js
    └── utils.js
```

## Example Output

When you run the script on the example files:

```bash
$ npm run debug-examples

Found 3 JavaScript files in examples/
✅ Processed: examples/app.js → examples/app.debug.js
✅ Processed: examples/calculator.js → examples/calculator.debug.js
✅ Processed: examples/utils.js → examples/utils.debug.js

📊 Processing Summary:
✅ Successfully processed: 3 files
❌ Failed to process: 0 files

📝 Output files:
   examples/app.debug.js
   examples/calculator.debug.js
   examples/utils.debug.js
```

## Use Cases

- **Debugging**: Track code execution flow line by line
- **Performance Analysis**: Identify which lines are executed most frequently
- **Learning**: Understand how code flows through complex functions
- **Testing**: Verify that specific code paths are being executed
- **Code Review**: Add temporary logging for detailed analysis

## API Usage

You can also use the script as a module in your Node.js applications:

```javascript
const LineDebugger = require('./line-debugger');

const debugger = new LineDebugger({
  preserveOriginal: true,
  outputSuffix: '.logged',
  logPrefix: 'TRACE'
});

const results = debugger.process(['src/']);
debugger.generateSummary(results);
```

## Configuration Options

When using as a module, you can pass these options:

```javascript
const options = {
  outputSuffix: '.debug',        // Suffix for output files
  preserveOriginal: true,        // Keep original files
  excludePatterns: [            // Patterns to exclude
    'node_modules',
    '.git',
    'dist',
    'build',
    '*.min.js'
  ],
  includeEmptyLines: false,     // Process empty lines
  logPrefix: 'DEBUG'            // Prefix for log messages
};
```

## License

ISC License