// ========== HELPER FUNCTIONS FOR 3D ==========

// Add touch events to any element for mobile support
function addTouchSupport(element) {
  element.addEventListener("touchstart", (e) => {
    e.stopPropagation();
    element.classList.add("pressed");
  });
  element.addEventListener("touchend", () => {
    element.classList.remove("pressed");
  });
  element.addEventListener("touchcancel", () => {
    element.classList.remove("pressed");
  });
}

// Lighten a hex color by percentage
function lightenColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}

// Darken a hex color by percentage
function darkenColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, (num >> 16) - amt);
  const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
  const B = Math.max(0, (num & 0x0000ff) - amt);
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}

// Create cylinder panels for 3D effect
function createCylinderPanels(
  container,
  panels = 48,
  radius = 20,
  color = "#3498db"
) {
  for (let i = 0; i < panels; i++) {
    const panel = document.createElement("div");
    panel.className = "cylinder-panel";
    const angle = (i / panels) * 360;
    panel.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    panel.style.background = `linear-gradient(to bottom, ${color}, ${darkenColor(
      color,
      20
    )}, ${darkenColor(color, 40)})`;
    container.appendChild(panel);
  }
}

// ========== TEMPLATES CATALOG ==========

const templatesCatalog = [
  // Template 13b: Five switches - toggle in specific order
  {
    id: "template-switch-five",
    devices: [
      { type: "switch", id: "sw-1", color: "#95a5a6", onColor: "#2ecc71" },
      { type: "switch", id: "sw-2", color: "#95a5a6", onColor: "#e74c3c" },
      { type: "switch", id: "sw-3", color: "#95a5a6", onColor: "#3498db" },
      { type: "switch", id: "sw-4", color: "#95a5a6", onColor: "#f1c40f" },
      { type: "switch", id: "sw-5", color: "#95a5a6", onColor: "#9b59b6" },
    ],
    solution: ["sw-1", "sw-3", "sw-5"],
  },

  // Template 14: Three switches - specific order
  {
    id: "template-switch-three",
    devices: [
      { type: "switch", id: "sw-a", color: "#95a5a6", onColor: "#3498db" },
      { type: "switch", id: "sw-b", color: "#95a5a6", onColor: "#f1c40f" },
      { type: "switch", id: "sw-c", color: "#95a5a6", onColor: "#9b59b6" },
    ],
    solution: ["sw-b", "sw-a", "sw-c"],
  },

  // Template 15: Four switches - complex order
  {
    id: "template-switch-four",
    devices: [
      { type: "switch", id: "sw-1", color: "#95a5a6", onColor: "#e74c3c" },
      { type: "switch", id: "sw-2", color: "#95a5a6", onColor: "#2ecc71" },
      { type: "switch", id: "sw-3", color: "#95a5a6", onColor: "#3498db" },
      { type: "switch", id: "sw-4", color: "#95a5a6", onColor: "#f39c12" },
    ],
    solution: ["sw-3", "sw-1", "sw-4", "sw-2"],
  },

  // ========== CLICK COUNTER TEMPLATES ==========

  // Template 16: Click counter - target 5
  {
    id: "template-counter-five",
    devices: [
      { type: "click-counter", id: "counter-1", color: "#9b59b6", target: 5 },
    ],
    solution: [{ counterId: "counter-1", clicks: 5 }],
  },

  // Template 17: Click counter - target 3
  {
    id: "template-counter-three",
    devices: [
      { type: "click-counter", id: "counter-1", color: "#376580ff", target: 3 },
    ],
    solution: [{ counterId: "counter-1", clicks: 3 }],
  },

  // Template 18: Click counter - target 10
  {
    id: "template-counter-ten",
    devices: [
      { type: "click-counter", id: "counter-1", color: "#1abc9c", target: 10 },
    ],
  },

  // ========== KEYPAD TEMPLATES ==========

  // Template 19: Keypad - 4 digit password
  {
    id: "template-keypad-four",
    devices: [{ type: "keypad", id: "keypad-1", color: "#2c3e50" }],
    solution: [{ keypadId: "keypad-1", password: "1234" }],
  },

  // Template 20: Keypad - 3 digit password
  {
    id: "template-keypad-three",
    devices: [{ type: "keypad", id: "keypad-1", color: "#34495e" }],
    solution: [{ keypadId: "keypad-1", password: "742" }],
  },

  // Template 21: Keypad - 6 digit password
  {
    id: "template-keypad-six",
    devices: [{ type: "keypad", id: "keypad-1", color: "#1a252f" }],
    solution: [{ keypadId: "keypad-1", password: "159357" }],
  },

  // Template 22: Keypad com símbolos rúnicos - 4 símbolos
  {
    id: "template-keypad-runes",
    devices: [{ type: "keypad-runes", id: "keypad-runes-1", color: "#bdc3c7" }],
    solution: [{ keypadId: "keypad-runes-1", password: "ᚠᚢᚦᚹ" }],
  },

  // Template 23: Safe dial - 3 números específicos
  {
    id: "template-safe-dial",
    devices: [
      {
        type: "safe-dial",
        id: "safe-dial-1",
        color: "#2c3e50",
        combination: [20, 80, 50], // 3 ângulos específicos (múltiplos de 10)
      },
    ],
    solution: [
      {
        safeDialId: "safe-dial-1",
        combination: [20, 80, 50],
      },
    ],
  },

  // Template 24: Color sequence - Simon Says style
  {
    id: "template-color-sequence",
    devices: [
      {
        type: "color-sequence",
        id: "color-seq-1",
        sequence: ["red", "blue", "green", "yellow", "red"], // Sequência de 5 cores
      },
    ],
    solution: [
      {
        colorSequenceId: "color-seq-1",
        sequence: ["red", "blue", "green", "yellow"],
      },
    ],
  },

  // Template 25: Wire cutting - bomb defusal style
  {
    id: "template-wire-cutting",
    devices: [
      {
        type: "wire-cutting",
        id: "wire-cut-1",
        wires: [
          { colors: ["red", "yellow"], correct: false },
          { colors: ["blue", "white"], correct: true },
          { colors: ["green", "black"], correct: true },
          { colors: ["orange", "blue"], correct: false },
          { colors: ["white", "red"], correct: false },
        ],
      },
    ],
    solution: [
      {
        wireCuttingId: "wire-cut-1",
        correctWires: ["blue-white", "green-black"], // Identificação por combinação
        requiredCuts: 2,
      },
    ],
  },

  // Template 26: Wire cutting 2 - different combination
  {
    id: "template-wire-cutting-2",
    devices: [
      {
        type: "wire-cutting",
        id: "wire-cut-2",
        wires: [
          { colors: ["yellow", "green"], correct: true },
          { colors: ["red", "blue"], correct: false },
          { colors: ["white", "orange"], correct: true },
          { colors: ["black", "yellow"], correct: false },
          { colors: ["blue", "green"], correct: false },
        ],
      },
    ],
    solution: [
      {
        wireCuttingId: "wire-cut-2",
        correctWires: ["yellow-green", "white-orange"], // Identificação por combinação
        requiredCuts: 2,
      },
    ],
  },
];

// Helper function to get template by id
function getTemplateById(templateId) {
  const template = templatesCatalog.find((t) => t.id === templateId);
  if (!template) {
    console.error(`Template not found: ${templateId}`);
    console.log(
      "Available templates:",
      templatesCatalog.map((t) => t.id)
    );
  }
  return template;
}

// Estado da rotação
const state = {
  rotateX: -20,
  rotateY: -30,
  isDragging: false,
  lastX: 0,
  lastY: 0,
};

// Estado do jogo
const gameState = {
  isGameOver: false,
  hasWon: false,
  currentSeed: null,
};

// Estado do cronômetro da bomba
const bombTimer = {
  totalSeconds: 240, // 4 minutos iniciais
  isRunning: false,
  intervalId: null,
  timerElement: null,
  minutesElement: null,
  secondsElement: null,
};

// Estado das manivelas
const crankState = {
  activeCrank: null,
  activeSubface: null, // Track which subface the crank belongs to
  startAngle: 0,
  currentAngle: 0,
  accumulatedRotation: 0,
  turnsCompleted: 0,
  currentDirection: null,
  crankAngles: {}, // Armazena ângulo visual de cada manivela
};

// Estado das subfaces (per-subface state management)
const subfaceStates = {};

// Inicializa estado de cada subface baseado na configuração
function initializeSubfaces() {
  Object.keys(gameConfig.subfaces).forEach((subfaceId) => {
    const templateId = gameConfig.subfaces[subfaceId];
    subfaceStates[subfaceId] = {
      templateId: templateId,
      currentSequence: [],
      status: "pending", // "pending" | "solved" | "failed"
    };
  });
}

const sensitivity = 0.5;
const cube = document.querySelector(".cube");

// ========== ROTATION LOGIC ==========

function updateRotation(deltaX, deltaY) {
  state.rotateY += deltaX * sensitivity;
  state.rotateX -= deltaY * sensitivity;
}

function applyTransform() {
  cube.style.transform = `rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg)`;
}

function handleDragStart(x, y) {
  state.isDragging = true;
  state.lastX = x;
  state.lastY = y;
}

function handleDragMove(x, y) {
  if (!state.isDragging) return;
  const deltaX = x - state.lastX;
  const deltaY = y - state.lastY;
  updateRotation(deltaX, deltaY);
  applyTransform();
  state.lastX = x;
  state.lastY = y;
}

function handleDragEnd() {
  state.isDragging = false;
}

// ========== GAME CONFIG ==========

const gameConfig = {
  // Mapeamento: subface → template id
  subfaces: {
    "front-1": "template-switch-five",
    "front-2": "template-wire-cutting-2", // Mudado para cortar fios (combinação diferente)
    "front-3": "template-keypad-runes", // Mudado para keypad com símbolos rúnicos
    "front-4": "template-safe-dial", // Mudado para safe dial
    "back-1": "template-wire-cutting", // Mudado para cortar fios
    "back-2": "template-counter-three",
    "back-3": "template-keypad-three",
    "back-4": "template-color-sequence", // Mudado para sequência de cores
  },
};

// ========== BOMB TIMER FUNCTIONS ==========

// Mapeamento de dígitos para segmentos LED (7 segmentos)
const digitSegments = {
  0: ["a", "b", "c", "d", "e", "f"],
  1: ["b", "c"],
  2: ["a", "b", "g", "e", "d"],
  3: ["a", "b", "g", "c", "d"],
  4: ["f", "g", "b", "c"],
  5: ["a", "f", "g", "c", "d"],
  6: ["a", "f", "g", "e", "d", "c"],
  7: ["a", "b", "c"],
  8: ["a", "b", "c", "d", "e", "f", "g"],
  9: ["a", "b", "c", "d", "f", "g"],
};

// Atualiza um dígito LED específico
function updateLEDDigit(digitId, number) {
  const digit = document.getElementById(digitId);
  if (!digit) return;

  // Remove todas as classes active
  const segments = digit.querySelectorAll(".segment");
  segments.forEach((segment) => segment.classList.remove("active"));

  // Ativa os segmentos necessários para o número
  const activeSegments = digitSegments[number] || [];
  activeSegments.forEach((segmentName) => {
    const segment = digit.querySelector(`.segment-${segmentName}`);
    if (segment) {
      segment.classList.add("active");
    }
  });
}

// Inicializa o cronômetro da bomba
function initializeBombTimer() {
  console.log("Initializing bomb timer...");
  bombTimer.timerElement = document.querySelector(".led-display");

  if (!bombTimer.timerElement) {
    console.error("LED display element not found!");
    return;
  }

  console.log("Timer element found, updating display...");
  updateTimerDisplay();
  console.log("Starting timer...");
  startBombTimer();
  console.log("Bomb timer initialized successfully");
}

// Atualiza o display do cronômetro
function updateTimerDisplay() {
  const minutes = Math.floor(bombTimer.totalSeconds / 60);
  const seconds = bombTimer.totalSeconds % 60;

  // Atualiza os dígitos LED
  const minutesTens = Math.floor(minutes / 10);
  const minutesOnes = minutes % 10;
  const secondsTens = Math.floor(seconds / 10);
  const secondsOnes = seconds % 10;

  updateLEDDigit("minutes-tens", minutesTens);
  updateLEDDigit("minutes-ones", minutesOnes);
  updateLEDDigit("seconds-tens", secondsTens);
  updateLEDDigit("seconds-ones", secondsOnes);

  // Atualiza o estado visual baseado no tempo restante
  bombTimer.timerElement.classList.remove("warning", "critical");

  if (bombTimer.totalSeconds <= 30) {
    bombTimer.timerElement.classList.add("critical");
  } else if (bombTimer.totalSeconds <= 60) {
    bombTimer.timerElement.classList.add("warning");
  }
}

// Inicia o cronômetro
function startBombTimer() {
  console.log("startBombTimer called, isRunning:", bombTimer.isRunning);
  if (bombTimer.isRunning) return;

  console.log("Starting bomb timer with", bombTimer.totalSeconds, "seconds");
  bombTimer.isRunning = true;
  bombTimer.intervalId = setInterval(() => {
    if (bombTimer.totalSeconds > 0) {
      bombTimer.totalSeconds--;
      updateTimerDisplay();

      // Verifica se o tempo acabou
      if (bombTimer.totalSeconds === 0) {
        stopBombTimer();
        handleTimerExpired();
      }
    }
  }, 1000);
  console.log("Bomb timer started with interval ID:", bombTimer.intervalId);
}

