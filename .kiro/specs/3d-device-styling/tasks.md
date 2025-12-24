# Implementation Plan

- [x] 1. Add 3D CSS foundation

  - [x] 1.1 Add CSS custom properties for 3D styling

    - Define --depth, --press-depth, --shadow-color, --highlight-color
    - Define --transition-time for consistent animations
    - Add to :root or .scene selector
    - _Requirements: 6.1, 6.2, 6.3_

  - [x] 1.2 Update subface to support 3D children
    - Add transform-style: preserve-3d to .subface
    - Ensure perspective is inherited correctly
    - _Requirements: 1.5, 2.5, 3.5, 4.5, 5.5_

- [x] 2. Implement 3D button styling

  - [x] 2.1 Update button CSS for 3D appearance

    - Add translateZ for extrusion effect
    - Add pseudo-elements for side/depth
    - Create cylindrical appearance with gradients
    - _Requirements: 1.1, 1.2_

  - [x] 2.2 Add button press animation
    - Reduce translateZ on :active state
    - Add smooth transition for press/release
    - Adjust shadow on pressed state
    - _Requirements: 1.3, 1.4_

- [x] 3. Implement 3D crank styling

  - [x] 3.1 Update crank CSS for 3D projection

    - Add translateZ for base extrusion
    - Create cylindrical base with pseudo-elements
    - Style shaft extending outward
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 3.2 Ensure 3D maintained during rotation
    - Verify transform-style preserve-3d on crank
    - Test rotation maintains depth appearance
    - _Requirements: 2.4_

- [x] 4. Implement 3D switch styling

  - [x] 4.1 Update switch CSS for 3D appearance

    - Create recessed track with inset shadow
    - Add depth to switch knob
    - Style knob with top and side faces
    - _Requirements: 3.1, 3.2_

  - [x] 4.2 Add 3D toggle animation
    - Maintain 3D appearance during slide
    - Smooth transition between states
    - _Requirements: 3.3, 3.4_

- [x] 5. Implement 3D click counter styling

  - [x] 5.1 Update click counter CSS for 3D appearance

    - Add translateZ for raised effect
    - Create side depth with pseudo-elements
    - Style display text on top face
    - _Requirements: 4.1, 4.4_

  - [x] 5.2 Add counter press animation
    - Reduce translateZ on click
    - Quick press/release animation
    - _Requirements: 4.2, 4.3_

- [x] 6. Implement 3D keypad styling

  - [x] 6.1 Update keypad container for 3D

    - Create recessed display area
    - Add depth to keypad frame
    - _Requirements: 5.4_

  - [x] 6.2 Update keypad keys for 3D appearance

    - Add translateZ to each key
    - Create side depth on keys
    - _Requirements: 5.1_

  - [x] 6.3 Add key press animations
    - Individual key press effect
    - Quick transition timing
    - _Requirements: 5.2, 5.3_

- [ ] 7. Visual testing and refinement

  - [ ] 7.1 Test 3D effects from multiple angles

    - Rotate cube and verify perspective
    - Check all device types render correctly
    - Adjust translateZ values if needed
    - _Requirements: 1.5, 2.5, 3.5, 4.5, 5.5_

  - [ ] 7.2 Test animations and interactions
    - Verify press animations are smooth
    - Check timing consistency across devices
    - _Requirements: 6.3_
