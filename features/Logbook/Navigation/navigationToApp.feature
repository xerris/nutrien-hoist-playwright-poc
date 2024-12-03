@Logbook-App
Feature: Navigation

  Scenario: Verifying App's title
    Given I navigate to the logbook app
    Then I should see title of the app

  Scenario: Verifying App Name header above email and password
    Then I should see header of the app

  Scenario: Verifying email text field
    Then I should see the email text field

  Scenario: Verifying password text field
    Then I should see the password text field