// Para o cronômetro
function stopBombTimer() {
  if (bombTimer.intervalId) {
    clearInterval(bombTimer.intervalId);
    bombTimer.intervalId = null;
  }
  bombTimer.isRunning = false;
}

// Adiciona tempo ao cronômetro (quando acerta)
function addTimeToBomb(seconds) {
  bombTimer.totalSeconds += seconds;
  updateTimerDisplay();

  // Efeito visual de tempo adicionado
  showTimerFeedback(`+${seconds}s`, "#2ecc71");
}

// Remove tempo do cronômetro (quando erra)
function removeTimeFromBomb(seconds) {
  bombTimer.totalSeconds = Math.max(0, bombTimer.totalSeconds - seconds);
  updateTimerDisplay();

  // Efeito visual de tempo removido
  showTimerFeedback(`-${seconds}s`, "#e74c3c");

  // Verifica se o tempo acabou
  if (bombTimer.totalSeconds === 0) {
    stopBombTimer();
    handleTimerExpired();
  }
}

// Mostra feedback visual no cronômetro
function showTimerFeedback(text, color) {
  const feedback = document.createElement("div");
  feedback.textContent = text;
  feedback.style.cssText = `
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    color: ${color};
    font-weight: bold;
    font-size: 16px;
    text-shadow: 0 0 10px ${color};
    animation: timer-feedback 2s ease-out forwards;
    pointer-events: none;
    z-index: 70;
  `;

  // Adiciona animação CSS se não existir
  if (!document.querySelector("#timer-feedback-style")) {
    const style = document.createElement("style");
    style.id = "timer-feedback-style";
    style.textContent = `
      @keyframes timer-feedback {
        0% {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
      }
    `;
    document.head.appendChild(style);
  }

  bombTimer.timerElement.appendChild(feedback);

  // Remove o feedback após a animação
  setTimeout(() => {
    if (feedback.parentNode) {
      feedback.parentNode.removeChild(feedback);
    }
  }, 2000);
}

// Lida com o tempo esgotado
function handleTimerExpired() {
  gameState.isGameOver = true;

  // Adiciona efeito de blur ao fundo
  document.body.classList.add("game-over");

  // Mostra overlay com efeito de blur
  const overlay = document.querySelector(".overlay");
  overlay.classList.add("game-over");

  // Customiza a mensagem e botão para game over
  const message = document.querySelector(".message");
  message.innerHTML = `
    <div style="text-align: center;">
      <h1 style="font-size: 48px; color: #e74c3c; margin-bottom: 20px; text-shadow: 0 0 20px rgba(231, 76, 60, 0.8);">
        GAME OVER
      </h1>
      <p style="font-size: 24px; color: #fff; margin-bottom: 30px;">
        💥 TEMPO ESGOTADO! 💥
      </p>
    </div>
  `;
  message.className = "message failure";

  // Modifica o botão para dar refresh
  const retryBtn = document.querySelector(".retry-btn");
  retryBtn.textContent = "JOGAR NOVAMENTE";
  retryBtn.onclick = () => {
    window.location.reload();
  };

  overlay.classList.add("show");
}

// ========== GAME LOGIC ==========

// Gera uma seed aleatória de 10 dígitos
function generateGameSeed() {
  const seed = Math.floor(Math.random() * 10000000000)
    .toString()
    .padStart(10, "0");
  gameState.currentSeed = seed;

  // Atualiza o display da seed
  updateSeedDisplay(seed);

  return seed;
}

// Atualiza o display da seed
function updateSeedDisplay(seed) {
  const seedElement = document.getElementById("seed-value");
  if (seedElement) {
    seedElement.textContent = seed;
  }
}

// Valida se a seed é válida (10 dígitos numéricos)
function validateSeed(seed) {
  return /^\d{10}$/.test(seed);
}

// Aplica uma nova seed e regenera a bomba
function applySeed(newSeed) {
  if (!validateSeed(newSeed)) {
    alert("Seed inválida! Deve conter exatamente 10 dígitos numéricos.");
    return false;
  }

  // Para o cronômetro se estiver rodando
  stopBombTimer();

  // Atualiza a seed atual
  gameState.currentSeed = newSeed;
  updateSeedDisplay(newSeed);

  // Reseta o estado do jogo
  gameState.isGameOver = false;
  gameState.hasWon = false;

  // Reseta o cronômetro
  bombTimer.totalSeconds = 240;
  bombTimer.isRunning = false;

  // Limpa estados das subfaces
  Object.keys(subfaceStates).forEach((subfaceId) => {
    subfaceStates[subfaceId].status = "pending";
    subfaceStates[subfaceId].currentSequence = [];
    // Limpa outros estados específicos
    if (subfaceStates[subfaceId].switches) {
      Object.keys(subfaceStates[subfaceId].switches).forEach((switchId) => {
        subfaceStates[subfaceId].switches[switchId] = false;
      });
    }
    if (subfaceStates[subfaceId].counters) {
      Object.keys(subfaceStates[subfaceId].counters).forEach((counterId) => {
        subfaceStates[subfaceId].counters[counterId].currentValue = 0;
      });
    }
    if (subfaceStates[subfaceId].safeDials) {
      Object.keys(subfaceStates[subfaceId].safeDials).forEach((dialId) => {
        subfaceStates[subfaceId].safeDials[dialId].enteredCombination = [];
        subfaceStates[subfaceId].safeDials[dialId].currentAngle = 0;
      });
    }
    if (subfaceStates[subfaceId].colorSequences) {
      Object.keys(subfaceStates[subfaceId].colorSequences).forEach((seqId) => {
        const sequenceState = subfaceStates[subfaceId].colorSequences[seqId];
        sequenceState.playerSequence = [];
        sequenceState.timeoutCount = 0;
        sequenceState.isTimerActive = false;
        if (sequenceState.timer) {
          clearTimeout(sequenceState.timer);
          sequenceState.timer = null;
        }
      });
    }
    if (subfaceStates[subfaceId].wireCutting) {
      Object.keys(subfaceStates[subfaceId].wireCutting).forEach((wireId) => {
        subfaceStates[subfaceId].wireCutting[wireId].wires.forEach((wire) => {
          wire.cut = false;
        });
      });
    }
  });

  // Regenera tudo com a nova seed
  updateTemplatesWithSeed(newSeed);
  renderAllSubfaces();
  generateInstructions();

  // Reinicia o cronômetro
  updateTimerDisplay();
  startBombTimer();

  // Remove overlay se estiver visível
  const overlay = document.querySelector(".overlay");
  overlay.classList.remove("show");
  document.body.classList.remove("game-over");

  return true;
}

// Configura a edição da seed
function setupSeedEditing() {
  const seedElement = document.getElementById("seed-value");
  if (!seedElement) return;

  seedElement.style.cursor = "pointer";
  seedElement.title = "Clique para editar a seed";

  seedElement.addEventListener("click", () => {
    const currentSeed = gameState.currentSeed || "0000000000";
    const newSeed = prompt(
      "Digite a nova seed (10 dígitos numéricos):",
      currentSeed
    );

    if (newSeed !== null && newSeed !== currentSeed) {
      applySeed(newSeed);
    }
  });
}

