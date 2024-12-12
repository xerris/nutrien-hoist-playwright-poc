@Hoist @Rope-Record
Feature: Rope Records

  # Background: Login
  #   Given I login as a Lanigan site-admin

  Scenario: Add rope record
    # Given I am logged in as a site-admin
    And I navigate to the Rope record page
    And I add a new rope
    And I provide the following rope information - greg
      | Rope Type                      | "Head rope"  |
      | Hoist #                        | "1"          |
      | Serial number                  | "CUCSNO123"  |
      | Diameter of rope (optional)    | "1234"       |
      | Weight of rope                 | "123"        |
      | Construction of rope           | "abcd1234"   |
      | Type of lay                    | "Right lay"  |
      | Grade of steel                 | "1234"       |
      | Manufacturer name              | "gitesh"     |
      | Manufacturer address           | "India"      |
      | Manufacture date               | "2024-01-06" |
      | Class of core used in the rope | 123          |
      | Number of strands in the rope  | 123          |
      | Number of wires in each strand | 123          |
      | Diameter of wires              | 123          |
      | Breaking stress of steel       | 123          |
      | Standard torsion test of the   | 123          |
      | The percentage by mass of      | 123          |
      | The trade name of the          | trade-name   |
      | Breaking load                  | 123          |
      | Test number                    | 12           |
      | Test date                      | 6            |
    When I click on Save
    Then I should be able to navigate to the Rope Detail Page for created rope
