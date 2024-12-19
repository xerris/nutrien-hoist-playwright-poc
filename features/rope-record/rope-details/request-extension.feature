@Hoist @Rope-Record
Feature: Rope Records

  Background: Login
    Given I navigate to the Rope record page

  Scenario: User requests an extension for an In Service rope
    Given I navigate to the Rope Detail Page for an In Service rope with Serial number 'CUCSNO168681'
    And I provide the following information in the Request Extension form
      | Request by days | 6 |
    Then I should be able to see the request in Extension history section