// Função de hash simples para gerar valores determinísticos baseados na seed
function seedHash(seed, index = 0) {
  let hash = 0;
  const str = seed + index.toString();
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Gera valores do cofre baseados na seed
function generateSafeDialCombination(seed) {
  // Usa os 3 primeiros dígitos da seed como base
  const digit1 = parseInt(seed[0]);
  const digit2 = parseInt(seed[1]);
  const digit3 = parseInt(seed[2]);

  // Aplica uma transformação não óbvia mas determinística
  const val1 = ((digit1 * 13 + digit2 * 7) % 10) * 10;
  const val2 = ((digit2 * 17 + digit3 * 11) % 10) * 10;
  const val3 = ((digit3 * 19 + digit1 * 23) % 10) * 10;

  // Garante que não sejam iguais
  let combination = [val1, val2, val3];

  // Se algum valor for igual, aplica offset
  if (combination[0] === combination[1]) {
    combination[1] = (combination[1] + 10) % 100;
  }
  if (combination[1] === combination[2]) {
    combination[2] = (combination[2] + 20) % 100;
  }
  if (combination[0] === combination[2]) {
    combination[2] = (combination[2] + 30) % 100;
  }

  return combination;
}

// Gera configuração do keypad numérico baseada na seed
function generateKeypadPassword(seed, length = 4) {
  // Gera 10 valores de 0 a 99 baseados na seed
  const keypadNumbers = [];
  for (let i = 0; i < 10; i++) {
    // Usa dois dígitos da seed para cada número (0-99)
    const digit1 = parseInt(seed[i % seed.length]);
    const digit2 = parseInt(seed[(i + 1) % seed.length]);
    const number = (digit1 * 10 + digit2) % 100;
    keypadNumbers.push(number);
  }

  // Remove duplicatas mantendo a ordem
  const uniqueNumbers = [];
  keypadNumbers.forEach((num) => {
    if (!uniqueNumbers.includes(num)) {
      uniqueNumbers.push(num);
    }
  });

  // Se não temos 10 únicos, completa com números sequenciais
  while (uniqueNumbers.length < 10) {
    let nextNum = 0;
    while (uniqueNumbers.includes(nextNum)) {
      nextNum++;
    }
    uniqueNumbers.push(nextNum);
  }

  // Pega apenas os primeiros 10
  const finalNumbers = uniqueNumbers.slice(0, 10);

  // Escolhe 4 números para a solução baseado na seed
  const solutionIndices = [];
  for (let i = 0; i < length; i++) {
    const seedIndex = (parseInt(seed[i]) + i * 3) % finalNumbers.length;
    let attempts = 0;
    let chosenIndex = seedIndex;

    // Evita duplicatas na solução
    while (
      solutionIndices.includes(chosenIndex) &&
      attempts < finalNumbers.length
    ) {
      chosenIndex = (chosenIndex + 1) % finalNumbers.length;
      attempts++;
    }
    solutionIndices.push(chosenIndex);
  }

  const solution = solutionIndices.map((index) => finalNumbers[index]);

  return {
    keypadNumbers: finalNumbers,
    password: solution, // Retorna array ao invés de string
    passwordString: solution.map((n) => String(n).padStart(2, "0")).join(""), // String para comparação
  };
}

// Gera senha do keypad rúnico baseada na seed
function generateKeypadRunesPassword(seed) {
  const runicSymbols = ["ᚠ", "ᚢ", "ᚦ", "ᚹ", "ᚺ", "ᚾ", "ᛈ", "ᛟ", "ᛞ", "ᛚ"];
  const indices = [
    parseInt(seed[6]) % runicSymbols.length,
    parseInt(seed[7]) % runicSymbols.length,
    parseInt(seed[8]) % runicSymbols.length,
    parseInt(seed[9]) % runicSymbols.length,
  ];

  // Evita duplicatas
  for (let i = 1; i < indices.length; i++) {
    let attempts = 0;
    while (indices[i] === indices[i - 1] && attempts < runicSymbols.length) {
      indices[i] = (indices[i] + 1) % runicSymbols.length;
      attempts++;
    }
  }

  return indices.map((i) => runicSymbols[i]).join("");
}

// Gera sequência de cores baseada na seed
function generateColorSequence(seed) {
  const colors = ["red", "blue", "green", "yellow"];

  // Gera sequência de 5 a 7 cores baseada na seed
  const length = 5 + (parseInt(seed[0]) % 3); // 5, 6 ou 7 cores
  const sequence = [];

  for (let i = 0; i < length; i++) {
    const colorIndex = parseInt(seed[i % seed.length]) % colors.length;
    sequence.push(colors[colorIndex]);
  }

  return sequence;
}

// Gera cores dos dispositivos baseadas na seed
function generateDeviceColors(seed, deviceIndex = 0) {
  const colors = [
    "#e74c3c",
    "#3498db",
    "#2ecc71",
    "#f1c40f",
    "#9b59b6",
    "#e67e22",
    "#1abc9c",
    "#34495e",
    "#95a5a6",
    "#f39c12",
    "#8e44ad",
    "#2980b9",
    "#27ae60",
    "#d35400",
    "#c0392b",
  ];

  const colorIndex =
    (parseInt(seed[deviceIndex % seed.length]) + deviceIndex) % colors.length;
  return colors[colorIndex];
}

// Gera valor do contador baseado na seed
function generateCounterTarget(seed) {
  // Usa o primeiro dígito da seed para gerar um valor entre 3 e 8
  const target = 3 + (parseInt(seed[0]) % 6); // 3, 4, 5, 6, 7 ou 8
  return target;
}

// Gera combinação de fios baseada na seed
function generateWireCombination(seed, templateId) {
  const allWires = [
    ["red", "yellow"],
    ["blue", "white"],
    ["green", "black"],
    ["orange", "blue"],
    ["white", "red"],
    ["yellow", "green"],
    ["white", "orange"],
    ["black", "yellow"],
    ["blue", "green"],
  ];

  // Usa diferentes partes da seed para diferentes templates
  const offset = templateId === "template-wire-cutting-2" ? 2 : 0;

  // Garante que os índices não ultrapassem o tamanho da seed (10 dígitos)
  const seedIndex1 = (8 + offset) % seed.length;
  const seedIndex2 = (9 + offset) % seed.length;
  const seedIndex3 = (7 + offset) % seed.length;
  const seedIndex4 = (6 + offset) % seed.length;

  const index1 =
    (parseInt(seed[seedIndex1]) + parseInt(seed[seedIndex2])) % allWires.length;
  let index2 =
    (parseInt(seed[seedIndex3]) + parseInt(seed[seedIndex4])) % allWires.length;

  // Evita duplicatas
  let attempts = 0;
  while (index2 === index1 && attempts < allWires.length) {
    index2 = (index2 + 1) % allWires.length;
    attempts++;
  }

  const correctWires = [allWires[index1], allWires[index2]];

  // Cria array de 5 fios com os corretos incluídos
  const wires = [];
  const usedIndices = [index1, index2];

  // Adiciona os fios corretos
  wires.push({ colors: correctWires[0], correct: true });
  wires.push({ colors: correctWires[1], correct: true });

  // Adiciona 3 fios incorretos
  for (let i = 0; i < 3; i++) {
    let randomIndex;
    let attempts = 0;
    do {
      const seedIdx = (i + offset) % seed.length;
      randomIndex =
        (parseInt(seed[seedIdx]) + i * 3 + attempts) % allWires.length;
      attempts++;
    } while (usedIndices.includes(randomIndex) && attempts < allWires.length);

    usedIndices.push(randomIndex);
    wires.push({ colors: allWires[randomIndex], correct: false });
  }

  // Embaralha a ordem dos fios
  for (let i = wires.length - 1; i > 0; i--) {
    const seedIdx = (i + offset) % seed.length;
    const j = (parseInt(seed[seedIdx]) + i) % (i + 1);
    [wires[i], wires[j]] = [wires[j], wires[i]];
  }

  return {
    wires: wires,
    correctWires: correctWires
      .filter((w) => w && w.length > 0)
      .map((w) => w.join("-")),
  };
}

// Gera switches a serem ligados baseados na seed
function generateSwitchCombination(seed) {
  const switches = ["sw-1", "sw-2", "sw-3", "sw-4", "sw-5"];
  const count = 2 + (parseInt(seed[0]) % 2); // 2 ou 3 switches
  const indices = [];

  for (let i = 0; i < count; i++) {
    let index;
    let attempts = 0;
    do {
      index = (parseInt(seed[i]) + i * 2 + attempts) % switches.length;
      attempts++;
    } while (indices.includes(index) && attempts < switches.length);
    indices.push(index);
  }

  return indices.sort().map((i) => switches[i]);
}

// Atualiza cores de todos os dispositivos baseadas na seed
function updateDeviceColors(seed) {
  // Apenas os fios precisam de cores baseadas na seed
  // Teclados e cofres mantêm cores básicas
  // As cores dos fios já são geradas dinamicamente na função generateWireCombination
  // Não precisamos fazer nada aqui, pois os fios já usam a seed
}

// Atualiza todos os templates com valores baseados na seed
function updateTemplatesWithSeed(seed) {
  if (!seed) return;

  // Atualiza safe dial
  const safeDialTemplate = getTemplateById("template-safe-dial");
  if (safeDialTemplate) {
    const combination = generateSafeDialCombination(seed);
    safeDialTemplate.devices[0].combination = combination;
    safeDialTemplate.solution[0].combination = combination;
  }

  // Atualiza keypad numérico
  const keypadTemplate = getTemplateById("template-keypad-three");
  if (keypadTemplate) {
    const keypadData = generateKeypadPassword(seed, 4);
    keypadTemplate.devices[0].keypadNumbers = keypadData.keypadNumbers;
    keypadTemplate.devices[0].passwordArray = keypadData.password; // Array para instruções
    keypadTemplate.solution[0].password = keypadData.passwordString; // String para verificação
  }

  // Atualiza keypad rúnico
  const keypadRunesTemplate = getTemplateById("template-keypad-runes");
  if (keypadRunesTemplate) {
    const password = generateKeypadRunesPassword(seed);
    keypadRunesTemplate.solution[0].password = password;
  }

  // Atualiza sequência de cores
  const colorTemplate = getTemplateById("template-color-sequence");
  if (colorTemplate) {
    const sequence = generateColorSequence(seed);
    colorTemplate.devices[0].sequence = sequence; // Sequência completa para mostrar
    colorTemplate.solution[0].sequence = sequence; // Mesma sequência para solução
  }

  // Atualiza wire cutting 1
  const wireTemplate1 = getTemplateById("template-wire-cutting");
  if (wireTemplate1) {
    const wireData = generateWireCombination(seed, "template-wire-cutting");
    wireTemplate1.devices[0].wires = wireData.wires;
    wireTemplate1.solution[0].correctWires = wireData.correctWires;
  }

  // Atualiza wire cutting 2
  const wireTemplate2 = getTemplateById("template-wire-cutting-2");
  if (wireTemplate2) {
    const wireData = generateWireCombination(seed, "template-wire-cutting-2");
    wireTemplate2.devices[0].wires = wireData.wires;
    wireTemplate2.solution[0].correctWires = wireData.correctWires;
  } else {
    console.error(
      "Wire cutting 2 template not found in updateTemplatesWithSeed!"
    );
  }

  // Atualiza switches
  const switchTemplate = getTemplateById("template-switch-five");
  if (switchTemplate) {
    const switches = generateSwitchCombination(seed);
    switchTemplate.solution = switches;
  }

  // Atualiza counter
  const counterTemplate = getTemplateById("template-counter-three");
  if (counterTemplate) {
    const target = generateCounterTarget(seed);
    counterTemplate.devices[0].target = target;
    counterTemplate.solution[0].clicks = target;
  }

  // Atualiza cores de todos os dispositivos baseadas na seed
  updateDeviceColors(seed);
}

// Gera instruções dinamicamente baseadas nos templates
function generateInstructions() {
  const instructionList = document.getElementById("instruction-list");
  if (!instructionList) return;

  // Limpa instruções existentes
  instructionList.innerHTML = "";

  // Mapeamento de face para label
  const faceLabels = {
    "front-1": "F1",
    "front-2": "F2",
    "front-3": "F3",
    "front-4": "F4",
    "back-1": "B1",
    "back-2": "B2",
    "back-3": "B3",
    "back-4": "B4",
  };

  // Para cada subface, gera a instrução baseada no template
  Object.keys(gameConfig.subfaces).forEach((subfaceId) => {
    const templateId = gameConfig.subfaces[subfaceId];
    const template = getTemplateById(templateId);

    if (!template) return;

    const instructionText = generateInstructionText(template);

    // Cria o elemento da instrução
    const instructionItem = document.createElement("div");
    instructionItem.className = "instruction-item";

    const faceIndex = document.createElement("span");
    faceIndex.className = "face-index";
    faceIndex.textContent = faceLabels[subfaceId] || subfaceId;

    const instructionTextEl = document.createElement("span");
    instructionTextEl.className = "instruction-text";
    instructionTextEl.textContent = instructionText;

    instructionItem.appendChild(faceIndex);
    instructionItem.appendChild(instructionTextEl);
    instructionList.appendChild(instructionItem);
  });
}

// Gera o texto da instrução baseado no template
function generateInstructionText(template) {
  const solution = template.solution;

  switch (template.id) {
    // ========== TEMPLATES ATUALMENTE USADOS ==========
    case "template-switch-five":
      const switchesToToggle = solution.filter(
        (s) => typeof s === "string" && s.startsWith("sw-")
      );
      const switchNumbers = switchesToToggle
        .map((s) => s.split("-")[1])
        .join(" e ");
      return `Ligue os switches ${switchNumbers}`;

    case "template-counter-five":
      return "Clique no contador até o nível 5 no tanque";

    case "template-counter-three":
      const counterTarget = solution.find((s) => s.counterId)?.clicks || 3;
      return `Clique no contador até o nível ${counterTarget} no tanque`;

    case "template-keypad-runes":
      const runesPassword = solution.find((s) => s.keypadId)?.password || "";
      return `Digite a sequência de símbolos: ${runesPassword}`;

    case "template-keypad-three":
      // Pega o array de números do device ao invés de fazer parsing da string
      const template = getTemplateById("template-keypad-three");
      const passwordArray = template?.devices[0]?.passwordArray || [];
      const formattedNumbers = passwordArray.map((n) =>
        String(n).padStart(2, "0")
      );
      return `Digite os números: ${formattedNumbers
        .map((v) => " " + v + " ")
        .join(", ")} (${passwordArray.length} números)`;

    case "template-safe-dial":
      const combination = solution.find((s) => s.safeDialId)?.combination || [];
      return `Gire o cofre para os números: ${combination
        .map((v) => " " + v + " ")
        .join(", ")}`;

    case "template-color-sequence":
      const colorSeq = solution.find((s) => s.colorSequenceId)?.sequence || [];
      const colorNames = {
        red: "Vermelho",
        blue: "Azul",
        green: "Verde",
        yellow: "Amarelo",
      };
      const translatedColors = colorSeq.map((c) => colorNames[c] || c);
      return `Clique na sequência: ${translatedColors
        .map((v) => " " + v + " ")
        .join(", ")} (${colorSeq.length} cores)`;

    case "template-wire-cutting":
      const wireData = solution.find((s) => s.wireCuttingId);
      if (wireData && wireData.correctWires) {
        const wireNames = wireData.correctWires.map((wire) => {
          const colors = wire.split("-");
          const colorMap = {
            blue: "azul",
            white: "branco",
            green: "verde",
            black: "preto",
            red: "vermelho",
            yellow: "amarelo",
            orange: "laranja",
          };
          return colors.map((c) => colorMap[c] || c).join("-");
        });
        return `Corte os fios: ${wireNames
          .map((v) => " " + v + " ")
          .join(", ")}`;
      }
      return "Corte os fios corretos";

    case "template-wire-cutting-2":
      const wireData2 = solution.find((s) => s.wireCuttingId);
      if (wireData2 && wireData2.correctWires) {
        const wireNames2 = wireData2.correctWires.map((wire) => {
          const colors = wire.split("-");
          const colorMap = {
            blue: "azul",
            white: "branco",
            green: "verde",
            black: "preto",
            red: "vermelho",
            yellow: "amarelo",
            orange: "laranja",
          };
          return colors.map((c) => colorMap[c] || c).join("-");
        });
        return `Corte os fios: ${wireNames2.join(", ")}`;
      }
      return "Corte os fios corretos";

    default:
      return "Siga as instruções do dispositivo";
  }
}

// Renderiza uma subface específica com os devices do seu template
function renderSubface(subfaceId) {
  const subfaceEl = document.querySelector(`[data-subface="${subfaceId}"]`);
  if (!subfaceEl) {
    console.error(`Subface element not found: ${subfaceId}`);
    return;
  }

  const templateId = gameConfig.subfaces[subfaceId];
  const template = getTemplateById(templateId);
  if (!template) {
    console.error(`Template not found: ${templateId}`);
    return;
  }

  // Remove existing devices from this subface (keep only face-label)
  const faceLabel = subfaceEl.querySelector(".face-label");
  subfaceEl.innerHTML = "";
  if (faceLabel) {
    subfaceEl.appendChild(faceLabel);
  }

  // Render devices from template
  template.devices.forEach((device) => {
    // Create unique device id for this subface
    const uniqueDeviceId = `${subfaceId}-${device.id}`;

    if (device.type === "button") {
      // Create 3D button element (cylinder)
      const btn = document.createElement("div");
      btn.className = "game-btn-3d";
      btn.dataset.id = uniqueDeviceId;
      btn.dataset.subface = subfaceId;
      btn.dataset.templateDeviceId = device.id;

      // Cylinder top face
      const top = document.createElement("div");
      top.className = "cylinder-top";
      top.style.background = `radial-gradient(circle at 35% 35%, ${lightenColor(
        device.color,
        30
      )}, ${device.color} 50%, ${darkenColor(device.color, 20)})`;
      top.textContent = device.label;
      btn.appendChild(top);

      // Cylinder bottom face
      const bottom = document.createElement("div");
      bottom.className = "cylinder-bottom";
      bottom.style.background = darkenColor(device.color, 40);
      btn.appendChild(bottom);

      // Cylinder body (segments)
      const body = document.createElement("div");
      body.className = "cylinder-body";
      createCylinderPanels(body, 48, 25, device.color);
      btn.appendChild(body);

      // Click and press events
      btn.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        btn.classList.add("pressed");
      });
      btn.addEventListener("mouseup", (e) => {
        btn.classList.remove("pressed");
      });
      btn.addEventListener("mouseleave", () => {
        btn.classList.remove("pressed");
      });

      // Touch events for mobile
      btn.addEventListener("touchstart", (e) => {
        e.stopPropagation();
        btn.classList.add("pressed");
      });
      btn.addEventListener("touchend", (e) => {
        btn.classList.remove("pressed");
      });
      btn.addEventListener("touchcancel", () => {
        btn.classList.remove("pressed");
      });

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        handleButtonClick(device.id, subfaceId);
      });

      // Add touch support for mobile
      addTouchSupport(btn);

      subfaceEl.appendChild(btn);
    } else if (device.type === "crank") {
      // Initialize crank angle
      crankState.crankAngles[uniqueDeviceId] = 0;

      const color = device.color || "#3498db";

      // Create full 3D crank container
      const crankEl = document.createElement("div");
      crankEl.className = "crank-3d-full";
      crankEl.dataset.id = uniqueDeviceId;
      crankEl.dataset.subface = subfaceId;
      crankEl.dataset.templateDeviceId = device.id;

      // Base cylinder
      const base = document.createElement("div");
      base.className = "crank-base-3d";

      const baseTop = document.createElement("div");
      baseTop.className = "crank-base-top";
      baseTop.style.background = `radial-gradient(circle at 35% 35%, ${lightenColor(
        color,
        30
      )}, ${color} 50%, ${darkenColor(color, 20)})`;
      base.appendChild(baseTop);

      const baseBottom = document.createElement("div");
      baseBottom.className = "crank-base-bottom";
      baseBottom.style.background = darkenColor(color, 40);
      base.appendChild(baseBottom);

      const baseBody = document.createElement("div");
      baseBody.className = "crank-base-body";
      // Create base cylinder panels
      for (let i = 0; i < 32; i++) {
        const panel = document.createElement("div");
        panel.className = "crank-base-panel";
        const angle = (i / 32) * 360;
        panel.style.transform = `rotateY(${angle}deg) translateZ(25px)`;
        panel.style.background = `linear-gradient(to bottom, ${color}, ${darkenColor(
          color,
          20
        )}, ${darkenColor(color, 40)})`;
        baseBody.appendChild(panel);
      }
      base.appendChild(baseBody);
      crankEl.appendChild(base);

      // Arm (rotates)
      const arm = document.createElement("div");
      arm.className = "crank-arm-3d";

      // Shaft (center)
      const shaft = document.createElement("div");
      shaft.className = "crank-shaft-3d";
      shaft.style.background = darkenColor(color, 30);
      arm.appendChild(shaft);

      // Handle bar (3D cube)
      const bar = document.createElement("div");
      bar.className = "crank-bar-3d";

      const barFaces = [
        { cls: "crank-bar-front", bg: color },
        { cls: "crank-bar-back", bg: darkenColor(color, 40) },
        { cls: "crank-bar-top", bg: lightenColor(color, 20) },
        { cls: "crank-bar-bottom", bg: darkenColor(color, 40) },
        { cls: "crank-bar-right", bg: darkenColor(color, 20) },
        { cls: "crank-bar-left", bg: darkenColor(color, 20) },
      ];
      barFaces.forEach((f) => {
        const face = document.createElement("div");
        face.className = `crank-bar-face ${f.cls}`;
        face.style.background = f.bg;
        bar.appendChild(face);
      });
      arm.appendChild(bar);

      // Knob cylinder
      const knob = document.createElement("div");
      knob.className = "crank-knob-3d";

      const knobTop = document.createElement("div");
      knobTop.className = "crank-knob-top";
      knobTop.style.background = `radial-gradient(circle at 35% 35%, ${lightenColor(
        color,
        30
      )}, ${color} 50%, ${darkenColor(color, 20)})`;
      knob.appendChild(knobTop);

      const knobBottom = document.createElement("div");
      knobBottom.className = "crank-knob-bottom";
      knobBottom.style.background = darkenColor(color, 40);
      knob.appendChild(knobBottom);

      const knobBody = document.createElement("div");
      knobBody.className = "crank-knob-body";
      // Create knob cylinder panels
      for (let i = 0; i < 24; i++) {
        const panel = document.createElement("div");
        panel.className = "crank-knob-panel";
        const angle = (i / 24) * 360;
        panel.style.transform = `rotateY(${angle}deg) translateZ(7px)`;
        panel.style.background = `linear-gradient(to bottom, ${color}, ${darkenColor(
          color,
          20
        )}, ${darkenColor(color, 40)})`;
        knobBody.appendChild(panel);
      }
      knob.appendChild(knobBody);
      arm.appendChild(knob);

      crankEl.appendChild(arm);

      // Turn counter
      const turns = document.createElement("div");
      turns.className = "crank-turns";
      turns.textContent = "0 voltas";
      crankEl.appendChild(turns);

      subfaceEl.appendChild(crankEl);
    } else if (device.type === "switch") {
      // Render switch device
      renderSwitch(subfaceEl, device, subfaceId);
    } else if (device.type === "click-counter") {
      // Render click counter device
      renderClickCounter(subfaceEl, device, subfaceId);
    } else if (device.type === "keypad") {
      // Render keypad device
      renderKeypad(subfaceEl, device, subfaceId);
    } else if (device.type === "keypad-runes") {
      // Render keypad with runic symbols
      renderKeypadRunes(subfaceEl, device, subfaceId);
    } else if (device.type === "safe-dial") {
      // Render safe dial device
      renderSafeDial(subfaceEl, device, subfaceId);
    } else if (device.type === "color-sequence") {
      // Render color sequence device
      renderColorSequence(subfaceEl, device, subfaceId);
    } else if (device.type === "wire-cutting") {
      // Render wire cutting device
      renderWireCutting(subfaceEl, device, subfaceId);
    }
  });
}

