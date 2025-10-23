// Debug script to check language manager status
console.log('🔍 Language Manager Debug Info:');
console.log('Current language:', window.langManager?.currentLang);
console.log('Translations loaded:', !!window.langManager?.translations);
console.log('Translation keys count:', Object.keys(window.langManager?.translations || {}).length);
console.log('Elements with data-translate:', document.querySelectorAll('[data-translate]').length);

// Check if any elements have empty data-translate attributes
const emptyElements = document.querySelectorAll('[data-translate=""]');
console.log('Elements with empty data-translate:', emptyElements.length);

if (emptyElements.length > 0) {
  console.log('Empty data-translate elements:', emptyElements);
}

// Check if any elements have data-translate but no translation
const elementsWithTranslate = document.querySelectorAll('[data-translate]');
let missingTranslations = 0;
elementsWithTranslate.forEach(el => {
  const key = el.getAttribute('data-translate');
  if (key && !window.langManager?.translations?.[key]) {
    missingTranslations++;
    console.warn('Missing translation for key:', key, 'on element:', el);
  }
});

console.log('Missing translations:', missingTranslations);
console.log('Page URL:', window.location.href);
