const Game = require('../game.js');

let game;

beforeAll(async () => {
    game = new Game();
    await game.loadWords();  // Charger les mots depuis le fichier CSV
    game.word = "damien"; // Définir un mot pour les tests
    game.unknowWord = "######"; // Mot caché avec des '#'
});

describe("Game test", () => {

    test("The word must be 'damien'", () => {
        expect(game.word).toBe("damien");
    });

    test("should be 5 tries at the beginning of the game", () => {
        expect(game.getNumberOfTries()).toBe(5); // Vérifier qu'il y a 5 essais au départ
    });

    test("test the try mechanic with a correct guess", () => {
        game.guess("a");
        expect(game.getNumberOfTries()).toBe(5);  // Le nombre de tentatives ne change pas si la lettre est correcte
    });

    test("test the try mechanic with an incorrect guess", () => {
        game.guess("x");
        expect(game.getNumberOfTries()).toBe(4);  // Le nombre de tentatives doit diminuer si la lettre est incorrecte
    });

    test("reset the game, so the number of tries should be 5", () => {
        game.reset();
        expect(game.getNumberOfTries()).toBe(5);  // Après réinitialisation, il y a 5 tentatives
        // Réinitialiser également les valeurs du mot
        game.word = "damien";
        game.unknowWord = "######";
        expect(game.word).toBe("damien");
        expect(game.unknowWord).toBe("######");
    });

    test("should show only 'a' letter after guessing 'a'", () => {
        game.word = "damien";
        game.unknowWord = "######";
        game.guess("a");
        expect(game.print()).toBe("#a####");  // La lettre 'a' doit être dévoilée, les autres lettres restent cachées
    });

    test("should throw an error if no words are available", () => {
        game.listOfWords = [];  // Simuler l'absence de mots
        expect(() => game.chooseWord()).toThrow("No words available to choose from.");  // Vérifier que l'erreur est lancée
    });

    test("should calculate score based on elapsed time", () => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date(2024, 8, 19, 12, 0, 0));  // Simuler un temps fixe

        game.startTime = Date.now() - 10000;  // Simuler 10 secondes écoulées
        const score = game.getScore();
        expect(score).toBe(990);  // Le score initial est 1000, et il doit diminuer de 10 points par seconde

        jest.useRealTimers();
    });

    test("should not allow the score to go below 0", () => {
        game.score = 1;
        game.calculateScore();  // Simule un calcul de score après un certain temps
        expect(game.getScore()).toBe(0);  // Vérifier que le score ne devient pas négatif
    });

    test("should return true if the game is over due to 0 tries left", () => {
        game.numberOfTry = 0;
        expect(game.isGameOver()).toBe(true);  // Le jeu doit être terminé si les tentatives sont à 0
    });

    test("should return true if the game is over due to the word being discovered", () => {
        game.unknowWord = "damien";  // Le mot a été découvert
        expect(game.isGameOver()).toBe(true);  // Le jeu est terminé si le mot a été deviné
    });

    test("should return false if the game is not over", () => {
        game.numberOfTry = 3;
        game.unknowWord = "#a####";  // Le mot n'est pas complètement découvert
        expect(game.isGameOver()).toBe(false);  // Le jeu n'est pas encore terminé
    });

    test("hightScoreGenerator should generate and sort high scores", () => {
        const highScores = [];
        const result = game.hightScoreGenerator(highScores);
    
        // Vérifier la longueur de la liste des scores (devrait être 1000)
        expect(result.length).toBe(1000);
        // Vérifier les meilleurs scores
        expect(result[0].pseudo).toBe("player0");
        expect(result[0].score).toBe(500);  // Le score le plus élevé devrait être 500
        expect(result[999].pseudo).toBe("player999");
        expect(result[999].score).toBe(1);  // Le score le plus bas devrait être 1
    
        // Vérifier si la liste est triée par score en ordre décroissant
        for (let i = 0; i < result.length - 1; i++) {
            expect(result[i].score).toBeGreaterThanOrEqual(result[i + 1].score);
        }
    });       

});
