const { test, expect } = require('@playwright/test');

test('Page principale - chargement initial', async ({ page }) => {
    await page.goto('http://localhost:3030');

    await expect(page).toHaveTitle('Jeu du Pendu');

    await expect(page.locator('h1')).toHaveText('🎯 Le jeu du pendu 🎯');
    await expect(page.locator('input[name="word"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    await expect(page.locator('legend')).toContainText('Nombre d\'essais restants');
});

test('Soumission d\'une lettre correcte', async ({ page }) => {
  await page.goto('http://localhost:3030');

  await page.fill('input[name="word"]', 'a');
  await page.click('button[type="submit"]');

  const maskedWord = await page.locator('h3').textContent();
  expect(maskedWord).toMatch(/a/);
});
