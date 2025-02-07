import { Page } from '@playwright/test';
import { AdminCredentials, TourData, BookingData, TicketData } from '../utils/types';

export class AdminPage {
    constructor(private page: Page) {}

    async getTourAvailableSlots(tourName: string) {
        return await this.page
            .locator(`text=${tourName}`)
            .locator('..')
            .locator('.available-slots')
            .textContent();
    }

    // Navigation
    async goto() {
        await this.page.goto('/admin');
    }

    async navigateToTours() {
        await this.page.goto('/admin/tours');
    }

    async navigateToBookings() {
        await this.page.goto('/admin/bookings');
    }

    async navigateToTickets() {
        await this.page.goto('/admin/tickets');
    }

    // Authentication
    async login(credentials: AdminCredentials) {
        await this.page.goto('/login');
        await this.page.fill('input[name="email"]', credentials.email);
        await this.page.fill('input[name="password"]', credentials.password);
        await this.page.click('button[type="submit"]');
        await this.page.waitForURL('/admin');
    }

    // Tour Management
    async createTour(tourData: TourData) {
        await this.page.click('text=Create New Tour');
        await this.page.fill('input[name="title"]', tourData.title);
        await this.page.fill('textarea[name="description"]', tourData.description);
        await this.page.fill('input[name="price"]', tourData.price);
        await this.page.fill('input[name="destination"]', tourData.destination);
        await this.page.fill('input[name="available_slots"]', tourData.available_slots);
        await this.page.click('button:text("Save Tour")');
    }

    async updateTourAvailability(tourName: string, newSlots: string) {
        await this.page.click(`text=${tourName}`);
        await this.page.fill('input[name="available_slots"]', newSlots);
        await this.page.click('button:text("Update Tour")');
    }

    // Booking Management
    async getBookingsList() {
        const bookings = await this.page.$$('.booking-item');
        return bookings.length;
    }

    async getBookingDetails(bookingReference: string): Promise<BookingData | null> {
        const bookingRow = await this.page.$(`.booking-item[data-reference="${bookingReference}"]`);
        if (!bookingRow) return null;

        return {
            customer_name: await bookingRow.$eval('.customer-name', el => el.textContent || ''),
            tour_name: await bookingRow.$eval('.tour-name', el => el.textContent || ''),
            booking_date: await bookingRow.$eval('.booking-date', el => el.textContent || ''),
            status: await bookingRow.$eval('.status', el => el.textContent || '')
        };
    }

    // Ticket Management
    async generateTicket(bookingReference: string) {
        await this.page.click(`.booking-item[data-reference="${bookingReference}"] button:text("Generate Ticket")`);
        await this.page.waitForSelector('.ticket-generated');
    }

    async getTicketDetails(ticketReference: string): Promise<TicketData | null> {
        const ticketElement = await this.page.$(`.ticket-item[data-reference="${ticketReference}"]`);
        if (!ticketElement) return null;

        return {
            booking_reference: await ticketElement.$eval('.booking-reference', el => el.textContent || ''),
            customer_name: await ticketElement.$eval('.customer-name', el => el.textContent || ''),
            tour_name: await ticketElement.$eval('.tour-name', el => el.textContent || ''),
            travel_date: await ticketElement.$eval('.travel-date', el => el.textContent || '')
        };
    }

    // Helper Methods
    async getSuccessMessage() {
        const message = await this.page.locator('.success-message').textContent();
        return message || '';
    }

    async getErrorMessage() {
        const message = await this.page.locator('.error-message').textContent();
        return message || '';
    }
}
