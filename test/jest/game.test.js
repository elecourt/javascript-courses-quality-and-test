const Game = require('../../game.js');

let game;

beforeAll(async () => {
    game = new Game();
    await game.loadWords();
    game.word = "emeline";
    game.unknowWord = "#######";
});

describe("Game test", () => {

    test("The word must be 'emeline'", () => {
        expect(game.word).toBe("emeline");
    });

    test("5 tries for the game", () => {
        expect(game.getNumberOfTries()).toBe(5);
    });

    test("with correct guess", () => {
        game.guess("e");
        expect(game.getNumberOfTries()).toBe(5);
    });

    test("with an incorrect guess", () => {
        game.guess("x");
        expect(game.getNumberOfTries()).toBe(4);
    });

    test("reset the game", () => {
        game.reset();
        expect(game.getNumberOfTries()).toBe(5);
        game.word = "emeline";
        game.unknowWord = "#######";
        expect(game.word).toBe("emeline");
        expect(game.unknowWord).toBe("#######");
    });

    test("show only 'e'", () => {
        game.word = "emeline";
        game.unknowWord = "#######";
        game.guess("e");
        expect(game.print()).toBe("e#e###e");
    });

    test("throw an error if no words are available", () => {
        game.listOfWords = [];
        expect(() => game.chooseWord()).toThrow("No words available to choose from.");
    });

    test("calculate score based on elapsed time", () => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date(2024, 8, 19, 12, 0, 0));
        game.startTime = Date.now() - 10000;
        const score = game.getScore();
        expect(score).toBe(990);
        jest.useRealTimers();
    });

    test("should not allow the score to go below 0", () => {
        game.score = 1;
        game.calculateScore();
        expect(game.getScore()).toBe(0);
    });

    test("should return true if the game is over due to 0 tries left", () => {
        game.numberOfTry = 0;
        expect(game.isGameOver()).toBe(true);
    });

    test("should return true if the game is over due to the word being discovered", () => {
        game.unknowWord = "emeline";
        expect(game.isGameOver()).toBe(true);
    });

    test("should return false if the game is not over", () => {
        game.numberOfTry = 3;
        game.unknowWord = "e#e###e";
        expect(game.isGameOver()).toBe(false);
    });

    test("generate hightScoreGenerator", () => {
        const highScores = [];
        const result = game.hightScoreGenerator(highScores);
        expect(result.length).toBe(1000);
        expect(result[0].pseudo).toBe("player0");
        expect(result[0].score).toBe(500);
        expect(result[999].pseudo).toBe("player999");
        expect(result[999].score).toBe(1);
        for (let i = 0; i < result.length - 1; i++) {
            expect(result[i].score).toBeGreaterThanOrEqual(result[i + 1].score);
        }
    });

});
