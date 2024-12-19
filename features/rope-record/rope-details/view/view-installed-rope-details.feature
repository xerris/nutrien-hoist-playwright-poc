@Hoist @View-Rope-Detail
Feature: View Rope Detail

  Background: Login
    Given I navigate to the Rope record page

  Scenario: User switches between tabs on the Rope Detail Page
    Given I navigate to the Rope Detail Page for Serial number 'CUCSNO168681'
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