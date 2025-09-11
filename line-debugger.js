#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class LineDebugger {
  constructor(options = {}) {
    this.options = {
      outputSuffix: options.outputSuffix || '.debug',
      preserveOriginal: options.preserveOriginal !== false,
      excludePatterns: options.excludePatterns || [
        'node_modules',
        '.git',
        'dist',
        'build',
        '*.min.js'
      ],
      includeEmptyLines: options.includeEmptyLines || false,
      logPrefix: options.logPrefix || 'DEBUG'
    };
  }

  /**
   * Check if a file should be excluded based on patterns
   */
  shouldExclude(filePath) {
    return this.options.excludePatterns.some(pattern => {
      if (pattern.includes('*')) {
        const regex = new RegExp(pattern.replace(/\*/g, '.*'));
        return regex.test(filePath);
      }
      return filePath.includes(pattern);
    });
  }

  /**
   * Find all JavaScript files in a directory recursively
   */
  findJSFiles(dirPath) {
    const jsFiles = [];

    const traverse = (currentPath) => {
      if (this.shouldExclude(currentPath)) {
        return;
      }

      const stat = fs.statSync(currentPath);

      if (stat.isDirectory()) {
        const entries = fs.readdirSync(currentPath);
        entries.forEach(entry => {
          traverse(path.join(currentPath, entry));
        });
      } else if (stat.isFile() && this.isJavaScriptFile(currentPath)) {
        jsFiles.push(currentPath);
      }
    };

    traverse(dirPath);
    return jsFiles;
  }

  /**
   * Check if file is a JavaScript file
   */
  isJavaScriptFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return ['.js', '.mjs', '.jsx'].includes(ext);
  }

  /**
   * Add console.log statements to a single line
   */
  processLine(line, lineNumber, fileName, isEmptyLine = false) {
    if (isEmptyLine && !this.options.includeEmptyLines) {
      return line;
    }

    // Skip lines that already have our debug statements
    if (line.includes(`${this.options.logPrefix}:`)) {
      return line;
    }

    // Handle different types of lines
    const trimmedLine = line.trim();
    
    // Skip certain types of lines
    if (this.shouldSkipLine(trimmedLine)) {
      return line;
    }

    const debugStatement = `console.log('${this.options.logPrefix}: ${fileName}:${lineNumber}');`;
    
    // Preserve indentation
    const leadingWhitespace = line.match(/^\s*/)[0];
    
    if (isEmptyLine || trimmedLine === '') {
      return this.options.includeEmptyLines ? 
        `${leadingWhitespace}${debugStatement}\n${line}` : 
        line;
    }

    return `${leadingWhitespace}${debugStatement}\n${line}`;
  }

  /**
   * Determine if a line should be skipped
   */
  shouldSkipLine(trimmedLine) {
    // Skip comments, imports, exports, and certain statements
    const skipPatterns = [
      /^\/\//,                    // Single line comments
      /^\/\*/,                    // Multi-line comment start
      /^\*/,                      // Multi-line comment continuation
      /^import\s/,                // Import statements
      /^export\s/,                // Export statements
      /^from\s/,                  // From statements
      /^use strict/,              // Use strict
      /^'use strict'/,            // Use strict with quotes
      /^"use strict"/,            // Use strict with double quotes
      /^console\.log\(/,          // Existing console.log
      /^console\./,               // Other console methods
      /^\s*$/, // Empty lines (handled separately)
      /^\/\*\*$/,                 // JSDoc start
      /^\*\/$/,                   // Comment end
      /^}\s*$/, // Closing braces (to avoid cluttering)
      /^{\s*$/, // Opening braces (to avoid cluttering)
    ];

    return skipPatterns.some(pattern => pattern.test(trimmedLine));
  }

  /**
   * Process a single JavaScript file
   */
  processFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      const fileName = path.basename(filePath);
      
      const processedLines = lines.map((line, index) => {
        const lineNumber = index + 1;
        const isEmptyLine = line.trim() === '';
        return this.processLine(line, lineNumber, fileName, isEmptyLine);
      });

      const processedContent = processedLines.join('\n');

      // Determine output file path
      const outputPath = this.getOutputPath(filePath);
      
      // Write the processed content
      fs.writeFileSync(outputPath, processedContent);
      
      console.log(`✅ Processed: ${filePath} → ${outputPath}`);
      return { success: true, inputPath: filePath, outputPath };
      
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
      return { success: false, inputPath: filePath, error: error.message };
    }
  }

  /**
   * Get output file path based on options
   */
  getOutputPath(inputPath) {
    if (this.options.preserveOriginal) {
      const ext = path.extname(inputPath);
      const nameWithoutExt = inputPath.slice(0, -ext.length);
      return `${nameWithoutExt}${this.options.outputSuffix}${ext}`;
    }
    return inputPath;
  }

  /**
   * Process multiple files or directories
   */
  process(targets) {
    const results = [];

    targets.forEach(target => {
      try {
        const stat = fs.statSync(target);
        
        if (stat.isFile() && this.isJavaScriptFile(target)) {
          results.push(this.processFile(target));
        } else if (stat.isDirectory()) {
          const jsFiles = this.findJSFiles(target);
          console.log(`Found ${jsFiles.length} JavaScript files in ${target}`);
          
          jsFiles.forEach(filePath => {
            results.push(this.processFile(filePath));
          });
        } else {
          console.warn(`⚠️  Skipping non-JavaScript file: ${target}`);
        }
      } catch (error) {
        console.error(`❌ Error accessing ${target}:`, error.message);
        results.push({ success: false, inputPath: target, error: error.message });
      }
    });

    return results;
  }

  /**
   * Generate summary of processing results
   */
  generateSummary(results) {
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log('\n📊 Processing Summary:');
    console.log(`✅ Successfully processed: ${successful.length} files`);
    
    if (failed.length > 0) {
      console.log(`❌ Failed to process: ${failed.length} files`);
      failed.forEach(result => {
        console.log(`   - ${result.inputPath}: ${result.error}`);
      });
    }

    if (successful.length > 0) {
      console.log('\n📝 Output files:');
      successful.forEach(result => {
        console.log(`   ${result.outputPath}`);
      });
    }
  }
}

