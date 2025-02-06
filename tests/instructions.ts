SDET Mid-Level Practical Challenge
This exercise is designed to evaluate your skills in software testing, automation, and CI/CD pipeline integration. By completing this challenge, you will demonstrate your ability to design and execute test cases, implement automation scripts, and integrate testing into a modern development workfl ow.
Objective
The primary goal of this challenge is to assess your ability to:
1. Understand system requirements and translate them into test cases.
2. Automate functional tests using modern tools like Cypress or Playwright.
3. Integrate automated tests into a CI/CD pipeline using GitHub Actions.
4. Showcase profi ciency with tools such as Docker, NPM, and GitHub.
This challenge refl ects common real-world scenarios that SDETs face when working on web applications.
System Requirements Overview
User Requirements:
As a user, you should be able to:
1. View Available Tours: See a list of tours with destinations, pricing, and descriptions.
2. Book a Tour: Select a tour and book it.
3. Generate a Ticket: After booking, generate and view the ticket.
Admin Requirements:
As an admin, you should be able to:
1. Create Tours: Add new tours with available slots, pricing, descriptions, and destinations.
2. View All Bookings: Access a list of all bookings made by users.
3. View All Tickets: Access all tickets generated from bookings.
Test Setup:
Requirements
1. Github Account
2. Docker
3. NPM
4. Cypress or Playwright
5. Chrome Browser
Steps
1. Clone Booking Challenge Project from GitHub
2. Run the commands under /docker folder:
3. Clone the repository and navigate to the project folder:
git clone https://github.com/Solutech-Limited/booking-challenge.git
cd booking-challenge
4. Navigate to the /docker folder:
cd docker
5. Build and start the containers using the commands :
./build.sh # Rebuilds container image
./start.sh # Starts containers in the background
4. Confi gure application container default setup and seed database:
./confi g.sh # For confi guring database and project data
5. Stop containers:
./stop.sh
6. Connect to the application container via Terminal. Useful to troubleshoot and run NPM commands
./connect.sh # Opens a terminal inside the container
Challenge Tasks
1. BDD Test Case (Cucumber):
Task 1: Write a Cucumber feature fi le for Generating Tickets for a user seeking to travel.
It should include:
● Navigate to a login page
● Enter invalid credentials
● Assert that an error message is displayed*
Task 2: Write a Cucumber feature fi le for Generating for
● Book Tour: Create tour booking from the home page as guest
● Create Tours: Add new tours with available slots, pricing, descriptions, and destinations.
● View All Bookings: Access a list of all bookings made by users.
● View All Tickets: Access all tickets generated from bookings.
Task 3: Implement the step defi nitions in JavaScript for the above feature fi le.
2. Web Automation (Playwright/Cypress):
Task 1: Write a Cypress or Playwright test that automates the following steps:
● Navigate to a login page
● Enter invalid credentials
● Assert that an error message is displayed*
Task 2: Use Cypress or Playwright to automate a test for
● Book Tour: Create tour booking from the home page as guest
● Create Tours: Add new tours with available slots, pricing, descriptions, and destinations.
● View All Bookings: Access a list of all bookings made by users.
● View All Tickets: Access all tickets generated from bookings.
3. CI/CD Pipeline Integration (GitHub Actions):
Task 1: Create a .yml GitHub Action fi le that:
● Runs Cypress tests on every pull request
● Generates a test report in the PR summary*
Task 2: Add Playwright tests or Cypress to an existing GitHub pipeline, ensuring they trigger automatically after code merge.
Submission
1. Create your own repository named “Solutech-SDET” on GitHub as a public project
2. The full Github repository URL is to be shared on your submission email ie: https://github.com/<yourusername>/Solutech-SDET
3. On the Cloned Project you will include:
a. Cucumber feature fi le on ie; /e2e folder
a. Playwright/Cypress folder and fi les ie; /cypress
b. GitHub action fi les ie; .github/workfl ows/test.yml
NOTE: DEADLINE: 7TH FEBRUARY 2025.