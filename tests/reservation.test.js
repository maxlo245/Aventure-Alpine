const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

/**
 * TESTS SELENIUM - FLUX DE RÉSERVATION
 * Mission 7 : Gestion des tests de développement par flux
 * 
 * Ce fichier teste le parcours complet de réservation :
 * 1. Navigation vers la page Ski
 * 2. Sélection d'une offre spéciale
 * 3. Remplissage du formulaire de réservation
 * 4. Validation et soumission
 * 5. Vérification de la page de confirmation
 */

describe('Flux de réservation - Tests Selenium', function() {
  let driver;
  const BASE_URL = process.env.TEST_URL || 'http://localhost:5173';

  // Configuration du driver Chrome
  before(async function() {
    this.timeout(30000);
    
    const options = new chrome.Options();
    options.addArguments('--headless'); // Mode sans interface (CI/CD)
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-gpu');
    options.addArguments('--window-size=1920,1080');
    
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    
    console.log('✓ Driver Chrome initialisé');
  });

  after(async function() {
    if (driver) {
      await driver.quit();
      console.log('✓ Driver Chrome fermé');
    }
  });

  describe('Parcours de réservation complet', function() {
    
    it('Devrait charger la page d\'accueil', async function() {
      this.timeout(10000);
      
      await driver.get(BASE_URL);
      await driver.wait(until.titleContains('Aventures Alpines'), 5000);
      
      const title = await driver.getTitle();
      assert(title.includes('Aventures Alpines'), 'Le titre devrait contenir "Aventures Alpines"');
      
      console.log('  ✓ Page d\'accueil chargée');
    });

    it('Devrait naviguer vers la page Ski', async function() {
      this.timeout(10000);
      
      // Cliquer sur le lien "Ski" dans la navigation
      const skiLink = await driver.wait(
        until.elementLocated(By.linkText('Ski')),
        5000
      );
      await skiLink.click();
      
      // Attendre le chargement de la page
      await driver.wait(until.urlContains('/ski'), 5000);
      
      // Vérifier la présence du titre
      const pageTitle = await driver.wait(
        until.elementLocated(By.css('h1')),
        5000
      );
      const titleText = await pageTitle.getText();
      
      assert(titleText.toLowerCase().includes('ski'), 'Le titre devrait contenir "ski"');
      console.log('  ✓ Navigation vers la page Ski réussie');
    });

    it('Devrait afficher les offres spéciales', async function() {
      this.timeout(10000);
      
      // Scroller jusqu'à la section des offres
      await driver.executeScript('window.scrollTo(0, document.body.scrollHeight * 0.7)');
      await driver.sleep(1000);
      
      // Vérifier la présence des cartes d'offres
      const offerCards = await driver.wait(
        until.elementsLocated(By.css('.offer-card')),
        5000
      );
      
      assert(offerCards.length >= 3, 'Il devrait y avoir au moins 3 offres');
      console.log(`  ✓ ${offerCards.length} offres affichées`);
    });

    it('Devrait cliquer sur l\'offre "Forfait Famille"', async function() {
      this.timeout(10000);
      
      // Localiser le bouton de l'offre Forfait Famille
      const buttons = await driver.findElements(By.css('.offer-card .btn-offer'));
      
      // Cliquer sur le premier bouton (Forfait Famille)
      assert(buttons.length > 0, 'Aucun bouton de réservation trouvé');
      await buttons[0].click();
      
      // Attendre la redirection vers la page de réservation
      await driver.wait(until.urlContains('/reservation'), 5000);
      
      console.log('  ✓ Redirection vers la page de réservation');
    });

    it('Devrait afficher le formulaire de réservation avec les données pré-remplies', async function() {
      this.timeout(10000);
      
      // Vérifier le titre de l'offre
      const offerTitle = await driver.wait(
        until.elementLocated(By.css('.offer-summary h3')),
        5000
      );
      const titleText = await offerTitle.getText();
      
      assert(titleText === 'Forfait Famille', 'Le titre de l\'offre devrait être "Forfait Famille"');
      
      // Vérifier le badge de réduction
      const discountBadge = await driver.findElement(By.css('.discount-badge'));
      const badgeText = await discountBadge.getText();
      
      assert(badgeText === '-20%', 'La réduction devrait être de -20%');
      console.log('  ✓ Formulaire affiché avec offre pré-remplie');
    });

    it('Devrait remplir le formulaire de réservation', async function() {
      this.timeout(15000);
      
      // Données de test
      const testData = {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont.test@example.com',
        telephone: '+33 6 12 34 56 78'
      };
      
      // Remplir nom
      const nomInput = await driver.findElement(By.id('nom'));
      await nomInput.clear();
      await nomInput.sendKeys(testData.nom);
      
      // Remplir prénom
      const prenomInput = await driver.findElement(By.id('prenom'));
      await prenomInput.clear();
      await prenomInput.sendKeys(testData.prenom);
      
      // Remplir email
      const emailInput = await driver.findElement(By.id('email'));
      await emailInput.clear();
      await emailInput.sendKeys(testData.email);
      
      // Remplir téléphone
      const telInput = await driver.findElement(By.id('telephone'));
      await telInput.clear();
      await telInput.sendKeys(testData.telephone);
      
      // Sélectionner date de début (demain)
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      
      const dateDebutInput = await driver.findElement(By.id('dateDebut'));
      await dateDebutInput.clear();
      await dateDebutInput.sendKeys(tomorrowStr);
      
      // Scroller vers les champs de participants
      await driver.executeScript('arguments[0].scrollIntoView(true)', 
        await driver.findElement(By.id('nombreAdultes')));
      await driver.sleep(500);
      
      // Définir nombre d'adultes
      const adultesInput = await driver.findElement(By.id('nombreAdultes'));
      await adultesInput.clear();
      await adultesInput.sendKeys('2');
      
      // Définir nombre d'enfants
      const enfantsInput = await driver.findElement(By.id('nombreEnfants'));
      await enfantsInput.clear();
      await enfantsInput.sendKeys('2');
      
      console.log('  ✓ Formulaire rempli avec les données de test');
    });

    it('Devrait calculer automatiquement le prix total', async function() {
      this.timeout(10000);
      
      // Scroller vers le total
      await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
      await driver.sleep(500);
      
      // Vérifier l'affichage du prix
      const totalPrice = await driver.wait(
        until.elementLocated(By.css('.total-price strong')),
        5000
      );
      const priceText = await totalPrice.getText();
      
      // Le prix devrait être calculé (format: XXX€ ou XXX.XX€)
      assert(priceText.match(/\d+(\.\d{2})?€/), 'Le prix devrait être affiché au format correct');
      console.log(`  ✓ Prix calculé: ${priceText}`);
    });

    it('Devrait soumettre le formulaire de réservation', async function() {
      this.timeout(15000);
      
      // Localiser et cliquer sur le bouton de soumission
      const submitButton = await driver.wait(
        until.elementLocated(By.css('.btn-submit')),
        5000
      );
      
      // Vérifier que le bouton n'est pas désactivé
      const isDisabled = await submitButton.getAttribute('disabled');
      assert(isDisabled === null, 'Le bouton de soumission devrait être actif');
      
      await submitButton.click();
      
      // Attendre la redirection vers la page de confirmation
      await driver.wait(until.urlContains('/reservation/confirmation'), 10000);
      
      console.log('  ✓ Formulaire soumis avec succès');
    });

    it('Devrait afficher la page de confirmation', async function() {
      this.timeout(10000);
      
      // Vérifier l'icône de succès
      const successIcon = await driver.wait(
        until.elementLocated(By.css('.success-icon svg')),
        5000
      );
      assert(successIcon, 'L\'icône de succès devrait être affichée');
      
      // Vérifier le titre de confirmation
      const confirmTitle = await driver.findElement(By.css('h1'));
      const titleText = await confirmTitle.getText();
      
      assert(titleText.includes('confirmée'), 'Le titre devrait indiquer que la réservation est confirmée');
      console.log('  ✓ Page de confirmation affichée');
    });

    it('Devrait afficher un numéro de réservation unique', async function() {
      this.timeout(10000);
      
      // Vérifier la présence du numéro de réservation
      const reservationNumber = await driver.wait(
        until.elementLocated(By.css('.reservation-number strong')),
        5000
      );
      const numberText = await reservationNumber.getText();
      
      // Le numéro devrait commencer par "ALP"
      assert(numberText.startsWith('ALP'), 'Le numéro de réservation devrait commencer par "ALP"');
      assert(numberText.length > 8, 'Le numéro de réservation devrait avoir au moins 8 caractères');
      
      console.log(`  ✓ Numéro de réservation: ${numberText}`);
    });

    it('Devrait afficher les détails de la réservation', async function() {
      this.timeout(10000);
      
      // Vérifier les éléments de détails
      const detailItems = await driver.findElements(By.css('.detail-item'));
      
      assert(detailItems.length >= 4, 'Il devrait y avoir au moins 4 éléments de détails');
      
      // Vérifier le montant total
      const highlightItem = await driver.findElement(By.css('.detail-item.highlight'));
      const totalAmount = await highlightItem.findElement(By.css('.detail-value'));
      const amountText = await totalAmount.getText();
      
      assert(amountText.includes('€'), 'Le montant total devrait inclure le symbole €');
      console.log(`  ✓ Détails affichés, montant: ${amountText}`);
    });

    it('Devrait afficher les prochaines étapes', async function() {
      this.timeout(10000);
      
      // Scroller vers la section des étapes
      await driver.executeScript('window.scrollTo(0, document.body.scrollHeight * 0.5)');
      await driver.sleep(500);
      
      // Vérifier les cartes d'étapes
      const stepCards = await driver.findElements(By.css('.step-card'));
      
      assert(stepCards.length === 3, 'Il devrait y avoir 3 étapes affichées');
      
      // Vérifier les numéros d'étapes
      const stepNumbers = await driver.findElements(By.css('.step-number'));
      const numbers = await Promise.all(stepNumbers.map(el => el.getText()));
      
      assert.deepStrictEqual(numbers, ['1', '2', '3'], 'Les étapes devraient être numérotées 1, 2, 3');
      console.log('  ✓ Prochaines étapes affichées');
    });

    it('Devrait permettre le retour à l\'accueil', async function() {
      this.timeout(10000);
      
      // Scroller vers le bas pour voir les boutons
      await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
      await driver.sleep(500);
      
      // Cliquer sur le bouton "Retour à l'accueil"
      const homeButton = await driver.wait(
        until.elementLocated(By.linkText('Retour à l\'accueil')),
        5000
      );
      await homeButton.click();
      
      // Attendre la redirection
      await driver.wait(until.urlIs(BASE_URL + '/'), 5000);
      
      const currentUrl = await driver.getCurrentUrl();
      assert(currentUrl === BASE_URL + '/' || currentUrl === BASE_URL, 
        'Devrait être redirigé vers la page d\'accueil');
      
      console.log('  ✓ Retour à l\'accueil réussi');
    });

  });

  describe('Tests de validation du formulaire', function() {
    
    beforeEach(async function() {
      // Naviguer vers la page de réservation avant chaque test
      await driver.get(`${BASE_URL}/reservation`);
      await driver.sleep(1000);
    });

    it('Devrait afficher des erreurs si les champs requis sont vides', async function() {
      this.timeout(10000);
      
      // Scroller vers le bouton de soumission
      await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
      await driver.sleep(500);
      
      // Essayer de soumettre sans remplir
      const submitButton = await driver.findElement(By.css('.btn-submit'));
      await submitButton.click();
      
      await driver.sleep(1000);
      
      // Vérifier la validation HTML5 (champs requis)
      const nomInput = await driver.findElement(By.id('nom'));
      const isValid = await driver.executeScript('return arguments[0].checkValidity()', nomInput);
      
      assert(!isValid, 'Le champ nom devrait être invalide quand vide');
      console.log('  ✓ Validation des champs requis fonctionnelle');
    });

    it('Devrait valider le format de l\'email', async function() {
      this.timeout(10000);
      
      // Remplir les champs obligatoires sauf email
      const nomInput = await driver.findElement(By.id('nom'));
      await nomInput.sendKeys('Test');
      
      const prenomInput = await driver.findElement(By.id('prenom'));
      await prenomInput.sendKeys('User');
      
      const emailInput = await driver.findElement(By.id('email'));
      await emailInput.sendKeys('email-invalide'); // Email invalide
      
      // Vérifier la validation HTML5
      const isValid = await driver.executeScript('return arguments[0].checkValidity()', emailInput);
      
      assert(!isValid, 'L\'email invalide devrait être détecté');
      console.log('  ✓ Validation du format email fonctionnelle');
    });

  });

  describe('Tests de responsive design', function() {
    
    it('Devrait s\'afficher correctement sur mobile (375x667)', async function() {
      this.timeout(10000);
      
      // Redimensionner pour iPhone SE
      await driver.manage().window().setRect({ width: 375, height: 667 });
      
      await driver.get(`${BASE_URL}/reservation`);
      await driver.sleep(2000);
      
      // Vérifier que le formulaire est visible
      const form = await driver.findElement(By.css('.reservation-form'));
      const isDisplayed = await form.isDisplayed();
      
      assert(isDisplayed, 'Le formulaire devrait être visible sur mobile');
      console.log('  ✓ Affichage mobile (375x667) OK');
    });

    it('Devrait s\'afficher correctement sur tablette (768x1024)', async function() {
      this.timeout(10000);
      
      // Redimensionner pour iPad
      await driver.manage().window().setRect({ width: 768, height: 1024 });
      
      await driver.get(`${BASE_URL}/reservation`);
      await driver.sleep(2000);
      
      const form = await driver.findElement(By.css('.reservation-form'));
      const isDisplayed = await form.isDisplayed();
      
      assert(isDisplayed, 'Le formulaire devrait être visible sur tablette');
      console.log('  ✓ Affichage tablette (768x1024) OK');
    });

    it('Devrait revenir à la taille desktop', async function() {
      this.timeout(5000);
      
      // Remettre en taille desktop
      await driver.manage().window().setRect({ width: 1920, height: 1080 });
      await driver.sleep(500);
      
      console.log('  ✓ Taille desktop restaurée');
    });

  });

});
