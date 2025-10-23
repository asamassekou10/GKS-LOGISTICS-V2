// Script to fix script loading order by adding defer to all scripts
const fs = require('fs');

// HTML files to process
const htmlFiles = [
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

function fixScriptLoading(htmlContent) {
  let updatedContent = htmlContent;
  let changesCount = 0;
  
  // Fix scripts that don't have defer attribute
  // Pattern: <script src="js/filename.js"></script>
  const scriptPattern = /<script src="js\/([^"]+\.js)"><\/script>/g;
  const matches = updatedContent.match(scriptPattern);
  
  if (matches) {
    updatedContent = updatedContent.replace(scriptPattern, '<script src="js/$1" defer></script>');
    changesCount += matches.length;
  }
  
  return { content: updatedContent, changes: changesCount };
}

// Process all HTML files
console.log('🔧 Fixing script loading order...\n');

htmlFiles.forEach(filename => {
  if (fs.existsSync(filename)) {
    console.log(`📄 Processing ${filename}...`);
    
    const htmlContent = fs.readFileSync(filename, 'utf8');
    const result = fixScriptLoading(htmlContent);
    
    if (result.changes > 0) {
      fs.writeFileSync(filename, result.content);
      console.log(`   ✅ Added defer to ${result.changes} scripts`);
    } else {
      console.log(`   ℹ️  No scripts need fixing`);
    }
  } else {
    console.log(`   ⚠️  File ${filename} not found`);
  }
});

console.log(`\n🎉 Script loading order fixed successfully!`);
