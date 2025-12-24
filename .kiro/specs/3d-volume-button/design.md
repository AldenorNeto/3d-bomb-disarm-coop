# Design Document

## Overview

Este documento descreve o design para criar botões com volume 3D real usando CSS 3D transforms. A abordagem usa múltiplos elementos HTML posicionados em diferentes valores de translateZ para criar um cilindro com face superior, lateral e base visíveis.

## Architecture

```
┌─────────────────────────────────────────┐
│              styles.css                  │
│  - .game-btn-3d (container 3D)          │
│  - .btn-top (face superior)             │
│  - .btn-side (lateral do cilindro)      │
│  - Animações :hover e :active           │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│              script.js                   │
│  - renderSubface() cria estrutura HTML  │
│  - Já usa game-btn-3d (ajustar CSS)     │
└─────────────────────────────────────────┘
```

## Components and Interfaces

### Estrutura HTML do Botão 3D

```html
<div class="game-btn-3d">
  <!-- Face superior - onde fica o emoji -->
  <div class="btn-face btn-top">🔴</div>

  <!-- Lateral do cilindro - cria a profundidade -->
  <div class="btn-face btn-side"></div>
</div>
```

### CSS 3D Transform Strategy

O truque para criar volume real:

1. **Container** (`.game-btn-3d`):

   - `transform-style: preserve-3d` - mantém 3D nos filhos
   - `transform: translateZ(12px)` - projeta para fora da face
   - Transição suave no translateZ

2. **Face Superior** (`.btn-top`):

   - `translateZ(0)` relativo ao container
   - Cor do botão, emoji centralizado
   - Borda e gradiente para highlight

3. **Lateral** (`.btn-side`):
   - `translateZ(-6px)` - posicionada atrás da face superior
   - Cor mais escura (mesmo tom, menos brilho)
   - Cria a ilusão de espessura do cilindro

### Animação de Press

```css
.game-btn-3d {
  transform: translateZ(12px); /* idle - extrudido */
  transition: transform 0.15s ease-out;
}

.game-btn-3d:active {
  transform: translateZ(4px); /* pressed - afundado */
}
```

## Data Models

### CSS Variables

| Variable          | Value | Description                                 |
| ----------------- | ----- | ------------------------------------------- |
| --btn-depth       | 12px  | Quanto o botão projeta para fora            |
| --btn-press       | 4px   | Posição quando pressionado                  |
| --btn-side-offset | -6px  | Posição da lateral (metade da profundidade) |

### Transform Values

| State  | translateZ | Visual Effect             |
| ------ | ---------- | ------------------------- |
| Idle   | 12px       | Botão projetado para fora |
| Hover  | 14px       | Levemente mais para fora  |
| Active | 4px        | Afundado na face          |

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

**No testable properties identified.**

Todos os requisitos desta feature são visuais/CSS:

- Renderização 3D de elementos
- Animações de transição
- Perspectiva durante rotação do cubo

A verificação será feita através de:

1. Inspeção visual manual
2. DevTools para verificar valores de transform
3. Teste em diferentes ângulos do cubo

## Error Handling

| Scenario                          | Handling                            |
| --------------------------------- | ----------------------------------- |
| Browser sem suporte a preserve-3d | Fallback para botão 2D com sombra   |
| Performance ruim                  | Reduzir complexidade das transições |

## Testing Strategy

### Visual Testing

1. **Verificar profundidade** - Rotacionar cubo e confirmar que lateral do botão é visível
2. **Testar animação** - Clicar botão e verificar movimento suave de afundar
3. **Cross-browser** - Testar em Chrome, Firefox, Safari, Edge

### Unit Tests

Não aplicável - feature puramente visual/CSS.

### Property-Based Tests

Não aplicável - todos os requisitos são visuais.
