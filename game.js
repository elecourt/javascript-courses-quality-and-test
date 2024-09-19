const tools = require('./tools.js');
const csv = require('csv-parser');
const fs = require('fs');
const crypto = require('crypto');

class Game {
    constructor() {
        this.listOfWords = [];
        this.numberOfTry = 5;  // Nombre de tentatives initialisé
        this.startTime = null;  // Temps de début de la partie
        this.score = 1000;  // Score initial
        this.word = null;  // Le mot à deviner
        this.unknowWord = null;  // Le mot masqué avec des #
    }

    // Méthode pour charger les mots depuis un fichier CSV
    loadWords() {
        return new Promise((resolve, reject) => {
            fs.createReadStream('words_fr.txt')
                .pipe(csv())
                .on('data', (row) => {
                    this.listOfWords.push(row.word.toLowerCase());
                })
                .on('end', () => {
                    console.log('CSV file successfully processed');
                    this.chooseWord();
                    resolve();
                })
                .on('error', reject);
        });
    }

    // Choisir un mot aléatoire basé sur la date du jour
    chooseWord() {
        if (this.listOfWords.length > 0) {
            const dateHash = crypto.createHash('md5').update(new Date().toDateString()).digest('hex');
            const index = parseInt(dateHash.substring(0, 8), 16) % this.listOfWords.length;
            this.word = this.listOfWords[index];
            this.unknowWord = this.word.replace(/./g, '#');
            this.startTime = Date.now();  // Début de la partie
        } else {
            throw new Error("No words available to choose from.");
        }
    }

    // Deviner une lettre
    guess(oneLetter) {
        if (!this.word) {
            throw new Error("The word has not been set. Please ensure that the game has been initialized properly.");
        }

        let found = false;
        let newUnknowWord = '';

        // Révéler les lettres correspondantes dans le mot masqué
        for (let i = 0; i < this.word.length; i++) {
            if (this.word[i] === oneLetter) {
                newUnknowWord += oneLetter;
                found = true;
            } else {
                newUnknowWord += this.unknowWord[i];
            }
        }

        this.unknowWord = newUnknowWord;

        // Si la lettre n'a pas été trouvée, on décrémente les essais et le score
        if (!found) {
            this.numberOfTry--;
            this.score -= 50;
        }

        // Vérifie si le mot est découvert
        return found;
    }

    // Calcul du score basé sur le temps écoulé
    calculateScore() {
        const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);  // Temps écoulé en secondes
        this.score -= elapsedTime;  // Déduit le temps écoulé du score
        if (this.score < 0) this.score = 0;  // Empêche que le score soit négatif
        return this.score;
    }

    // Retourner le score actuel
    getScore() {
        return this.calculateScore();  // Utilise calculateScore pour inclure le facteur du temps
    }

    // Retourner l'état du mot masqué
    print() {
        return this.unknowWord;
    }

    // Retourner le nombre de tentatives restantes
    getNumberOfTries() {
        return this.numberOfTry;
    }

    // Réinitialiser le jeu (nouveau mot, tentatives et score)
    reset() {
        this.numberOfTry = 5;
        this.score = 1000;
        this.chooseWord();  // Choisir un nouveau mot
        this.startTime = Date.now();  // Réinitialiser le temps de début
    }

    // Vérifier si le jeu est terminé (plus de tentatives ou mot découvert)
    isGameOver() {
        return this.numberOfTry === 0 || !this.unknowWord.includes('#');
    }

    hightScoreGenerator(liste){
        var x = liste.length;
        
        while (x < 1000){
            var pseudo = "player" + String(x);
            var score = 500 - x
            liste.push({ pseudo: pseudo, score: score })
            x++
        }

        liste.sort((a, b) => b.score - a.score);

        return liste;
    }
}

module.exports = Game;
