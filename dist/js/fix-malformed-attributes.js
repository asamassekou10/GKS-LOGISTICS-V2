// Script to fix malformed data-translate attributes
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

function fixMalformedAttributes(htmlContent) {
  let updatedContent = htmlContent;
  let changesCount = 0;
  
  // Fix pattern: <tag> data-translate="key">text</tag>
  // Should be: <tag data-translate="key">text</tag>
  const malformedPattern = /(<[^>]+>)\s+data-translate="([^"]+)"\s*>/g;
  const matches = updatedContent.match(malformedPattern);
  
  if (matches) {
    updatedContent = updatedContent.replace(malformedPattern, (match, tag, key) => {
      // Remove the closing > from the tag and add the data-translate attribute
      const cleanTag = tag.replace(/>$/, '');
      return `${cleanTag} data-translate="${key}">`;
    });
    changesCount += matches.length;
  }
  
  // Fix pattern: <tag class="class"> data-translate="key">text</tag>
  const malformedPattern2 = /(<[^>]+class="[^"]*">)\s+data-translate="([^"]+)"\s*>/g;
  const matches2 = updatedContent.match(malformedPattern2);
  
  if (matches2) {
    updatedContent = updatedContent.replace(malformedPattern2, (match, tag, key) => {
      // Remove the closing > from the tag and add the data-translate attribute
      const cleanTag = tag.replace(/>$/, '');
      return `${cleanTag} data-translate="${key}">`;
    });
    changesCount += matches2.length;
  }
  
  return { content: updatedContent, changes: changesCount };
}

// Process all HTML files
console.log('🔧 Fixing malformed data-translate attributes...\n');

htmlFiles.forEach(filename => {
  if (fs.existsSync(filename)) {
    console.log(`📄 Processing ${filename}...`);
    
    const htmlContent = fs.readFileSync(filename, 'utf8');
    const result = fixMalformedAttributes(htmlContent);
    
    if (result.changes > 0) {
      fs.writeFileSync(filename, result.content);
      console.log(`   ✅ Fixed ${result.changes} malformed attributes`);
    } else {
      console.log(`   ℹ️  No malformed attributes found`);
    }
  } else {
    console.log(`   ⚠️  File ${filename} not found`);
  }
});

console.log(`\n🎉 Malformed attributes fixed successfully!`);
