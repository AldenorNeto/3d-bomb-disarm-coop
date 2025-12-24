# Requirements Document

## Introduction

Este documento especifica os requisitos para criar botões com volume 3D real no jogo de puzzle. O objetivo é substituir os botões atuais (que usam apenas sombras para simular 3D) por botões cilíndricos com múltiplas faces visíveis, criando a ilusão de um objeto físico com espessura real que responde à perspectiva do cubo.

## Glossary

- **Sistema**: A aplicação web do jogo de puzzle no sólido 3D
- **Botão cilíndrico**: Elemento com face superior circular e lateral visível formando um cilindro
- **translateZ**: Propriedade CSS que move um elemento no eixo Z (para fora/dentro da tela)
- **transform-style: preserve-3d**: Propriedade CSS que mantém transformações 3D em elementos filhos
- **Face lateral**: Superfície curva do cilindro visível quando visto de ângulo

## Requirements

### Requirement 1

**User Story:** As a player, I want buttons to appear as 3D cylinders with visible thickness, so that they look like real physical buttons I can press.

#### Acceptance Criteria

1. WHEN a button is rendered THEN the System SHALL display a circular top face with the button icon/emoji
2. WHEN a button is rendered THEN the System SHALL display a visible lateral surface creating cylinder depth
3. WHEN viewing the button from an angle THEN the System SHALL show the lateral surface proportional to the viewing angle
4. WHEN the cube rotates THEN the System SHALL update the button's 3D appearance to match the new perspective

### Requirement 2

**User Story:** As a player, I want buttons to physically depress when I click them, so that the interaction feels tactile and responsive.

#### Acceptance Criteria

1. WHEN a button is in idle state THEN the System SHALL position it extruded outward from the face (translateZ positive)
2. WHEN a player presses a button THEN the System SHALL animate the button moving inward (reducing translateZ)
3. WHEN a player releases a button THEN the System SHALL animate the button returning to its extruded position
4. WHEN the button animates THEN the System SHALL complete the transition within 150 milliseconds

### Requirement 3

**User Story:** As a player, I want the button's 3D effect to be visible from all cube angles, so that the depth is always apparent.

#### Acceptance Criteria

1. WHEN the subface container is rendered THEN the System SHALL enable preserve-3d transform style
2. WHEN the button is rendered THEN the System SHALL use real translateZ values (not just shadows)
3. WHEN the cube is viewed from any angle THEN the System SHALL maintain the button's 3D projection correctly
