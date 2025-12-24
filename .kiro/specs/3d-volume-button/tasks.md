# Implementation Plan

- [x] 1. Update button CSS for true 3D volume

  - [x] 1.1 Fix .game-btn-3d container styles

    - Ensure transform-style: preserve-3d is set
    - Set transform: translateZ(12px) for idle state
    - Add transition: transform 0.15s ease-out
    - _Requirements: 2.1, 2.4_

  - [x] 1.2 Style .btn-top face for visible surface

    - Position at translateZ(0) relative to container
    - Add gradient highlight for 3D lighting effect
    - Ensure emoji/icon is centered and visible
    - _Requirements: 1.1_

  - [x] 1.3 Style .btn-side for cylinder depth

    - Position at translateZ(-6px) behind top face
    - Use darker shade of button color
    - Make it same size as top face to create cylinder effect
    - _Requirements: 1.2, 1.3_

  - [x] 1.4 Add press animation with significant depth change
    - Set :active state to translateZ(4px) - diferença de 8px do idle
    - Add :hover state to translateZ(14px) for feedback
    - **IMPORTANTE**: A variação de altura deve ser visível mesmo na visão lateral do cubo
    - O jogador precisa conseguir ver se o botão está pressionado ou não de qualquer ângulo
    - _Requirements: 2.2, 2.3_

- [ ] 2. Verify 3D perspective works correctly

  - [ ] 2.1 Test button visibility from lateral/side view

    - Rotacionar cubo para visão lateral e verificar que:
      - A lateral do cilindro é visível
      - A diferença de altura entre idle (12px) e pressed (4px) é perceptível
      - **O estado pressionado é claramente distinguível do estado normal mesmo de lado**
    - _Requirements: 1.3, 1.4, 3.3_

  - [ ] 2.2 Verify subface has preserve-3d enabled
    - Check .subface has transform-style: preserve-3d
    - Ensure perspective value allows 3D children to render
    - _Requirements: 3.1, 3.2_
