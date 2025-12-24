# Implementation Plan

- [x] 1. Implement Switch device

  - [x] 1.1 Add switch rendering function

    - Create renderSwitch(subfaceEl, device, subfaceId) function
    - Render toggle element with on/off visual states
    - Add click event listener for toggle
    - _Requirements: 1.1_

  - [x] 1.2 Implement switch toggle logic

    - Create handleSwitchToggle(switchId, subfaceId) function
    - Toggle state between on and off
    - Update visual state (add/remove "on" class)
    - Track toggle sequence for validation
    - _Requirements: 1.2, 5.1, 5.2_

  - [x] 1.3 Implement switch sequence validation

    - Create checkSwitchSequence(subfaceId) function
    - Compare toggle sequence with solution
    - Mark subface as solved or failed accordingly
    - _Requirements: 1.3, 1.4, 1.5_

  - [x] 1.4 Write property test for switch toggle

    - **Property 1: Switch toggle state inversion**
    - **Validates: Requirements 1.2**

  - [x] 1.5 Write property test for switch sequence validation
    - **Property 2: Switch sequence validation**
    - **Validates: Requirements 1.3, 1.4, 1.5**

- [x] 2. Implement Click Counter device

  - [x] 2.1 Add click counter rendering function

    - Create renderClickCounter(subfaceEl, device, subfaceId) function
    - Render button with counter display "0/target"
    - Add click event listener
    - _Requirements: 2.1, 2.5_

  - [x] 2.2 Implement click counter logic

    - Create handleCounterClick(counterId, subfaceId) function
    - Increment counter on each click
    - Update display with new value
    - Add click animation
    - _Requirements: 2.2, 5.3_

  - [x] 2.3 Implement click counter validation

    - Create checkCounterTarget(subfaceId) function
    - Mark as solved when counter equals target
    - Mark as failed when counter exceeds target
    - _Requirements: 2.3, 2.4_

  - [x]\* 2.4 Write property test for click counter
    - **Property 3: Click counter increment**
    - **Property 4: Click counter status assignment**
    - **Validates: Requirements 2.2, 2.3, 2.4**

- [x] 3. Implement Keypad device

  - [x] 3.1 Add keypad rendering function

    - Create renderKeypad(subfaceEl, device, subfaceId) function
    - Render display area for password input
    - Render numeric buttons 0-9 in grid layout
    - Render clear button
    - _Requirements: 3.1, 3.5_

  - [x] 3.2 Implement keypad input logic

    - Create handleKeypadPress(keypadId, digit, subfaceId) function
    - Append digit to display (max 6 digits)
    - Add visual feedback on key press
    - _Requirements: 3.2, 5.4_

  - [x] 3.3 Implement keypad clear function

    - Create handleKeypadClear(keypadId, subfaceId) function
    - Reset display to empty string
    - _Requirements: 3.5_

  - [x] 3.4 Implement keypad password validation

    - Create checkKeypadPassword(subfaceId) function
    - Mark as solved when display equals password
    - Mark as failed when display length equals password length but differs
    - _Requirements: 3.3, 3.4_

  - [ ]\* 3.5 Write property test for keypad
    - **Property 6: Keypad digit append**
    - **Property 7: Keypad password validation**
    - **Property 8: Keypad clear resets display**
    - **Validates: Requirements 3.2, 3.3, 3.4, 3.5**

- [x] 4. Add CSS styles for new devices

  - [x] 4.1 Add switch styles

    - Style toggle element with on/off states
    - Add transition for smooth state change
    - Style on color (green) and off color (gray)
    - _Requirements: 5.1, 5.2_

  - [x] 4.2 Add click counter styles

    - Style counter button with display
    - Add click animation
    - Style counter text format
    - _Requirements: 5.3_

  - [x] 4.3 Add keypad styles
    - Style display area
    - Style numeric buttons in grid
    - Style clear button
    - Add press feedback animation
    - _Requirements: 5.4, 5.5_

- [x] 5. Create new templates

  - [x] 5.1 Create switch sequence templates

    - Create 2-3 templates with 2-4 switches each
    - Define different switch orders for solutions
    - _Requirements: 4.1_

  - [x] 5.2 Create click counter templates

    - Create 2-3 templates with targets 3-10
    - Vary colors and target values
    - _Requirements: 4.2_

  - [x] 5.3 Create keypad templates
    - Create 2-3 templates with 3-6 digit passwords
    - Vary password complexity
    - _Requirements: 4.3_

- [x] 6. Integrate with renderSubface

  - [x] 6.1 Update renderSubface to handle new device types

    - Add switch case for "switch" type
    - Add switch case for "click-counter" type
    - Add switch case for "keypad" type
    - Initialize device states in subfaceStates
    - _Requirements: 4.4_

  - [x] 6.2 Update checkSubfaceSolution for new device types
    - Handle switch sequence solutions
    - Handle click counter solutions
    - Handle keypad password solutions
    - _Requirements: 1.3, 2.3, 3.3_

- [x] 7. Update game configuration

  - [x] 7.1 Assign new templates to subfaces
    - Update gameConfig.subfaces mapping
    - Include at least one of each new device type
    - _Requirements: 4.4_

- [x] 8. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
