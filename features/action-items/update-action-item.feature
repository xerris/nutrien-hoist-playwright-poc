@Hoist @Action-Items
Feature: Action Items

  Background: Actions
    Given I navigate to the Action Items page

  Scenario: Updating an action item
    # Given I navigate to an action item reported on 'Nov 12, 2024, 11:39 am'
    Given I navigate to the first action item
    And I edit the action item details with the following information
      | Action item | Downtime Required |
      | Elevation   | 5                 |
    # Note: If Elevation value matches the prefilled value, a random value will be used to enable saving
    When I click on Save
    Then I should be able to see the updated Action item with 'Downtime Required'

