@Rope-Detail
Feature: Rope Detail

  Background: Login
    Given I am logged in as a site-admin
    And I navigate to the Rope record page

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
      | Rope details    |
      | Install details |
      | Attachments     |
      | Construction details |
