@Hoist @Action-Items
Feature: Action Items

  Background: Actions
    Given I navigate to the Action Items page

#  Scenario: Validate Action Items
##    Then I can see Hoist and shaft action items text

    Scenario: Updating an action item
    Given I navigate to an action item reported on 'Nov 12, 2024, 11:39 am'
    And I edit the action item details with the following information
      | Action item | Downtime Required |
    When I click on Save
    Then I should be able to see the updated Action item with 'Downtime Required'