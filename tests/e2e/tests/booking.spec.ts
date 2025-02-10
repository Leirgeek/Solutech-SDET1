import { test, expect } from '@playwright/test';
import { BookingPage } from '../pages/booking.page';

test.describe('Booking Feature', () => {
    let bookingPage: BookingPage;

    const validBookingDetails = {
        name: 'John James',
        email: 'john.james@gmail.com',
        phone: '1295067890',
        date: '2025-03-01',
        passengers: '2'
    };

    test.beforeEach(async ({ page }) => {
        bookingPage = new BookingPage(page);
        await bookingPage.goto();
    });

    test('should successfully book a tour as a guest', async () => {
        // Select a tour
        await bookingPage.selectTour('Safari Tour');
        
        // Fill booking details
        await bookingPage.fillBookingForm(validBookingDetails);
        
        // Submit booking
        await bookingPage.submitBooking();
        
        // Verify booking confirmation
        const confirmationMessage = await bookingPage.getConfirmationMessage();
        expect(confirmationMessage).toContain('Booking confirmed');
        
        // Verify booking reference is generated
        const bookingReference = await bookingPage.getBookingReference();
        expect(bookingReference).toMatch(/BK-\d{4}-\d{3}/);
    });

    test('should generate and display ticket after booking', async () => {
        // Complete booking process
        await bookingPage.selectTour('Safari Tour');
        await bookingPage.fillBookingForm(validBookingDetails);
        await bookingPage.submitBooking();
        
        // Generate ticket
        await bookingPage.generateTicket();
        
        // Verify ticket is visible
        expect(await bookingPage.isTicketVisible()).toBeTruthy();
        
        // Verify ticket details
        const ticketDetails = await bookingPage.getTicketDetails();
        expect(ticketDetails).toMatchObject({
            customerName: validBookingDetails.name,
            tourName: 'Safari Tour',
            date: validBookingDetails.date,
            passengers: validBookingDetails.passengers
        });
    });

    test('should validate booking form fields', async () => {
        await bookingPage.selectTour('Safari Tour');
        await bookingPage.submitBooking(); // Submit without filling form
        
        // Check validation errors
        expect(await bookingPage.getFormValidationError('name')).toBeTruthy();
        expect(await bookingPage.getFormValidationError('email')).toBeTruthy();
        expect(await bookingPage.getFormValidationError('phone')).toBeTruthy();
        expect(await bookingPage.getFormValidationError('date')).toBeTruthy();
        expect(await bookingPage.getFormValidationError('passengers')).toBeTruthy();
    });

    test('should validate email format in booking form', async () => {
        await bookingPage.selectTour('Safari Tour');
        await bookingPage.fillBookingForm({
            ...validBookingDetails,
            email: 'invalid-email'
        });
        await bookingPage.submitBooking();
        
        expect(await bookingPage.getFormValidationError('email'))
            .toContain('Please enter a valid email address');
    });

    test('should handle date availability', async () => {
        await bookingPage.selectTour('Safari Tour');
        
        // Check future date
        expect(await bookingPage.isDateAvailable('2025-03-01')).toBeTruthy();
        
        // Check past date
        expect(await bookingPage.isDateAvailable('2024-01-01')).toBeFalsy();
    });

    test('should calculate correct total price', async () => {
        const tourName = 'Safari Tour';
        const passengers = '2';
        
        await bookingPage.selectTour(tourName);
        
        // Get base price
        const basePrice = await bookingPage.getTourPrice(tourName);
        if (!basePrice) {
            throw new Error(`Could not find price for tour: ${tourName}`);
        }
        const basePriceNumber = parseInt(basePrice.replace(/[^0-9]/g, ''));
        
        // Fill booking with multiple passengers
        await bookingPage.fillBookingForm({
            ...validBookingDetails,
            passengers
        });
        
        // Verify total price
        const expectedTotal = basePriceNumber * parseInt(passengers);
        const totalElement = await bookingPage.getPage().locator('.total-price');
        const actualTotal = parseInt((await totalElement.textContent() || '').replace(/[^0-9]/g, ''));
        
        expect(actualTotal).toBe(expectedTotal);
    });

    test('should handle booking cancellation', async ({ page }) => {
        await bookingPage.selectTour('Safari Tour');
        
        // Click cancel button
        await page.click('.cancel-booking');
        
        // Verify redirect to home page
        expect(page.url()).toBe('http://localhost:8000/');
    });

    test('should download ticket in PDF format', async () => {
        // Complete booking process
        await bookingPage.selectTour('Safari Tour');
        await bookingPage.fillBookingForm(validBookingDetails);
        await bookingPage.submitBooking();
        await bookingPage.generateTicket();
        
        // Download ticket
        const download = await bookingPage.downloadTicket();
        
        // Verify download
        expect(download.suggestedFilename()).toMatch(/ticket-.*\.pdf$/);
    });
});
