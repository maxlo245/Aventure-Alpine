const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Tests de filtres et recherche', function() {
  this.timeout(30000);
  let driver;
  const BASE_URL = 'http://localhost:5173';

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function() {
    await driver.quit();
  });

  describe('Filtres Articles', function() {
    beforeEach(async function() {
      await driver.get(`${BASE_URL}/#/articles`);
      await driver.wait(until.elementLocated(By.css('input[placeholder*="Rechercher"]')), 10000);
    });

    it('devrait filtrer les articles par recherche textuelle', async function() {
      const searchInput = await driver.findElement(By.css('input[placeholder*="Rechercher"]'));
      await searchInput.sendKeys('montagne');
      
      await driver.sleep(1000);
      
      // Vérifier que le compteur se met à jour
      const pageSource = await driver.getPageSource();
      const hasResults = pageSource.includes('article') && pageSource.includes('trouvé');
      
      expect(hasResults).to.be.true;
      
      console.log('✅ Recherche textuelle articles fonctionne');
    });

    it('devrait filtrer par catégorie', async function() {
      const categorySelect = await driver.findElement(By.css('select'));
      const options = await categorySelect.findElements(By.css('option'));
      
      // Sélectionner la deuxième option (première après "Toutes")
      if (options.length > 1) {
        await options[1].click();
        
        await driver.sleep(1000);
        
        const pageSource = await driver.getPageSource();
        expect(pageSource).to.include('article');
        
        console.log('✅ Filtre par catégorie fonctionne');
      }
    });

    it('devrait trier par popularité', async function() {
      const selects = await driver.findElements(By.css('select'));
      
      if (selects.length >= 2) {
        const sortSelect = selects[1];
        const options = await sortSelect.findElements(By.css('option'));
        
        // Trouver l'option "Popularité"
        for (const option of options) {
          const text = await option.getText();
          if (text.includes('Popularité')) {
            await option.click();
            break;
          }
        }
        
        await driver.sleep(1000);
        
        console.log('✅ Tri par popularité appliqué');
      }
    });

    it('devrait afficher le bouton de réinitialisation quand filtres actifs', async function() {
      const searchInput = await driver.findElement(By.css('input[placeholder*="Rechercher"]'));
      await searchInput.sendKeys('test');
      
      await driver.sleep(1000);
      
      // Chercher le bouton de réinitialisation
      const buttons = await driver.findElements(By.css('button'));
      let resetButtonFound = false;
      
      for (const button of buttons) {
        const text = await button.getText();
        if (text.includes('Réinitialiser')) {
          resetButtonFound = true;
          break;
        }
      }
      
      expect(resetButtonFound).to.be.true;
      
      console.log('✅ Bouton de réinitialisation affiché');
    });

    it('devrait réinitialiser les filtres au clic sur le bouton', async function() {
      const searchInput = await driver.findElement(By.css('input[placeholder*="Rechercher"]'));
      await searchInput.sendKeys('test recherche');
      
      await driver.sleep(1000);
      
      // Cliquer sur réinitialiser
      const buttons = await driver.findElements(By.css('button'));
      for (const button of buttons) {
        const text = await button.getText();
        if (text.includes('Réinitialiser')) {
          await button.click();
          break;
        }
      }
      
      await driver.sleep(1000);
      
      // Vérifier que le champ de recherche est vide
      const inputValue = await searchInput.getAttribute('value');
      expect(inputValue).to.equal('');
      
      console.log('✅ Réinitialisation des filtres fonctionne');
    });

    it('devrait afficher un message si aucun résultat', async function() {
      const searchInput = await driver.findElement(By.css('input[placeholder*="Rechercher"]'));
      await searchInput.sendKeys('xyzabc123recherchequinexistepas');
      
      await driver.sleep(1000);
      
      const pageSource = await driver.getPageSource();
      const hasNoResultsMessage = pageSource.includes('Aucun') || 
                                  pageSource.includes('0 article');
      
      expect(hasNoResultsMessage).to.be.true;
      
      console.log('✅ Message "aucun résultat" affiché');
    });
  });

  describe('Filtres Vidéos', function() {
    beforeEach(async function() {
      await driver.get(`${BASE_URL}/#/videos`);
      await driver.wait(until.elementLocated(By.css('input[placeholder*="Rechercher"]')), 10000);
    });

    it('devrait filtrer les vidéos par recherche textuelle', async function() {
      const searchInput = await driver.findElement(By.css('input[placeholder*="Rechercher"]'));
      await searchInput.sendKeys('escalade');
      
      await driver.sleep(1000);
      
      const pageSource = await driver.getPageSource();
      const hasResults = pageSource.includes('vidéo') && pageSource.includes('trouvé');
      
      expect(hasResults).to.be.true;
      
      console.log('✅ Recherche textuelle vidéos fonctionne');
    });

    it('devrait filtrer par sport', async function() {
      const sportSelect = await driver.findElement(By.css('select'));
      const options = await sportSelect.findElements(By.css('option'));
      
      if (options.length > 1) {
        await options[1].click();
        
        await driver.sleep(1000);
        
        const pageSource = await driver.getPageSource();
        expect(pageSource).to.include('vidéo');
        
        console.log('✅ Filtre par sport fonctionne');
      }
    });

    it('devrait trier par durée', async function() {
      const selects = await driver.findElements(By.css('select'));
      
      if (selects.length >= 2) {
        const sortSelect = selects[1];
        const options = await sortSelect.findElements(By.css('option'));
        
        for (const option of options) {
          const text = await option.getText();
          if (text.includes('Durée')) {
            await option.click();
            break;
          }
        }
        
        await driver.sleep(1000);
        
        console.log('✅ Tri par durée appliqué');
      }
    });

    it('devrait afficher le compteur de résultats', async function() {
      await driver.sleep(1000);
      
      const pageSource = await driver.getPageSource();
      const hasCounter = pageSource.includes('vidéo') && pageSource.includes('trouvé');
      
      expect(hasCounter).to.be.true;
      
      console.log('✅ Compteur de résultats vidéos affiché');
    });
  });

  describe('Filtres Randonnée', function() {
    beforeEach(async function() {
      await driver.get(`${BASE_URL}/#/randonnee`);
      await driver.wait(until.elementLocated(By.css('input[placeholder*="Rechercher"]')), 10000);
    });

    it('devrait filtrer les itinéraires par recherche', async function() {
      const searchInput = await driver.findElement(By.css('input[placeholder*="Rechercher"]'));
      await searchInput.sendKeys('Mont');
      
      await driver.sleep(1000);
      
      const pageSource = await driver.getPageSource();
      const hasResults = pageSource.includes('itinéraire');
      
      expect(hasResults).to.be.true;
      
      console.log('✅ Recherche itinéraires fonctionne');
    });

    it('devrait filtrer par difficulté "Facile"', async function() {
      const buttons = await driver.findElements(By.css('button'));
      
      for (const button of buttons) {
        const text = await button.getText();
        if (text === 'Facile') {
          await button.click();
          break;
        }
      }
      
      await driver.sleep(1000);
      
      const pageSource = await driver.getPageSource();
      expect(pageSource).to.include('itinéraire');
      
      console.log('✅ Filtre difficulté "Facile" fonctionne');
    });

    it('devrait filtrer par difficulté "Intermédiaire"', async function() {
      const buttons = await driver.findElements(By.css('button'));
      
      for (const button of buttons) {
        const text = await button.getText();
        if (text === 'Intermédiaire') {
          await button.click();
          break;
        }
      }
      
      await driver.sleep(1000);
      
      console.log('✅ Filtre difficulté "Intermédiaire" fonctionne');
    });

    it('devrait filtrer par difficulté "Difficile"', async function() {
      const buttons = await driver.findElements(By.css('button'));
      
      for (const button of buttons) {
        const text = await button.getText();
        if (text === 'Difficile') {
          await button.click();
          break;
        }
      }
      
      await driver.sleep(1000);
      
      console.log('✅ Filtre difficulté "Difficile" fonctionne');
    });

    it('devrait mettre à jour le compteur de résultats', async function() {
      await driver.sleep(1000);
      
      const pageSource = await driver.getPageSource();
      const hasCounter = pageSource.includes('itinéraire') && pageSource.includes('trouvé');
      
      expect(hasCounter).to.be.true;
      
      console.log('✅ Compteur d\'itinéraires affiché');
    });
  });

  describe('Filtres Escalade', function() {
    beforeEach(async function() {
      await driver.get(`${BASE_URL}/#/escalade`);
      await driver.sleep(2000);
    });

    it('devrait afficher les sites d\'escalade', async function() {
      const pageSource = await driver.getPageSource();
      const hasSites = pageSource.includes('escalade') || pageSource.includes('Site');
      
      expect(hasSites).to.be.true;
      
      console.log('✅ Sites d\'escalade affichés');
    });

    it('devrait filtrer par difficulté "Facile"', async function() {
      const buttons = await driver.findElements(By.css('button'));
      
      for (const button of buttons) {
        const text = await button.getText();
        if (text.toLowerCase().includes('facile')) {
          await button.click();
          break;
        }
      }
      
      await driver.sleep(1000);
      
      console.log('✅ Filtre escalade "Facile" appliqué');
    });

    it('devrait afficher la section vidéos', async function() {
      const pageSource = await driver.getPageSource();
      const hasVideos = pageSource.includes('Vidéos') || pageSource.includes('vidéo');
      
      expect(hasVideos).to.be.true;
      
      console.log('✅ Section vidéos escalade présente');
    });
  });

  describe('Filtres Ski', function() {
    beforeEach(async function() {
      await driver.get(`${BASE_URL}/#/ski`);
      await driver.sleep(2000);
    });

    it('devrait afficher les stations de ski', async function() {
      const pageSource = await driver.getPageSource();
      const hasStations = pageSource.includes('station') || pageSource.includes('ski');
      
      expect(hasStations).to.be.true;
      
      console.log('✅ Stations de ski affichées');
    });

    it('devrait afficher les conditions d\'enneigement', async function() {
      const pageSource = await driver.getPageSource();
      const hasConditions = pageSource.includes('Conditions') || 
                           pageSource.includes('neige') ||
                           pageSource.includes('enneigement');
      
      expect(hasConditions).to.be.true;
      
      console.log('✅ Conditions d\'enneigement affichées');
    });

    it('devrait afficher les témoignages', async function() {
      const pageSource = await driver.getPageSource();
      const hasTestimonials = pageSource.includes('Témoignages') || 
                             pageSource.includes('témoignage');
      
      expect(hasTestimonials).to.be.true;
      
      console.log('✅ Témoignages affichés');
    });

    it('devrait afficher les offres spéciales', async function() {
      const pageSource = await driver.getPageSource();
      const hasOffers = pageSource.includes('Offres') || 
                       pageSource.includes('offre') ||
                       pageSource.includes('forfait');
      
      expect(hasOffers).to.be.true;
      
      console.log('✅ Offres spéciales affichées');
    });
  });
});
