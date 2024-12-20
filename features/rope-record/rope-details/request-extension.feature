@Hoist @Rope-Record
Feature: Rope Records

  Background: Login
    Given I navigate to the Rope record page
    And I navigate to the Rope Detail Page for an In Service rope with Serial number 'CUCSNO168681'

  Scenario: User requests an extension by days for an In Service rope
    When I request an extension for '6' days
    Then I should be able to see the request in Extension history section

  Scenario: User requests an extension by date for an In Service rope
    When I request an extension until 'Dec 20, 2026'
    Then I should be able to see the request in Extension history section