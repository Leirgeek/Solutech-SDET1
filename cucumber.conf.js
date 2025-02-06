const { Before, BeforeAll, AfterAll, After } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

let browser;
let page;

BeforeAll(async () => {
  browser = await chromium.launch({ headless: false });
});

Before(async () => {
  page = await browser.newPage();
  // Add page to world object to make it available in steps
  this.page = page;
});

After(async () => {
  await page.close();
});

AfterAll(async () => {
  await browser.close();
});
