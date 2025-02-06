Feature: Admin Management
  As an admin
  I want to manage tours, bookings, and tickets
  So that I can maintain the booking system effectively

  Background:
    Given I am logged in as an admin user
      | email              | password    |
      | admin@example.com  | admin123!   |

  Scenario: Admin creates a new tour
    When I navigate to the tour management page
    And I click on "Create New Tour" button
    And I fill in the tour information
      | title          | description                       | price  | destination  | available_slots |
      | Safari Tour    | Experience wildlife in its glory  | 1500   | Masai Mara   | 20             |
    And I click the save tour button
    Then I should see a success message "Tour created successfully"
    And the tour should appear in the tours list

  Scenario: Admin views all bookings
    When I navigate to the bookings management page
    Then I should see a list of all bookings
    And each booking should display
      | customer_name | tour_name   | booking_date | status    |
      | John Doe     | Safari Tour  | 2025-03-01   | Confirmed |

  Scenario: Admin manages ticket generation
    When I navigate to the tickets management page
    And I select a booking to generate ticket
    And I click "Generate Ticket" button
    Then a new ticket should be generated
    And I should see the ticket details
      | booking_reference | customer_name | tour_name  | travel_date |
      | BK-2025-001      | John Doe      | Safari Tour| 2025-03-01  |

  Scenario: Admin updates tour availability
    When I navigate to the tour management page
    And I select an existing tour
    And I update the available slots to "15"
    Then the tour availability should be updated
    And I should see a success message "Tour updated successfully"
