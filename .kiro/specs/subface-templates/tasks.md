# Implementation Plan

- [x] 1. Create templates catalog

  - [x] 1.1 Create 12 template definitions in script.js
    - Define templates with varying devices (1-3 buttons, 1-2 cranks, mixed)
    - Each template has unique id, devices array, and solution
    - Include variety: single button, two buttons, crank cw, crank ccw, mixed
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3_

- [x] 2. Update game configuration

  - [x] 2.1 Create subface-to-template mapping
    - Map each of 8 subfaces (front-1 to front-4, back-1 to back-4) to a template id
    - _Requirements: 3.1, 3.3_

- [x] 3. Implement subface state management

  - [x] 3.1 Create subfaceStates object and initialization

    - Define state structure for each subface (templateId, currentSequence, status)
    - Implement initializeSubfaces function
    - _Requirements: 4.1_

  - [x] 3.2 Update rendering to use templates

    - Modify renderSubface to get devices from assigned template
    - Render devices into correct subface element
    - _Requirements: 3.2_

  - [ ] 3.3 Write property test for subface isolation
    - **Property 3: Subface isolation**
    - **Validates: Requirements 4.1**

- [x] 4. Implement per-subface resolution

  - [x] 4.1 Update action handlers for subface context

    - Modify handleButtonClick to identify which subface was clicked
    - Modify crank handlers to track subface context
    - Update sequence tracking to be per-subface
    - _Requirements: 4.1_

  - [x] 4.2 Implement subface solution checking

    - Create checkSubfaceSolution function
    - Compare currentSequence with template solution
    - Set status to "solved" or "failed" accordingly
    - _Requirements: 4.2, 4.3_

  - [ ] 4.3 Write property test for correct status assignment
    - **Property 4: Correct status assignment**
    - **Validates: Requirements 4.2, 4.3**

- [x] 5. Add visual feedback

  - [x] 5.1 Add CSS for solved/failed states

    - Add .solved class with green background
    - Add .failed class with red background
    - Add smooth transition for background color
    - _Requirements: 5.1, 5.2, 5.3_

  - [x] 5.2 Implement setSubfaceStatus function
    - Apply correct CSS class based on status
    - Disable further interactions on solved/failed subfaces
    - _Requirements: 5.1, 5.2_

- [x] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
