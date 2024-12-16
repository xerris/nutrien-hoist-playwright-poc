@Hoist @Rope-Detail
Feature: Rope Detail

  Background: Login
    Given I navigate to the Rope record page

  Scenario: User switches between tabs on the Rope Detail Page
    Given I navigate to the Rope Detail Page for Serial number '1234'
    Then the following sections should be visible:
      | Breaking load test |
      | Weight             |
      | EM test            |
      | Factor of safety   |
      | Hoist history      |
      | Stretch data       |
      | Rope diameters     |
    When I click on the "Rope information" tab
    Then the following sections should be visible:
      | Rope details         |
      | Install details      |
      | Attachments          |
      | Construction details |

  Scenario: User edits the Breaking Load information
    Given I navigate to the Rope Detail Page for Serial number '1234'
    And I provide the following information in the Breaking load form
      | Breaking load | "4" |
    Then I should be able to see the updated Breaking load data