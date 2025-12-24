# Design Document

## Overview

Este documento descreve o design para transformar os dispositivos do jogo de pseudo-3D (CSS shadows/gradients) para true-3D (múltiplas faces HTML). A abordagem segue o padrão estabelecido em `cube-simple.html`, onde cada dispositivo é construído com elementos HTML representando faces de objetos 3D (cilindros e cubos).

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      index.html                              │
│  (Estrutura HTML com dispositivos 3D multi-face)            │
├─────────────────────────────────────────────────────────────┤
│                      styles.css                              │
│  (Classes 3D: cylinder-*, btn-face-*, lever-*)              │
├─────────────────────────────────────────────────────────────┤
│                      script.js                               │
│  (Geração dinâmica de segmentos cilíndricos,                │
│   interações e animações)                                    │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 3D Cylinder Primitive (Buttons, Counters, Crank bases)

```html
<div class="button-cylinder" style="--cyl-color: #3498db;">
  <div class="cylinder-top"></div>
  <div class="cylinder-bottom"></div>
  <div class="cylinder-body"></div>
  <!-- Segmentos gerados via JS -->
</div>
```

### 3D Cube Primitive (Keypad keys, Switch knobs)

```html
<div class="button-3d" style="--btn-color: #e74c3c;">
  <div class="btn-face btn-front">1</div>
  <div class="btn-face btn-back"></div>
  <div class="btn-face btn-right"></div>
  <div class="btn-face btn-left"></div>
  <div class="btn-face btn-top"></div>
  <div class="btn-face btn-bottom"></div>
</div>
```

### 3D Switch Structure

```html
<div class="switch-3d">
  <div class="switch-track-3d"></div>
  <div class="switch-knob-3d">
    <div class="btn-face btn-front"></div>
    <div class="btn-face btn-back"></div>
    <div class="btn-face btn-right"></div>
    <div class="btn-face btn-left"></div>
    <div class="btn-face btn-top"></div>
    <div class="btn-face btn-bottom"></div>
  </div>
</div>
```

### 3D Click Counter Structure

```html
<div class="click-counter-3d">
  <div class="cylinder-top">
    <span class="counter-display">0/5</span>
  </div>
  <div class="cylinder-bottom"></div>
  <div class="cylinder-body"></div>
</div>
```

### 3D Keypad Structure

```html
<div class="keypad-3d">
  <div class="keypad-display-3d">****</div>
  <div class="keypad-buttons-3d">
    <div class="keypad-key-3d">
      <div class="btn-face btn-front">1</div>
      <div class="btn-face btn-back"></div>
      <div class="btn-face btn-right"></div>
      <div class="btn-face btn-left"></div>
      <div class="btn-face btn-top"></div>
      <div class="btn-face btn-bottom"></div>
    </div>
    <!-- ... mais teclas -->
  </div>
</div>
```

### 3D Crank Structure (já existe em cube-simple.html)

```html
<div class="crank-3d">
  <div class="crank-base">
    <div class="crank-base-top"></div>
    <div class="crank-base-bottom"></div>
    <div class="crank-base-body"></div>
  </div>
  <div class="crank-arm">
    <div class="crank-shaft"></div>
    <div class="crank-handle-bar">
      <div class="crank-bar-face crank-bar-front"></div>
      <div class="crank-bar-face crank-bar-back"></div>
      <div class="crank-bar-face crank-bar-top"></div>
      <div class="crank-bar-face crank-bar-bottom"></div>
    </div>
    <div class="crank-knob">
      <div class="crank-knob-top"></div>
      <div class="crank-knob-bottom"></div>
      <div class="crank-knob-body"></div>
    </div>
  </div>
</div>
```

## Data Models

### CSS Custom Properties for 3D Devices

| Property          | Type   | Description                              |
| ----------------- | ------ | ---------------------------------------- |
| --btn-size        | length | Tamanho do botão/cilindro (ex: 50px)     |
| --btn-half        | length | Metade do tamanho para translateZ        |
| --btn-depth       | length | Profundidade do botão (ex: 20px)         |
| --cyl-segments    | number | Número de segmentos do cilindro (32)     |
| --cyl-radius      | length | Raio do cilindro                         |
| --btn-color       | color  | Cor principal do dispositivo             |
| --btn-color-dark  | color  | Cor escura para faces laterais/traseiras |
| --btn-color-light | color  | Cor clara para face superior             |

### 3D Transform Values por Dispositivo

| Device        | Size        | Depth | Press Offset |
| ------------- | ----------- | ----- | ------------ |
| Game Button   | 50px        | 20px  | -15px        |
| Click Counter | 60px        | 20px  | -15px        |
| Switch Knob   | 24px x 24px | 10px  | N/A (slide)  |
| Keypad Key    | 24px x 24px | 8px   | -6px         |
| Crank Base    | 50px        | 15px  | N/A          |
| Crank Knob    | 12px        | 10px  | N/A          |

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

Based on the prework analysis, all requirements for this feature are visual/rendering concerns (CSS styling, HTML structure, animations, 3D perspective). These cannot be verified through property-based testing.

**No testable properties identified.**

The acceptance criteria are primarily:

- HTML DOM structure (multiple face elements)
- CSS 3D transforms and styling
- Visual animations (press/release, slide, rotate)
- 3D perspective rendering

These are best verified through:

1. Manual visual testing
2. Browser DevTools inspection of DOM structure and CSS transforms
3. Cross-browser testing for 3D transform support

## Error Handling

| Scenario                            | Handling                                                 |
| ----------------------------------- | -------------------------------------------------------- |
| Browser doesn't support preserve-3d | Graceful degradation - devices still functional but flat |
| Cylinder segments fail to generate  | Fallback to simple circle with gradient                  |
| Animation performance issues        | Use will-change hints, reduce segment count              |
| Z-fighting between faces            | Careful translateZ ordering                              |

## Testing Strategy

### Visual Testing

Since this feature is purely visual/CSS-based with HTML structure changes:

1. **Manual visual inspection** - Verify 3D objects render with correct volume
2. **DOM structure verification** - Inspect that face elements are created correctly
3. **Cross-browser testing** - Ensure 3D transforms work in Chrome, Firefox, Safari, Edge
4. **Performance testing** - Verify animations are smooth with multiple 3D objects
5. **Interaction testing** - Verify press/toggle/rotate interactions work correctly

### Unit Tests

No unit tests required - this feature modifies HTML structure and CSS styling without changing game logic.

### Property-Based Tests

No property-based tests applicable - all requirements are visual rendering and DOM structure concerns.
