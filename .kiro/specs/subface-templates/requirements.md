# Requirements Document

## Introduction

Este documento especifica os requisitos para um sistema de templates de subfaces. Cada template define uma configuração única de dispositivos (botões/manivelas) e sua própria solução. O jogo usa 8 subfaces (4 no front, 4 no back) que são preenchidas com templates de um catálogo de 12 opções. Cada subface é resolvida independentemente.

## Glossary

- **Sistema**: A aplicação web do jogo de puzzle no sólido 3D
- **Template de Subface**: Configuração JSON que define os dispositivos e a solução de uma subface
- **Catálogo**: Coleção de 12 templates disponíveis para uso
- **Solução**: Sequência de ações que resolve uma subface específica
- **Subface**: Uma das 8 áreas interativas (4 no front + 4 no back)

## Requirements

### Requirement 1

**User Story:** As a developer, I want to define subface templates in JSON, so that each template has its own devices and solution.

#### Acceptance Criteria

1. WHEN a template is defined THEN the System SHALL store an id, devices array, and solution for that template
2. WHEN a template has devices THEN the System SHALL support both buttons and cranks with their properties
3. WHEN a template has a solution THEN the System SHALL define the exact sequence of actions to solve it

### Requirement 2

**User Story:** As a developer, I want a catalog of 12 templates, so that I have variety in puzzle configurations.

#### Acceptance Criteria

1. WHEN the game initializes THEN the System SHALL load a catalog containing exactly 12 different templates
2. WHEN templates are loaded THEN the System SHALL validate that each template has a unique id
3. WHEN templates are loaded THEN the System SHALL ensure each template has at least one device and one solution step

### Requirement 3

**User Story:** As a developer, I want to assign templates to the 8 subfaces, so that I can configure the puzzle layout.

#### Acceptance Criteria

1. WHEN the game configuration is defined THEN the System SHALL map each of the 8 subface positions to a template id
2. WHEN a subface is rendered THEN the System SHALL display the devices from its assigned template
3. WHEN templates are assigned THEN the System SHALL allow the same template to be used in multiple subfaces

### Requirement 4

**User Story:** As a player, I want each subface to be solved independently, so that I can focus on one puzzle at a time.

#### Acceptance Criteria

1. WHEN a player interacts with a subface THEN the System SHALL track the sequence only for that specific subface
2. WHEN a player completes the correct sequence for a subface THEN the System SHALL mark that subface as solved
3. WHEN a player makes a wrong action on a subface THEN the System SHALL mark that subface as failed

### Requirement 5

**User Story:** As a player, I want visual feedback when a subface is solved or failed, so that I know my progress.

#### Acceptance Criteria

1. WHEN a subface is solved correctly THEN the System SHALL change its background color to green
2. WHEN a subface is failed THEN the System SHALL change its background color to red
3. WHEN a subface changes state THEN the System SHALL apply a smooth color transition
