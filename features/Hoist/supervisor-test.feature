@Hoist
Feature: Login

  Background:
    Given I am on the login page in the DEV env
    And I click on the login button

  Scenario: Login is successful
    When I enter the email 'maheak.mishra@nutrien.com' in the email field
    And I enter the password 'password' in the password field
    Then I should be redirected to the actions page


