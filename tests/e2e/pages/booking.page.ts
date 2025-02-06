import { Page } from '@playwright/test';

interface BookingDetails {
    name: string;
    email: string;
    phone: string;
    date: string;
    passengers: string;
}

export class BookingPage {
    constructor(private page: Page) {}

    // Navigation
    async goto() {
        await this.page.goto('/');
    }

    // Tour Selection
    async selectTour(tourName: string) {
        await this.page.click(`.tour-card:has-text("${tourName}") .book-button`);
    }

    async getTourPrice(tourName: string) {
        const priceElement = await this.page.locator(`.tour-card:has-text("${tourName}") .tour-price`);
        return await priceElement.textContent();
    }

    // Booking Form
    async fillBookingForm(details: BookingDetails) {
        await this.page.fill('input[name="name"]', details.name);
        await this.page.fill('input[name="email"]', details.email);
        await this.page.fill('input[name="phone"]', details.phone);
        await this.page.fill('input[name="date"]', details.date);
        await this.page.fill('input[name="passengers"]', details.passengers);
    }

    async submitBooking() {
        await this.page.click('button[type="submit"]');
    }

    // Ticket Generation
    async generateTicket() {
        await this.page.click('.generate-ticket-button');
    }

    async downloadTicket() {
        const downloadPromise = this.page.waitForEvent('download');
        await this.page.click('.download-ticket-button');
        return downloadPromise;
    }

    // Getters
    async getConfirmationMessage() {
        const message = await this.page.locator('.confirmation-message').textContent();
        return message || '';
    }

    async getBookingReference() {
        const reference = await this.page.locator('.booking-reference').textContent();
        return reference || '';
    }

    async getTicketDetails() {
        const ticket = await this.page.locator('.ticket-details');
        return {
            reference: await ticket.locator('.reference').textContent(),
            customerName: await ticket.locator('.customer-name').textContent(),
            tourName: await ticket.locator('.tour-name').textContent(),
            date: await ticket.locator('.date').textContent(),
            passengers: await ticket.locator('.passengers').textContent()
        };
    }

    async isTicketVisible() {
        return await this.page.isVisible('.ticket-details');
    }

    async getErrorMessage() {
        const message = await this.page.locator('.error-message').textContent();
        return message || '';
    }

    // Validation Methods
    async getFormValidationError(fieldName: string) {
        const error = await this.page.locator(`[data-test="${fieldName}-error"]`).textContent();
        return error || '';
    }

    async isDateAvailable(date: string) {
        await this.page.fill('input[name="date"]', date);
        return !(await this.page.isVisible(`[data-test="date-error"]`));
    }
}
