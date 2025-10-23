// Script to fix data-translate attributes in HTML files
const fs = require('fs');

// HTML files to process
const htmlFiles = [
  'index.html',
  'Blog.html', 
  'careers.html',
  'news.html',
  'Article1.html',
  'Article2.html',
  'Insight.html',
  'employee1.html',
  'employee2.html',
  'employee3.html'
];

function fixTranslateAttributes(htmlContent) {
  let updatedContent = htmlContent;
  let changesCount = 0;
  
  // Fix data-translate-placeholder to data-translate
  const placeholderPattern = /data-translate-placeholder="([^"]+)"/g;
  const placeholderMatches = updatedContent.match(placeholderPattern);
  if (placeholderMatches) {
    updatedContent = updatedContent.replace(placeholderPattern, 'data-translate="$1"');
    changesCount += placeholderMatches.length;
  }
  
  // Fix duplicate data-translate attributes
  const duplicatePattern = /data-translate="([^"]+)"[^>]*data-translate="([^"]+)"/g;
  const duplicateMatches = updatedContent.match(duplicatePattern);
  if (duplicateMatches) {
    updatedContent = updatedContent.replace(duplicatePattern, 'data-translate="$1"');
    changesCount += duplicateMatches.length;
  }
  
  // Fix malformed attributes (like the one we saw)
  const malformedPattern = /data-translate="([^"]+)"[^>]*data-translate="([^"]+)">/g;
  const malformedMatches = updatedContent.match(malformedPattern);
  if (malformedMatches) {
    updatedContent = updatedContent.replace(malformedPattern, 'data-translate="$1">');
    changesCount += malformedMatches.length;
  }
  
  return { content: updatedContent, changes: changesCount };
}

// Process all HTML files
console.log('🔧 Fixing data-translate attributes in HTML files...\n');

htmlFiles.forEach(filename => {
  if (fs.existsSync(filename)) {
    console.log(`📄 Processing ${filename}...`);
    
    const htmlContent = fs.readFileSync(filename, 'utf8');
    const result = fixTranslateAttributes(htmlContent);
    
    if (result.changes > 0) {
      fs.writeFileSync(filename, result.content);
      console.log(`   ✅ Fixed ${result.changes} data-translate attributes`);
    } else {
      console.log(`   ℹ️  No fixes needed`);
    }
  } else {
    console.log(`   ⚠️  File ${filename} not found`);
  }
});

console.log(`\n🎉 Data-translate attributes fixed successfully!`);
