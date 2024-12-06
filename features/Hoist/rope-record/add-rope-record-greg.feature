@Rope-Record
Feature: Rope Records

  Background: Login
    Given I login as a Lanigan site-admin

  Scenario: Add rope record
    Given I navigate to the Rope record page
    And I press the Add records button
    And I select the Add new rope button
    And I provide the following rope information - greg
      | Rope Type                    | "Head rope"          |
      | Hoist #                      | "1"                  |
      | Serial number                | "CUCSNO123"         |
      | Diameter of rope (optional)  | "1234"               |
      | Weight of rope               | "123"                |
      | Construction of rope         | "abcd1234"           |
      | Type of lay                 | "Right lay"          |
      | Grade of steel               | "1234"               |
      | Manufacturer name            | "gitesh"             |
      | Manufacturer address         | "India"              |
      | Manufacture date             | "2024-01-06"         |