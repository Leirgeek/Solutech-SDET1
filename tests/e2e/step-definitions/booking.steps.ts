import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

// Guest booking steps
Given('I am on the home page', async function() {
    await this.page.goto('http://localhost:8000');
});

When('I select a tour from the list', async function() {
    await this.page.click('.tour-card:first-child .book-button');
});

When('I fill in the booking details', async function(dataTable) {
    const bookingDetails = dataTable.hashes()[0];
    await this.page.fill('input[name="name"]', bookingDetails.name);
    await this.page.fill('input[name="email"]', bookingDetails.email);
    await this.page.fill('input[name="phone"]', bookingDetails.phone);
    await this.page.fill('input[name="date"]', bookingDetails.date);
    await this.page.fill('input[name="passengers"]', bookingDetails.passengers);
});

When('I submit the booking form', async function() {
    await this.page.click('button[type="submit"]');
});

Then('I should see a booking confirmation', async function() {
    const confirmationMessage = await this.page.locator('.confirmation-message');
    await expect(confirmationMessage).toBeVisible();
});

Then('I should be able to generate a ticket', async function() {
    await this.page.click('.generate-ticket-button');
    const ticket = await this.page.locator('.ticket');
    await expect(ticket).toBeVisible();
});

// Admin steps
Given('I am logged in as an admin', async function() {
    await this.page.goto('http://localhost:8000/login');
    await this.page.fill('input[type="email"]', 'admin@account.com');
    await this.page.fill('input[type="password"]', 'password');
    await this.page.click('button[type="submit"]');
});

When('I navigate to the tour creation page', async function() {
    await this.page.goto('http://localhost:8000/tours/create');
});

When('I fill in the tour details', async function(dataTable) {
    const tourDetails = dataTable.hashes()[0];
    await this.page.fill('input[name="name"]', tourDetails.name);
    await this.page.fill('textarea[name="description"]', tourDetails.description);
    await this.page.fill('input[name="price"]', tourDetails.price);
    await this.page.fill('input[name="slots"]', tourDetails.slots);
    await this.page.fill('input[name="destination"]', tourDetails.destination);
});

When('I submit the tour form', async function() {
    await this.page.click('button[type="submit"]');
});

Then('the tour should be created successfully', async function() {
    const successMessage = await this.page.locator('.success-message');
    await expect(successMessage).toBeVisible();
});

When('I navigate to the bookings page', async function() {
    await this.page.goto('http://localhost:8000/bookings');
});

Then('I should see a list of all bookings', async function() {
    const bookingsList = await this.page.locator('.bookings-list');
    await expect(bookingsList).toBeVisible();
});

Then('I should be able to view booking details', async function() {
    await this.page.click('.booking-item:first-child .view-details');
    const bookingDetails = await this.page.locator('.booking-details');
    await expect(bookingDetails).toBeVisible();
});

When('I navigate to the tickets page', async function() {
    await this.page.goto('http://localhost:8000/tickets');
});

Then('I should see a list of all generated tickets', async function() {
    const ticketsList = await this.page.locator('.tickets-list');
    await expect(ticketsList).toBeVisible();
});