// Renderiza todas as subfaces usando templates
function renderAllSubfaces() {
  Object.keys(gameConfig.subfaces).forEach((subfaceId) => {
    renderSubface(subfaceId);
  });
}

// Inicializa o jogo com a configuração
function loadGameConfig() {
  initializeSubfaces();
  renderAllSubfaces();
}

// ========== SWITCH DEVICE ==========

// Renders a switch toggle element in the subface
function renderSwitch(subfaceEl, device, subfaceId) {
  const uniqueDeviceId = `${subfaceId}-${device.id}`;

  // Initialize switch state in subfaceStates if not exists
  if (!subfaceStates[subfaceId].switches) {
    subfaceStates[subfaceId].switches = {};
    subfaceStates[subfaceId].toggleSequence = [];
  }

  // Set initial state - switches 3 and 4 start ON for F1, others start OFF
  let initialState = false; // Default OFF
  if (
    subfaceId === "front-1" &&
    (device.id === "sw-3" || device.id === "sw-4")
  ) {
    initialState = true; // Start ON for sw-3 and sw-4 in F1
  }
  subfaceStates[subfaceId].switches[device.id] = initialState;

  // Create 3D switch container
  const switchEl = document.createElement("div");
  switchEl.className = "switch-3d";
  switchEl.dataset.id = uniqueDeviceId;
  switchEl.dataset.subface = subfaceId;
  switchEl.dataset.templateDeviceId = device.id;
  switchEl.style.setProperty("--switch-off-color", device.color || "#95a5a6");
  switchEl.style.setProperty("--switch-on-color", device.onColor || "#2ecc71");

  // 3D Track
  const track = document.createElement("div");
  track.className = "switch-track-3d";
  switchEl.appendChild(track);

  // 3D Knob with 6 faces
  const knob = document.createElement("div");
  knob.className = "switch-knob-3d";

  // Create 6 faces for the knob
  const faces = ["front", "back", "right", "left", "top", "bottom"];
  faces.forEach((face) => {
    const faceEl = document.createElement("div");
    faceEl.className = `btn-face btn-${face}`;
    knob.appendChild(faceEl);
  });

  switchEl.appendChild(knob);

  // LED de status
  const statusLed = document.createElement("div");
  statusLed.className = "status-led";
  switchEl.appendChild(statusLed);

  // Label do circuito
  const circuitLabel = document.createElement("div");
  circuitLabel.className = "circuit-label";
  circuitLabel.textContent = `C${device.id.slice(-1)}`;
  switchEl.appendChild(circuitLabel);

  // Apply initial visual state
  if (initialState) {
    switchEl.classList.add("on");
  }

  // Botão de submit (apenas para o último switch da subface)
  if (device.id === getLastSwitchId(subfaceId)) {
    const submitBtn = document.createElement("button");
    submitBtn.className = "switch-submit-btn";
    submitBtn.textContent = "✓";
    submitBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      checkSwitchConfiguration(subfaceId);
    });
    subfaceEl.appendChild(submitBtn);
  }

  // Click event listener
  switchEl.addEventListener("click", (e) => {
    e.stopPropagation();
    handleSwitchToggle(device.id, subfaceId);
  });

  subfaceEl.appendChild(switchEl);
}

// Handles switch toggle - toggles state, updates visual (sem verificar sequência)
function handleSwitchToggle(switchId, subfaceId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  // Toggle the switch state
  const currentState = subfaceState.switches[switchId];
  const newState = !currentState;
  subfaceState.switches[switchId] = newState;

  // Update visual state
  const uniqueDeviceId = `${subfaceId}-${switchId}`;
  const switchEl = document.querySelector(
    `.switch-3d[data-id="${uniqueDeviceId}"]`
  );
  if (switchEl) {
    if (newState) {
      switchEl.classList.add("on");
    } else {
      switchEl.classList.remove("on");
    }
  }
}

// Verifica configuração final dos switches (chamada pelo botão submit)
function checkSwitchConfiguration(subfaceId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  const template = getTemplateById(subfaceState.templateId);
  if (!template) return;

  // Usa a solução dinâmica do template ao invés de lógica hardcoded
  const expectedSwitches = template.solution;
  let isCorrect = true;

  // Verifica se todos os switches esperados estão ON
  for (const switchId of expectedSwitches) {
    if (subfaceState.switches[switchId] !== true) {
      isCorrect = false;
      break;
    }
  }

  // Verifica se switches não esperados estão OFF
  if (isCorrect) {
    for (const switchId in subfaceState.switches) {
      if (
        !expectedSwitches.includes(switchId) &&
        subfaceState.switches[switchId] === true
      ) {
        isCorrect = false;
        break;
      }
    }
  }

  if (isCorrect) {
    subfaceState.status = "solved";
    setSubfaceStatus(subfaceId, "solved");
  } else {
    subfaceState.status = "failed";
    setSubfaceStatus(subfaceId, "failed");
  }
}

// Retorna o ID do último switch de uma subface
function getLastSwitchId(subfaceId) {
  const template = getTemplateById(gameConfig.subfaces[subfaceId]);
  if (!template || !template.devices) return null;

  const switches = template.devices.filter((d) => d.type === "switch");
  return switches.length > 0 ? switches[switches.length - 1].id : null;
}

// ========== CLICK COUNTER DEVICE ==========

