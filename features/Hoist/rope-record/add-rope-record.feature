@Rope-Record
Feature: Rope Records

  Background: Login
    Given I am logged in as a site-admin

  Scenario: Add rope record
    Given I navigate to the Rope record page
    And I press the Add records button
    Then I select the Add new rope button
    Then I should see the Add new rope data Side Panel
 
