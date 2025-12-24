# Design Document

## Overview

Este documento descreve o design para um sistema de templates de subfaces. Cada template é uma configuração JSON independente com seus próprios dispositivos e solução. O jogo usa 8 subfaces preenchidas a partir de um catálogo de 12 templates.

## Architecture

```
┌─────────────────────────────────────────┐
│           templates-catalog.js           │
│    (12 templates com devices + solution) │
├─────────────────────────────────────────┤
│            game-config.js                │
│   (Mapeamento: subface → template id)    │
├─────────────────────────────────────────┤
│              script.js                   │
│  (Lógica de resolução por subface)       │
└─────────────────────────────────────────┘
```

## Components and Interfaces

### Template Structure

```javascript
{
  id: "template-two-buttons",
  devices: [
    { type: "button", id: "btn-yellow", color: "#f1c40f", label: "🟡" },
    { type: "button", id: "btn-blue", color: "#3498db", label: "🔵" }
  ],
  solution: ["btn-yellow"]  // Apertar o amarelo resolve
}
```

```javascript
{
  id: "template-crank-cw",
  devices: [
    { type: "crank", id: "crank-1", color: "#9b59b6" }
  ],
  solution: [{ crankId: "crank-1", direction: "cw", turns: 1 }]
}
```

### Game Configuration

```javascript
const gameConfig = {
  subfaces: {
    "front-1": "template-two-buttons",
    "front-2": "template-crank-cw",
    "front-3": "template-single-button",
    "front-4": "template-crank-ccw",
    "back-1": "template-two-buttons",
    "back-2": "template-single-button",
    "back-3": "template-crank-cw",
    "back-4": "template-three-buttons",
  },
};
```

### Subface State

```javascript
const subfaceStates = {
  "front-1": {
    templateId: "template-two-buttons",
    currentSequence: [],
    status: "pending", // "pending" | "solved" | "failed"
  },
  // ... outras 7 subfaces
};
```

### Key Functions

```javascript
function loadTemplatesCatalog()           // Carrega catálogo de 12 templates
function initializeSubfaces()             // Inicializa estado de cada subface
function renderSubface(subfaceId)         // Renderiza devices do template
function handleSubfaceAction(subfaceId, action)  // Processa ação em subface
function checkSubfaceSolution(subfaceId)  // Valida sequência da subface
function setSubfaceStatus(subfaceId, status)     // Atualiza visual
```

## Data Models

### Template

| Property | Type     | Description                            |
| -------- | -------- | -------------------------------------- |
| id       | string   | Identificador único do template        |
| devices  | Device[] | Array de dispositivos (buttons/cranks) |
| solution | Action[] | Sequência de ações para resolver       |

### Device

| Property | Type   | Description                  |
| -------- | ------ | ---------------------------- |
| type     | string | "button" ou "crank"          |
| id       | string | Identificador do dispositivo |
| color    | string | Cor em formato hex           |
| label    | string | Emoji/texto (apenas buttons) |

### Subface State

| Property        | Type     | Description                      |
| --------------- | -------- | -------------------------------- |
| templateId      | string   | ID do template atribuído         |
| currentSequence | Action[] | Ações realizadas pelo jogador    |
| status          | string   | "pending", "solved", ou "failed" |

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Template structure validity

_For any_ template in the catalog, it must have a non-empty id string, a devices array with at least one device, and a solution array with at least one action.

**Validates: Requirements 1.1, 1.2, 1.3, 2.3**

### Property 2: Catalog uniqueness

_For any_ catalog of templates, all template ids must be unique (no duplicates).

**Validates: Requirements 2.2**

### Property 3: Subface isolation

_For any_ action performed on a subface, only that subface's currentSequence should be modified; all other subfaces' sequences remain unchanged.

**Validates: Requirements 4.1**

### Property 4: Correct status assignment

_For any_ subface where the player's sequence matches the template's solution, the status should be "solved". For any wrong action, the status should be "failed".

**Validates: Requirements 4.2, 4.3**

## Error Handling

| Scenario                | Handling                    |
| ----------------------- | --------------------------- |
| Template id not found   | Log error and skip subface  |
| Invalid device type     | Skip device and log warning |
| Action on solved/failed | Ignore action               |

## Testing Strategy

### Unit Tests

- Verificar estrutura dos templates
- Verificar unicidade de ids
- Verificar isolamento de subfaces
- Verificar atribuição de status

### Property-Based Tests

Utilizaremos **fast-check** como biblioteca de property-based testing.

**Property 1 Test**: Gerar templates e verificar estrutura válida.

**Property 2 Test**: Gerar catálogos e verificar unicidade de ids.

**Property 3 Test**: Gerar ações em subfaces e verificar isolamento.

**Property 4 Test**: Gerar sequências e verificar status correto.