// Renders a click counter button in the subface
function renderClickCounter(subfaceEl, device, subfaceId) {
  const uniqueDeviceId = `${subfaceId}-${device.id}`;

  // Initialize counter state in subfaceStates if not exists
  if (!subfaceStates[subfaceId].counters) {
    subfaceStates[subfaceId].counters = {};
  }
  subfaceStates[subfaceId].counters[device.id] = {
    current: 0,
    target: device.target,
    lastClickTime: 0, // Para debounce de cliques duplos no mobile
  };

  // Create 3D counter (cylinder)
  const counterEl = document.createElement("div");
  counterEl.className = "click-counter-3d";
  counterEl.dataset.id = uniqueDeviceId;
  counterEl.dataset.subface = subfaceId;
  counterEl.dataset.templateDeviceId = device.id;

  const color = device.color || "#3498db";

  // Cylinder top face with display
  const top = document.createElement("div");
  top.className = "cylinder-top";
  top.style.background = `radial-gradient(circle at 35% 35%, ${lightenColor(
    color,
    30
  )}, ${color} 50%, ${darkenColor(color, 20)})`;

  const display = document.createElement("div");
  display.className = "counter-display";
  display.textContent = "PUMP";
  top.appendChild(display);
  counterEl.appendChild(top);

  // Cylinder bottom face
  const bottom = document.createElement("div");
  bottom.className = "cylinder-bottom";
  bottom.style.background = darkenColor(color, 40);
  counterEl.appendChild(bottom);

  // Cylinder body (segments)
  const body = document.createElement("div");
  body.className = "cylinder-body";
  createCylinderPanels(body, 48, 30, color);
  counterEl.appendChild(body);

  // Click and press events com funcionalidade de segurar para esvaziar
  let holdTimer = null;
  let isHolding = false;
  let hasEmptied = false; // Flag para saber se já esvaziou

  counterEl.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    counterEl.classList.add("pressed");
    isHolding = true;
    hasEmptied = false; // Reset da flag

    // Timer para esvaziar o tanque se segurar por 1 segundo
    holdTimer = setTimeout(() => {
      if (isHolding) {
        // Esvazia o tanque imediatamente
        const subfaceState = subfaceStates[subfaceId];
        if (
          subfaceState &&
          subfaceState.counters &&
          subfaceState.counters[device.id]
        ) {
          subfaceState.counters[device.id].current = 0;
          updateTankLevel(
            subfaceId,
            device.id,
            0,
            subfaceState.counters[device.id].target
          );
        }

        // Força o botão a se soltar automaticamente
        counterEl.classList.remove("pressed");
        hasEmptied = true; // Marca que já esvaziou
        isHolding = false;
      }
    }, 1000);
  });

  counterEl.addEventListener("mouseup", (e) => {
    counterEl.classList.remove("pressed");

    // Se não esvaziou e estava segurando, executa clique normal
    if (isHolding && !hasEmptied && holdTimer) {
      clearTimeout(holdTimer);
      setTimeout(() => {
        handleCounterClick(device.id, subfaceId);
      }, 50);
    }
    isHolding = false;
    hasEmptied = false; // Reset da flag
  });

  counterEl.addEventListener("mouseleave", () => {
    counterEl.classList.remove("pressed");
    if (holdTimer) {
      clearTimeout(holdTimer);
    }
    isHolding = false;
    hasEmptied = false; // Reset da flag
  });

  // Touch events for mobile
  counterEl.addEventListener("touchstart", (e) => {
    e.stopPropagation();
    counterEl.classList.add("pressed");
    isHolding = true;
    hasEmptied = false; // Reset da flag

    // Timer para esvaziar o tanque se segurar por 1 segundo
    holdTimer = setTimeout(() => {
      if (isHolding) {
        // Esvazia o tanque imediatamente
        const subfaceState = subfaceStates[subfaceId];
        if (
          subfaceState &&
          subfaceState.counters &&
          subfaceState.counters[device.id]
        ) {
          subfaceState.counters[device.id].current = 0;
          updateTankLevel(
            subfaceId,
            device.id,
            0,
            subfaceState.counters[device.id].target
          );
        }

        // Força o botão a se soltar automaticamente
        counterEl.classList.remove("pressed");
        hasEmptied = true; // Marca que já esvaziou
        isHolding = false;
      }
    }, 1000);
  });

  counterEl.addEventListener("touchend", (e) => {
    counterEl.classList.remove("pressed");

    // Se não esvaziou e estava segurando, executa clique normal
    if (isHolding && !hasEmptied && holdTimer) {
      clearTimeout(holdTimer);
      setTimeout(() => {
        handleCounterClick(device.id, subfaceId);
      }, 50);
    }
    isHolding = false;
    hasEmptied = false; // Reset da flag
  });

  counterEl.addEventListener("touchcancel", () => {
    counterEl.classList.remove("pressed");
    if (holdTimer) {
      clearTimeout(holdTimer);
    }
    isHolding = false;
    hasEmptied = false; // Reset da flag
  });

  // Remover o event listener de click separado já que agora está integrado no mouseup

  // Container para botão + tanque
  const counterContainer = document.createElement("div");
  counterContainer.className = "counter-container";

  // Tanque visual
  const tank = document.createElement("div");
  tank.className = "counter-tank";
  tank.dataset.id = uniqueDeviceId;

  // Estrutura do tanque
  const tankBody = document.createElement("div");
  tankBody.className = "tank-body";

  const tankLiquid = document.createElement("div");
  tankLiquid.className = "tank-liquid";
  tankLiquid.style.height = "0%"; // Começa vazio

  const tankGlass = document.createElement("div");
  tankGlass.className = "tank-glass";

  // Eixo Y (escala) ao lado do tanque
  const yAxis = document.createElement("div");
  yAxis.className = "tank-y-axis";

  // Cria marcações de 0 a 10 no eixo Y
  for (let i = 0; i <= 10; i++) {
    const mark = document.createElement("div");
    mark.className = "y-axis-mark";
    mark.style.bottom = `${(i / 10) * 100}%`;

    // Só mostra o número se for par (0, 2, 4, 6, 8, 10)
    if (i % 2 === 0) {
      const label = document.createElement("span");
      label.className = "y-axis-label";
      label.textContent = i;
      mark.appendChild(label);
    }

    yAxis.appendChild(mark);
  }

  tankBody.appendChild(tankLiquid);
  tankBody.appendChild(tankGlass);
  tank.appendChild(tankBody);
  tank.appendChild(yAxis);

  // Adiciona ao container
  counterContainer.appendChild(counterEl);

  // Add touch support for mobile
  addTouchSupport(counterEl);

  counterContainer.appendChild(tank);

  // Botão de submit para o contador
  const submitBtn = document.createElement("button");
  submitBtn.className = "counter-submit-btn";
  submitBtn.textContent = "✓";
  submitBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    checkCounterLevel(subfaceId, device.id);
  });

  subfaceEl.appendChild(counterContainer);
  subfaceEl.appendChild(submitBtn); // Submit vai direto na subface, não no container
}

// Handles counter click - increments counter and validates
function handleCounterClick(counterId, subfaceId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  const counterState = subfaceState.counters[counterId];
  if (!counterState) return;

  // Debounce para evitar cliques duplos no mobile
  const now = Date.now();
  if (counterState.lastClickTime && now - counterState.lastClickTime < 200) {
    return; // Ignora cliques muito próximos
  }
  counterState.lastClickTime = now;

  // Increment counter
  counterState.current++;

  // Update display
  const uniqueDeviceId = `${subfaceId}-${counterId}`;
  const counterEl = document.querySelector(
    `.click-counter-3d[data-id="${uniqueDeviceId}"]`
  );
  if (counterEl) {
    const display = counterEl.querySelector(".counter-display");
    if (display) {
      // Não mostra mais a quantidade, apenas mantém o texto "PUMP"
      display.textContent = "PUMP";

      // Animação visual do clique
      counterEl.classList.add("clicked-animation");
      setTimeout(() => {
        counterEl.classList.remove("clicked-animation");
      }, 150);

      // Atualiza o tanque visual
      updateTankLevel(
        subfaceId,
        counterId,
        counterState.current,
        counterState.target
      );
    }
  }

  // Não verifica mais automaticamente - só com o botão submit
}

// Atualiza o nível visual do tanque
function updateTankLevel(subfaceId, counterId, current, target) {
  const uniqueDeviceId = `${subfaceId}-${counterId}`;
  const tank = document.querySelector(
    `.counter-tank[data-id="${uniqueDeviceId}"]`
  );

  if (tank) {
    const liquid = tank.querySelector(".tank-liquid");
    if (liquid) {
      // Converte cliques para escala 0-10
      const level = Math.min(current, 10);
      const percentage = (level / 10) * 100;
      liquid.style.height = `${percentage}%`;

      // Efeito de borbulhamento quando enche
      liquid.classList.add("bubbling");
      setTimeout(() => {
        liquid.classList.remove("bubbling");
      }, 500);
    }
  }
}

// Verifica o nível do contador quando o botão submit é clicado
function checkCounterLevel(subfaceId, counterId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  const counterState = subfaceState.counters[counterId];
  if (!counterState) return;

  // Verifica se o nível atual está correto
  if (counterState.current === counterState.target) {
    subfaceState.status = "solved";
    setSubfaceStatus(subfaceId, "solved");
  } else {
    subfaceState.status = "failed";
    setSubfaceStatus(subfaceId, "failed");
  }
}

// Validates if counter reached or exceeded target (função antiga, mantida para compatibilidade)
function checkCounterTarget(subfaceId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  const template = getTemplateById(subfaceState.templateId);
  if (!template) return;

  // Check all counters in this subface
  for (const counterId in subfaceState.counters) {
    const counterState = subfaceState.counters[counterId];

    if (counterState.current > counterState.target) {
      // Exceeded target - mark as failed
      subfaceState.status = "failed";
      setSubfaceStatus(subfaceId, "failed");
      return;
    }
  }

  // Check if all counters reached their targets
  const allCountersReached = Object.values(subfaceState.counters).every(
    (counter) => counter.current === counter.target
  );

  if (allCountersReached) {
    subfaceState.status = "solved";
    setSubfaceStatus(subfaceId, "solved");
  }
}

// ========== KEYPAD DEVICE ==========

// Renders a keypad with display in the subface
function renderKeypad(subfaceEl, device, subfaceId) {
  const uniqueDeviceId = `${subfaceId}-${device.id}`;

  // Get password from template solution
  const template = getTemplateById(subfaceStates[subfaceId].templateId);
  const solutionItem = template.solution.find((s) => s.keypadId === device.id);
  const password = solutionItem ? solutionItem.password : "";

  // Initialize keypad state in subfaceStates if not exists
  if (!subfaceStates[subfaceId].keypads) {
    subfaceStates[subfaceId].keypads = {};
  }
  subfaceStates[subfaceId].keypads[device.id] = {
    display: "",
    password: password,
  };

  // Create 3D keypad container
  const keypadEl = document.createElement("div");
  keypadEl.className = "keypad-3d";
  keypadEl.dataset.id = uniqueDeviceId;
  keypadEl.dataset.subface = subfaceId;
  keypadEl.dataset.templateDeviceId = device.id;
  keypadEl.style.setProperty("--keypad-color", device.color || "#34495e");

  // 3D Display area (recessed)
  const display = document.createElement("div");
  display.className = "keypad-display-3d";
  display.textContent = "";
  keypadEl.appendChild(display);

  // 3D Buttons container
  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "keypad-buttons-3d";

  // Helper to create simple key
  function createSimpleKey(label, isClear = false) {
    const key = document.createElement("div");
    key.className = `keypad-key${isClear ? " clear" : ""}`;
    key.textContent = label;

    // Press animation
    key.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      key.classList.add("pressed");
    });
    key.addEventListener("mouseup", () => {
      key.classList.remove("pressed");
    });
    key.addEventListener("mouseleave", () => {
      key.classList.remove("pressed");
    });

    return key;
  }

  // Create buttons using keypadNumbers from device (or fallback to 0-9)
  const keypadNumbers = device.keypadNumbers || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Create 10 number buttons
  for (let i = 0; i < 10; i++) {
    const number = keypadNumbers[i];
    const key = createSimpleKey(String(number).padStart(2, "0")); // Sempre mostra 2 dígitos
    key.addEventListener("click", (e) => {
      e.stopPropagation();
      handleKeypadPress(device.id, String(number).padStart(2, "0"), subfaceId);
    });
    addTouchSupport(key);
    buttonsContainer.appendChild(key);
  }

  // Create clear button
  const clearKey = createSimpleKey("C", true);
  clearKey.addEventListener("click", (e) => {
    e.stopPropagation();
    handleKeypadClear(device.id, subfaceId);
  });
  addTouchSupport(clearKey);
  buttonsContainer.appendChild(clearKey);

  // Empty cell for grid alignment
  const emptyCell = document.createElement("div");
  emptyCell.className = "keypad-btn-placeholder-3d";
  buttonsContainer.appendChild(emptyCell);

  keypadEl.appendChild(buttonsContainer);
  subfaceEl.appendChild(keypadEl);
}

// Handles keypad digit press - appends digit to display (max 6 digits)
function handleKeypadPress(keypadId, digit, subfaceId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  const keypadState = subfaceState.keypads[keypadId];
  if (!keypadState) return;

  // Max digits based on password length
  if (keypadState.display.length >= keypadState.password.length) return;

  // Append digit
  keypadState.display += digit;

  // Update display
  const uniqueDeviceId = `${subfaceId}-${keypadId}`;
  const keypadEl = document.querySelector(
    `.keypad-3d[data-id="${uniqueDeviceId}"]`
  );
  if (keypadEl) {
    const display = keypadEl.querySelector(".keypad-display-3d");
    if (display) {
      display.textContent = keypadState.display;
    }
  }

  // Check password
  checkKeypadPassword(subfaceId);
}

// Handles keypad clear - resets display to empty
function handleKeypadClear(keypadId, subfaceId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  const keypadState = subfaceState.keypads[keypadId];
  if (!keypadState) return;

  // Reset display
  keypadState.display = "";

  // Update display
  const uniqueDeviceId = `${subfaceId}-${keypadId}`;
  const keypadEl = document.querySelector(
    `.keypad-3d[data-id="${uniqueDeviceId}"]`
  );
  if (keypadEl) {
    const display = keypadEl.querySelector(".keypad-display-3d");
    if (display) {
      display.textContent = "";
    }
  }
}

// Validates keypad password
function checkKeypadPassword(subfaceId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  // Check all keypads in this subface
  for (const keypadId in subfaceState.keypads) {
    const keypadState = subfaceState.keypads[keypadId];
    const { display, password } = keypadState;

    // Check if display matches password
    if (display === password) {
      subfaceState.status = "solved";
      setSubfaceStatus(subfaceId, "solved");
      return;
    }

    // Check if display length equals password length but content differs
    if (display.length === password.length && display !== password) {
      subfaceState.status = "failed";
      setSubfaceStatus(subfaceId, "failed");
      return;
    }
  }
}

// ========== KEYPAD RUNES DEVICE ==========

