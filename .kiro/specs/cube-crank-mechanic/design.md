# Design Document

## Overview

Este documento descreve o design para adicionar manivelas ao jogo de sequência do cubo 3D. As manivelas são elementos rotativos que o jogador gira arrastando, onde cada volta completa de 360° na direção correta conta como um passo na sequência.

## Architecture

A implementação estende o sistema existente:

```
┌─────────────────────────────────────────┐
│              script.js                   │
│  ┌─────────────────────────────────┐    │
│  │  Existing: Buttons, Rotation    │    │
│  ├─────────────────────────────────┤    │
│  │  New: Crank State & Logic       │    │
│  │  - Crank rendering              │    │
│  │  - Drag rotation tracking       │    │
│  │  - Turn counting                │    │
│  │  - Mixed sequence validation    │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

## Components and Interfaces

### Extended Configuration Structure

```javascript
const gameConfig = {
  buttons: [...],
  cranks: [
    {
      id: "crank-1",
      face: "back",
      color: "#9b59b6"
    }
  ],
  // Sequência mista: botões e manivelas
  winningSequence: [
    "btn-red",                              // Botão simples
    { crankId: "crank-1", direction: "cw", turns: 2 },  // 2 voltas horário
    "btn-blue"
  ]
};
```

### Crank State

```javascript
const crankState = {
  activeCrank: null, // ID da manivela sendo girada
  startAngle: 0, // Ângulo inicial do drag
  currentAngle: 0, // Ângulo atual da manivela
  accumulatedRotation: 0, // Rotação acumulada (para contar voltas)
  turnsCompleted: 0, // Voltas completadas na direção atual
  currentDirection: null, // 'cw' ou 'ccw'
};
```

### Key Functions

```javascript
function renderCranks(cranks)              // Renderiza manivelas nas faces
function handleCrankDragStart(crankId, x, y) // Inicia drag na manivela
function handleCrankDragMove(x, y)         // Atualiza rotação durante drag
function handleCrankDragEnd()              // Finaliza drag e registra voltas
function calculateAngle(centerX, centerY, x, y) // Calcula ângulo do cursor
function registerCrankStep(crankId, direction, turns) // Registra passo de manivela
function validateMixedSequence()           // Valida sequência mista
```

### Angle Calculation

```javascript
// Calcula ângulo em graus do cursor relativo ao centro da manivela
function calculateAngle(centerX, centerY, x, y) {
  const dx = x - centerX;
  const dy = y - centerY;
  return Math.atan2(dy, dx) * (180 / Math.PI);
}
```

## Data Models

### Crank Configuration

| Property | Type   | Description                     |
| -------- | ------ | ------------------------------- |
| id       | string | Identificador único da manivela |
| face     | string | Face do cubo                    |
| color    | string | Cor da manivela em hex          |

### Crank Action (in sequence)

| Property  | Type   | Description                            |
| --------- | ------ | -------------------------------------- |
| crankId   | string | ID da manivela                         |
| direction | string | 'cw' (horário) ou 'ccw' (anti-horário) |
| turns     | number | Número de voltas esperadas             |

### Crank Runtime State

| Property            | Type   | Description                       |
| ------------------- | ------ | --------------------------------- |
| activeCrank         | string | ID da manivela ativa ou null      |
| startAngle          | number | Ângulo no início do drag          |
| currentAngle        | number | Ângulo visual atual               |
| accumulatedRotation | number | Graus acumulados (+ ou -)         |
| turnsCompleted      | number | Voltas completas na direção atual |
| currentDirection    | string | 'cw', 'ccw', ou null              |

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Crank rendering matches configuration

_For any_ valid configuration with cranks, each crank rendered in the DOM should have the color and face position exactly as specified in the configuration.

**Validates: Requirements 1.1, 1.3**

### Property 2: Angle calculation correctness

_For any_ cursor position (x, y) relative to a crank center (cx, cy), the calculated angle should equal atan2(y-cy, x-cx) converted to degrees.

**Validates: Requirements 2.2**

### Property 3: Turn counting accuracy

_For any_ accumulated rotation of N \* 360 degrees (where N is a positive integer), exactly N turns should be registered in the corresponding direction (positive = clockwise, negative = counter-clockwise).

**Validates: Requirements 3.1, 3.2**

### Property 4: Excess turns trigger failure

_For any_ crank action expecting N turns, if the player completes N+1 or more turns, the system should immediately trigger a failure state.

**Validates: Requirements 3.4**

## Error Handling

| Scenario                      | Handling                                     |
| ----------------------------- | -------------------------------------------- |
| Drag outside crank bounds     | Continue tracking until mouseup/touchend     |
| Direction change mid-rotation | Reset accumulated rotation for new direction |
| Invalid crank ID in sequence  | Skip and log warning                         |

## Testing Strategy

### Unit Tests

- Verificar cálculo de ângulo
- Verificar contagem de voltas
- Verificar detecção de direção
- Verificar validação de sequência mista

### Property-Based Tests

Utilizaremos **fast-check** como biblioteca de property-based testing.

**Property 2 Test**: Gerar posições aleatórias e verificar cálculo de ângulo.

**Property 3 Test**: Gerar rotações acumuladas aleatórias e verificar contagem de voltas.

**Property 4 Test**: Gerar sequências com limites de voltas e verificar detecção de excesso.
