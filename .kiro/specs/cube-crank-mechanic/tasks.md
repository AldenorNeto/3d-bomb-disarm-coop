# Implementation Plan

- [x] 1. Update configuration with cranks

  - [x] 1.1 Add cranks array and mixed sequence to gameConfig
    - Add cranks array with id, face, and color
    - Update winningSequence to support crank actions with crankId, direction, turns
    - _Requirements: 4.1, 4.2_

- [x] 2. Add crank styling

  - [x] 2.1 Add CSS styles for cranks
    - Style crank as circular element with handle indicator
    - Add rotation transform for visual feedback
    - Add hover and active states
    - _Requirements: 1.2_

- [x] 3. Implement crank rendering and interaction

  - [x] 3.1 Add crank state and rendering function

    - Define crankState object for tracking rotation
    - Implement renderCranks function to create crank elements
    - _Requirements: 1.1, 1.3_

  - [x] 3.2 Implement crank drag handling

    - Implement calculateAngle function using atan2
    - Implement handleCrankDragStart to capture initial angle
    - Implement handleCrankDragMove to update rotation and track accumulated degrees
    - Implement handleCrankDragEnd to finalize and register turns
    - _Requirements: 2.1, 2.2, 2.3_

  - [ ]\* 3.3 Write property test for angle calculation

    - **Property 2: Angle calculation correctness**
    - **Validates: Requirements 2.2**

  - [x] 3.4 Implement turn counting and step registration

    - Track accumulated rotation and detect complete turns
    - Detect direction (cw/ccw) based on rotation sign
    - Register crank step when turn completes
    - _Requirements: 3.1, 3.2_

  - [ ]\* 3.5 Write property test for turn counting
    - **Property 3: Turn counting accuracy**
    - **Validates: Requirements 3.1, 3.2**

- [x] 4. Update sequence validation

  - [x] 4.1 Modify validation to handle mixed sequences

    - Update checkSequence to handle both button IDs and crank actions
    - Validate crank steps against expected direction and turn count
    - Trigger failure if turns exceed expected count
    - _Requirements: 3.3, 3.4, 4.3_

  - [ ]\* 4.2 Write property test for excess turns failure
    - **Property 4: Excess turns trigger failure**
    - **Validates: Requirements 3.4**

- [x] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
