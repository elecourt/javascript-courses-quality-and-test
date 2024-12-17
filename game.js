//const tools = require('./tools.js');
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

    guess(oneLetter) {
        if (!this.word) {
            throw new Error("The word has not been set. Please ensure that the game has been initialized properly.");
        }

        let found = false;
        let newUnknowWord = '';

        for (let i = 0; i < this.word.length; i++) {
            if (this.word[i] === oneLetter) {
                newUnknowWord += oneLetter;
                found = true;
            } else {
                newUnknowWord += this.unknowWord[i];
            }
        }

        this.unknowWord = newUnknowWord;

        if (!found) {
            this.numberOfTry--;
            this.score -= 50;
        }

        return found;
    }

    calculateScore() {
        const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        this.score -= elapsedTime;
        if (this.score < 0) this.score = 0; 
        return this.score;
    }

    getScore() {
        return this.calculateScore(); 
    }

    print() {
        return this.unknowWord;
    }

    getNumberOfTries() {
        return this.numberOfTry;
    }

    reset() {
        this.numberOfTry = 5;
        this.score = 1000;
        this.chooseWord();
        this.startTime = Date.now();
    }

    isGameOver() {
        return this.numberOfTry === 0 || !this.unknowWord.includes('#');
    }

    hightScoreGenerator(liste) {
        var x = liste.length;
        
        while (x < 1000) {
            var pseudo = "player" + String(x);
            var score = Math.max(500 - x, 1);
            liste.push({ pseudo: pseudo, score: score });
            x++;
        }
    
        liste.sort((a, b) => b.score - a.score);
    
        return liste;
    }    
}

module.exports = Game;
