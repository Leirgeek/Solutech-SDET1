import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

Given('I am on the login page', async function() {
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
});

When('I enter valid credentials', async function(dataTable) {
    const loginPage = new LoginPage(this.page);
    const credentials = dataTable.hashes()[0];
    await loginPage.login(credentials.email, credentials.password);
});

When('I enter invalid credentials', async function(dataTable) {
    const loginPage = new LoginPage(this.page);
    const credentials = dataTable.hashes()[0];
    await loginPage.login(credentials.email, credentials.password);
});

When('I click the login button without entering credentials', async function() {
    const loginPage = new LoginPage(this.page);
    await loginPage.submitEmptyForm();
});

When('I enter credentials with invalid email format', async function(dataTable) {
    const loginPage = new LoginPage(this.page);
    const credentials = dataTable.hashes()[0];
    await loginPage.login(credentials.email, credentials.password);
});

When('I enter credentials with correct email but wrong password', async function(dataTable) {
    const loginPage = new LoginPage(this.page);
    const credentials = dataTable.hashes()[0];
    await loginPage.login(credentials.email, credentials.password);
});

When('I check the remember me checkbox', async function() {
    const loginPage = new LoginPage(this.page);
    await loginPage.checkRememberMe();
});

When('I click the login button', async function() {
    const loginPage = new LoginPage(this.page);
    await this.page.click('button[type="submit"]');
});

Then('I should be redirected to the dashboard', async function() {
    const loginPage = new LoginPage(this.page);
    await expect(loginPage.isDashboardVisible()).resolves.toBeTruthy();
    await expect(loginPage.getCurrentUrl()).resolves.toContain('/dashboard');
});

Then('I should see my user information', async function() {
    const loginPage = new LoginPage(this.page);
    await expect(loginPage.getUserInfo()).resolves.toBeTruthy();
});

Then('I should see an error message', async function() {
    const loginPage = new LoginPage(this.page);
    await expect(loginPage.getErrorMessage()).resolves.toBeTruthy();
});

Then('I should remain on the login page', async function() {
    const loginPage = new LoginPage(this.page);
    await expect(loginPage.getCurrentUrl()).resolves.toContain('/login');
});

Then('I should see validation errors for required fields', async function() {
    const loginPage = new LoginPage(this.page);
    await expect(loginPage.getFieldValidationError('email')).resolves.toBeTruthy();
    await expect(loginPage.getFieldValidationError('password')).resolves.toBeTruthy();
});

Then('I should see an email format validation error', async function() {
    const loginPage = new LoginPage(this.page);
    await expect(loginPage.getFieldValidationError('email')).resolves.toContain('valid email');
});

Then('I should see an invalid credentials error message', async function() {
    const loginPage = new LoginPage(this.page);
    await expect(loginPage.getErrorMessage()).resolves.toContain('Invalid credentials');
});

Then('I should be logged in', async function() {
    const loginPage = new LoginPage(this.page);
    await expect(loginPage.isLoggedIn()).resolves.toBeTruthy();
});

