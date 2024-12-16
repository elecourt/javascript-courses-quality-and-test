# Projet Jeu du Pendu

Un jeu du pendu interactif développé avec Node.js, Playwright pour les tests end-to-end, et Jest pour les tests unitaires. Ce projet inclut une CI/CD complète avec GitHub Actions pour automatiser les tests, l'intégration continue et le déploiement.

## Badges

[![Test](https://github.com/elecourt/javascript-courses-quality-and-test/actions/workflows/node.js.yml/badge.svg)](https://github.com/elecourt/javascript-courses-quality-and-test/actions/workflows/node.js.yml)
![Coverage](https://raw.githubusercontent.com/elecourt/javascript-courses-quality-and-test/main/badges/coverage-total.svg)
![Coverage](https://raw.githubusercontent.com/elecourt/javascript-courses-quality-and-test/main/badges/coverage-branches.svg)
![Coverage](https://raw.githubusercontent.com/elecourt/javascript-courses-quality-and-test/main/badges/coverage-functions.svg)
![Coverage](https://raw.githubusercontent.com/elecourt/javascript-courses-quality-and-test/main/badges/coverage-lines.svg)
![Coverage](https://raw.githubusercontent.com/elecourt/javascript-courses-quality-and-test/main/badges/coverage-statements.svg)


## Description

Le projet implémente un jeu du pendu où les utilisateurs doivent deviner un mot en entrant des lettres. Si l'utilisateur entre une lettre incorrecte trop de fois, il perd la partie. Le projet utilise Playwright pour les tests end-to-end et Jest pour les tests unitaires, avec des outils d'intégration continue pour garantir la qualité du code.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine locale :

- [Node.js](https://nodejs.org/) (version 20 ou supérieure)
- [npm](https://www.npmjs.com/) (le gestionnaire de paquets de Node.js)

## Installation

1. Clonez le dépôt sur votre machine locale :
   ```bash
   git clone https://github.com/elecourt/javascript-courses-quality-and-test.git

2. Installez les dépendances :
   ```bash
   npm install

## Lancer le projet

Pour démarrer le projet en mode développement, utilisez la commande suivante :
```bash
   npm start
   ```
    
Cela démarrera un serveur local (par défaut sur http://localhost:3030).

## Lancer les tests
#### Tests unitaires avec Jest

Pour exécuter les tests unitaires, utilisez la commande suivante :
```bash
   npm run test:unit
   ```

Cela exécutera les tests unitaires avec Jest.

#### Tests End-to-End avec Playwright

Pour exécuter les tests end-to-end, assurez-vous que le serveur local est démarré, puis exécutez la commande suivante :
```bash
  npm run test:e2e
```

Cela exécutera les tests Playwright dans un environnement simulé pour vérifier l'intégrité de votre application dans un navigateur.

## Intégration continue

Ce projet est configuré avec GitHub Actions pour automatiser les tests sur chaque push et pull request vers la branche main. Les résultats des tests sont visibles dans l'onglet Actions de GitHub.
