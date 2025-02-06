Feature: Tour Booking
  As a guest user
  I want to be able to book a tour
  So that I can plan my travel

  Scenario: Book a tour as a guest
    Given I am on the home page
    When I select a tour from the list
    And I fill in the booking details
      | name      | email           | phone      | date       | passengers |
      | John Doe  | john@email.com  | 1234567890 | 2025-03-01 | 2          |
    And I submit the booking form
    Then I should see a booking confirmation
    And I should be able to generate a ticket

  Scenario: Create a new tour as admin
    Given I am logged in as an admin
    When I navigate to the tour creation page
    And I fill in the tour details
      | name        | description     | price | slots | destination |
      | Safari Tour | Amazing safari  | 1000  | 20    | Masai Mara  |
    And I submit the tour form
    Then the tour should be created successfully

  Scenario: View all bookings as admin
    Given I am logged in as an admin
    When I navigate to the bookings page
    Then I should see a list of all bookings
    And I should be able to view booking details

  Scenario: View all tickets
    Given I am logged in as an admin
    When I navigate to the tickets page
    Then I should see a list of all generated tickets
