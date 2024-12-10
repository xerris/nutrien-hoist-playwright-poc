@Action-Item
Feature: Action Items

  Background: Login
    Given I login as a minesight user in logbook

  Scenario: Create an action item
    Given I am logged in as a minesight test user
      And I navigate to Monthly Action items page
      And I create a new Action Item
      And I provide the following Action Item information
        | Action item                    | "Inventory Shortage or Parts"  |
        | Elevation (optional)           | "123"                          |
        | Comment                        | "Test"                         |
        | Reported by                    | "maheak mishra"                |
    When I click on Save
