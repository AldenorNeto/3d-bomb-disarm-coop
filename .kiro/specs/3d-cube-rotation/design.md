# Design Document

## Overview

Este projeto implementa um cubo 3D interativo usando HTML, CSS e JavaScript puro. O cubo é renderizado usando transformações CSS 3D e pode ser rotacionado pelo usuário através de interações de mouse (drag) ou touch em dispositivos móveis.

## Architecture

A aplicação segue uma arquitetura simples de três camadas:

```
┌─────────────────────────────────────────┐
│              index.html                  │
│         (Estrutura do DOM)               │
├─────────────────────────────────────────┤
│              styles.css                  │
│    (Transformações 3D e Layout)          │
├─────────────────────────────────────────┤
│              script.js                   │
│     (Lógica de Interação e Estado)       │
└─────────────────────────────────────────┘
```

### Estrutura de Arquivos

```
/
├── index.html      # Estrutura HTML do cubo
├── styles.css      # Estilos e transformações 3D
└── script.js       # Lógica de rotação e eventos
```

## Components and Interfaces

### HTML Structure

```html
<div class="scene">
  <div class="cube">
    <div class="face front">Front</div>
    <div class="face back">Back</div>
    <div class="face right">Right</div>
    <div class="face left">Left</div>
    <div class="face top">Top</div>
    <div class="face bottom">Bottom</div>
  </div>
</div>
```

### CSS 3D Transform System

- **Scene Container**: Define o `perspective` para criar profundidade 3D
- **Cube Container**: Aplica `transform-style: preserve-3d` para manter transformações 3D nos filhos
- **Faces**: Cada face é posicionada usando `translateZ` e `rotateX/Y` para formar o cubo

### JavaScript Module

```javascript
// Estado da rotação
const state = {
  rotateX: 0,
  rotateY: 0,
  isDragging: false,
  lastX: 0,
  lastY: 0
};

// Funções principais
function updateRotation(deltaX, deltaY)  // Atualiza ângulos de rotação
function applyTransform()                 // Aplica transformação CSS ao cubo
function handleDragStart(x, y)            // Inicia drag
function handleDragMove(x, y)             // Processa movimento
function handleDragEnd()                  // Finaliza drag
```

## Data Models

### Rotation State

| Property   | Type    | Description                         |
| ---------- | ------- | ----------------------------------- |
| rotateX    | number  | Ângulo de rotação no eixo X (graus) |
| rotateY    | number  | Ângulo de rotação no eixo Y (graus) |
| isDragging | boolean | Indica se o usuário está arrastando |
| lastX      | number  | Última posição X do cursor/touch    |
| lastY      | number  | Última posição Y do cursor/touch    |

### Sensitivity Configuration

| Property    | Type   | Default | Description                    |
| ----------- | ------ | ------- | ------------------------------ |
| sensitivity | number | 0.5     | Multiplicador de sensibilidade |

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Drag delta produces proportional rotation

_For any_ drag movement with delta (dx, dy), the cube rotation should update such that:

- rotateY changes by dx \* sensitivity
- rotateX changes by -dy \* sensitivity (inverted for natural feel)

**Validates: Requirements 2.1, 2.2, 2.3, 3.1**

### Property 2: Rotation state persistence

_For any_ rotation state (rotateX, rotateY), after a drag ends (mouseup/touchend), the rotation values should remain unchanged until the next drag begins.

**Validates: Requirements 2.4, 3.2**

## Error Handling

| Scenario              | Handling                                       |
| --------------------- | ---------------------------------------------- |
| Touch not supported   | Graceful fallback to mouse-only interaction    |
| Rapid drag movements  | Throttle updates to prevent performance issues |
| Drag outside viewport | Continue tracking until mouseup/touchend       |

## Testing Strategy

### Unit Tests

Testes unitários verificarão:

- Inicialização correta do estado
- Cálculo correto de rotação baseado em deltas
- Persistência do estado após eventos de release

### Property-Based Tests

Utilizaremos **fast-check** como biblioteca de property-based testing.

Cada teste de propriedade deve:

- Executar no mínimo 100 iterações
- Ser anotado com referência à propriedade do design document

**Property 1 Test**: Gerar deltas aleatórios (dx, dy) e verificar que a rotação atualiza proporcionalmente.

**Property 2 Test**: Gerar estados de rotação aleatórios, simular drag end, e verificar que o estado permanece inalterado.

### Test Configuration

```javascript
// fast-check configuration
fc.configureGlobal({ numRuns: 100 });
```
