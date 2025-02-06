import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Feature', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('should display error message with invalid credentials', async () => {
        await loginPage.login('invalid@email.com', 'wrongpassword');
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Invalid credentials');
        
        // Verify we're still on the login page
        const currentUrl = await loginPage.getCurrentUrl();
        expect(currentUrl).toContain('/login');
    });

    test('should login successfully with valid credentials', async () => {
        await loginPage.login('admin@example.com', 'admin123!');
        
        // Verify successful login
        expect(await loginPage.isLoggedIn()).toBeTruthy();
        
        // Verify redirect to dashboard
        const currentUrl = await loginPage.getCurrentUrl();
        expect(currentUrl).toContain('/dashboard');
    });

    test('should validate required fields', async () => {
        // Try to submit without filling in any fields
        await loginPage.login('', '');
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Email is required');
        expect(errorMessage).toContain('Password is required');
    });

    test('should validate email format', async () => {
        await loginPage.login('invalidemail', 'password123');
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Please enter a valid email address');
    });

    test('should handle server errors gracefully', async ({ page }) => {
        // Mock a server error response
        await page.route('/api/login', route => {
            route.fulfill({
                status: 500,
                body: JSON.stringify({ message: 'Internal server error' })
            });
        });

        await loginPage.login('admin@example.com', 'admin123!');
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Something went wrong');
    });
});
