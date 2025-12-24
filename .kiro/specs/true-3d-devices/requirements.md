# Requirements Document

## Introduction

Este documento especifica os requisitos para transformar os dispositivos interativos do jogo (botões, switches, click counters, keypads, cranks) de uma representação pseudo-3D (usando CSS shadows e gradients) para dispositivos verdadeiramente 3D construídos com múltiplas faces HTML, similar à implementação em `cube-simple.html`. O objetivo é criar dispositivos com volume real que respondem corretamente à perspectiva 3D do cubo.

## Glossary

- **Sistema**: A aplicação web do jogo de puzzle no cubo 3D (index.html)
- **Dispositivo**: Elemento interativo nas faces do cubo (botão, switch, crank, click counter, keypad)
- **Face 3D**: Elemento HTML que representa uma superfície de um objeto 3D (front, back, left, right, top, bottom)
- **Pseudo-3D**: Técnica que usa CSS (shadows, gradients, translateZ) para simular profundidade
- **True-3D**: Técnica que usa múltiplas faces HTML com transforms para criar objetos com volume real
- **Transform-style preserve-3d**: Propriedade CSS que mantém transformações 3D em elementos filhos
- **Cilindro 3D**: Objeto criado com múltiplos segmentos rotacionados para formar uma superfície curva

## Requirements

### Requirement 1

**User Story:** As a player, I want game buttons to be true 3D cylindrical objects, so that they have realistic volume and depth from any viewing angle.

#### Acceptance Criteria

1. WHEN a game button is rendered THEN the System SHALL construct it using multiple HTML face elements forming a cylinder
2. WHEN a game button is rendered THEN the System SHALL display a circular top face and circular bottom face
3. WHEN a game button is rendered THEN the System SHALL display cylindrical body segments connecting top and bottom
4. WHEN a player presses a button THEN the System SHALL animate the entire 3D structure depressing via translateZ
5. WHEN viewing the cube from different angles THEN the System SHALL display correct 3D perspective on all button faces

### Requirement 2

**User Story:** As a player, I want switches to be true 3D toggle mechanisms with volumetric knobs, so that the toggle action appears physically realistic.

#### Acceptance Criteria

1. WHEN a switch is rendered THEN the System SHALL construct the knob using multiple HTML face elements forming a 3D shape
2. WHEN a switch is rendered THEN the System SHALL display a recessed track with visible depth
3. WHEN a switch knob is rendered THEN the System SHALL show front, back, left, right, top, and bottom faces
4. WHEN a switch is toggled THEN the System SHALL animate the 3D knob sliding while maintaining all faces
5. WHEN viewing the cube from different angles THEN the System SHALL display correct 3D perspective on switch components

### Requirement 3

**User Story:** As a player, I want click counters to be true 3D cylindrical buttons, so that clicking feels like pressing a physical button with real depth.

#### Acceptance Criteria

1. WHEN a click counter is rendered THEN the System SHALL construct it using multiple HTML face elements forming a cylinder
2. WHEN a click counter is rendered THEN the System SHALL display the count value on the top circular face
3. WHEN a click counter is rendered THEN the System SHALL display cylindrical body segments for depth
4. WHEN a player clicks the counter THEN the System SHALL animate the entire 3D cylinder depressing
5. WHEN viewing the cube from different angles THEN the System SHALL display correct 3D perspective on counter faces

### Requirement 4

**User Story:** As a player, I want keypad keys to be true 3D cubic buttons, so that each key press feels like pressing a physical key.

#### Acceptance Criteria

1. WHEN a keypad key is rendered THEN the System SHALL construct it using six HTML face elements forming a cube
2. WHEN a keypad key is rendered THEN the System SHALL display the key label on the front face
3. WHEN a keypad key is rendered THEN the System SHALL display visible side faces for depth
4. WHEN a player presses a keypad key THEN the System SHALL animate that specific 3D key depressing
5. WHEN viewing the cube from different angles THEN the System SHALL display correct 3D perspective on keypad keys

### Requirement 5

**User Story:** As a player, I want cranks to be true 3D mechanisms with volumetric bases and handles, so that rotating them feels like turning a physical crank.

#### Acceptance Criteria

1. WHEN a crank is rendered THEN the System SHALL construct the base using cylindrical HTML face elements
2. WHEN a crank is rendered THEN the System SHALL construct the handle bar using cubic HTML face elements
3. WHEN a crank is rendered THEN the System SHALL construct the knob using cylindrical HTML face elements
4. WHEN a player rotates a crank THEN the System SHALL rotate the entire 3D arm structure
5. WHEN viewing the cube from different angles THEN the System SHALL display correct 3D perspective on crank components

### Requirement 6

**User Story:** As a developer, I want reusable CSS classes for 3D primitives, so that building new 3D devices is consistent and efficient.

#### Acceptance Criteria

1. WHEN creating a 3D cylinder THEN the System SHALL provide CSS classes for cylinder-top, cylinder-bottom, and cylinder-body
2. WHEN creating a 3D cube THEN the System SHALL provide CSS classes for btn-front, btn-back, btn-left, btn-right, btn-top, btn-bottom
3. WHEN creating any 3D device THEN the System SHALL use CSS custom properties for consistent sizing and colors
4. WHEN animating any 3D device THEN the System SHALL use consistent transition timing across all device types
