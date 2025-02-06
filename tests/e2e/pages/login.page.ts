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
}
