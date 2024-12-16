const { test, expect } = require('@playwright/test');

test.describe('Tests End-to-End pour le jeu du pendu', () => {

    test('La page d’accueil affiche le titre et la description', async ({ page }) => {
        await page.goto('http://localhost:3030');
        await expect(page.locator('h1')).toHaveText('🎯 Le jeu du pendu 🎯');
        await expect(page.locator('p')).toHaveText(/Essayez de deviner le mot/);
    });

    test('Permet d’entrer une lettre et soumettre le formulaire', async ({ page }) => {
        await page.goto('http://localhost:3030');
        await page.fill('input[name="word"]', 'a');
        await page.click('button[type="submit"]');
        await expect(page.locator('input[name="word"]')).toHaveValue('');
    });

    // Test 3 : Le canvas du dessin du pendu est visible
    test('Le canvas du dessin du pendu est visible', async ({ page }) => {
        await page.goto('http://localhost:3030');
        const canvasVisible = await page.locator('#hangmanCanvas').isVisible();
        expect(canvasVisible).toBeTruthy();
    });

    // Test 4 : Vérifie les textes des éléments H3
    test('Vérifie les textes des éléments H3', async ({ page }) => {
        await page.goto('http://localhost:3030');

        // Vérifie le contenu de "Votre mot :"
        await expect(page.locator('h3:has-text("Votre mot :")')).toContainText('#a####a#');

        // Vérifie le contenu de "Le mot était :"
        await expect(page.locator('h3:has-text("Le mot était :")')).toContainText('canonial');
    });

    test('La page des meilleurs scores du jour affiche correctement le titre et la liste', async ({ page }) => {
      await page.goto('http://localhost:3030/leaderboard'); // URL à ajuster selon votre configuration
      await expect(page.locator('h2')).toHaveText('Meilleur Score du Jour');
      
      // Vérifie que la liste des scores est présente
      const scoreItems = await page.locator('#today-scores ol li');
      const count = await scoreItems.count();  // Récupère le nombre d'éléments dans la liste
      expect(count).toBeGreaterThan(0); // Vérifie qu'il y a au moins un élément
    });

    test('Chaque score doit afficher le pseudo et les points', async ({ page }) => {
      await page.goto('http://localhost:3030/leaderboard'); // URL à ajuster
  
      // Vérifie que chaque élément de la liste contient un pseudo et un score
      const scoreItems = await page.locator('#today-scores ol li');
      const firstScore = await scoreItems.first();
  
      await expect(firstScore).toContainText('points'); // Vérifie que chaque élément de score contient 'points'
      await expect(firstScore).toContainText('||'); // Vérifie qu'il y a un séparateur entre le pseudo et le score
    });

    test('Vérifie l’effet de survol sur les éléments de la liste des scores', async ({ page }) => {
      await page.goto('http://localhost:3030/leaderboard'); // URL à ajuster
  
      // Survole le premier élément de la liste
      const firstScoreItem = page.locator('#today-scores ol li').first();
      await firstScoreItem.hover();
  
      // Vérifie que l'élément change de fond lorsqu'il est survolé
      await expect(firstScoreItem).toHaveCSS('background-color', 'rgb(241, 241, 241)'); // Changez cette couleur selon votre code CSS
  });
  
});
