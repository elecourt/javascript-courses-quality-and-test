# Projet Jeu du Pendu

Un jeu du pendu interactif développé avec Node.js, Playwright pour les tests end-to-end, et Jest pour les tests unitaires. Ce projet inclut une CI/CD complète avec GitHub Actions pour automatiser les tests, l'intégration continue et le déploiement.

## Badges

[![CI](https://img.shields.io/github/workflow/status/elecourt/javascript-courses-quality-and-test/CI)](https://github.com/elecourt/javascript-courses-quality-and-test/actions?query=workflow%3ACI)  
[![Jest](https://img.shields.io/github/workflow/status/elecourt/javascript-courses-quality-and-test/Jest)](https://github.com/elecourt/javascript-courses-quality-and-test/actions?query=workflow%3AJest)  
[![Coverage](https://img.shields.io/coveralls/github/elecourt/javascript-courses-quality-and-test)](https://coveralls.io/github/elecourt/javascript-courses-quality-and-test)

## Description

Le projet implémente un jeu du pendu où les utilisateurs doivent deviner un mot en entrant des lettres. Si l'utilisateur entre une lettre incorrecte trop de fois, il perd la partie. Le projet utilise Playwright pour les tests end-to-end et Jest pour les tests unitaires, avec des outils d'intégration continue pour garantir la qualité du code.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine locale :

- [Node.js](https://nodejs.org/) (version 20 ou supérieure)
- [npm](https://www.npmjs.com/) (le gestionnaire de paquets de Node.js)

## Installation

1. Clonez le dépôt sur votre machine locale :
   ```bash
   git clone https://github.com/votre-utilisateur/votre-repository.git

2. Accédez au répertoire du projet :
   ```bash
   cd votre-repository

3. Installez les dépendances :
   ```bash
   npm install

## Lancer le projet

Pour démarrer le projet en mode développement, utilisez la commande suivante :
   ```bash
   npm start

Cela démarrera un serveur local (par défaut sur http://localhost:3030).