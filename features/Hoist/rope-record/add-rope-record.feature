@Rope-Record
Feature: Rope Records

  Background: Login
    Given I login as a Lanigan site-admin

  Scenario: Add rope record
    Given I navigate to the Rope record page
    Given I press the Add records button
    Given I select the Add new rope button
    Given I provide the following rope information
      | ropeType          | "a-type"        |
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
    # And Screen matches the base image "Light Mode"
    Then I should receive a success message
# And Screen matches the base image "Dark Mode"