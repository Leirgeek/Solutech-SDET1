import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    // Navigation
    async goto() {
        await this.page.goto('/login');
    }

    // Actions
    async login(email: string, password: string) {
        await this.page.fill('input[name="email"]', email);
        await this.page.fill('input[name="password"]', password);
        await this.page.click('button[type="submit"]');
    }

    // Getters
    async getErrorMessage() {
        const errorMessage = await this.page.locator('.error-message').textContent();
        return errorMessage || '';
    }

    async isLoggedIn() {
        return await this.page.isVisible('.user-profile');
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    async submitEmptyForm() {
        await this.page.click('button[type="submit"]');
    }

    async getFieldValidationError(fieldName: string) {
        const field = this.page.locator(`input[name="${fieldName}"]`);
        return field.evaluate((el: HTMLInputElement) => el.validity.valid === false);
    }

    async getUserInfo() {
        const userInfo = await this.page.locator('.user-info').textContent();
        return userInfo || '';
    }
    
    async isDashboardVisible() {
        return await this.page.isVisible('.dashboard-container');
    }
    
    async checkRememberMe() {
        await this.page.click('input[name="remember"]');
    }
}
