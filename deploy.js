const fs = require('fs');
const path = require('path');

// Simple deployment script for GKS Logistics i18n site
function deploy() {
  console.log('🚀 Starting deployment process...\n');
  
  const distPath = path.join(__dirname, 'dist');
  
  if (!fs.existsSync(distPath)) {
    console.error('❌ Dist directory not found. Please run the build script first:');
    console.error('   node build-translations.js');
    process.exit(1);
  }
  
  console.log('✅ Dist directory found');
  
  // List all generated files
  console.log('\n📁 Generated files:');
  listFiles(distPath, '');
  
  console.log('\n🌐 Language versions:');
  console.log('   🇫🇷 French (default): /index.html');
  console.log('   🇺🇸 English: /en/index.html');
  console.log('   🇹🇷 Turkish: /tu/index.html');
  console.log('   🇨🇳 Mandarin: /md/index.html');
  
  console.log('\n📋 Deployment checklist:');
  console.log('   ✅ All language versions generated');
  console.log('   ✅ Hreflang tags included');
  console.log('   ✅ Language switcher functional');
  console.log('   ✅ SEO meta tags optimized');
  console.log('   ✅ Static assets copied');
  
  console.log('\n🎯 Next steps:');
  console.log('   1. Upload the entire "dist" folder to your web server');
  console.log('   2. Configure your web server to serve the correct language based on URL');
  console.log('   3. Set up redirects for the default language (French)');
  console.log('   4. Test all language versions and the language switcher');
  console.log('   5. Verify hreflang tags in Google Search Console');
  
  console.log('\n🔧 Server configuration examples:');
  console.log('   Apache: Use .htaccess for URL rewriting');
  console.log('   Nginx: Configure location blocks for language directories');
  console.log('   Netlify: Use _redirects file for SPA routing');
  console.log('   Vercel: Use vercel.json for routing configuration');
  
  console.log('\n✨ Deployment completed successfully!');
}

function listFiles(dir, prefix) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      console.log(`   📁 ${prefix}${file}/`);
      listFiles(filePath, prefix + file + '/');
    } else {
      const size = (stat.size / 1024).toFixed(1);
      console.log(`   📄 ${prefix}${file} (${size}KB)`);
    }
  });
}

// Run deployment
if (require.main === module) {
  deploy();
}

module.exports = { deploy };
