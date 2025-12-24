# Requirements Document

## Introduction

Este documento especifica os requisitos para um sistema de dispositivos avançados no jogo de puzzle 3D. Além dos botões simples e manivelas existentes, o sistema adicionará novos tipos de dispositivos interativos: switches em sequência, botões com contador de cliques, e teclados numéricos com display para entrada de senhas. Cada subface pode conter um tipo de dispositivo, permitindo puzzles mais variados e desafiadores.

## Glossary

- **Sistema**: A aplicação web do jogo de puzzle no sólido 3D
- **Switch**: Dispositivo de alternância (liga/desliga) que pode ser parte de uma sequência
- **Switch Sequence**: Conjunto de switches que devem ser ativados em uma ordem específica
- **Click Counter Button**: Botão que requer múltiplos cliques para atingir um valor alvo
- **Keypad**: Teclado numérico (0-9) para entrada de senhas
- **Display**: Mini monitor que exibe a entrada atual do keypad
- **Subface**: Uma das 8 áreas interativas (4 no front + 4 no back)
- **Template**: Configuração JSON que define os dispositivos e a solução de uma subface

## Requirements

### Requirement 1

**User Story:** As a developer, I want to add switch devices to templates, so that players can solve puzzles by toggling switches in the correct sequence.

#### Acceptance Criteria

1. WHEN a switch is rendered THEN the System SHALL display a toggle element with on/off visual states
2. WHEN a player clicks a switch THEN the System SHALL toggle its state between on and off
3. WHEN a template defines a switch sequence THEN the System SHALL validate that switches are toggled in the correct order
4. WHEN a switch is toggled in the wrong order THEN the System SHALL mark the subface as failed
5. WHEN all switches are toggled in the correct order THEN the System SHALL mark the subface as solved

### Requirement 2

**User Story:** As a developer, I want to add click counter buttons to templates, so that players can solve puzzles by clicking a button a specific number of times.

#### Acceptance Criteria

1. WHEN a click counter button is rendered THEN the System SHALL display a button with a counter showing current clicks and target clicks
2. WHEN a player clicks the button THEN the System SHALL increment the counter by one
3. WHEN the counter reaches the target value THEN the System SHALL mark the subface as solved
4. WHEN the counter exceeds the target value THEN the System SHALL mark the subface as failed
5. WHEN the button is rendered THEN the System SHALL display the format "current/target" (e.g., "0/5")

### Requirement 3

**User Story:** As a developer, I want to add keypad devices with displays to templates, so that players can solve puzzles by entering numeric passwords.

#### Acceptance Criteria

1. WHEN a keypad is rendered THEN the System SHALL display a numeric keypad (0-9) and a display area
2. WHEN a player presses a keypad digit THEN the System SHALL append the digit to the display
3. WHEN the display shows the correct password THEN the System SHALL mark the subface as solved
4. WHEN the display shows an incorrect password of the same length THEN the System SHALL mark the subface as failed
5. WHEN a keypad is rendered THEN the System SHALL include a clear button to reset the display

### Requirement 4

**User Story:** As a developer, I want to create templates for each new device type, so that I can configure varied puzzle layouts.

#### Acceptance Criteria

1. WHEN templates are defined THEN the System SHALL support switch sequence templates with 2-4 switches
2. WHEN templates are defined THEN the System SHALL support click counter templates with targets between 3-10 clicks
3. WHEN templates are defined THEN the System SHALL support keypad templates with 3-6 digit passwords
4. WHEN templates are loaded THEN the System SHALL validate that each template has valid device configurations

### Requirement 5

**User Story:** As a player, I want visual feedback for each device type, so that I understand the current state and my progress.

#### Acceptance Criteria

1. WHEN a switch is on THEN the System SHALL display it with a distinct "on" color (green)
2. WHEN a switch is off THEN the System SHALL display it with a distinct "off" color (gray)
3. WHEN a click counter is active THEN the System SHALL animate the button on each click
4. WHEN a keypad digit is pressed THEN the System SHALL provide visual feedback on the pressed key
5. WHEN the display updates THEN the System SHALL show the digits clearly with appropriate styling
