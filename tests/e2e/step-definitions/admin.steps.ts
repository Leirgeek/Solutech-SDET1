import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { AdminPage } from '../pages/admin.page';
import { AdminCredentials, TourData } from '../utils/types';

const adminCredentials: AdminCredentials = {
    email: 'admin@example.com',
    password: 'admin123!'
};

Given('I am logged in as an admin', async function() {
    const adminPage = new AdminPage(this.page);
    await adminPage.login(adminCredentials);
});

When('I navigate to the tours page', async function() {
    const adminPage = new AdminPage(this.page);
    await adminPage.navigateToTours();
});

When('I navigate to the bookings page', async function() {
    const adminPage = new AdminPage(this.page);
    await adminPage.navigateToBookings();
});

When('I navigate to the tickets page', async function() {
    const adminPage = new AdminPage(this.page);
    await adminPage.navigateToTickets();
});

When('I create a new tour with the following details:', async function(tourDataTable) {
    const adminPage = new AdminPage(this.page);
    const tourData: TourData = tourDataTable.rowsHash();
    await adminPage.createTour(tourData);
});

Then('I should see a success message {string}', async function(expectedMessage: string) {
    const adminPage = new AdminPage(this.page);
    const successMessage = await adminPage.getSuccessMessage();
    expect(successMessage).toBe(expectedMessage);
});

Then('I should see the tour {string} in the list', async function(tourTitle: string) {
    const adminPage = new AdminPage(this.page);
    const tourElement = await this.page.locator(`text=${tourTitle}`);
    await expect(tourElement).toBeVisible();
});

Then('the tour {string} should have {string} available slots', async function(tourName: string, expectedSlots: string) {
    const adminPage = new AdminPage(this.page);
    const slots = await adminPage.getTourAvailableSlots(tourName);
    expect(slots).toBe(expectedSlots);
});
