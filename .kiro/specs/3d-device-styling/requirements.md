# Requirements Document

## Introduction

Este documento especifica os requisitos para adicionar efeitos visuais 3D aos dispositivos interativos do jogo de puzzle. O objetivo é dar volume e profundidade aos componentes, criando uma experiência mais imersiva onde botões afundam ao serem pressionados, manivelas se projetam para fora das faces do cubo, switches têm profundidade visual, e todos os elementos parecem ter massa física real.

## Glossary

- **Sistema**: A aplicação web do jogo de puzzle no sólido 3D
- **Profundidade**: Efeito visual de extensão no eixo Z (perpendicular à face)
- **Extrusão**: Projeção de um elemento para fora da superfície da face
- **Depressão**: Movimento de um elemento para dentro da superfície quando pressionado
- **Transform-style preserve-3d**: Propriedade CSS que mantém transformações 3D em elementos filhos
- **Perspective**: Propriedade CSS que define a distância do ponto de vista ao plano Z=0

## Requirements

### Requirement 1

**User Story:** As a player, I want buttons to have 3D volume and depress when clicked, so that interactions feel more tactile and realistic.

#### Acceptance Criteria

1. WHEN a button is rendered THEN the System SHALL display it as a cylindrical element with visible depth/thickness
2. WHEN a button is in idle state THEN the System SHALL show the button extruded from the face surface
3. WHEN a player presses a button THEN the System SHALL animate the button depressing into the face
4. WHEN a player releases a button THEN the System SHALL animate the button returning to its extruded position
5. WHEN viewing the cube from different angles THEN the System SHALL maintain correct 3D perspective on buttons

### Requirement 2

**User Story:** As a player, I want cranks to project outward from the cube face, so that they appear as physical handles I can grab and rotate.

#### Acceptance Criteria

1. WHEN a crank is rendered THEN the System SHALL display it projecting outward from the face surface
2. WHEN a crank is rendered THEN the System SHALL show a cylindrical base attached to the face
3. WHEN a crank is rendered THEN the System SHALL show a handle element extending from the center
4. WHEN a player rotates a crank THEN the System SHALL maintain the 3D projection during rotation
5. WHEN viewing the cube from different angles THEN the System SHALL maintain correct 3D perspective on cranks

### Requirement 3

**User Story:** As a player, I want switches to have 3D toggle mechanisms, so that the on/off action feels like flipping a physical switch.

#### Acceptance Criteria

1. WHEN a switch is rendered THEN the System SHALL display it with a recessed track and raised toggle knob
2. WHEN a switch is in off state THEN the System SHALL show the knob on one side with 3D depth
3. WHEN a switch is toggled THEN the System SHALL animate the knob sliding with maintained 3D appearance
4. WHEN a switch is in on state THEN the System SHALL show the knob on the opposite side with 3D depth
5. WHEN viewing the cube from different angles THEN the System SHALL maintain correct 3D perspective on switches

### Requirement 4

**User Story:** As a player, I want click counters to have 3D button appearance with press feedback, so that each click feels impactful.

#### Acceptance Criteria

1. WHEN a click counter is rendered THEN the System SHALL display it as a raised button with visible thickness
2. WHEN a player clicks the counter THEN the System SHALL animate the button depressing
3. WHEN the click animation completes THEN the System SHALL return the button to raised position
4. WHEN the counter display updates THEN the System SHALL maintain the 3D appearance
5. WHEN viewing the cube from different angles THEN the System SHALL maintain correct 3D perspective on counters

### Requirement 5

**User Story:** As a player, I want keypad buttons to have individual 3D depth and press animations, so that typing passwords feels like using a real keypad.

#### Acceptance Criteria

1. WHEN a keypad is rendered THEN the System SHALL display each key as a raised button with depth
2. WHEN a player presses a keypad key THEN the System SHALL animate that specific key depressing
3. WHEN a key press animation completes THEN the System SHALL return the key to raised position
4. WHEN the keypad display is rendered THEN the System SHALL show it as a recessed screen area
5. WHEN viewing the cube from different angles THEN the System SHALL maintain correct 3D perspective on keypads

### Requirement 6

**User Story:** As a developer, I want consistent 3D styling across all device types, so that the visual language is cohesive.

#### Acceptance Criteria

1. WHEN any device is rendered THEN the System SHALL use consistent shadow and highlight colors for 3D effect
2. WHEN any device is rendered THEN the System SHALL use consistent extrusion depth proportional to device size
3. WHEN any device changes state THEN the System SHALL use consistent animation timing for 3D transitions
4. WHEN the cube rotates THEN the System SHALL update lighting/shadow direction consistently across all devices
