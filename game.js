const tools = require('./tools.js');
const csv = require('csv-parser');
const fs = require('fs');
const crypto = require('crypto');

class Game {
    constructor() {
        this.listOfWords = [];
        this.numberOfTry = 5;
        this.startTime = null;
        this.score = 1000;
        this.word = null;
        this.unknowWord = null;
    }

    // Charger les mots à partir d'un fichier CSV
    loadWords() {
        return new Promise((resolve, reject) => {
            fs.createReadStream('words_fr.txt')
                .pipe(csv())
                .on('data', (row) => {
                    this.listOfWords.push(row.word.toLowerCase()); // Ajout des mots dans la liste
                })
                .on('end', () => {
                    console.log('CSV file successfully processed');
                    this.chooseWord(); // Choisir un mot dès que le fichier est chargé
                    resolve();
                })
                .on('error', reject);
        });
    }

    // Choisir un mot basé sur une valeur de hachage
    chooseWord() {
        if (this.listOfWords.length > 0) {
            const dateHash = crypto.createHash('md5').update(new Date().toDateString()).digest('hex');
            const index = parseInt(dateHash.substring(0, 8), 16) % this.listOfWords.length;
            this.word = this.listOfWords[index];
            this.unknowWord = this.word.replace(/./g, '#');
            this.startTime = Date.now();
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

        // Vérifier chaque lettre du mot
        for (let i = 0; i < this.word.length; i++) {
            if (this.word[i] === oneLetter) {
                newUnknowWord += oneLetter;
                found = true;
            } else {
                newUnknowWord += this.unknowWord[i];
            }
        }

        this.unknowWord = newUnknowWord;

        // Si la lettre n'est pas trouvée, diminuer les tentatives et le score
        if (!found) {
            this.numberOfTry--;
            this.score -= 50;  // Réduction du score en cas de mauvaise réponse
        }

        return found;
    }

    // Calculer le score
    calculateScore() {
        const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000); // Temps écoulé en secondes
        this.score -= elapsedTime; // Réduction du score selon le temps
        if (this.score < 0) this.score = 0; // Le score ne peut pas être inférieur à 0
        return this.score;
    }

    // Récupérer le score actuel
    getScore() {
        return this.calculateScore(); 
    }

    // Afficher l'état actuel du mot avec les lettres devinées
    print() {
        return this.unknowWord;
    }

    // Récupérer le nombre de tentatives restantes
    getNumberOfTries() {
        return this.numberOfTry;
    }

    // Réinitialiser le jeu
    reset() {
        this.numberOfTry = 5;
        this.score = 1000;
        this.chooseWord(); // Choisir un nouveau mot
        this.startTime = Date.now(); // Réinitialiser l'heure de début
    }

    // Vérifier si le jeu est terminé
    isGameOver() {
        return this.numberOfTry === 0 || !this.unknowWord.includes('#');
    }

    // Générer et trier les meilleurs scores
    hightScoreGenerator(liste) {
        var x = liste.length;
        
        // Remplir la liste jusqu'à 1000 joueurs avec des scores allant de 500 à 1
        while (x < 1000) {
            var pseudo = "player" + String(x);
            var score = Math.max(500 - x, 1);  // Garantir que le score ne soit jamais inférieur à 1
            liste.push({ pseudo: pseudo, score: score });
            x++;
        }
    
        // Trier la liste par score en ordre décroissant
        liste.sort((a, b) => b.score - a.score);
    
        return liste;
    }    
}

module.exports = Game;
