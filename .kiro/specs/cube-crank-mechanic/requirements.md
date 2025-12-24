# Requirements Document

## Introduction

Este documento especifica os requisitos para adicionar manivelas (cranks) ao jogo de sequência do cubo 3D. As manivelas são elementos interativos que o jogador deve girar na direção correta (horário ou anti-horário), onde cada volta completa conta como um passo na sequência.

## Glossary

- **Sistema**: A aplicação web do jogo de sequência no cubo 3D
- **Manivela (Crank)**: Elemento circular rotativo que o jogador gira arrastando
- **Volta**: Rotação completa de 360 graus da manivela
- **Direção Horária (CW)**: Rotação no sentido dos ponteiros do relógio
- **Direção Anti-horária (CCW)**: Rotação no sentido contrário aos ponteiros do relógio
- **Passo**: Uma ação na sequência (clique de botão ou volta de manivela)

## Requirements

### Requirement 1

**User Story:** As a player, I want to see cranks on the cube faces, so that I have a new type of interactive element to use.

#### Acceptance Criteria

1. WHEN the game loads THEN the System SHALL render cranks on cube faces according to the configuration
2. WHEN a crank is rendered THEN the System SHALL display a circular element with a visible handle indicator
3. WHEN a crank is rendered THEN the System SHALL apply the color specified in the configuration

### Requirement 2

**User Story:** As a player, I want to rotate cranks by dragging, so that I can interact with them naturally.

#### Acceptance Criteria

1. WHEN the player clicks and drags on a crank THEN the System SHALL rotate the crank following the drag movement
2. WHEN the player drags around the crank center THEN the System SHALL calculate rotation angle based on cursor position relative to crank center
3. WHEN the player releases the crank THEN the System SHALL maintain the crank at its current rotation angle

### Requirement 3

**User Story:** As a player, I want each complete rotation to count as a step, so that I can input the correct sequence.

#### Acceptance Criteria

1. WHEN the player completes a 360-degree clockwise rotation THEN the System SHALL register one clockwise step for that crank
2. WHEN the player completes a 360-degree counter-clockwise rotation THEN the System SHALL register one counter-clockwise step for that crank
3. WHEN a step is registered THEN the System SHALL immediately validate against the expected sequence
4. WHEN the player rotates more turns than required THEN the System SHALL trigger failure for exceeding the expected count

### Requirement 4

**User Story:** As a player, I want the sequence to support mixed button presses and crank rotations, so that the puzzle is more complex.

#### Acceptance Criteria

1. WHEN the configuration defines a sequence THEN the System SHALL accept both button IDs and crank actions in the sequence
2. WHEN a crank action is in the sequence THEN the System SHALL specify the crank ID, direction, and number of turns
3. WHEN validating the sequence THEN the System SHALL check that crank rotations match the expected direction and count
