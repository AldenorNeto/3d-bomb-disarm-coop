# Design Document

## Overview

Este documento descreve o design para transformar o cubo 3D em um jogo de sequência. O jogo usa um arquivo JSON para configurar botões coloridos nas faces cinza do cubo e define uma sequência vencedora de 3 botões.

## Architecture

```
┌─────────────────────────────────────────┐
│              game-config.json            │
│     (Configuração de botões e sequência) │
├─────────────────────────────────────────┤
│              index.html                  │
│    (Estrutura + overlay de mensagens)    │
├─────────────────────────────────────────┤
│              styles.css                  │
│      (Faces cinza + estilos botões)      │
├─────────────────────────────────────────┤
│              script.js                   │
│   (Lógica do jogo + validação sequência) │
└─────────────────────────────────────────┘
```

## Components and Interfaces

### JSON Configuration Structure

```json
{
  "buttons": [
    {
      "id": "btn1",
      "face": "front",
      "color": "#ff5757",
      "label": "1"
    },
    {
      "id": "btn2",
      "face": "right",
      "color": "#57ff57",
      "label": "2"
    },
    {
      "id": "btn3",
      "face": "top",
      "color": "#5757ff",
      "label": "3"
    }
  ],
  "winningSequence": ["btn1", "btn3", "btn2"]
}
```

### Game State

```javascript
const gameState = {
  currentSequence: [], // Botões pressionados pelo jogador
  winningSequence: [], // Sequência correta do JSON
  isGameOver: false, // Jogo terminou (vitória ou derrota)
  hasWon: false, // Jogador venceu
};
```

### Key Functions

```javascript
function loadGameConfig()           // Carrega e parseia o JSON
function renderButtons(config)      // Renderiza botões nas faces
function handleButtonClick(buttonId) // Processa clique em botão
function checkSequence()            // Valida sequência atual
function showVictory()              // Exibe mensagem de vitória
function showFailure()              // Exibe mensagem de falha
function resetGame()                // Reinicia tentativa
```

## Data Models

### Button Configuration

| Property | Type   | Description                                     |
| -------- | ------ | ----------------------------------------------- |
| id       | string | Identificador único do botão                    |
| face     | string | Face do cubo (front/back/right/left/top/bottom) |
| color    | string | Cor do botão em formato hex                     |
| label    | string | Texto exibido no botão                          |

### Game State

| Property        | Type     | Description                        |
| --------------- | -------- | ---------------------------------- |
| currentSequence | string[] | IDs dos botões pressionados        |
| winningSequence | string[] | IDs da sequência correta (3 itens) |
| isGameOver      | boolean  | Indica se o jogo terminou          |
| hasWon          | boolean  | Indica se o jogador venceu         |

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Button rendering matches JSON configuration

_For any_ valid JSON configuration, each button rendered in the DOM should have the color, label, and face position exactly as specified in the configuration.

**Validates: Requirements 1.2, 1.3**

### Property 2: Button click records to sequence

_For any_ button click when the game is not over, the currentSequence array should grow by exactly 1 element containing that button's ID.

**Validates: Requirements 3.1**

### Property 3: Wrong button triggers immediate failure

_For any_ game state where the player presses a button that doesn't match the next expected button in the winning sequence, the system should immediately set isGameOver=true and hasWon=false.

**Validates: Requirements 3.3**

## Error Handling

| Scenario               | Handling                                |
| ---------------------- | --------------------------------------- |
| Invalid JSON format    | Log error and use default configuration |
| Missing button ID      | Skip invalid button entry               |
| Click during game over | Ignore button clicks until reset        |

## Testing Strategy

### Unit Tests

- Verificar parsing correto do JSON
- Verificar renderização de botões
- Verificar detecção de vitória/derrota
- Verificar reset do jogo

### Property-Based Tests

Utilizaremos **fast-check** como biblioteca de property-based testing.

Cada teste de propriedade deve:

- Executar no mínimo 100 iterações
- Ser anotado com referência à propriedade do design document

**Property 1 Test**: Gerar configurações JSON aleatórias e verificar que os botões renderizados correspondem.

**Property 2 Test**: Gerar sequências de cliques e verificar que cada clique adiciona exatamente 1 elemento.

**Property 3 Test**: Gerar estados de jogo e cliques errados, verificar que falha é imediata.
