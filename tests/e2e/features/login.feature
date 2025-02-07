Feature: User Login
  As a user
  I want to be able to login to the system
  So that I can access my account

  Scenario: Login with valid credentials
    Given I am on the login page
    When I enter valid credentials
      | email              | password |
      | admin@example.com  | password |
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see my user information

  Scenario: Login with invalid credentials
    Given I am on the login page
    When I enter invalid credentials
      | email           | password |
      | test@email.com | wrong    |
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  Scenario: Login with empty fields
    Given I am on the login page
    When I click the login button without entering credentials
    Then I should see validation errors for required fields
    And I should remain on the login page

  Scenario: Login with invalid email format
    Given I am on the login page
    When I enter credentials with invalid email format
      | email      | password  |
      | invalidemail | password1 |
    And I click the login button
    Then I should see an email format validation error

  Scenario: Login with correct email but wrong password
    Given I am on the login page
    When I enter credentials with correct email but wrong password
      | email              | password    |
      | admin@example.com  | wrongpass   |
    And I click the login button
    Then I should see an invalid credentials error message

  Scenario: Remember me functionality
    Given I am on the login page
    When I enter valid credentials
      | email              | password |
      | admin@example.com  | password |
    And I check the remember me checkbox
    And I click the login button
    Then I should be logged in
    And my session should persist after browser restart