// Renders a keypad with runic symbols in the subface
function renderKeypadRunes(subfaceEl, device, subfaceId) {
  const uniqueDeviceId = `${subfaceId}-${device.id}`;

  // Get password from template solution
  const template = getTemplateById(subfaceStates[subfaceId].templateId);
  const solutionItem = template.solution.find((s) => s.keypadId === device.id);
  const password = solutionItem ? solutionItem.password : "";

  // Initialize keypad state in subfaceStates if not exists
  if (!subfaceStates[subfaceId].keypads) {
    subfaceStates[subfaceId].keypads = {};
  }
  subfaceStates[subfaceId].keypads[device.id] = {
    display: "",
    password: password,
  };

  // Create 3D keypad container
  const keypadEl = document.createElement("div");
  keypadEl.className = "keypad-3d keypad-runes";
  keypadEl.dataset.id = uniqueDeviceId;
  keypadEl.dataset.subface = subfaceId;
  keypadEl.dataset.templateDeviceId = device.id;
  keypadEl.style.setProperty("--keypad-color", device.color || "#4a148c");

  // 3D Display area (recessed)
  const display = document.createElement("div");
  display.className = "keypad-display-3d";
  display.textContent = "";
  keypadEl.appendChild(display);

  // 3D Buttons container - agora 4 colunas
  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "keypad-buttons-3d keypad-runes-4col";

  // Helper to create simple key
  function createSimpleKey(label, isClear = false) {
    const key = document.createElement("div");
    key.className = `keypad-key${isClear ? " clear" : ""}`;
    key.textContent = label;

    // Press animation
    key.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      key.classList.add("pressed");
    });
    key.addEventListener("mouseup", () => {
      key.classList.remove("pressed");
    });
    key.addEventListener("mouseleave", () => {
      key.classList.remove("pressed");
    });

    return key;
  }

  // Expanded runic symbols array - 14 different runes para 4x3 + 2 grid
  const runicSymbols = [
    "ᚠ",
    "ᚢ",
    "ᚦ",
    "ᚹ", // Linha 1
    "ᚺ",
    "ᚾ",
    "ᛈ",
    "ᛟ", // Linha 2
    "ᛞ",
    "ᛚ",
    "ᛗ",
    "ᛏ", // Linha 3
    "ᛉ",
    "ᛇ", // Linha 4 - duas runas extras
  ];

  // Create buttons with runic symbols (14 teclas)
  for (let i = 0; i < 14; i++) {
    const key = createSimpleKey(runicSymbols[i]);
    key.addEventListener("click", (e) => {
      e.stopPropagation();
      handleKeypadRunesPress(device.id, runicSymbols[i], subfaceId);
    });
    addTouchSupport(key);
    buttonsContainer.appendChild(key);
  }

  // Create clear button (15ª tecla)
  const clearKey = createSimpleKey("⌫", true);
  clearKey.addEventListener("click", (e) => {
    e.stopPropagation();
    handleKeypadRunesClear(device.id, subfaceId);
  });
  addTouchSupport(clearKey);
  buttonsContainer.appendChild(clearKey);

  keypadEl.appendChild(buttonsContainer);
  subfaceEl.appendChild(keypadEl);
}

// Handles runic keypad symbol press
function handleKeypadRunesPress(keypadId, symbol, subfaceId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  const keypadState = subfaceState.keypads[keypadId];
  if (!keypadState) return;

  // Max symbols based on password length
  if (keypadState.display.length >= keypadState.password.length) return;

  // Append symbol
  keypadState.display += symbol;

  // Update display
  const uniqueDeviceId = `${subfaceId}-${keypadId}`;
  const keypadEl = document.querySelector(
    `.keypad-3d[data-id="${uniqueDeviceId}"]`
  );
  if (keypadEl) {
    const display = keypadEl.querySelector(".keypad-display-3d");
    if (display) {
      display.textContent = keypadState.display;
    }
  }

  // Auto-check when password length is reached
  if (keypadState.display.length === keypadState.password.length) {
    setTimeout(() => {
      if (keypadState.display === keypadState.password) {
        subfaceState.status = "solved";
        setSubfaceStatus(subfaceId, "solved");
      } else {
        subfaceState.status = "failed";
        setSubfaceStatus(subfaceId, "failed");
      }
    }, 500); // Small delay for visual feedback
  }
}

// Handles runic keypad clear
function handleKeypadRunesClear(keypadId, subfaceId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  const keypadState = subfaceState.keypads[keypadId];
  if (!keypadState) return;

  // Reset display
  keypadState.display = "";

  // Update display
  const uniqueDeviceId = `${subfaceId}-${keypadId}`;
  const keypadEl = document.querySelector(
    `.keypad-3d[data-id="${uniqueDeviceId}"]`
  );
  if (keypadEl) {
    const display = keypadEl.querySelector(".keypad-display-3d");
    if (display) {
      display.textContent = "";
    }
  }
}

// Processa clique em botão (per-subface)
function handleButtonClick(buttonId, subfaceId) {
  // Check if subface is already resolved
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  // Add action to this subface's sequence
  subfaceState.currentSequence.push(buttonId);

  // Check solution for this subface
  checkSubfaceSolution(subfaceId);
}

// Verifica solução de uma subface específica
function checkSubfaceSolution(subfaceId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  const template = getTemplateById(subfaceState.templateId);
  if (!template) return;

  const currentSeq = subfaceState.currentSequence;
  const solution = template.solution;
  const currentIndex = currentSeq.length - 1;

  // Get the last action and expected action
  const lastAction = currentSeq[currentIndex];
  const expectedAction = solution[currentIndex];

  // Compare actions
  if (!actionsMatch(lastAction, expectedAction)) {
    // Wrong action - mark as failed
    subfaceState.status = "failed";
    setSubfaceStatus(subfaceId, "failed");
    return;
  }

  // Check if sequence is complete
  if (currentSeq.length === solution.length) {
    // All actions match - mark as solved
    subfaceState.status = "solved";
    setSubfaceStatus(subfaceId, "solved");
  }
}

// Compara duas ações (botão ou manivela)
function actionsMatch(action, expected) {
  // Button action (string)
  if (typeof expected === "string") {
    return action === expected;
  }

  // Crank action (object)
  if (typeof expected === "object" && expected.crankId) {
    return (
      typeof action === "object" &&
      action.crankId === expected.crankId &&
      action.direction === expected.direction &&
      action.turns === expected.turns
    );
  }

  return false;
}

// Atualiza visual da subface baseado no status
function setSubfaceStatus(subfaceId, status) {
  const subfaceEl = document.querySelector(`[data-subface="${subfaceId}"]`);
  if (!subfaceEl) return;

  // Remove existing status classes
  subfaceEl.classList.remove("solved", "failed");

  // Add new status class
  if (status === "solved" || status === "failed") {
    subfaceEl.classList.add(status);

    // Integração com o cronômetro da bomba
    if (status === "solved") {
      addTimeToBomb(10); // Adiciona 10 segundos quando acerta

      // Verifica se todas as subfaces foram resolvidas
      checkGameWin();
    } else if (status === "failed") {
      removeTimeFromBomb(30); // Remove 30 segundos quando erra

      // Verifica se todas as subfaces foram completadas (mesmo com falha)
      checkGameWin();
    }
  }
}

// Verifica se o jogo foi ganho (todas as subfaces resolvidas)
function checkGameWin() {
  const allSubfaces = Object.keys(gameConfig.subfaces);
  const allCompleted = allSubfaces.every((subfaceId) => {
    const status = subfaceStates[subfaceId] && subfaceStates[subfaceId].status;
    return status === "solved" || status === "failed";
  });

  if (allCompleted && bombTimer.totalSeconds > 0) {
    showVictory();
  }
}

// Exibe mensagem de vitória
function showVictory() {
  gameState.isGameOver = true;
  gameState.hasWon = true;

  // Para o cronômetro da bomba
  stopBombTimer();

  // Adiciona efeito de blur ao fundo
  document.body.classList.add("game-over");

  // Mostra overlay com efeito de blur
  const overlay = document.querySelector(".overlay");
  overlay.classList.add("game-over", "show");

  // Customiza a mensagem e botão para vitória
  const message = document.querySelector(".message");
  message.innerHTML = `
    <div style="text-align: center;">
      <h1 style="font-size: 48px; color: #2ecc71; margin-bottom: 20px; text-shadow: 0 0 20px rgba(46, 204, 113, 0.8);">
        PARABÉNS!
      </h1>
      <p style="font-size: 24px; color: #fff; margin-bottom: 30px;">
        🎉 BOMBA DESARMADA COM SUCESSO! 🎉
      </p>
    </div>
  `;
  message.className = "message victory";

  // Modifica o botão para dar refresh
  const retryBtn = document.querySelector(".retry-btn");
  retryBtn.textContent = "JOGAR NOVAMENTE";
  retryBtn.onclick = () => {
    window.location.reload();
  };
}

// Exibe mensagem de falha
function showFailure() {
  gameState.isGameOver = true;
  gameState.hasWon = false;

  // Para o cronômetro da bomba
  stopBombTimer();

  const overlay = document.querySelector(".overlay");
  const message = document.querySelector(".message");
  message.textContent = "❌ Sequência Errada! Bomba Explodiu!";
  message.className = "message failure";
  overlay.classList.add("show");
}

// Reinicia o jogo
function resetGame() {
  gameState.isGameOver = false;
  gameState.hasWon = false;

  // Remove efeito de blur do game over
  document.body.classList.remove("game-over");

  // Reset bomb timer
  stopBombTimer();
  bombTimer.totalSeconds = 240; // Reset para 4 minutos
  updateTimerDisplay();
  startBombTimer();

  // Reset crank state
  crankState.activeCrank = null;
  crankState.accumulatedRotation = 0;
  crankState.turnsCompleted = 0;
  crankState.currentDirection = null;

  // Reset visual angles and counters
  Object.keys(crankState.crankAngles).forEach((id) => {
    crankState.crankAngles[id] = 0;
    const crankEl =
      document.querySelector(`.crank-3d-full[data-id="${id}"]`) ||
      document.querySelector(`.crank-3d[data-id="${id}"]`);
    if (crankEl) {
      const arm =
        crankEl.querySelector(".crank-arm-3d") ||
        crankEl.querySelector(".crank-shaft");
      if (arm) {
        if (arm.classList.contains("crank-arm-3d")) {
          arm.style.transform = "translateZ(10px) rotate(0deg)";
        } else {
          arm.style.transform = "translateZ(15px) rotate(0deg)";
        }
      }
      const turnsDisplay = crankEl.querySelector(".crank-turns");
      if (turnsDisplay) turnsDisplay.textContent = "0 voltas";
    }
  });

  const overlay = document.querySelector(".overlay");
  overlay.classList.remove("show", "game-over");
}

// ========== CRANK LOGIC ==========

// Calcula ângulo do cursor relativo ao centro da manivela
function calculateAngle(centerX, centerY, x, y) {
  const dx = x - centerX;
  const dy = y - centerY;
  return Math.atan2(dy, dx) * (180 / Math.PI);
}

// Inicia drag na manivela
function handleCrankDragStart(crankId, x, y, crankEl) {
  // Get subface from crank element
  const subfaceId = crankEl.dataset.subface;

  // Check if subface is already resolved
  if (subfaceId) {
    const subfaceState = subfaceStates[subfaceId];
    if (!subfaceState || subfaceState.status !== "pending") return;
  }

  const rect = crankEl.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  crankState.activeCrank = crankId;
  crankState.activeSubface = subfaceId;
  crankState.startAngle = calculateAngle(centerX, centerY, x, y);
  crankState.currentAngle = crankState.crankAngles[crankId] || 0;
  crankState.accumulatedRotation = 0;
  crankState.turnsCompleted = 0;
  crankState.currentDirection = null;

  crankEl.classList.add("dragging");
}

// Atualiza rotação durante drag
function handleCrankDragMove(x, y) {
  if (!crankState.activeCrank) return;

  const crankEl =
    document.querySelector(
      `.crank-3d-full[data-id="${crankState.activeCrank}"]`
    ) ||
    document.querySelector(`.crank-3d[data-id="${crankState.activeCrank}"]`);
  if (!crankEl) return;

  const rect = crankEl.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const newAngle = calculateAngle(centerX, centerY, x, y);
  let deltaAngle = newAngle - crankState.startAngle;

  // Normaliza delta para evitar saltos de 360°
  if (deltaAngle > 180) deltaAngle -= 360;
  if (deltaAngle < -180) deltaAngle += 360;

  crankState.accumulatedRotation += deltaAngle;
  crankState.startAngle = newAngle;

  // Atualiza ângulo visual - rotate the arm
  crankState.crankAngles[crankState.activeCrank] += deltaAngle;
  const arm =
    crankEl.querySelector(".crank-arm-3d") ||
    crankEl.querySelector(".crank-shaft");
  if (arm) {
    if (arm.classList.contains("crank-arm-3d")) {
      arm.style.transform = `translateZ(10px) rotate(${
        crankState.crankAngles[crankState.activeCrank]
      }deg)`;
    } else {
      arm.style.transform = `translateZ(15px) rotate(${
        crankState.crankAngles[crankState.activeCrank]
      }deg)`;
    }
  }

  // Detecta direção
  if (crankState.accumulatedRotation > 10 && !crankState.currentDirection) {
    crankState.currentDirection = "cw";
  } else if (
    crankState.accumulatedRotation < -10 &&
    !crankState.currentDirection
  ) {
    crankState.currentDirection = "ccw";
  }

  // Conta voltas completas
  const totalTurns = Math.floor(Math.abs(crankState.accumulatedRotation) / 360);
  if (totalTurns > crankState.turnsCompleted) {
    crankState.turnsCompleted = totalTurns;

    // Atualiza display
    const turnsDisplay = crankEl.querySelector(".crank-turns");
    if (turnsDisplay) {
      const dir = crankState.currentDirection === "cw" ? "↻" : "↺";
      turnsDisplay.textContent = `${crankState.turnsCompleted} volta${
        crankState.turnsCompleted !== 1 ? "s" : ""
      } ${dir}`;
    }

    // Registra passo e valida
    registerCrankStep();
  }
}

