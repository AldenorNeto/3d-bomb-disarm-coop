# Implementation Plan

- [x] 1. Add 3D primitive CSS classes

  - [x] 1.1 Add CSS variables for 3D device sizing

    - Define --btn-size, --btn-half, --btn-depth for buttons
    - Define --cyl-segments, --cyl-radius for cylinders
    - Define color variables for each device type
    - _Requirements: 6.3_

  - [x] 1.2 Add CSS classes for 3D cylinder primitive

    - Create .button-cylinder with transform-style: preserve-3d
    - Create .cylinder-top with circular styling and translateZ
    - Create .cylinder-bottom with circular styling and negative translateZ
    - Create .cylinder-segment for body segments with rotateY transforms
    - _Requirements: 6.1_

  - [x] 1.3 Add CSS classes for 3D cube primitive

    - Create .button-3d with transform-style: preserve-3d
    - Create .btn-face base class for all faces
    - Create .btn-front, .btn-back with translateZ transforms
    - Create .btn-left, .btn-right with rotateY + translateZ
    - Create .btn-top, .btn-bottom with rotateX + translateZ
    - _Requirements: 6.2_

  - [x] 1.4 Add press animation classes
    - Create .pressed state with reduced translateZ
    - Add transition timing for smooth press/release
    - _Requirements: 6.4_

- [x] 2. Implement 3D game buttons

  - [x] 2.1 Update script.js to create 3D button HTML structure

    - Replace .game-btn with .button-cylinder structure
    - Add cylinder-top, cylinder-bottom, cylinder-body elements
    - Add function to generate cylinder segments dynamically
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 2.2 Add button press interaction
    - Add mousedown/mouseup handlers for .pressed class
    - Ensure translateZ animation on press
    - _Requirements: 1.4_

- [x] 3. Implement 3D switches

  - [x] 3.1 Add CSS for 3D switch structure

    - Create .switch-3d container with preserve-3d
    - Create .switch-track-3d with recessed appearance
    - Create .switch-knob-3d with 6 face elements
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 3.2 Update script.js to create 3D switch HTML
    - Replace .switch with .switch-3d structure
    - Add all 6 face elements for knob
    - Update toggle animation to slide 3D knob
    - _Requirements: 2.4_

- [x] 4. Implement 3D click counters

  - [x] 4.1 Add CSS for 3D click counter

    - Create .click-counter-3d with cylinder structure
    - Style counter display on cylinder-top face
    - Add press animation with translateZ
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 4.2 Update script.js to create 3D counter HTML
    - Replace .click-counter with .click-counter-3d structure
    - Add cylinder segments generation
    - Update click handler for 3D press animation
    - _Requirements: 3.4_

- [x] 5. Implement 3D keypad

  - [x] 5.1 Add CSS for 3D keypad structure

    - Create .keypad-3d container
    - Create .keypad-display-3d with recessed styling
    - Create .keypad-key-3d with 6 face elements
    - Add key press animation
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 5.2 Update script.js to create 3D keypad HTML
    - Replace .keypad with .keypad-3d structure
    - Create all keys with 6 face elements each
    - Update key press handlers for 3D animation
    - _Requirements: 4.4_

- [x] 6. Implement 3D cranks

  - [x] 6.1 Add CSS for 3D crank structure

    - Create .crank-3d container with preserve-3d
    - Create .crank-base with cylinder structure
    - Create .crank-arm with bar and knob
    - Style crank-bar-face elements for handle
    - _Requirements: 5.1, 5.2, 5.3_

  - [x] 6.2 Update script.js to create 3D crank HTML
    - Replace .crank-3d with full multi-face structure
    - Add cylinder segment generation for base and knob
    - Ensure rotation transforms entire 3D arm
    - _Requirements: 5.4_

- [ ] 7. Visual testing and refinement

  - [ ] 7.1 Test all devices from multiple cube angles

    - Rotate cube and verify 3D perspective on all devices
    - Check cylinder segments render smoothly
    - Verify cube faces align correctly
    - _Requirements: 1.5, 2.5, 3.5, 4.5, 5.5_

  - [ ] 7.2 Test all interactions

    - Verify button press animations
    - Verify switch toggle slides correctly
    - Verify counter click animation
    - Verify keypad key presses
    - Verify crank rotation
    - _Requirements: 1.4, 2.4, 3.4, 4.4, 5.4_

  - [ ] 7.3 Adjust colors and sizing
    - Fine-tune face colors for depth perception
    - Adjust translateZ values if needed
    - Ensure consistent visual style across devices
    - _Requirements: 6.3_
