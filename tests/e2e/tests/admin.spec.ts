import { test, expect } from '@playwright/test';
import { AdminPage } from '../pages/admin.page';
import { AdminCredentials, TourData, BookingData, TicketData } from '../utils/types';

test.describe('Admin Features', () => {
    let adminPage: AdminPage;

    const adminCredentials: AdminCredentials = {
        email: 'admin@example.com',
        password: 'admin123!'
    };

    const testTour: TourData = {
        title: 'Safari Tour',
        description: 'Experience wildlife in its glory',
        price: '1500',
        destination: 'Masai Mara',
        available_slots: '20'
    };

    test.beforeEach(async ({ page }) => {
        adminPage = new AdminPage(page);
        await adminPage.login(adminCredentials);
    });

    test('should create a new tour successfully', async () => {
        await adminPage.navigateToTours();
        await adminPage.createTour(testTour);

        const successMessage = await adminPage.getSuccessMessage();
        expect(successMessage).toBe('Tour created successfully');

        // Verify tour appears in the list
        await adminPage.navigateToTours();
        const tourElement = await adminPage.page.locator(`text=${testTour.title}`);
        await expect(tourElement).toBeVisible();
    });

    test('should display all bookings', async () => {
        await adminPage.navigateToBookings();
        
        // Verify bookings list is visible
        const bookingsCount = await adminPage.getBookingsList();
        expect(bookingsCount).toBeGreaterThan(0);

        // Verify booking details
        const bookingDetails = await adminPage.getBookingDetails('BK-2025-001');
        expect(bookingDetails).toMatchObject({
            customer_name: 'John Doe',
            tour_name: 'Safari Tour',
            status: 'Confirmed'
        });
    });

    test('should generate ticket for booking', async () => {
        await adminPage.navigateToTickets();
        
        // Generate ticket for a booking
        await adminPage.generateTicket('BK-2025-001');

        // Verify ticket details
        const ticketDetails = await adminPage.getTicketDetails('BK-2025-001');
        expect(ticketDetails).toMatchObject({
            booking_reference: 'BK-2025-001',
            customer_name: 'John Doe',
            tour_name: 'Safari Tour'
        });
    });

    test('should update tour availability', async () => {
        await adminPage.navigateToTours();
        
        // Update tour slots
        await adminPage.updateTourAvailability('Safari Tour', '15');

        const successMessage = await adminPage.getSuccessMessage();
        expect(successMessage).toBe('Tour updated successfully');

        // Verify updated slots
        await adminPage.navigateToTours();
        const updatedSlots = await adminPage.page
            .locator(`text=Safari Tour`)
            .locator('..')
            .locator('.available-slots')
            .textContent();
        expect(updatedSlots).toBe('15');
    });

    test('should handle invalid tour creation', async () => {
        await adminPage.navigateToTours();
        
        const invalidTour: TourData = {
            ...testTour,
            price: '-100', // Invalid price
        };

        await adminPage.createTour(invalidTour);
        const errorMessage = await adminPage.getErrorMessage();
        expect(errorMessage).toBeTruthy();
    });
});
