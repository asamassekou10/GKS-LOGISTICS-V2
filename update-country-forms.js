const fs = require('fs');
const path = require('path');

// Define the updated form HTML with data-translate attributes
const updatedFormHTML = `                <form name="quote-request" data-netlify="true" id="quoteRequestForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fullName" data-translate="country_contact-full_name">Nom Complet *</label>
                            <input type="text" id="fullName" name="fullName" data-translate="country_contact-full_name_placeholder" placeholder="" required>
                        </div>

                        <div class="form-group">
                            <label for="companyName" data-translate="country_contact-company_name">Nom de l'Entreprise</label>
                            <input type="text" id="companyName" name="companyName" data-translate="country_contact-company_name_placeholder" placeholder="">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="email" data-translate="country_contact-email">Email *</label>
                            <input type="email" id="email" name="email" data-translate="country_contact-email_placeholder" placeholder="" required>
                        </div>

                        <div class="form-group">
                            <label for="phoneNumber" data-translate="country_contact-phone">Téléphone *</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" data-translate="country_contact-phone_placeholder" placeholder="" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="freightType" data-translate="country_contact-freight_type">Type de Fret *</label>
                        <select id="freightType" name="freightType" required>
                            <option value="" data-translate="country_contact-freight_type_placeholder">Sélectionner</option>
                            <option value="air" data-translate="country_contact-freight_type_air">Fret Aérien</option>
                            <option value="sea" data-translate="country_contact-freight_type_sea">Fret Maritime</option>
                            <option value="road" data-translate="country_contact-freight_type_road">Fret Routier</option>
                            <option value="warehousing" data-translate="country_contact-freight_type_warehousing">Entreposage</option>
                            <option value="other" data-translate="country_contact-freight_type_other">Autres</option>
                        </select>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="origin" data-translate="country_contact-origin">Origine *</label>
                            <input type="text" id="origin" name="origin" data-translate="country_contact-origin_placeholder" placeholder="" required>
                        </div>

                        <div class="form-group">
                            <label for="destination" data-translate="country_contact-destination">Destination *</label>
                            <input type="text" id="destination" name="destination" data-translate="country_contact-destination_placeholder" placeholder="" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="message" data-translate="country_contact-message">Détails *</label>
                        <textarea id="message" name="message" rows="4" data-translate="country_contact-message_placeholder" placeholder="" required></textarea>
                    </div>

                    <p class="required-fields-indicator">
                        * Champs obligatoires
                    </p>

                    <div class="form-buttons">
                        <button type="button" class="btn-cancel">Annuler</button>
                        <button type="submit" class="btn-submit">Envoyer</button>
                    </div>
                </form>`;

// List of country pages to update
const countryPages = [
  'gks-burkinafaso.html',
  'gks-dubai.html',
  'gks-guinea.html',
  'gks-ivoire.html',
  'gks-mali.html',
  'gks-niger.html',
  'gks-senegal.html',
  'gks-turkey.html',
  'gks-usa.html'
];

console.log('🔧 Updating country page forms with data-translate attributes...\n');

countryPages.forEach(filename => {
  const filePath = path.join(__dirname, 'src', filename);
  
  if (fs.existsSync(filePath)) {
    console.log(`📝 Processing ${filename}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Match the old form pattern (from opening form tag to closing form tag)
    const formPattern = /<form name="quote-request"[^>]*>[\s\S]*?<\/form>/;
    const match = content.match(formPattern);
    
    if (match) {
      const oldForm = match[0];
      content = content.replace(oldForm, updatedFormHTML);
      fs.writeFileSync(filePath, content);
      console.log(`   ✅ Updated form with data-translate attributes`);
    } else {
      console.log(`   ⚠️  Could not find form in ${filename}`);
    }
  } else {
    console.log(`   ❌ File not found: ${filename}`);
  }
});

console.log(`\n🎉 Country page forms updated successfully!`);
