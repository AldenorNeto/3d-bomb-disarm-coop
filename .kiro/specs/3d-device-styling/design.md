# Design Document

## Overview

Este documento descreve o design para adicionar efeitos visuais 3D aos dispositivos do jogo. Utilizaremos CSS 3D transforms com `transform-style: preserve-3d` para criar elementos com volume real que respondem à perspectiva do cubo. Cada dispositivo terá múltiplas camadas (faces) para simular profundidade.

## Architecture

```
┌─────────────────────────────────────────┐
│              styles.css                  │
│  (3D transforms, pseudo-elements,        │
│   animations, shadows)                   │
├─────────────────────────────────────────┤
│              script.js                   │
│  (Estrutura HTML com camadas 3D)         │
└─────────────────────────────────────────┘
```

## Components and Interfaces

### 3D Button Structure

```html
<div class="game-btn-3d">
  <div class="btn-top">🔴</div>
  <!-- Face superior (visível) -->
  <div class="btn-side"></div>
  <!-- Lateral cilíndrica -->
  <div class="btn-bottom"></div>
  <!-- Base (sombra) -->
</div>
```

### 3D Crank Structure

```html
<div class="crank-3d">
  <div class="crank-base">
    <!-- Base cilíndrica na face -->
    <div class="crank-base-top"></div>
    <div class="crank-base-side"></div>
  </div>
  <div class="crank-shaft">
    <!-- Eixo central -->
    <div class="crank-handle"></div>
    <!-- Indicador de posição -->
  </div>
  <div class="crank-turns"></div>
  <!-- Display de voltas -->
</div>
```

### 3D Switch Structure

```html
<div class="switch-3d">
  <div class="switch-track">
    <!-- Track recuado -->
    <div class="switch-track-inner"></div>
  </div>
  <div class="switch-knob">
    <!-- Knob elevado -->
    <div class="switch-knob-top"></div>
    <div class="switch-knob-side"></div>
  </div>
</div>
```

### 3D Click Counter Structure

```html
<div class="click-counter-3d">
  <div class="counter-btn-top">
    <!-- Face superior -->
    <span class="counter-display">0/5</span>
  </div>
  <div class="counter-btn-side"></div>
  <!-- Lateral -->
</div>
```

### 3D Keypad Structure

```html
<div class="keypad-3d">
  <div class="keypad-display-3d">
    <!-- Display recuado -->
    <div class="keypad-display-screen"></div>
  </div>
  <div class="keypad-buttons-3d">
    <button class="keypad-btn-3d">
      <span class="key-top">1</span>
      <span class="key-side"></span>
    </button>
    <!-- ... mais teclas -->
  </div>
</div>
```

## Data Models

### CSS Custom Properties for 3D

| Property          | Type   | Description                           |
| ----------------- | ------ | ------------------------------------- |
| --depth           | length | Profundidade de extrusão (ex: 8px)    |
| --press-depth     | length | Quanto afunda ao pressionar (ex: 6px) |
| --shadow-color    | color  | Cor da sombra lateral                 |
| --highlight-color | color  | Cor do highlight superior             |
| --transition-time | time   | Duração das animações (ex: 0.15s)     |

### 3D Transform Values

| Device      | Idle translateZ | Pressed translateZ |
| ----------- | --------------- | ------------------ |
| Button      | 8px             | 2px                |
| Crank base  | 12px            | 12px (fixo)        |
| Switch knob | 6px             | 6px (fixo)         |
| Counter     | 8px             | 2px                |
| Keypad key  | 4px             | 1px                |

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

Based on the prework analysis, most requirements for this feature are visual/rendering concerns that cannot be verified through property-based testing. The 3D styling is primarily CSS-based and the correctness is verified visually.

**No testable properties identified.**

The acceptance criteria for this feature are primarily:

- Visual rendering (3D appearance, depth, shadows)
- CSS animations (press/release transitions)
- Perspective maintenance during cube rotation

These are best verified through:

1. Manual visual testing
2. Visual regression testing tools (if needed)
3. Browser DevTools inspection of CSS transforms

## Error Handling

| Scenario                            | Handling                                  |
| ----------------------------------- | ----------------------------------------- |
| Browser doesn't support preserve-3d | Graceful fallback to 2D styling           |
| Animation performance issues        | Use will-change hints, reduce complexity  |
| Z-fighting between layers           | Careful z-index and translateZ management |

## Testing Strategy

### Visual Testing

Since this feature is purely visual/CSS-based, testing will be done through:

1. **Manual visual inspection** - Verify 3D effects render correctly
2. **Cross-browser testing** - Ensure transforms work in Chrome, Firefox, Safari, Edge
3. **Performance testing** - Verify animations are smooth (60fps)
4. **Responsive testing** - Verify 3D effects scale appropriately on smaller screens

### Unit Tests

No unit tests required - this feature modifies only CSS styling without changing any logic.

### Property-Based Tests

No property-based tests applicable - all requirements are visual rendering concerns.
