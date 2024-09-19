require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const Game = require('./game.js');
const sqlite3 = require('sqlite3').verbose();

const PORT = process.env.PORT || 3030;
const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key';

const app = express();
const db = new sqlite3.Database('./scores.db');
const game = new Game();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 86400000, // 24 hours
        secure: process.env.NODE_ENV === 'production', // Secure cookies in production
        httpOnly: true,  // Prevent JavaScript access
        sameSite: 'strict' // CSRF protection
    }
}));
app.set('view engine', 'ejs');

// Créer la table 'scores' si elle n'existe pas
db.run(`CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY,
    pseudo TEXT,
    score INTEGER,
    ip TEXT,
    timestamp INTEGER
)`, (err) => {
    if (err) {
        console.error('Erreur lors de la création de la table:', err.message);
    } else {
        console.log('Table "players" vérifiée/créée.');
    }
});

// Routes
app.get('/', (req, res) => {
    try {
        const today = new Date().toDateString();
        const username = req.session.username || null;
        const playedToday = req.session.lastPlayed === today;

        res.render('pages/index', {
            game: game.print(),
            word: game.word,
            numberOfTries: game.getNumberOfTries(),
            score: req.session.score || 0,
            played: playedToday,
            username: username,
        });
    } catch (error) {
        console.error("Error rendering home page:", error.message);
        res.status(500).send("An error occurred while rendering the page.");
    }
});

app.post('/', (req, res) => {
    try {
        const today = new Date().toDateString();
        let username = req.session.username || null;

        if (req.body.word) {
            const guess = game.guess(req.body.word.toLowerCase());

            if (game.isGameOver()) {
                const finalScore = game.calculateScore();
                req.session.score = finalScore;
                req.session.lastPlayed = today;

                if (req.body.username) {
                    username = req.body.username.trim();
                    req.session.username = username;

                    db.run(`INSERT INTO scores (username, score, date) VALUES (?, ?, ?)`, [username, finalScore, today], function(err) {
                        if (err) {
                            console.error("Error saving score:", err.message);
                        } else {
                            console.log(`Score saved: ${username} - ${finalScore}`);
                        }
                    });
                }

                return res.redirect('/');
            }
        }

        res.redirect('/');
    } catch (error) {
        console.error("Error processing form submission:", error.message);
        res.status(500).send("An error occurred while processing the form.");
    }
});

app.get('/leaderboard', (req, res) => {
    try {
        db.all(`SELECT pseudo, score FROM players WHERE DATE(timestamp / 1000, 'unixepoch') = DATE('now')`, [], (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Erreur interne du serveur.' });
            } else {
                if (rows.length < 1000){
                    game.hightScoreGenerator(rows)
                }
                res.render('pages/leaderboard', {
                    scores: rows
                });
            }
        });
    } catch (error) {
        console.error("Error rendering leaderboard page:", error.message);
        res.status(500).send("An error occurred while rendering the leaderboard page.");
    }
});


// Lancer le serveur
(async () => {
    try {
        await game.loadWords();
        app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
    } catch (error) {
        console.error("Failed to load words and start the server:", error.message);
    }
})();
