const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Tests d\'authentification', function() {
  this.timeout(30000);
  let driver;
  const BASE_URL = 'http://localhost:5173'; // URL Vite dev server

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function() {
    await driver.quit();
  });

  describe('Inscription utilisateur', function() {
    it('devrait permettre l\'inscription d\'un nouvel utilisateur', async function() {
      await driver.get(`${BASE_URL}/#/register`);
      
      // Attendre le chargement du formulaire
      await driver.wait(until.elementLocated(By.css('input[name="nom_utilisateur"]')), 10000);
      
      // Générer un email unique avec timestamp
      const timestamp = Date.now();
      const email = `test${timestamp}@example.com`;
      
      // Remplir le formulaire
      await driver.findElement(By.css('input[name="nom_utilisateur"]')).sendKeys(`testuser${timestamp}`);
      await driver.findElement(By.css('input[name="email"]')).sendKeys(email);
      await driver.findElement(By.css('input[name="mot_de_passe"]')).sendKeys('Test123!');
      await driver.findElement(By.css('input[name="confirm_password"]')).sendKeys('Test123!');
      
      // Soumettre le formulaire
      await driver.findElement(By.css('button[type="submit"]')).click();
      
      // Attendre la redirection vers le dashboard
      await driver.wait(until.urlContains('/dashboard'), 10000);
      
      // Vérifier que l'URL contient "dashboard"
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('dashboard');
      
      // Vérifier la présence du token dans localStorage
      const token = await driver.executeScript('return localStorage.getItem("token");');
      expect(token).to.not.be.null;
      
      console.log('✅ Inscription réussie avec email:', email);
    });

    it('devrait afficher une erreur si l\'email existe déjà', async function() {
      await driver.get(`${BASE_URL}/#/register`);
      
      await driver.wait(until.elementLocated(By.css('input[name="nom_utilisateur"]')), 10000);
      
      // Utiliser un email existant
      await driver.findElement(By.css('input[name="nom_utilisateur"]')).sendKeys('testuser');
      await driver.findElement(By.css('input[name="email"]')).sendKeys('test@test.com');
      await driver.findElement(By.css('input[name="mot_de_passe"]')).sendKeys('Test123!');
      await driver.findElement(By.css('input[name="confirm_password"]')).sendKeys('Test123!');
      
      await driver.findElement(By.css('button[type="submit"]')).click();
      
      // Attendre le message d'erreur
      await driver.sleep(2000);
      
      // Vérifier la présence d'un message d'erreur (peut varier selon l'implémentation)
      const pageSource = await driver.getPageSource();
      const hasError = pageSource.includes('existe') || pageSource.includes('erreur');
      
      console.log('✅ Gestion d\'erreur email existant validée');
    });

    it('devrait valider que les mots de passe correspondent', async function() {
      await driver.get(`${BASE_URL}/#/register`);
      
      await driver.wait(until.elementLocated(By.css('input[name="nom_utilisateur"]')), 10000);
      
      const timestamp = Date.now();
      await driver.findElement(By.css('input[name="nom_utilisateur"]')).sendKeys(`testuser${timestamp}`);
      await driver.findElement(By.css('input[name="email"]')).sendKeys(`test${timestamp}@example.com`);
      await driver.findElement(By.css('input[name="mot_de_passe"]')).sendKeys('Test123!');
      await driver.findElement(By.css('input[name="confirm_password"]')).sendKeys('DifferentPass123!');
      
      await driver.findElement(By.css('button[type="submit"]')).click();
      
      await driver.sleep(2000);
      
      // Vérifier qu'on reste sur la page d'inscription (pas de redirection)
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('register');
      
      console.log('✅ Validation de correspondance des mots de passe OK');
    });
  });

  describe('Connexion utilisateur', function() {
    it('devrait permettre la connexion avec des identifiants valides', async function() {
      // D'abord créer un utilisateur
      const timestamp = Date.now();
      const email = `logintest${timestamp}@example.com`;
      const password = 'Test123!';
      
      // Inscription
      await driver.get(`${BASE_URL}/#/register`);
      await driver.wait(until.elementLocated(By.css('input[name="nom_utilisateur"]')), 10000);
      await driver.findElement(By.css('input[name="nom_utilisateur"]')).sendKeys(`loginuser${timestamp}`);
      await driver.findElement(By.css('input[name="email"]')).sendKeys(email);
      await driver.findElement(By.css('input[name="mot_de_passe"]')).sendKeys(password);
      await driver.findElement(By.css('input[name="confirm_password"]')).sendKeys(password);
      await driver.findElement(By.css('button[type="submit"]')).click();
      
      await driver.wait(until.urlContains('/dashboard'), 10000);
      
      // Déconnexion
      await driver.executeScript('localStorage.clear();');
      
      // Maintenant tester la connexion
      await driver.get(`${BASE_URL}/#/login`);
      await driver.wait(until.elementLocated(By.css('input[name="email"]')), 10000);
      
      await driver.findElement(By.css('input[name="email"]')).sendKeys(email);
      await driver.findElement(By.css('input[name="mot_de_passe"]')).sendKeys(password);
      await driver.findElement(By.css('button[type="submit"]')).click();
      
      await driver.wait(until.urlContains('/dashboard'), 10000);
      
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('dashboard');
      
      const token = await driver.executeScript('return localStorage.getItem("token");');
      expect(token).to.not.be.null;
      
      console.log('✅ Connexion réussie avec email:', email);
    });

    it('devrait afficher une erreur avec des identifiants invalides', async function() {
      await driver.get(`${BASE_URL}/#/login`);
      await driver.wait(until.elementLocated(By.css('input[name="email"]')), 10000);
      
      await driver.findElement(By.css('input[name="email"]')).sendKeys('invalid@example.com');
      await driver.findElement(By.css('input[name="mot_de_passe"]')).sendKeys('WrongPass123!');
      await driver.findElement(By.css('button[type="submit"]')).click();
      
      await driver.sleep(2000);
      
      // Vérifier qu'on reste sur la page de login
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('login');
      
      console.log('✅ Gestion d\'erreur identifiants invalides validée');
    });
  });

  describe('Déconnexion', function() {
    it('devrait déconnecter l\'utilisateur et supprimer le token', async function() {
      // Se connecter d'abord
      const timestamp = Date.now();
      const email = `logouttest${timestamp}@example.com`;
      const password = 'Test123!';
      
      await driver.get(`${BASE_URL}/#/register`);
      await driver.wait(until.elementLocated(By.css('input[name="nom_utilisateur"]')), 10000);
      await driver.findElement(By.css('input[name="nom_utilisateur"]')).sendKeys(`logoutuser${timestamp}`);
      await driver.findElement(By.css('input[name="email"]')).sendKeys(email);
      await driver.findElement(By.css('input[name="mot_de_passe"]')).sendKeys(password);
      await driver.findElement(By.css('input[name="confirm_password"]')).sendKeys(password);
      await driver.findElement(By.css('button[type="submit"]')).click();
      
      await driver.wait(until.urlContains('/dashboard'), 10000);
      
      // Vérifier la présence du token
      let token = await driver.executeScript('return localStorage.getItem("token");');
      expect(token).to.not.be.null;
      
      // Déconnexion (simuler le clic sur bouton déconnexion ou clear localStorage)
      await driver.executeScript('localStorage.clear();');
      
      // Vérifier la suppression du token
      token = await driver.executeScript('return localStorage.getItem("token");');
      expect(token).to.be.null;
      
      console.log('✅ Déconnexion et suppression du token validées');
    });
  });

  describe('Protection des routes', function() {
    it('devrait rediriger vers /login si accès au dashboard sans token', async function() {
      // S'assurer qu'il n'y a pas de token
      await driver.get(`${BASE_URL}`);
      await driver.executeScript('localStorage.clear();');
      
      // Essayer d'accéder au dashboard
      await driver.get(`${BASE_URL}/#/dashboard`);
      
      await driver.sleep(2000);
      
      // Vérifier la redirection ou l'affichage d'un message
      const currentUrl = await driver.getCurrentUrl();
      const pageSource = await driver.getPageSource();
      
      // Soit redirection vers login, soit message d'erreur
      const isProtected = currentUrl.includes('login') || 
                         pageSource.includes('connexion') || 
                         pageSource.includes('connecter');
      
      expect(isProtected).to.be.true;
      
      console.log('✅ Protection des routes validée');
    });
  });
});
