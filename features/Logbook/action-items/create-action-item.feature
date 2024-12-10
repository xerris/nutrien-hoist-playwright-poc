@Action-Item
Feature: Action Items

  Background: Login
    Given I login as a Minesight user in logbook

  Scenario: Create an action item
    Given I am logged in as a Minesight test user
    And I navigate to Monthly Action items page
    And I create a new Action Item
    And I provide the following Action Item information
      | Action item          | Cleaning Required |
      | Elevation (optional) | "123"             |
      | Comment              | "Test"            |
      | Reported by          | maheak mishra     |
    When I click on Save in Action Item form
