@Hoist @Rope-Detail
Feature: Rope Detail

  Background: Login
    Given I navigate to the Rope record page

  Scenario: User edits the Breaking Load information
    Given I navigate to the Rope Detail Page for Serial number 'CUCSNO168681'
    And I provide the following information in the Breaking load form
      | Breaking load | "4" |
    Then I should be able to see the updated Breaking load data