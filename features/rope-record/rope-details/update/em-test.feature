@Hoist @Rope-Record
Feature: Rope Records

  Background: Login
    Given I navigate to the Rope record page
    And I navigate to the Rope Detail Page for an In Service rope

  Scenario: User adds a new EM test record
    When I provide the following information in the Add EM test record form
      | EM test date | June 28, 2024 |
      | Percent loss | 23            |
    Then I should be able to see the record in the Records table

