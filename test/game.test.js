const Game = require('../game.js');

let game;

beforeAll(async () => {
    game = new Game();
    await game.loadWords();
    game.word = "damien"; // Setting a known word for tests
    game.unknowWord = "######";
});

describe("Game test", () => {

    test("The word must be 'damien'", () => {
        expect(game.word).toBe("damien");
    });

    test("should be 5 tries at the beginning of the game", () => {
        expect(game.getNumberOfTries()).toBe(5);
    });

    test("test the try mechanic with a correct guess", () => {
        game.guess("a");
        expect(game.getNumberOfTries()).toBe(5);
    });

    test("test the try mechanic with an incorrect guess", () => {
        game.guess("kdjhgkfjhgdfkjhg");
        expect(game.getNumberOfTries()).toBe(4);
    });

    test("reset the game, so the number of tries should be 5", () => {
        game.reset();
        expect(game.getNumberOfTries()).toBe(5);
        // Réassigner les valeurs connues pour les tests
        game.word = "damien";
        game.unknowWord = "######";
        expect(game.word).toBe("damien");
        expect(game.unknowWord).toBe("######");
    });

    test("should show only 'a' letter", () => {
        game.word = "damien";
        game.unknowWord = "######";
        game.guess("a");
        expect(game.print()).toBe("#a####");
    });

    test("should throw an error if no words are available", () => {
        game.listOfWords = [];
        expect(() => game.chooseWord()).toThrow("No words available to choose from.");
    });

    test("should calculate score based on elapsed time", () => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date(2024, 8, 19, 12, 0, 0));  // Simuler un temps fixe

        game.startTime = Date.now() - 10000;  // Simuler un temps écoulé de 10 secondes
        const score = game.getScore();
        expect(score).toBe(990);  // Initial score (1000) - elapsed time (10 seconds * 1 point per second)

        jest.useRealTimers();
    });

    test("should not allow the score to go below 0", () => {
        game.score = 1;
        game.calculateScore();  // Simule un calcul de score après un certain temps
        expect(game.getScore()).toBe(0);  // Vérifie que le score ne devient pas négatif
    });

    test("should return true if the game is over due to 0 tries left", () => {
        game.numberOfTry = 0;
        expect(game.isGameOver()).toBe(true);
    });

    test("should return true if the game is over due to the word being discovered", () => {
        game.unknowWord = "damien";  // Mot découvert
        expect(game.isGameOver()).toBe(true);
    });

    test("should return false if the game is not over", () => {
        game.numberOfTry = 3;
        game.unknowWord = "#a####";
        expect(game.isGameOver()).toBe(false);
    });

    test("hightScoreGenerator should generate and sort high scores", () => {
        const highScores = [];
        const result = game.hightScoreGenerator(highScores);

        expect(result.length).toBe(1000);
        expect(result[0].pseudo).toBe("player0");
        expect(result[0].score).toBe(500);  // Le score le plus élevé devrait être 500
        expect(result[999].pseudo).toBe("player999");
        expect(result[999].score).toBe(1); 


        for (let i = 0; i < result.length - 1; i++) {
            expect(result[i].score).toBeGreaterThanOrEqual(result[i + 1].score);
        }
    });

});