// Export for use as a module
module.exports = LineDebugger;

// CLI functionality
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🔍 Line Debugger - Add console.log statements to JavaScript files

Usage: node line-debugger.js [options] <files-or-directories>

Options:
  --help, -h           Show this help message
  --no-preserve        Overwrite original files instead of creating .debug versions
  --suffix <suffix>    Custom suffix for output files (default: .debug)
  --include-empty      Include console.log for empty lines
  --prefix <prefix>    Custom prefix for log messages (default: DEBUG)

Examples:
  node line-debugger.js src/
  node line-debugger.js file1.js file2.js
  node line-debugger.js --no-preserve --suffix .logged src/
  node line-debugger.js --include-empty --prefix TRACE app.js
    `);
    process.exit(0);
  }

  // Parse command line arguments
  const options = {};
  const targets = [];
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--help':
      case '-h':
        console.log('Help message shown above');
        process.exit(0);
        break;
      case '--no-preserve':
        options.preserveOriginal = false;
        break;
      case '--suffix':
        options.outputSuffix = args[++i];
        break;
      case '--include-empty':
        options.includeEmptyLines = true;
        break;
      case '--prefix':
        options.logPrefix = args[++i];
        break;
      default:
        if (!arg.startsWith('--')) {
          targets.push(arg);
        }
        break;
    }
  }

  if (targets.length === 0) {
    console.error('❌ No files or directories specified');
    process.exit(1);
  }

  // Create debugger instance and process files
  const lineDebugger = new LineDebugger(options);
  const results = lineDebugger.process(targets);
  lineDebugger.generateSummary(results);
}