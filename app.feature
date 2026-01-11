Feature: User Management for Obi Tec oAuth Platform

  Scenario: List registered users
    Given I am on the Obi Tec oAuth Platform
    When I click on the Users menu
    Then the User Query screen opens
    And a Register option is displayed at the top
    And a list of users is displayed
    And each record shows the UUID, Name, and Email
    And an Edit option is displayed for each record
    And a Delete option is displayed for each record

  Scenario: Register a new user
    Given I am on the User Query screen
    When I click Register
    Then the User Registration screen opens
    And the mandatory fields UUID, Name, and Email are displayed

    Scenario: Save valid user data
      Given I have entered valid data in the fields
      When I click Save
      Then the new user is created in the database
      And a success message is displayed

    Scenario: Validate duplicate UUID
      Given I have entered a UUID that already exists
      When I click Save
      Then validation occurs that the UUID already exists
      And an error message "UUID already registered" is displayed

    Scenario: Validate duplicate Email
      Given I have entered an Email that already exists
      When I click Save
      Then validation occurs that the Email already exists
      And an error message "Email already registered" is displayed

    Scenario: Cancel user registration
      Given I no longer wish to register the user
      When I click Cancel
      Then I am returned to the User Query screen
      And no data is saved in the database

  Scenario: Edit user registration
    Given I am on the User Query screen
    When I click Edit User
    Then the User Edit screen opens
    And the registration fields are populated
    And the editable fields are enabled

    Scenario: Save edited user data
      Given I have modified the user data
      When I click Save
      Then the edited data is saved in the database

    Scenario: Cancel user editing
      Given I am on the User Edit screen
      When I click Cancel
      Then I am returned to the User Query screen
      And no data changes are saved

  Scenario: Delete user registration
    Given I am on the User Query screen
    When I click Delete
    Then a confirmation modal for deletion is displayed

    Scenario: Confirm user deletion
      Given I am in the deletion confirmation modal
      When I click Confirm
      Then the user record is deleted

    Scenario: Cancel user deletion
      Given I am in the deletion confirmation modal
      When I click Cancel
      Then the modal is closed
      And no deletion is performed
