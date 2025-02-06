import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I am on the login page', async function() {
    await this.page.goto('http://localhost:8000/login');
});

When('I enter invalid credentials', async function(dataTable) {
    const credentials = dataTable.hashes()[0];
    await this.page.fill('input[type="email"]', credentials.email);
    await this.page.fill('input[type="password"]', credentials.password);
});

When('I click the login button', async function() {
    await this.page.click('button[type="submit"]');
});

Then('I should see an error message', async function() {
    const errorMessage = await this.page.locator('.error-message').first();
    await expect(errorMessage).toBeVisible();
});
