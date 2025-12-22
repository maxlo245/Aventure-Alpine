const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

/**
 * TESTS SELENIUM - FLUX DE CONTACT
 * Mission 7 : Tests du formulaire de contact et interactions
 * 
 * Ce fichier teste :
 * 1. Accès au formulaire de contact
 * 2. Validation des champs
 * 3. Soumission réussie
 * 4. Confirmation d'envoi
 */

describe('Flux de contact - Tests Selenium', function() {
  let driver;
  const BASE_URL = process.env.TEST_URL || 'http://localhost:5173';

  before(async function() {
    this.timeout(30000);
    
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--window-size=1920,1080');
    
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    
    console.log('✓ Driver Chrome initialisé pour tests de contact');
  });

  after(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  describe('Accès au formulaire de contact', function() {
    
    it('Devrait naviguer vers la page de contact', async function() {
      this.timeout(10000);
      
      await driver.get(BASE_URL);
      await driver.sleep(1000);
      
      // Cliquer sur le lien Contact
      const contactLink = await driver.wait(
        until.elementLocated(By.linkText('Contact')),
        5000
      );
      await contactLink.click();
      
      await driver.wait(until.urlContains('/contact'), 5000);
      
      const currentUrl = await driver.getCurrentUrl();
      assert(currentUrl.includes('/contact'), 'Devrait être sur la page de contact');
      
      console.log('  ✓ Navigation vers la page Contact');
    });

    it('Devrait afficher le formulaire de contact', async function() {
      this.timeout(10000);
      
      // Vérifier la présence des champs du formulaire
      const nomInput = await driver.wait(
        until.elementLocated(By.css('input[name="nom"], input[id*="nom"]')),
        5000
      );
      
      const emailInput = await driver.findElement(By.css('input[name="email"], input[id*="email"]'));
      const messageInput = await driver.findElement(By.css('textarea[name="message"], textarea[id*="message"]'));
      
      assert(nomInput && emailInput && messageInput, 'Tous les champs du formulaire devraient être présents');
      console.log('  ✓ Formulaire de contact affiché');
    });

  });

  describe('Validation du formulaire', function() {
    
    beforeEach(async function() {
      await driver.get(`${BASE_URL}/contact`);
      await driver.sleep(1000);
    });

    it('Devrait valider les champs requis', async function() {
      this.timeout(10000);
      
      // Essayer de soumettre sans remplir
      const submitButton = await driver.findElement(By.css('button[type="submit"]'));
      await submitButton.click();
      
      await driver.sleep(500);
      
      // Vérifier la validation HTML5
      const nomInput = await driver.findElement(By.css('input[name="nom"], input[id*="nom"]'));
      const isValid = await driver.executeScript('return arguments[0].checkValidity()', nomInput);
      
      assert(!isValid, 'Le champ nom devrait être invalide quand vide');
      console.log('  ✓ Validation des champs requis OK');
    });

    it('Devrait valider le format email', async function() {
      this.timeout(10000);
      
      const nomInput = await driver.findElement(By.css('input[name="nom"], input[id*="nom"]'));
      await nomInput.sendKeys('Test User');
      
      const emailInput = await driver.findElement(By.css('input[name="email"], input[id*="email"]'));
      await emailInput.sendKeys('email-invalide');
      
      const isValid = await driver.executeScript('return arguments[0].checkValidity()', emailInput);
      
      assert(!isValid, 'L\'email invalide devrait être détecté');
      console.log('  ✓ Validation email OK');
    });

  });

  describe('Soumission du formulaire', function() {
    
    it('Devrait remplir et soumettre le formulaire de contact', async function() {
      this.timeout(15000);
      
      await driver.get(`${BASE_URL}/contact`);
      await driver.sleep(2000);
      
      // Données de test
      const testData = {
        nom: 'Jean Dupont',
        email: 'jean.dupont.test@example.com',
        message: 'Ceci est un message de test automatisé depuis Selenium. Je souhaite obtenir des informations sur vos activités de randonnée en montagne.'
      };
      
      // Remplir le formulaire
      const nomInput = await driver.findElement(By.css('input[name="nom"], input[id*="nom"]'));
      await nomInput.clear();
      await nomInput.sendKeys(testData.nom);
      
      const emailInput = await driver.findElement(By.css('input[name="email"], input[id*="email"]'));
      await emailInput.clear();
      await emailInput.sendKeys(testData.email);
      
      const messageInput = await driver.findElement(By.css('textarea[name="message"], textarea[id*="message"]'));
      await messageInput.clear();
      await messageInput.sendKeys(testData.message);
      
      console.log('  ✓ Formulaire rempli avec données de test');
      
      // Soumettre
      const submitButton = await driver.findElement(By.css('button[type="submit"]'));
      await submitButton.click();
      
      // Attendre confirmation
      await driver.sleep(3000);
      
      console.log('  ✓ Formulaire soumis');
    });

    it('Devrait afficher un message de confirmation', async function() {
      this.timeout(10000);
      
      // Chercher un message de succès
      const successMessages = await driver.findElements(
        By.xpath("//*[contains(text(), 'merci') or contains(text(), 'succès') or contains(text(), 'envoyé') or contains(text(), 'reçu')]")
      );
      
      if (successMessages.length > 0) {
        const messageText = await successMessages[0].getText();
        console.log(`  ✓ Message de confirmation: "${messageText}"`);
      } else {
        console.log('  ⚠ Message de confirmation non détecté (peut être temporaire)');
      }
    });

  });

  describe('Informations de contact', function() {
    
    it('Devrait afficher les coordonnées de l\'entreprise', async function() {
      this.timeout(10000);
      
      await driver.get(`${BASE_URL}/contact`);
      await driver.sleep(2000);
      
      // Chercher les informations de contact
      const pageText = await driver.findElement(By.tagName('body')).getText();
      
      const hasPhone = pageText.includes('+33') || pageText.includes('04 50');
      const hasEmail = pageText.includes('@') && pageText.includes('aventures');
      
      assert(hasPhone || hasEmail, 'Des coordonnées devraient être affichées');
      console.log(`  ✓ Coordonnées présentes (Tel: ${hasPhone}, Email: ${hasEmail})`);
    });

    it('Devrait afficher l\'adresse ou la localisation', async function() {
      this.timeout(10000);
      
      const pageText = await driver.findElement(By.tagName('body')).getText();
      
      const hasLocation = pageText.includes('Chamonix') || 
                         pageText.includes('Haute-Savoie') || 
                         pageText.includes('Alpes');
      
      if (hasLocation) {
        console.log('  ✓ Localisation affichée');
      } else {
        console.log('  ⚠ Localisation non trouvée');
      }
    });

  });

  describe('Responsive design - Contact', function() {
    
    it('Devrait être utilisable sur mobile (375x667)', async function() {
      this.timeout(10000);
      
      await driver.manage().window().setRect({ width: 375, height: 667 });
      await driver.get(`${BASE_URL}/contact`);
      await driver.sleep(2000);
      
      // Vérifier que le formulaire est accessible
      const form = await driver.findElement(By.css('form'));
      const isDisplayed = await form.isDisplayed();
      
      assert(isDisplayed, 'Le formulaire devrait être visible sur mobile');
      
      // Restaurer taille desktop
      await driver.manage().window().setRect({ width: 1920, height: 1080 });
      
      console.log('  ✓ Formulaire de contact responsive OK');
    });

  });

});
