# Design Document

## Overview

Este documento descreve o design para um sistema de dispositivos avançados no jogo de puzzle 3D. O sistema adiciona três novos tipos de dispositivos: switches em sequência, botões com contador de cliques, e keypads com display para senhas. Cada dispositivo tem sua própria lógica de interação e validação.

## Architecture

```
┌─────────────────────────────────────────┐
│           templates-catalog.js           │
│  (Templates com novos tipos de devices)  │
├─────────────────────────────────────────┤
│            device-handlers.js            │
│  (Handlers para switch, counter, keypad) │
├─────────────────────────────────────────┤
│              script.js                   │
│  (Integração e renderização)             │
└─────────────────────────────────────────┘
```

## Components and Interfaces

### New Device Types

#### Switch Device

```javascript
{
  type: "switch",
  id: "switch-1",
  color: "#95a5a6",  // off color
  onColor: "#2ecc71" // on color
}
```

#### Click Counter Button

```javascript
{
  type: "click-counter",
  id: "counter-1",
  color: "#3498db",
  target: 5  // número de cliques necessários
}
```

#### Keypad with Display

```javascript
{
  type: "keypad",
  id: "keypad-1",
  color: "#34495e"
}
```

### Template Examples

#### Switch Sequence Template

```javascript
{
  id: "template-switch-sequence",
  devices: [
    { type: "switch", id: "sw-1", color: "#95a5a6", onColor: "#2ecc71" },
    { type: "switch", id: "sw-2", color: "#95a5a6", onColor: "#e74c3c" },
    { type: "switch", id: "sw-3", color: "#95a5a6", onColor: "#3498db" }
  ],
  solution: ["sw-2", "sw-1", "sw-3"]  // ordem correta
}
```

#### Click Counter Template

```javascript
{
  id: "template-click-counter",
  devices: [
    { type: "click-counter", id: "counter-1", color: "#9b59b6", target: 5 }
  ],
  solution: [{ counterId: "counter-1", clicks: 5 }]
}
```

#### Keypad Template

```javascript
{
  id: "template-keypad",
  devices: [
    { type: "keypad", id: "keypad-1", color: "#2c3e50" }
  ],
  solution: [{ keypadId: "keypad-1", password: "1234" }]
}
```

### Device State Structure

```javascript
// Switch state (per subface)
{
  switches: {
    "sw-1": false,  // off
    "sw-2": true,   // on
  },
  toggleSequence: []  // ordem em que foram ativados
}

// Click counter state (per subface)
{
  counters: {
    "counter-1": { current: 3, target: 5 }
  }
}

// Keypad state (per subface)
{
  keypads: {
    "keypad-1": { display: "12", password: "1234" }
  }
}
```

### Key Functions

```javascript
// Switch functions
function renderSwitch(subfaceEl, device)
function handleSwitchToggle(switchId, subfaceId)
function checkSwitchSequence(subfaceId)

// Click counter functions
function renderClickCounter(subfaceEl, device)
function handleCounterClick(counterId, subfaceId)
function checkCounterTarget(subfaceId)

// Keypad functions
function renderKeypad(subfaceEl, device)
function handleKeypadPress(keypadId, digit, subfaceId)
function handleKeypadClear(keypadId, subfaceId)
function checkKeypadPassword(subfaceId)
```

## Data Models

### Switch Device

| Property | Type   | Description                |
| -------- | ------ | -------------------------- |
| type     | string | "switch"                   |
| id       | string | Identificador único        |
| color    | string | Cor quando desligado (hex) |
| onColor  | string | Cor quando ligado (hex)    |

### Click Counter Device

| Property | Type   | Description                   |
| -------- | ------ | ----------------------------- |
| type     | string | "click-counter"               |
| id       | string | Identificador único           |
| color    | string | Cor do botão (hex)            |
| target   | number | Número de cliques necessários |

### Keypad Device

| Property | Type   | Description          |
| -------- | ------ | -------------------- |
| type     | string | "keypad"             |
| id       | string | Identificador único  |
| color    | string | Cor do teclado (hex) |

### Solution Actions

| Action Type   | Format                                 |
| ------------- | -------------------------------------- |
| Switch        | "switch-id" (string)                   |
| Click Counter | { counterId: string, clicks: number }  |
| Keypad        | { keypadId: string, password: string } |

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Switch toggle state inversion

_For any_ switch in any state (on/off), clicking it should result in the opposite state.

**Validates: Requirements 1.2**

### Property 2: Switch sequence validation

_For any_ switch sequence template, toggling switches in the correct order should mark the subface as solved, and toggling in any wrong order should mark it as failed.

**Validates: Requirements 1.3, 1.4, 1.5**

### Property 3: Click counter increment

_For any_ click counter with current value N, clicking it should result in value N+1.

**Validates: Requirements 2.2**

### Property 4: Click counter status assignment

_For any_ click counter, when current equals target the status should be "solved", and when current exceeds target the status should be "failed".

**Validates: Requirements 2.3, 2.4**

### Property 5: Click counter display format

_For any_ click counter with current C and target T, the display should show the string "C/T".

**Validates: Requirements 2.5**

### Property 6: Keypad digit append

_For any_ keypad display with content S and any digit D (0-9), pressing D should result in display showing S+D.

**Validates: Requirements 3.2**

### Property 7: Keypad password validation

_For any_ keypad, when display equals password the status should be "solved", and when display length equals password length but content differs the status should be "failed".

**Validates: Requirements 3.3, 3.4**

### Property 8: Keypad clear resets display

_For any_ keypad with any display content, pressing clear should result in empty display.

**Validates: Requirements 3.5**

### Property 9: Switch visual state

_For any_ switch, when on it should have the "on" CSS class, and when off it should not have the "on" class.

**Validates: Requirements 5.1, 5.2**

## Error Handling

| Scenario                    | Handling                           |
| --------------------------- | ---------------------------------- |
| Invalid device type         | Log error and skip device          |
| Counter exceeds target      | Mark subface as failed immediately |
| Wrong switch order          | Mark subface as failed immediately |
| Wrong password length match | Mark subface as failed             |
| Keypad overflow (>6 digits) | Ignore additional input            |

## Testing Strategy

### Unit Tests

- Verificar renderização de cada tipo de dispositivo
- Verificar toggle de switches
- Verificar incremento de contadores
- Verificar append de dígitos no keypad
- Verificar validação de soluções

### Property-Based Tests

Utilizaremos **fast-check** como biblioteca de property-based testing.

**Property 1 Test**: Gerar switches em estados aleatórios e verificar inversão.

**Property 2 Test**: Gerar sequências de switches e verificar validação.

**Property 3 Test**: Gerar contadores e verificar incremento.

**Property 4 Test**: Gerar contadores com valores e verificar status.

**Property 5 Test**: Gerar valores current/target e verificar formato.

**Property 6 Test**: Gerar displays e dígitos e verificar append.

**Property 7 Test**: Gerar passwords e inputs e verificar validação.

**Property 8 Test**: Gerar displays e verificar clear.

**Property 9 Test**: Gerar switches e verificar classes CSS.

Cada teste deve rodar no mínimo 100 iterações.
