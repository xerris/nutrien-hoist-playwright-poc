@Rope-Record
Feature: Rope Records

  Scenario: Add rope record
    Given I am logged in as a site-admin
    Given I navigate to the Rope record page
    And I press the Add records button
    Then I select the Add new rope button
    Then I should see the Add new rope data Side Panel
    Given I click on Rope Information Accordion Tab
    Given I provide the required rope information
      | name                        | value           | type   |
      | Rope Type                   | Head rope       | select |
      | Hoist #                     | 1               | select |
      | Serial number               | dummy-number123 | input  |
      | Diameter of rope (optional) | 67              | input  |
      | Weight of rope              | 45              | input  |
      | Construction of rope        | construction    | input  |
      | Type of lay                 | Right lay       | select |
      | Grade of steel              | 1234            | input  |
      | Manufacturer name           | test            | input  |
      | Manufacturer address        | test            | input  |
      | Manufacture date            | 6               | date   |
    Given I click on Construction Info Accordion Tab
    And I provide information for construction info form
      | name                           | value      | type  |
      | Class of core used in the rope | 123        | input |
      | Number of strands in the rope  | 12         | input |
      | Number of wires in each strand | 12         | input |
      | Diameter of wires              | 12         | input |
      | Breaking stress of steel       | 123        | input |
      | Standard torsion test of the   | 123        | input |
      | The percentage by mass of      | 12         | input |
      | The trade name of the          | trade-name | input |
    Given I click on Breaking load test Info Accordion Tab
    And I provide information for Breaking load test info form
      | name          | value | type  |
      | Breaking load | 123   | input |
      | Test number   | 12    | input |
      | Test date     | 6     | date  |
    When I click the save button
    Then I should see the record in the Rope Dashboard
