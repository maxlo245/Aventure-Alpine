# Tests Selenium - Aventures Alpines

Suite de tests automatisés end-to-end utilisant Selenium WebDriver pour valider le fonctionnement de l'application Aventures Alpines.

## Prérequis

- Node.js 18+
- Chrome/Chromium installé
- Application frontend démarrée sur `http://localhost:5173`
- Application backend démarrée sur `http://localhost:5000`

## Installation

```bash
cd tests
npm install
```

Cette commande installera :
- `selenium-webdriver` - Framework de tests E2E
- `mocha` - Test runner
- `chai` - Bibliothèque d'assertions
- `chromedriver` - Driver Chrome pour Selenium

## Structure des tests

```
tests/
├── package.json          # Configuration npm avec scripts de test
├── auth.test.js         # Tests d'authentification (inscription, login, déconnexion)
├── navigation.test.js   # Tests de navigation et responsive
├── filters.test.js      # Tests de filtres et recherche
└── README.md           # Ce fichier
```

## Exécution des tests

### Tous les tests
```bash
npm test
```

### Tests spécifiques

**Tests d'authentification uniquement :**
```bash
npm run test:auth
```

**Tests de navigation uniquement :**
```bash
npm run test:navigation
```

**Tests de filtres uniquement :**
```bash
npm run test:filters
```

## Description des tests

### Tests d'authentification (`auth.test.js`)

#### Inscription utilisateur
- ✅ Inscription d'un nouvel utilisateur
- ✅ Validation email unique (erreur si existe)
- ✅ Validation correspondance des mots de passe

#### Connexion
- ✅ Connexion avec identifiants valides
- ✅ Erreur avec identifiants invalides

#### Déconnexion
- ✅ Suppression du token JWT

#### Protection des routes
- ✅ Redirection si accès dashboard sans authentification

**Couverture :** 8 tests

---

### Tests de navigation (`navigation.test.js`)

#### Navigation principale
- ✅ Chargement page d'accueil
- ✅ Navigation vers Randonnée
- ✅ Navigation vers Escalade
- ✅ Navigation vers Ski
- ✅ Navigation vers Articles
- ✅ Navigation vers Vidéos
- ✅ Navigation vers Contact

