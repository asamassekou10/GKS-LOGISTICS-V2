#!/usr/bin/env node

/**
 * Script to add missing data-translate attributes to HTML files
 * Focuses on: navigation, footer, buttons, form labels, headings
 */

const fs = require('fs');
const path = require('path');

// Pattern-based replacements for common elements
const REPLACEMENT_PATTERNS = [
  // Navigation nav element
  {
    name: 'Navigation element',
    pattern: /<nav\s+class="nav"(?!.*data-translate)/g,
    replacement: '<nav class="nav" data-translate="nav-main"',
    count: 0,
  },
  // Navigation links - Services
  {
    name: 'Nav link - Services',
    pattern: /<a\s+href="javascript:void\(0\)"\s+class="nav-link-dropdown"[^>]*>Services<\/a>/g,
    replacement: '<a href="javascript:void(0);" class="nav-link-dropdown" data-translate="nav-services">Services</a>',
    count: 0,
  },
  // Navigation links - About
  {
    name: 'Nav link - About',
    pattern: /<a\s+href="[^"]*"\s+class="nav-link"[^>]*>About<\/a>/g,
    replacement: '<a href="#about" class="nav-link" data-translate="nav-about">About</a>',
    count: 0,
  },
  // Footer element
  {
    name: 'Footer element',
    pattern: /<footer\s+class="footer"(?!.*data-translate)/g,
    replacement: '<footer class="footer" data-translate="footer-main"',
    count: 0,
  },
  // Footer heading - Liens Utiles (Useful Links)
  {
    name: 'Footer heading - Useful Links',
    pattern: /<h4[^>]*>Liens Utiles<\/h4>/g,
    replacement: '<h4 data-translate="footer-links-title">Liens Utiles</h4>',
    count: 0,
  },
  // Footer heading - Contact
  {
    name: 'Footer heading - Contact',
    pattern: /<h4[^>]*>Contact<\/h4>/g,
    replacement: '<h4 data-translate="footer-contact-title">Contact</h4>',
    count: 0,
  },
  // Menu toggle button
  {
    name: 'Menu toggle button',
    pattern: /<button\s+class="menu-toggle"(?!.*data-translate)/g,
    replacement: '<button class="menu-toggle" data-translate="btn-toggle-nav"',
    count: 0,
  },
];

// Process a single HTML file
function processHtmlFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    let totalChanges = 0;

    // Apply each replacement pattern
    REPLACEMENT_PATTERNS.forEach(pattern => {
      const matches = content.match(pattern.pattern);
      if (matches) {
        content = content.replace(pattern.pattern, pattern.replacement);
        pattern.count += matches.length;
        totalChanges += matches.length;
      }
    });

    // Write back if changes were made
    if (totalChanges > 0) {
      fs.writeFileSync(filePath, content, 'utf-8');
      return { success: true, changes: totalChanges };
    }

    return { success: true, changes: 0 };
  } catch (error) {
    console.error(`❌ Error processing ${path.basename(filePath)}: ${error.message}`);
    return { success: false, changes: 0, error: error.message };
  }
}

// Main function
function main() {
  console.log('🔄 Updating HTML files with data-translate attributes...\n');

  const srcDir = path.join(__dirname, 'src');
  const htmlFiles = fs.readdirSync(srcDir).filter(file => file.endsWith('.html'));

  console.log(`Found ${htmlFiles.length} HTML files to process\n`);

  let totalChanges = 0;
  let processedCount = 0;
  let errorCount = 0;

  htmlFiles.forEach(file => {
    const filePath = path.join(srcDir, file);
    const result = processHtmlFile(filePath);

    if (result.success) {
      processedCount++;
      if (result.changes > 0) {
        console.log(`✅ ${file.padEnd(30)} - Updated ${result.changes} element(s)`);
        totalChanges += result.changes;
      } else {
        console.log(`⏭️  ${file.padEnd(30)} - No changes needed`);
      }
    } else {
      errorCount++;
      console.log(`❌ ${file.padEnd(30)} - Error: ${result.error}`);
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`Files processed: ${processedCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Total updates: ${totalChanges}`);

  console.log('\n📋 Patterns Applied:');
  REPLACEMENT_PATTERNS.forEach(pattern => {
    if (pattern.count > 0) {
      console.log(`  ✅ ${pattern.name}: ${pattern.count} updates`);
    }
  });
}

main();
