@Rope-Record
Feature: Rope Records

  Background: Login
    Given I login as a Lanigan site-admin

  Scenario: Add rope record
    Given I navigate to the Rope record page
      And I press the Add records button
      And I select the Add new rope button
      And I provide the following rope information
      | ropeType          | "Head rope"     |
      | hoistId           | 1               |
      | serialNo          | 123456          |
      | ropeDiameter      | "25in"          |
      | ropeWeight        | "25lb"          |
      | construction      | "carbon steel"  |
      | typeOfLay         | "who-knows      |
      | gradeOfSteel      | "A"             |
      | manufacturer      | "3M             |
      | manufacturerDate  | "2024-01-01"    |
    When I press the Add new rope save button
    Then I should receive a success message
