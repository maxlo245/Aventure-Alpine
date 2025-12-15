const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Tests de navigation', function() {
  this.timeout(30000);
  let driver;
  const BASE_URL = 'http://localhost:5173';

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function() {
    await driver.quit();
  });

  describe('Navigation principale', function() {
    it('devrait charger la page d\'accueil', async function() {
      await driver.get(BASE_URL);
      
      await driver.wait(until.elementLocated(By.css('h1')), 10000);
      
      const title = await driver.findElement(By.css('h1')).getText();
      expect(title).to.include('Aventures Alpines');
      
      console.log('✅ Page d\'accueil chargée');
    });

    it('devrait naviguer vers la page Randonnée', async function() {
      await driver.get(BASE_URL);
      
      await driver.wait(until.elementLocated(By.linkText('Randonnée')), 10000);
      await driver.findElement(By.linkText('Randonnée')).click();
      
      await driver.wait(until.urlContains('randonnee'), 10000);
      
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('randonnee');
      
      // Vérifier le contenu spécifique à la page
      const pageSource = await driver.getPageSource();
      expect(pageSource).to.include('Randonnée en Montagne');
      
      console.log('✅ Navigation vers Randonnée OK');
    });

    it('devrait naviguer vers la page Escalade', async function() {
      await driver.get(BASE_URL);
      
      await driver.wait(until.elementLocated(By.linkText('Escalade')), 10000);
      await driver.findElement(By.linkText('Escalade')).click();
      
      await driver.wait(until.urlContains('escalade'), 10000);
      
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('escalade');
      
      const pageSource = await driver.getPageSource();
      expect(pageSource).to.include('Escalade en Montagne');
      
      console.log('✅ Navigation vers Escalade OK');
    });

    it('devrait naviguer vers la page Ski', async function() {
      await driver.get(BASE_URL);
      
      await driver.wait(until.elementLocated(By.linkText('Ski')), 10000);
      await driver.findElement(By.linkText('Ski')).click();
      
      await driver.wait(until.urlContains('ski'), 10000);
      
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('ski');
      
      const pageSource = await driver.getPageSource();
      expect(pageSource).to.include('Ski en Montagne');
      
      console.log('✅ Navigation vers Ski OK');
    });

    it('devrait naviguer vers la page Articles', async function() {
      await driver.get(BASE_URL);
      
      await driver.wait(until.elementLocated(By.linkText('Articles')), 10000);
      await driver.findElement(By.linkText('Articles')).click();
      
      await driver.wait(until.urlContains('articles'), 10000);
      
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('articles');
      
      const pageSource = await driver.getPageSource();
      expect(pageSource).to.include('Articles');
      
      console.log('✅ Navigation vers Articles OK');
    });

    it('devrait naviguer vers la page Vidéos', async function() {
      await driver.get(BASE_URL);
      
      await driver.wait(until.elementLocated(By.linkText('Vidéos')), 10000);
      await driver.findElement(By.linkText('Vidéos')).click();
      
      await driver.wait(until.urlContains('videos'), 10000);
      
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('videos');
      
      const pageSource = await driver.getPageSource();
      expect(pageSource).to.include('Vidéos');
      
      console.log('✅ Navigation vers Vidéos OK');
    });

    it('devrait naviguer vers la page Contact', async function() {
      await driver.get(BASE_URL);
      
      await driver.wait(until.elementLocated(By.linkText('Contact')), 10000);
      await driver.findElement(By.linkText('Contact')).click();
      
      await driver.wait(until.urlContains('contact'), 10000);
      
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('contact');
      
      console.log('✅ Navigation vers Contact OK');
    });
  });

  describe('Navigation avec HashRouter', function() {
    it('devrait gérer correctement les URLs avec hash (#)', async function() {
      await driver.get(`${BASE_URL}/#/randonnee`);
      
      await driver.sleep(2000);
      
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('#/randonnee');
      
      const pageSource = await driver.getPageSource();
      expect(pageSource).to.include('Randonnée');
      
      console.log('✅ HashRouter fonctionne correctement');
    });

    it('devrait afficher la page d\'accueil pour une route inconnue', async function() {
      await driver.get(`${BASE_URL}/#/route-inexistante`);
      
      await driver.sleep(2000);
      
      // Vérifier qu'une page est affichée (soit 404 soit redirection vers accueil)
      const pageSource = await driver.getPageSource();
      const hasContent = pageSource.includes('Aventures Alpines') || pageSource.includes('404');
      
      expect(hasContent).to.be.true;
      
      console.log('✅ Gestion des routes inconnues OK');
    });
  });

  describe('Carte interactive Leaflet', function() {
    it('devrait afficher la carte Leaflet sur la page Randonnée', async function() {
      await driver.get(`${BASE_URL}/#/randonnee`);
      
      await driver.wait(until.elementLocated(By.css('.leaflet-container')), 10000);
      
      const mapElement = await driver.findElement(By.css('.leaflet-container'));
      const isDisplayed = await mapElement.isDisplayed();
      
      expect(isDisplayed).to.be.true;
      
      console.log('✅ Carte Leaflet chargée sur page Randonnée');
    });

    it('devrait afficher des marqueurs sur la carte', async function() {
      await driver.get(`${BASE_URL}/#/randonnee`);
      
      await driver.wait(until.elementLocated(By.css('.leaflet-marker-icon')), 15000);
      
      const markers = await driver.findElements(By.css('.leaflet-marker-icon'));
      expect(markers.length).to.be.greaterThan(0);
      
      console.log(`✅ ${markers.length} marqueur(s) affiché(s) sur la carte`);
    });

    it('devrait ouvrir un popup au clic sur un marqueur', async function() {
      await driver.get(`${BASE_URL}/#/randonnee`);
      
      await driver.wait(until.elementLocated(By.css('.leaflet-marker-icon')), 15000);
      
      const marker = await driver.findElement(By.css('.leaflet-marker-icon'));
      await marker.click();
      
      await driver.sleep(1000);
      
      // Vérifier la présence d'un popup
      const popups = await driver.findElements(By.css('.leaflet-popup'));
      expect(popups.length).to.be.greaterThan(0);
      
      console.log('✅ Popup de marqueur fonctionne');
    });
  });

  describe('Responsive design', function() {
    it('devrait s\'adapter à un écran mobile', async function() {
      await driver.manage().window().setRect({ width: 375, height: 667 });
      
      await driver.get(BASE_URL);
      
      await driver.wait(until.elementLocated(By.css('h1')), 10000);
      
      const title = await driver.findElement(By.css('h1'));
      const isDisplayed = await title.isDisplayed();
      
      expect(isDisplayed).to.be.true;
      
      console.log('✅ Design responsive mobile OK');
      
      // Restaurer la taille normale
      await driver.manage().window().setRect({ width: 1280, height: 720 });
    });

    it('devrait s\'adapter à un écran tablette', async function() {
      await driver.manage().window().setRect({ width: 768, height: 1024 });
      
      await driver.get(BASE_URL);
      
      await driver.wait(until.elementLocated(By.css('h1')), 10000);
      
      const title = await driver.findElement(By.css('h1'));
      const isDisplayed = await title.isDisplayed();
      
      expect(isDisplayed).to.be.true;
      
      console.log('✅ Design responsive tablette OK');
      
      // Restaurer la taille normale
      await driver.manage().window().setRect({ width: 1280, height: 720 });
    });
  });

  describe('Performance et chargement', function() {
    it('devrait charger la page d\'accueil en moins de 5 secondes', async function() {
      const startTime = Date.now();
      
      await driver.get(BASE_URL);
      await driver.wait(until.elementLocated(By.css('h1')), 10000);
      
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).to.be.lessThan(5000);
      
      console.log(`✅ Page chargée en ${loadTime}ms`);
    });

    it('devrait charger les images correctement', async function() {
      await driver.get(`${BASE_URL}/#/randonnee`);
      
      await driver.wait(until.elementLocated(By.css('img')), 10000);
      
      const images = await driver.findElements(By.css('img'));
      
      // Vérifier qu'au moins une image est chargée
      let loadedImages = 0;
      for (const img of images) {
        const src = await img.getAttribute('src');
        if (src && src.length > 0) {
          loadedImages++;
        }
      }
      
      expect(loadedImages).to.be.greaterThan(0);
      
      console.log(`✅ ${loadedImages} image(s) chargée(s)`);
    });
  });
});
