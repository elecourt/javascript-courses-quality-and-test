const Game = require('../game.js');
const assert = require('assert').strict;

let game = new Game();
game.word = "damien";
game.unknowWord = "######";

describe("Game test", function() {

    it("The word must be 'damien'", function () {
        assert.equal(game.word, "damien");
    });

    it("should be 5 try a the begining of the game", function () {
        assert.equal(game.getNumberOfTries(), 5);
    });

    it("test the try mechanic with a right quess", function () {
        game.guess("a");
        assert.equal(game.getNumberOfTries(), 5);
    });

    it("test the try mechanic with a wrong quess", function () {
        game.guess("kdjhgkfjhgdfkjhg");
        assert.equal(game.getNumberOfTries(), 4);
    });

    it("reset the game, so the number of try should be 5", function () {
        game.reset();
        assert.equal(game.getNumberOfTries(), 5);
        game.word = "damien";
        game.unknowWord = "######";
    });

    it("should show only 'a' letter", function() {
        game.guess("a");
        console.log(game.word) ;
        console.log(game.unknowWord) ;
        assert.equal(game.print(), "#a####");
    });

});
