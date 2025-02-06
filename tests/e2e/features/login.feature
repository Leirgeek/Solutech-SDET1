Feature: User Login
  As a user
  I want to be able to login to the system
  So that I can access my account

  Scenario: Login with invalid credentials
    Given I am on the login page
    When I enter invalid credentials
      | email           | password |
      | test@email.com | wrong    |
    And I click the login button
    Then I should see an error message
