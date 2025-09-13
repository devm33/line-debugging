#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class LineDebugger {
  constructor(options = {}) {
    this.options = {
      outputSuffix: options.outputSuffix || '',
      preserveOriginal: options.preserveOriginal !== false,
      excludePatterns: options.excludePatterns || [
        'node_modules',
        '.git',
        'dist',
        'build',
        '*.min.js'
      ],
      includeEmptyLines: options.includeEmptyLines || false,
      logPrefix: options.logPrefix || 'DEBUG',
      forceReprocess: options.forceReprocess || false
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
    return ['.js', '.mjs', '.jsx', '.ts', '.tsx'].includes(ext);
  }

  /**
   * Add console.log statements to a single line
   */
  processLine(line, lineNumber, fileName, isEmptyLine = false, context = null) {
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

    // If we have context information, use it to determine if insertion is safe
    if (context) {
      // Don't insert debug statements inside expressions (objects, arrays, function calls)
      if (context.insideExpression) {
        return line;
      }
      
      // Only insert at the beginning of statements for better safety
      if (!context.isStatementStart && !isEmptyLine && trimmedLine !== '') {
        return line;
      }
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
   * Remove existing debug statements from file content
   */
  removeExistingDebugStatements(lines, fileName) {
    // Remove any debug statements with our prefix pattern, regardless of filename
    const debugPattern = new RegExp(`^\\s*console\\.log\\('${this.options.logPrefix}:\\s*[^']*:\\d+'\\);\\s*$`);
    return lines.filter(line => !debugPattern.test(line));
  }

  /**
   * Analyze code context to determine safe insertion points
   */
  analyzeCodeContext(lines) {
    const contextInfo = [];
    let bracketStack = [];
    let inString = false;
    let stringChar = '';
    let inComment = false;
    let inMultiLineComment = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();
      
      // Initialize context for this line
      const lineContext = {
        insideExpression: false,
        insideObject: false,
        insideArray: false,
        insideFunction: false,
        depth: bracketStack.length,
        isStatementStart: false
      };

      // Skip processing if we're in a comment
      if (inMultiLineComment) {
        if (line.includes('*/')) {
          inMultiLineComment = false;
        }
        lineContext.insideExpression = true; // Don't insert in comments
        contextInfo.push(lineContext);
        continue;
      }

      if (trimmedLine.startsWith('/*')) {
        inMultiLineComment = true;
        lineContext.insideExpression = true;
        contextInfo.push(lineContext);
        continue;
      }

      // Parse character by character to track context
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        const prevChar = j > 0 ? line[j - 1] : '';
        const nextChar = j < line.length - 1 ? line[j + 1] : '';

        // Handle string literals
        if (!inString && (char === '"' || char === "'" || char === '`')) {
          inString = true;
          stringChar = char;
        } else if (inString && char === stringChar && prevChar !== '\\') {
          inString = false;
          stringChar = '';
        }

        // Skip bracket tracking inside strings
        if (inString) continue;

        // Handle single-line comments
        if (char === '/' && nextChar === '/') {
          break; // Rest of line is comment
        }

        // Track brackets and context
        if (char === '{') {
          bracketStack.push({ type: 'object', line: i });
        } else if (char === '[') {
          bracketStack.push({ type: 'array', line: i });
        } else if (char === '(') {
          bracketStack.push({ type: 'paren', line: i });
        } else if (char === '}' || char === ']' || char === ')') {
          if (bracketStack.length > 0) {
            bracketStack.pop();
          }
        }
      }

      // Determine if we're inside an expression context
      if (bracketStack.length > 0) {
        const topContext = bracketStack[bracketStack.length - 1];
        lineContext.insideExpression = true;
        lineContext.insideObject = topContext.type === 'object';
        lineContext.insideArray = topContext.type === 'array';
        lineContext.insideFunction = topContext.type === 'paren';
      }

      // Check if this line appears to start a new statement
      lineContext.isStatementStart = this.isLineStatementStart(trimmedLine, lineContext);

      contextInfo.push(lineContext);
    }

    return contextInfo;
  }

  /**
   * Determine if a line starts a new statement (safe for debug insertion)
   */
  isLineStatementStart(trimmedLine, context) {
    if (!trimmedLine || context.insideExpression) {
      return false;
    }

    // Skip obviously non-statement lines
    if (trimmedLine.startsWith('//') || 
        trimmedLine.startsWith('*') || 
        trimmedLine.startsWith('*/') ||
        trimmedLine === '{' ||
        trimmedLine === '}' ||
        trimmedLine === '},' ||
        trimmedLine === ']' ||
        trimmedLine === '];' ||
        trimmedLine === ')' ||
        trimmedLine === ');') {
      return false;
    }

    // Patterns that typically start statements
    const statementStarters = [
      /^(const|let|var)\s/,      // Variable declarations
      /^function\*?\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(/, // Function declarations (including generators)
      /^async\s+function\*?\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(/, // Async function declarations
      /^(if|for|while|do|switch|try|catch|finally)\s*\(/, // Control structures
      /^(class)\s/,              // Class declarations
      /^return(\s|$)/,           // Return statements
      /^throw\s/,                // Throw statements
      /^break\s*;?$/,            // Break statements
      /^continue\s*;?$/,         // Continue statements
      /^yield(\s|$)/,            // Yield statements
      /^await\s/,                // Await statements
      /^import\s/,               // Import statements
      /^export\s/,               // Export statements
      /^[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(/,  // Function calls
      /^[a-zA-Z_$][a-zA-Z0-9_$]*\s*=/,   // Simple assignments
      /^[a-zA-Z_$][a-zA-Z0-9_$.[\]]*\s*[+\-*/]=/, // Compound assignments
      /^[a-zA-Z_$][a-zA-Z0-9_$.[\]]*\+\+/, // Increment
      /^[a-zA-Z_$][a-zA-Z0-9_$.[\]]*--/, // Decrement
      /^\+\+[a-zA-Z_$]/,         // Pre-increment
      /^--[a-zA-Z_$]/,           // Pre-decrement
      /^delete\s/,               // Delete statements
      /^typeof\s/,               // Typeof expressions (when used as statements)
    ];

    return statementStarters.some(pattern => pattern.test(trimmedLine));
  }

  /**
   * Process a single JavaScript file
   */
  processFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let lines = content.split('\n');
      // Use relative path from current working directory for better context
      const fileName = path.relative(process.cwd(), filePath);
      
      // Check if file already has debug statements to avoid recursive processing
      // Look for any debug statements with our prefix, not just ones with current filename
      const hasExistingDebugStatements = lines.some(line => {
        const trimmedLine = line.trim();
        return trimmedLine.startsWith(`console.log('${this.options.logPrefix}:`) && 
               trimmedLine.includes(`:`) && 
               trimmedLine.endsWith(`');`);
      });
      
      if (hasExistingDebugStatements && !this.options.forceReprocess) {
        console.log(`⚠️  Skipping ${filePath} - already contains debug statements (use --force to reprocess)`);
        return { success: true, inputPath: filePath, outputPath: filePath, skipped: true };
      }

      // If forcing reprocess, remove existing debug statements first
      if (hasExistingDebugStatements && this.options.forceReprocess) {
        lines = this.removeExistingDebugStatements(lines, fileName);
        console.log(`🔄 Removing existing debug statements from ${filePath}`);
      }
      
      // Analyze the code context to determine safe insertion points
      const contextInfo = this.analyzeCodeContext(lines);
      
      const processedLines = lines.map((line, index) => {
        const lineNumber = index + 1;
        const isEmptyLine = line.trim() === '';
        const context = contextInfo[index];
        return this.processLine(line, lineNumber, fileName, isEmptyLine, context);
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
    const successful = results.filter(r => r.success && !r.skipped);
    const skipped = results.filter(r => r.success && r.skipped);
    const failed = results.filter(r => !r.success);

    console.log('\n📊 Processing Summary:');
    console.log(`✅ Successfully processed: ${successful.length} files`);
    
    if (skipped.length > 0) {
      console.log(`⚠️  Skipped (already processed): ${skipped.length} files`);
    }
    
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

    if (skipped.length > 0) {
      console.log('\n⏭️  Skipped files (already contain debug statements):');
      skipped.forEach(result => {
        console.log(`   ${result.inputPath}`);
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
  --no-preserve        Overwrite original files instead of creating versioned files
  --suffix <suffix>    Custom suffix for output files (default: none)
  --include-empty      Include console.log for empty lines
  --prefix <prefix>    Custom prefix for log messages (default: DEBUG)
  --force              Force reprocessing of files that already contain debug statements

Examples:
  node line-debugger.js src/
  node line-debugger.js file1.js file2.js
  node line-debugger.js --no-preserve --suffix .logged src/
  node line-debugger.js --include-empty --prefix TRACE app.js
  node line-debugger.js --force already-processed-file.js
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
      case '--force':
        options.forceReprocess = true;
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