// Finaliza drag na manivela
function handleCrankDragEnd() {
  if (!crankState.activeCrank) return;

  const crankEl =
    document.querySelector(
      `.crank-3d-full[data-id="${crankState.activeCrank}"]`
    ) ||
    document.querySelector(`.crank-3d[data-id="${crankState.activeCrank}"]`);
  if (crankEl) {
    crankEl.classList.remove("dragging");
  }

  crankState.activeCrank = null;
  crankState.activeSubface = null;
}

// Registra passo de manivela e valida (per-subface)
function registerCrankStep() {
  const subfaceId = crankState.activeSubface;
  if (!subfaceId) return;

  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  // Get template device id from the crank element
  const crankEl =
    document.querySelector(
      `.crank-3d-full[data-id="${crankState.activeCrank}"]`
    ) ||
    document.querySelector(`.crank-3d[data-id="${crankState.activeCrank}"]`);
  if (!crankEl) return;

  const templateDeviceId = crankEl.dataset.templateDeviceId;

  // Add crank action to subface sequence
  subfaceState.currentSequence.push({
    crankId: templateDeviceId,
    direction: crankState.currentDirection,
    turns: crankState.turnsCompleted,
  });

  // Check solution for this subface
  checkSubfaceSolution(subfaceId);
}

// ========== EVENT LISTENERS ==========

// Verifica se o elemento é parte de uma manivela
function isCrankElement(el) {
  return (
    el.classList.contains("crank-3d") ||
    el.classList.contains("crank-3d-full") ||
    el.classList.contains("crank-base") ||
    el.classList.contains("crank-base-3d") ||
    el.classList.contains("crank-shaft") ||
    el.classList.contains("crank-shaft-3d") ||
    el.classList.contains("crank-handle") ||
    el.classList.contains("crank-center") ||
    el.classList.contains("crank-arm-3d") ||
    el.classList.contains("crank-bar-3d") ||
    el.classList.contains("crank-knob-3d") ||
    el.classList.contains("crank-bar-face") ||
    el.classList.contains("crank-base-top") ||
    el.classList.contains("crank-knob-top")
  );
}

// Obtém o elemento crank pai
function getCrankElement(el) {
  if (
    el.classList.contains("crank-3d") ||
    el.classList.contains("crank-3d-full")
  )
    return el;
  return el.closest(".crank-3d-full") || el.closest(".crank-3d");
}

// Mouse events
document.querySelector(".scene").addEventListener("mousedown", (e) => {
  if (e.target.closest(".game-btn-3d")) return;

  // Verifica se clicou em manivela
  if (isCrankElement(e.target)) {
    const crankEl = getCrankElement(e.target);
    if (crankEl) {
      e.stopPropagation();
      handleCrankDragStart(crankEl.dataset.id, e.clientX, e.clientY, crankEl);
      return;
    }
  }

  handleDragStart(e.clientX, e.clientY);
});

document.addEventListener("mousemove", (e) => {
  if (crankState.activeCrank) {
    handleCrankDragMove(e.clientX, e.clientY);
  } else {
    handleDragMove(e.clientX, e.clientY);
  }
});

document.addEventListener("mouseup", () => {
  handleCrankDragEnd();
  handleDragEnd();
});

// Touch events
document.querySelector(".scene").addEventListener("touchstart", (e) => {
  // Check if touch is on any interactive device - let them handle their own events
  if (
    e.target.closest(".game-btn-3d") ||
    e.target.closest(".switch-3d") ||
    e.target.closest(".click-counter-3d") ||
    e.target.closest(".keypad-3d") ||
    e.target.closest(".keypad-key") ||
    e.target.closest(".switch-submit-btn") ||
    e.target.closest(".counter-submit-btn") ||
    e.target.closest(".safe-dial-3d") ||
    e.target.closest(".safe-dial-submit-btn") ||
    e.target.closest(".color-sequence-3d") ||
    e.target.closest(".color-button-3d") ||
    e.target.closest(".wire-cutting-3d") ||
    e.target.closest(".wire-body") ||
    e.target.classList.contains("game-btn")
  ) {
    return; // Let the device handle its own touch events
  }

  const touch = e.touches[0];

  // Verifica se tocou em manivela
  if (isCrankElement(e.target)) {
    const crankEl = getCrankElement(e.target);
    if (crankEl) {
      e.preventDefault();
      e.stopPropagation();
      handleCrankDragStart(
        crankEl.dataset.id,
        touch.clientX,
        touch.clientY,
        crankEl
      );
      return;
    }
  }

  e.preventDefault();
  handleDragStart(touch.clientX, touch.clientY);
});

document.addEventListener(
  "touchmove",
  (e) => {
    const touch = e.touches[0];
    if (crankState.activeCrank) {
      e.preventDefault();
      handleCrankDragMove(touch.clientX, touch.clientY);
    } else if (state.isDragging) {
      e.preventDefault();
      handleDragMove(touch.clientX, touch.clientY);
    }
  },
  { passive: false }
);

document.addEventListener("touchend", () => {
  handleCrankDragEnd();
  handleDragEnd();
});

// Retry button
document.querySelector(".retry-btn")?.addEventListener("click", resetGame);

// Instructions panel toggle
document
  .querySelector(".instructions-toggle")
  ?.addEventListener("click", () => {
    const panel = document.querySelector(".instructions-panel");
    const body = document.body;

    panel.classList.toggle("collapsed");

    // Toggle face labels visibility
    if (panel.classList.contains("collapsed")) {
      body.classList.remove("instructions-visible");
    } else {
      body.classList.add("instructions-visible");
    }
  });

// Gera seed da partida
const seed = generateGameSeed();

// Atualiza templates com valores baseados na seed (ANTES de renderizar)
updateTemplatesWithSeed(seed);

// Inicializa o jogo (agora com templates já atualizados)
loadGameConfig();

// Gera instruções dinâmicas (após templates serem atualizados)
generateInstructions();

// Inicializa o cronômetro da bomba
initializeBombTimer();

// Configura a edição da seed
setupSeedEditing();

// ========== SAFE DIAL DEVICE ==========

// Renders a safe dial (combination lock) in the subface
function renderSafeDial(subfaceEl, device, subfaceId) {
  const uniqueDeviceId = `${subfaceId}-${device.id}`;

  // Initialize safe dial state
  if (!subfaceStates[subfaceId].safeDials) {
    subfaceStates[subfaceId].safeDials = {};
  }

  subfaceStates[subfaceId].safeDials[device.id] = {
    currentAngle: 0,
    enteredCombination: [],
    targetCombination: device.combination || [],
    isLocked: true,
  };

  const color = device.color || "#2c3e50";

  // Create safe dial container
  const dialContainer = document.createElement("div");
  dialContainer.className = "safe-dial-container";
  dialContainer.dataset.id = uniqueDeviceId;
  dialContainer.dataset.subface = subfaceId;
  dialContainer.dataset.templateDeviceId = device.id;

  // Outer ring (fixed)
  const outerRing = document.createElement("div");
  outerRing.className = "safe-dial-outer-ring";
  outerRing.style.background = `linear-gradient(145deg, ${color}, ${darkenColor(
    color,
    20
  )})`;

  // Add numbers around the dial (0, 10, 20, ..., 90)
  for (let i = 0; i < 100; i += 10) {
    const numberMark = document.createElement("div");
    numberMark.className = "dial-number";
    numberMark.textContent = i;
    numberMark.style.transform = `rotate(${
      i * 3.6
    }deg) translateY(-50px) rotate(-${i * 3.6}deg)`;
    numberMark.style.transformOrigin = "8px 58px"; // Centro do disco ajustado para o novo tamanho
    outerRing.appendChild(numberMark);
  }

  dialContainer.appendChild(outerRing);

  // Inner dial (rotatable)
  const innerDial = document.createElement("div");
  innerDial.className = "safe-dial-inner";
  innerDial.style.background = `radial-gradient(circle, ${lightenColor(
    color,
    30
  )}, ${color})`;

  // Dial pointer
  const pointer = document.createElement("div");
  pointer.className = "dial-pointer";
  innerDial.appendChild(pointer);

  // Center knob
  const centerKnob = document.createElement("div");
  centerKnob.className = "dial-center-knob";
  centerKnob.style.background = `linear-gradient(145deg, ${lightenColor(
    color,
    40
  )}, ${darkenColor(color, 10)})`;
  innerDial.appendChild(centerKnob);

  dialContainer.appendChild(innerDial);

  // Combination display
  const combinationDisplay = document.createElement("div");
  combinationDisplay.className = "combination-display";
  combinationDisplay.textContent = "- - -";

  // Submit button
  const submitBtn = document.createElement("button");
  submitBtn.className = "safe-dial-submit-btn";
  submitBtn.textContent = "✓";
  submitBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    checkSafeDialCombination(subfaceId, device.id);
  });

  // Add drag functionality
  let isDragging = false;
  let startAngle = 0;
  let currentRotation = 0;

  function getAngleFromPointer(e, element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const pointerX = e.clientX || (e.touches && e.touches[0].clientX);
    const pointerY = e.clientY || (e.touches && e.touches[0].clientY);
    return Math.atan2(pointerY - centerY, pointerX - centerX) * (180 / Math.PI);
  }

  // Mouse events
  innerDial.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    isDragging = true;
    startAngle = getAngleFromPointer(e, innerDial);
    innerDial.style.cursor = "grabbing";
  });

  // Touch events
  innerDial.addEventListener("touchstart", (e) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging = true;
    startAngle = getAngleFromPointer(e, innerDial);
    innerDial.style.cursor = "grabbing";
  });

  function handleMove(e) {
    if (!isDragging) return;

    const currentAngle = getAngleFromPointer(e, innerDial);
    let deltaAngle = currentAngle - startAngle;

    // Handle angle wrapping
    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;

    currentRotation += deltaAngle;
    startAngle = currentAngle;

    // Update visual rotation
    innerDial.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;

    // Update safe dial state
    const dialState = subfaceStates[subfaceId].safeDials[device.id];
    dialState.currentAngle = ((currentRotation % 360) + 360) % 360;

    // Update current number display (snap to multiples of 10)
    const currentNumber = (Math.round(dialState.currentAngle / 36) * 10) % 100;
    updateDialDisplay(subfaceId, device.id);
  }

  function handleEnd() {
    if (isDragging) {
      isDragging = false;
      innerDial.style.cursor = "grab";

      // Snap to nearest multiple of 10 and add to combination
      const dialState = subfaceStates[subfaceId].safeDials[device.id];
      const snappedNumber =
        (Math.round(dialState.currentAngle / 36) * 10) % 100;

      // Calculate the exact angle for the snapped number
      const snappedAngle = snappedNumber * 3.6;

      // Animate to the snapped position
      const startRotation = currentRotation;
      const targetRotation =
        currentRotation + (snappedAngle - dialState.currentAngle);

      // Smooth animation to snap position
      let animationStart = null;
      const animationDuration = 200; // 200ms animation

      function animateSnap(timestamp) {
        if (!animationStart) animationStart = timestamp;
        const progress = Math.min(
          (timestamp - animationStart) / animationDuration,
          1
        );

        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);

        const currentAnimationRotation =
          startRotation + (targetRotation - startRotation) * easeOut;
        innerDial.style.transform = `translate(-50%, -50%) rotate(${currentAnimationRotation}deg)`;

        if (progress < 1) {
          requestAnimationFrame(animateSnap);
        } else {
          // Animation complete - update final state
          currentRotation = targetRotation;
          dialState.currentAngle = snappedAngle;
        }
      }

      requestAnimationFrame(animateSnap);

      // Add number to combination if not already full
      if (dialState.enteredCombination.length < 3) {
        dialState.enteredCombination.push(snappedNumber);
        updateCombinationDisplay(subfaceId, device.id);

        // Auto-check when all numbers are entered
        if (
          dialState.enteredCombination.length ===
          dialState.targetCombination.length
        ) {
          setTimeout(() => {
            checkSafeDialCombination(subfaceId, device.id);
          }, 500); // Small delay for visual feedback
        }
      }
    }
  }

  document.addEventListener("mousemove", handleMove);
  document.addEventListener("mouseup", handleEnd);
  document.addEventListener("touchmove", handleMove, { passive: false });
  document.addEventListener("touchend", handleEnd);

  subfaceEl.appendChild(dialContainer);
  subfaceEl.appendChild(combinationDisplay);
}

// Updates the dial display showing current number
function updateDialDisplay(subfaceId, dialId) {
  const dialState = subfaceStates[subfaceId].safeDials[dialId];
  const currentNumber = (Math.round(dialState.currentAngle / 36) * 10) % 100;

  // You could add a current number indicator here if needed
}

// Updates the combination display
function updateCombinationDisplay(subfaceId, dialId) {
  const subfaceEl = document.querySelector(`[data-subface="${subfaceId}"]`);
  if (!subfaceEl) return;

  const display = subfaceEl.querySelector(".combination-display");
  const dialState = subfaceStates[subfaceId].safeDials[dialId];

  if (display && dialState) {
    const combo = dialState.enteredCombination;
    const targetLength = dialState.targetCombination.length;
    const displayParts = [];

    for (let i = 0; i < targetLength; i++) {
      displayParts.push(combo[i] !== undefined ? combo[i] : "-");
    }

    display.textContent = displayParts.join(" ");
  }
}

