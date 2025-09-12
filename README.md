# Line Debugger

A Node.js tool that adds `console.log` statements with line numbers and file names to JavaScript files for debugging purposes.

## Features

- 🎯 **Precise Line Tracking**: Adds console.log statements showing exact line numbers and file names
- 📁 **Batch Processing**: Process entire directories or individual files
- 🛡️ **Safe by Default**: Can create versioned copies of files, preserving originals
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
| `--no-preserve` | Overwrite original files instead of creating versioned copies | false |
| `--suffix <suffix>` | Custom suffix for output files | none |
| `--include-empty` | Include console.log for empty lines | false |
| `--prefix <prefix>` | Custom prefix for log messages | `DEBUG` |
| `--force` | Force reprocessing of files that already contain debug statements | false |

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

# Force reprocess files that already contain debug statements
node line-debugger.js --force already-processed.js

# Force reprocess entire directory (cleans and re-adds debug statements)
node line-debugger.js --force --no-preserve src/
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

## Recursive Processing Prevention

The tool intelligently prevents recursive processing by:
- **Detecting existing debug statements**: Automatically skips files that already contain debug statements with the same prefix
- **Providing clear feedback**: Shows which files are skipped and why
- **Force reprocessing option**: Use `--force` to clean existing debug statements and reprocess files
- **Smart cleanup**: When using `--force`, removes existing debug statements before adding new ones

```bash
# First run - processes the file
node line-debugger.js app.js

# Second run - automatically skips (prevents duplicates)
node line-debugger.js app.js
# Output: ⚠️ Skipping app.js - already contains debug statements (use --force to reprocess)

# Force reprocessing - cleans old statements and adds fresh ones
node line-debugger.js --force app.js
# Output: 🔄 Removing existing debug statements from app.js
```

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
✅ Processed: examples/app.js → examples/app_processed.js
✅ Processed: examples/calculator.js → examples/calculator_processed.js
✅ Processed: examples/utils.js → examples/utils_processed.js

📊 Processing Summary:
✅ Successfully processed: 3 files
❌ Failed to process: 0 files

📝 Output files:
   examples/app_processed.js
   examples/calculator_processed.js
   examples/utils_processed.js
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
  outputSuffix: '',        // Suffix for output files
  preserveOriginal: true,        // Keep original files
  excludePatterns: [            // Patterns to exclude
    'node_modules',
    '.git',
    'dist',
    'build',
    '*.min.js'
  ],
  includeEmptyLines: false,     // Process empty lines
  logPrefix: 'DEBUG',           // Prefix for log messages
  forceReprocess: false         // Force reprocessing of files with existing debug statements
};
```

## License

ISC License