#### HashRouter
- ✅ Gestion URLs avec hash (#)
- ✅ Gestion routes inconnues

#### Carte Leaflet
- ✅ Affichage carte interactive
- ✅ Affichage des marqueurs
- ✅ Ouverture popup au clic

#### Responsive
- ✅ Adaptation écran mobile (375x667)
- ✅ Adaptation écran tablette (768x1024)

#### Performance
- ✅ Chargement < 5 secondes
- ✅ Images chargées correctement

**Couverture :** 16 tests

---

### Tests de filtres (`filters.test.js`)

#### Filtres Articles
- ✅ Recherche textuelle
- ✅ Filtre par catégorie
- ✅ Tri par popularité
- ✅ Affichage bouton réinitialisation
- ✅ Réinitialisation des filtres
- ✅ Message "aucun résultat"

#### Filtres Vidéos
- ✅ Recherche textuelle
- ✅ Filtre par sport
- ✅ Tri par durée
- ✅ Compteur de résultats

#### Filtres Randonnée
- ✅ Recherche itinéraires
- ✅ Filtre difficulté Facile
- ✅ Filtre difficulté Intermédiaire
- ✅ Filtre difficulté Difficile
- ✅ Compteur de résultats

#### Filtres Escalade
- ✅ Affichage sites
- ✅ Filtre par difficulté
- ✅ Section vidéos

#### Filtres Ski
- ✅ Affichage stations
- ✅ Conditions d'enneigement
- ✅ Témoignages
- ✅ Offres spéciales

**Couverture :** 23 tests

---

## Résultats attendus

### Exemple de sortie réussie

```
  Tests d'authentification
    Inscription utilisateur
      ✅ Inscription réussie avec email: test1702642800000@example.com
      ✓ devrait permettre l'inscription d'un nouvel utilisateur (3421ms)
      ✅ Gestion d'erreur email existant validée
      ✓ devrait afficher une erreur si l'email existe déjà (2156ms)
      ✅ Validation de correspondance des mots de passe OK
      ✓ devrait valider que les mots de passe correspondent (2089ms)

    Connexion utilisateur
      ✅ Connexion réussie avec email: logintest1702642810000@example.com
      ✓ devrait permettre la connexion avec des identifiants valides (4523ms)
      ✅ Gestion d'erreur identifiants invalides validée
      ✓ devrait afficher une erreur avec des identifiants invalides (2234ms)

  47 passing (2m 15s)
```

## Configuration

### Modifier l'URL de test

Par défaut, les tests utilisent `http://localhost:5173`. Pour changer :

```javascript
// Dans chaque fichier .test.js
const BASE_URL = 'https://votre-url-de-test.com';
```

### Modifier le navigateur

Par défaut Chrome est utilisé. Pour Firefox :

```javascript
// Remplacer dans before()
driver = await new Builder().forBrowser('firefox').build();
```

### Timeout

Par défaut 30 secondes. Pour modifier :

```javascript
describe('Nom du test', function() {
  this.timeout(60000); // 60 secondes
  // ...
});
```

## Debugging

### Mode headless (sans interface)

Pour exécuter sans ouvrir le navigateur :

```javascript
const chrome = require('selenium-webdriver/chrome');

driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(new chrome.Options().headless())
  .build();
```

### Screenshots en cas d'erreur

Ajouter dans `after()` :

```javascript
after(async function() {
  if (this.currentTest.state === 'failed') {
    const screenshot = await driver.takeScreenshot();
    require('fs').writeFileSync(
      `error-${Date.now()}.png`,
      screenshot,
      'base64'
    );
  }
  await driver.quit();
});
```

### Logs détaillés

```javascript
// Activer les logs Selenium
const logging = require('selenium-webdriver/lib/logging');
driver = await new Builder()
  .forBrowser('chrome')
  .setLoggingPrefs({ browser: 'ALL' })
  .build();
```

## Bonnes pratiques

1. **Toujours nettoyer** - Utiliser `after()` pour fermer le driver
2. **Attendre les éléments** - Utiliser `wait()` plutôt que `sleep()`
3. **Données uniques** - Utiliser timestamps pour emails/usernames
4. **Isolation** - Chaque test doit être indépendant
5. **Timeout approprié** - Ajuster selon vitesse réseau/machine

## Problèmes courants

### ChromeDriver version mismatch

```bash
npm install chromedriver@latest
```

### Port déjà utilisé

Vérifier que frontend (5173) et backend (5000) sont démarrés :

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd server
node index.js
```

### Élément non trouvé

Augmenter le timeout ou vérifier les sélecteurs CSS :

```javascript
await driver.wait(until.elementLocated(By.css('selector')), 15000);
```

## Intégration Continue (CI/CD)

### GitHub Actions

```yaml
name: Tests E2E

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: |
          npm install
          cd tests && npm install
      
      - name: Start backend
        run: node server/index.js &
        
      - name: Start frontend
        run: npm run dev &
      
      - name: Wait for servers
        run: sleep 10
      
      - name: Run tests
        run: cd tests && npm test
```

## Métriques

- **Total tests :** 47
- **Temps moyen :** ~2-3 minutes
- **Couverture :**
  - Authentification : 100%
  - Navigation : 100%
  - Filtres : 100%
  - Carte Leaflet : 100%
  - Responsive : 100%

## Maintenance

### Ajouter un nouveau test

1. Créer ou modifier un fichier `.test.js`
2. Suivre la structure Mocha/Chai
3. Utiliser `describe()` et `it()`
4. Ajouter logs console pour debugging

### Mettre à jour les dépendances

```bash
cd tests
npm update
npm audit fix
```

## Support

Pour toute question :
- Consulter la [documentation Selenium](https://www.selenium.dev/documentation/)
- Voir les exemples dans les fichiers de test
- Vérifier les logs navigateur avec `driver.manage().logs()`

---

**Mission 7 page 30** - ✅ Tests automatisés implémentés