// Checks if the entered combination is correct
function checkSafeDialCombination(subfaceId, dialId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  const dialState = subfaceState.safeDials[dialId];
  if (!dialState) return;

  const entered = dialState.enteredCombination;
  const target = dialState.targetCombination;

  // Check if combination is complete and correct
  if (
    entered.length === target.length &&
    entered.every((num, index) => num === target[index])
  ) {
    subfaceState.status = "solved";
    setSubfaceStatus(subfaceId, "solved");
    dialState.isLocked = false;
  } else if (entered.length === target.length) {
    // Wrong combination - mark as failed
    subfaceState.status = "failed";
    setSubfaceStatus(subfaceId, "failed");
  }
}
// ========== COLOR SEQUENCE DEVICE (SIMON SAYS) ==========

// Renders a color sequence device (Simon Says style) in the subface
function renderColorSequence(subfaceEl, device, subfaceId) {
  const uniqueDeviceId = `${subfaceId}-${device.id}`;

  // Initialize color sequence state
  if (!subfaceStates[subfaceId].colorSequences) {
    subfaceStates[subfaceId].colorSequences = {};
  }
  subfaceStates[subfaceId].colorSequences[device.id] = {
    targetSequence: device.sequence || ["red", "blue", "green", "yellow"],
    playerSequence: [],
    timer: null,
    timeoutCount: 0, // Contador de timeouts
    isTimerActive: false,
  };

  // Create main container
  const container = document.createElement("div");
  container.className = "color-sequence-container";
  container.dataset.id = uniqueDeviceId;
  container.dataset.subface = subfaceId;
  container.dataset.templateDeviceId = device.id;

  // Color definitions
  const colors = {
    red: { bg: "#e74c3c", light: "#ec7063", dark: "#c0392b" },
    blue: { bg: "#3498db", light: "#5dade2", dark: "#2980b9" },
    green: { bg: "#2ecc71", light: "#58d68d", dark: "#27ae60" },
    yellow: { bg: "#f1c40f", light: "#f7dc6f", dark: "#d4ac0d" },
  };

  // Create 4 color buttons in diamond formation - closer together
  const positions = [
    { color: "blue", class: "top", x: 0, y: -32 },
    { color: "red", class: "left", x: -32, y: 0 },
    { color: "yellow", class: "right", x: 32, y: 0 },
    { color: "green", class: "bottom", x: 0, y: 32 },
  ];

  positions.forEach((pos) => {
    const button = document.createElement("div");
    button.className = `color-btn color-btn-${pos.color} color-btn-${pos.class}`;
    button.dataset.color = pos.color;
    button.style.left = `calc(50% + ${pos.x}px)`;
    button.style.top = `calc(50% + ${pos.y}px)`;

    // Set colors
    const colorData = colors[pos.color];
    button.style.setProperty("--btn-color", colorData.bg);
    button.style.setProperty("--btn-color-light", colorData.light);
    button.style.setProperty("--btn-color-dark", colorData.dark);

    // Click event
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      handleColorButtonClick(device.id, pos.color, subfaceId);
    });

    // Touch events for mobile
    button.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      button.classList.add("clicked");
    });

    button.addEventListener("touchend", (e) => {
      e.preventDefault();
      e.stopPropagation();
      button.classList.remove("clicked");
      handleColorButtonClick(device.id, pos.color, subfaceId);
    });

    button.addEventListener("touchcancel", (e) => {
      button.classList.remove("clicked");
    });

    container.appendChild(button);
  });

  subfaceEl.appendChild(container);
}

// Shows the color sequence to the player
function showColorSequence(subfaceId, deviceId) {
  const sequenceState = subfaceStates[subfaceId].colorSequences[deviceId];
  if (!sequenceState || sequenceState.isShowingSequence) return;

  sequenceState.isShowingSequence = true;
  sequenceState.playerSequence = []; // Reset player sequence

  const container = document.querySelector(
    `[data-subface="${subfaceId}"] .color-sequence-container`
  );
  if (!container) return;

  let currentIndex = 0;
  const sequence = sequenceState.targetSequence;

  function showNextColor() {
    if (currentIndex >= sequence.length) {
      sequenceState.isShowingSequence = false;
      return;
    }

    const color = sequence[currentIndex];
    const button = container.querySelector(`.color-btn-${color}`);

    if (button) {
      // Light up the button
      button.classList.add("active");

      setTimeout(() => {
        button.classList.remove("active");
        currentIndex++;

        setTimeout(() => {
          showNextColor();
        }, 200); // Pause between colors
      }, 600); // How long each color stays lit
    }
  }

  // Start showing sequence after a brief delay
  setTimeout(() => {
    showNextColor();
  }, 500);
}

// Reseta a sequência por timeout
function resetColorSequenceByTimeout(subfaceId, deviceId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  const sequenceState = subfaceState.colorSequences[deviceId];
  if (!sequenceState) return;

  // Incrementa contador de timeouts
  sequenceState.timeoutCount++;
  sequenceState.isTimerActive = false;

  // Limpa a sequência do jogador
  sequenceState.playerSequence = [];

  // Efeito de shake no container
  const container = document.querySelector(
    `[data-subface="${subfaceId}"] .color-sequence-container`
  );
  if (container) {
    container.classList.add("shake");
    setTimeout(() => {
      container.classList.remove("shake");
    }, 600);
  }

  // Se chegou a 3 timeouts, marca como failed
  if (sequenceState.timeoutCount >= 3) {
    subfaceState.status = "failed";
    setSubfaceStatus(subfaceId, "failed");
  }
}

// Inicia o timer de 4 segundos
function startColorSequenceTimer(subfaceId, deviceId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  const sequenceState = subfaceState.colorSequences[deviceId];
  if (!sequenceState || sequenceState.isTimerActive) return;

  sequenceState.isTimerActive = true;

  // Limpa timer anterior se existir
  if (sequenceState.timer) {
    clearTimeout(sequenceState.timer);
  }

  // Inicia novo timer de 4 segundos
  sequenceState.timer = setTimeout(() => {
    resetColorSequenceByTimeout(subfaceId, deviceId);
  }, 4000);
}

// Para o timer
function stopColorSequenceTimer(subfaceId, deviceId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState) return;

  const sequenceState = subfaceState.colorSequences[deviceId];
  if (!sequenceState) return;

  if (sequenceState.timer) {
    clearTimeout(sequenceState.timer);
    sequenceState.timer = null;
  }
  sequenceState.isTimerActive = false;
}

// Handles color button click
function handleColorButtonClick(deviceId, color, subfaceId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  const sequenceState = subfaceState.colorSequences[deviceId];
  if (!sequenceState) return;

  // Se é o primeiro clique, inicia o timer
  if (sequenceState.playerSequence.length === 0) {
    startColorSequenceTimer(subfaceId, deviceId);
  }

  // Add color to sequence
  sequenceState.playerSequence.push(color);

  // Visual feedback
  const container = document.querySelector(
    `[data-subface="${subfaceId}"] .color-sequence-container`
  );
  const button = container.querySelector(`.color-btn-${color}`);
  if (button) {
    button.classList.add("clicked");
    setTimeout(() => {
      button.classList.remove("clicked");
    }, 150);
  }

  // Check if sequence is complete
  if (
    sequenceState.playerSequence.length === sequenceState.targetSequence.length
  ) {
    // Para o timer pois a sequência foi completada
    stopColorSequenceTimer(subfaceId, deviceId);

    const playerSeq = sequenceState.playerSequence;
    const targetSeq = sequenceState.targetSequence;

    // Check if sequences match
    if (playerSeq.every((color, index) => color === targetSeq[index])) {
      subfaceState.status = "solved";
      setSubfaceStatus(subfaceId, "solved");
    } else {
      subfaceState.status = "failed";
      setSubfaceStatus(subfaceId, "failed");
    }
  }
}

// Checks if the player sequence matches the target
// ========== WIRE CUTTING DEVICE (BOMB DEFUSAL) ==========

// Renders a wire cutting device in the subface
function renderWireCutting(subfaceEl, device, subfaceId) {
  const uniqueDeviceId = `${subfaceId}-${device.id}`;

  // Initialize wire cutting state
  if (!subfaceStates[subfaceId].wireCutting) {
    subfaceStates[subfaceId].wireCutting = {};
  }
  subfaceStates[subfaceId].wireCutting[device.id] = {
    wires: device.wires || [
      { colors: ["red", "yellow"], correct: false, cut: false },
      { colors: ["blue", "white"], correct: true, cut: false },
      { colors: ["green", "black"], correct: true, cut: false },
      { colors: ["orange", "blue"], correct: false, cut: false },
      { colors: ["white", "red"], correct: false, cut: false },
    ],
  };

  // Create main container
  const container = document.createElement("div");
  container.className = "wire-cutting-container";
  container.dataset.id = uniqueDeviceId;
  container.dataset.subface = subfaceId;
  container.dataset.templateDeviceId = device.id;

  // Wire colors
  const wireColors = {
    red: "#c51818ff",
    blue: "#1d47c4ff",
    green: "#1cb25aff",
    yellow: "#f1c40f",
    white: "#ecf0f1",
    black: "#17212a",
    orange: "#e67e22",
  };

  // Create vertical wires
  const wires =
    device.wires || subfaceStates[subfaceId].wireCutting[device.id].wires;
  wires.forEach((wire, index) => {
    const wireElement = document.createElement("div");
    wireElement.className = "wire-element";

    // Create wire identifier from colors
    const wireId = wire.colors ? wire.colors.join("-") : wire.color;
    wireElement.dataset.wireId = wireId;
    wireElement.dataset.index = index;

    // Top connector
    const topConnector = document.createElement("div");
    topConnector.className = "wire-connector top";
    wireElement.appendChild(topConnector);

    // Wire body (contínuo inicialmente)
    const wireBody = document.createElement("div");
    wireBody.className = "wire-body";
    wireBody.addEventListener("click", (e) => {
      e.stopPropagation();
      handleWireCut(device.id, wireId, subfaceId);
    });

    // Fio contínuo com duas cores (listrado)
    const continuousWire = document.createElement("div");
    continuousWire.className = "wire-continuous";

    if (wire.colors && wire.colors.length === 2) {
      // Fio com duas cores - criar listras
      const color1 = wireColors[wire.colors[0]];
      const color2 = wireColors[wire.colors[1]];
      continuousWire.style.background = `repeating-linear-gradient(
        45deg,
        ${color1} 0px,
        ${color1} 3px,
        ${color2} 3px,
        ${color2} 6px
      )`;
      continuousWire.dataset.color1 = color1;
      continuousWire.dataset.color2 = color2;
    } else {
      // Fio de cor única (fallback)
      const fallbackColor =
        wire.color || (wire.colors && wire.colors[0]) || "red";
      continuousWire.style.background = wireColors[fallbackColor] || "#e74c3c";
    }

    wireBody.appendChild(continuousWire);

    wireElement.appendChild(wireBody);

    // Bottom connector
    const bottomConnector = document.createElement("div");
    bottomConnector.className = "wire-connector bottom";
    wireElement.appendChild(bottomConnector);

    container.appendChild(wireElement);
  });

  subfaceEl.appendChild(container);
}

// Handles wire cutting
function handleWireCut(deviceId, wireId, subfaceId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  const wireCuttingState = subfaceState.wireCutting[deviceId];
  if (!wireCuttingState) return;

  // Find the wire that was cut by matching the wireId
  const wire = wireCuttingState.wires.find((w, index) => {
    const currentWireId = w.colors ? w.colors.join("-") : w.color;
    return currentWireId === wireId;
  });

  if (!wire || wire.cut) return;

  // Mark wire as cut
  wire.cut = true;

  // Visual feedback - cut the wire
  const container = document.querySelector(
    `[data-subface="${subfaceId}"] .wire-cutting-container`
  );
  const wireElement = container.querySelector(
    `.wire-element[data-wire-id="${wireId}"]`
  );

  if (wireElement) {
    wireElement.classList.add("cut");

    // Set the colors for the cut segments
    const wireColors = {
      red: "#e74c3c",
      blue: "#3498db",
      green: "#2ecc71",
      yellow: "#f1c40f",
      white: "#ecf0f1",
      black: "#2c3e50",
      orange: "#e67e22",
    };

    const wireBody = wireElement.querySelector(".wire-body");

    if (wire.colors && wire.colors.length === 2) {
      // For two-color wires, use the same striped pattern
      const color1 = wireColors[wire.colors[0]];
      const color2 = wireColors[wire.colors[1]];
      wireBody.style.setProperty(
        "--wire-pattern",
        `repeating-linear-gradient(
        45deg,
        ${color1} 0px,
        ${color1} 3px,
        ${color2} 3px,
        ${color2} 6px
      )`
      );
    } else {
      // Single color wire
      wireBody.style.setProperty("--wire-color", wireColors[wire.color]);
    }
  }

  // Check if this was a wrong wire
  if (!wire.correct) {
    subfaceState.status = "failed";
    setSubfaceStatus(subfaceId, "failed");
    return;
  }

  // Check if all correct wires have been cut
  const correctWires = wireCuttingState.wires.filter((w) => w.correct);
  const cutCorrectWires = correctWires.filter((w) => w.cut);

  if (cutCorrectWires.length === correctWires.length) {
    // All correct wires cut - success!
    subfaceState.status = "solved";
    setSubfaceStatus(subfaceId, "solved");
  }
  // If not all correct wires cut yet, just continue (don't fail or succeed yet)
}
