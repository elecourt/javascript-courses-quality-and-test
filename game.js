const tools = require('./tools.js');
const csv = require('csv-parser');
const fs = require('fs');

class Game {

    constructor() {
        this.listOfWords = [];
        this.numberOfTry = 5;
        //npm install csv-parser
        fs.createReadStream('words_fr.txt')
            .pipe(csv())
            .on('data', (row) => {
                this.listOfWords.push(row.word.toLowerCase());
            })
            .on('end', () => {
                //console.log(this.listOfWords);
                console.log('CSV file successfully processed');
                this.chooseWord();
            });
    }

    chooseWord() {
        this.word = this.listOfWords[tools.getRandomInt(this.listOfWords.length)];
        this.unknowWord = this.word.replace(/./g, '#');
    }

    guess(oneLetter) {
        if (this.word.includes(oneLetter)) {
            this.unknowWord = tools.replaceAt(this.unknowWord, this.word.indexOf(oneLetter), oneLetter);
            return true;
        }
        this.numberOfTry--;
        return false
    }

    print() {
        return this.unknowWord;
    }

    getNumberOfTries() {
        return this.numberOfTry;
    }

    reset() {
        this.numberOfTry = 5;
        this.chooseWord();
        return this.numberOfTry;
    };

}

module.exports = Game;
