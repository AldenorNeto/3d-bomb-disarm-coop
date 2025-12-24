// ========== HELPER FUNCTIONS FOR 3D ==========

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
  // Template 1: Single button (simple)
  {
    id: "template-single-button",
    devices: [{ type: "button", id: "btn-red", color: "#e74c3c", label: "🔴" }],
    solution: ["btn-red"],
  },

  // Template 2: Two buttons - press yellow
  {
    id: "template-two-buttons",
    devices: [
      { type: "button", id: "btn-yellow", color: "#f1c40f", label: "🟡" },
      { type: "button", id: "btn-blue", color: "#3498db", label: "🔵" },
    ],
    solution: ["btn-yellow"],
  },

  // Template 3: Three buttons - press green
  {
    id: "template-three-buttons",
    devices: [
      { type: "button", id: "btn-green", color: "#2ecc71", label: "🟢" },
      { type: "button", id: "btn-orange", color: "#e67e22", label: "🟠" },
      { type: "button", id: "btn-purple", color: "#9b59b6", label: "🟣" },
    ],
    solution: ["btn-green"],
  },

  // Template 4: Crank clockwise (1 turn)
  {
    id: "template-crank-cw",
    devices: [{ type: "crank", id: "crank-1", color: "#9b59b6" }],
    solution: [{ crankId: "crank-1", direction: "cw", turns: 1 }],
  },

  // Template 5: Crank counter-clockwise (1 turn)
  {
    id: "template-crank-ccw",
    devices: [{ type: "crank", id: "crank-2", color: "#1abc9c" }],
    solution: [{ crankId: "crank-2", direction: "ccw", turns: 1 }],
  },

  // Template 6: Two cranks - turn first cw
  {
    id: "template-two-cranks",
    devices: [
      { type: "crank", id: "crank-a", color: "#e74c3c" },
      { type: "crank", id: "crank-b", color: "#3498db" },
    ],
    solution: [{ crankId: "crank-a", direction: "cw", turns: 1 }],
  },

  // Template 7: Button then crank (mixed)
  {
    id: "template-button-crank",
    devices: [
      { type: "button", id: "btn-cyan", color: "#00bcd4", label: "🔵" },
      { type: "crank", id: "crank-3", color: "#ff5722" },
    ],
    solution: ["btn-cyan", { crankId: "crank-3", direction: "cw", turns: 1 }],
  },

  // Template 8: Crank then button (mixed)
  {
    id: "template-crank-button",
    devices: [
      { type: "crank", id: "crank-4", color: "#673ab7" },
      { type: "button", id: "btn-lime", color: "#cddc39", label: "🟢" },
    ],
    solution: [{ crankId: "crank-4", direction: "ccw", turns: 1 }, "btn-lime"],
  },

  // Template 9: Two buttons sequence
  {
    id: "template-button-sequence",
    devices: [
      { type: "button", id: "btn-pink", color: "#e91e63", label: "🩷" },
      { type: "button", id: "btn-teal", color: "#009688", label: "🩵" },
    ],
    solution: ["btn-pink", "btn-teal"],
  },

  // Template 10: Crank 2 turns
  {
    id: "template-crank-two-turns",
    devices: [{ type: "crank", id: "crank-5", color: "#795548" }],
    solution: [{ crankId: "crank-5", direction: "cw", turns: 2 }],
  },

  // Template 11: Three devices mixed - button, crank, button
  {
    id: "template-mixed-three",
    devices: [
      { type: "button", id: "btn-amber", color: "#ffc107", label: "🟡" },
      { type: "crank", id: "crank-6", color: "#607d8b" },
      { type: "button", id: "btn-indigo", color: "#3f51b5", label: "🔵" },
    ],
    solution: ["btn-amber", { crankId: "crank-6", direction: "cw", turns: 1 }],
  },

  // Template 12: Complex - two buttons and crank
  {
    id: "template-complex",
    devices: [
      { type: "button", id: "btn-deep-orange", color: "#ff5722", label: "🟠" },
      { type: "button", id: "btn-light-green", color: "#8bc34a", label: "🟢" },
      { type: "crank", id: "crank-7", color: "#00bcd4" },
    ],
    solution: [
      "btn-deep-orange",
      { crankId: "crank-7", direction: "ccw", turns: 1 },
    ],
  },

  // ========== SWITCH TEMPLATES ==========

  // Template 13: Two switches - toggle in order
  {
    id: "template-switch-two",
    devices: [
      { type: "switch", id: "sw-1", color: "#95a5a6", onColor: "#2ecc71" },
      { type: "switch", id: "sw-2", color: "#95a5a6", onColor: "#e74c3c" },
    ],
    solution: ["sw-1", "sw-2"],
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
      { type: "click-counter", id: "counter-1", color: "#e74c3c", target: 3 },
    ],
    solution: [{ counterId: "counter-1", clicks: 3 }],
  },

  // Template 18: Click counter - target 10
  {
    id: "template-counter-ten",
    devices: [
      { type: "click-counter", id: "counter-1", color: "#1abc9c", target: 10 },
    ],
    solution: [{ counterId: "counter-1", clicks: 10 }],
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
];

// Helper function to get template by id
function getTemplateById(templateId) {
  return templatesCatalog.find((t) => t.id === templateId);
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
  currentSequence: [],
  winningSequence: [],
  isGameOver: false,
  hasWon: false,
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
    "front-1": "template-switch-two",
    "front-2": "template-counter-five",
    "front-3": "template-keypad-four",
    "front-4": "template-crank-ccw",
    "back-1": "template-switch-three",
    "back-2": "template-counter-three",
    "back-3": "template-keypad-three",
    "back-4": "template-mixed-three",
  },
  // Legacy config (kept for backward compatibility during migration)
  buttons: [
    // Front subfaces - 2 botões
    { id: "btn-red", face: "front-1", color: "#e74c3c", label: "🔴" },
    { id: "btn-green", face: "front-4", color: "#2ecc71", label: "🟢" },
    // Back subfaces - 2 botões
    { id: "btn-blue", face: "back-2", color: "#3498db", label: "🔵" },
    { id: "btn-yellow", face: "back-3", color: "#f1c40f", label: "🟡" },
  ],
  cranks: [
    // Front subfaces - 2 manivelas
    { id: "crank-purple", face: "front-2", color: "#9b59b6" },
    { id: "crank-cyan", face: "front-3", color: "#1abc9c" },
    // Back subfaces - 2 manivelas
    { id: "crank-orange", face: "back-1", color: "#e67e22" },
    { id: "crank-pink", face: "back-4", color: "#e91e63" },
  ],
  // Sequência: botão vermelho, manivela roxa (1 volta horário), botão azul
  winningSequence: [
    "btn-red",
    { crankId: "crank-purple", direction: "cw", turns: 1 },
    "btn-blue",
  ],
};

// ========== GAME LOGIC ==========

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

  // Remove existing devices from this subface
  subfaceEl
    .querySelectorAll(
      ".game-btn-3d, .crank-3d, .switch, .click-counter, .keypad"
    )
    .forEach((el) => el.remove());

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
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        handleButtonClick(device.id, subfaceId);
      });
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

// Renderiza botões nas subfaces do cubo
function renderButtons(buttons) {
  document.querySelectorAll(".game-btn").forEach((btn) => btn.remove());

  buttons.forEach((button) => {
    const subface = document.querySelector(`[data-subface="${button.face}"]`);
    if (subface) {
      const btn = document.createElement("button");
      btn.className = "game-btn";
      btn.dataset.id = button.id;
      btn.style.backgroundColor = button.color;
      btn.textContent = button.label;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        handleButtonClick(button.id);
      });
      subface.appendChild(btn);
    }
  });
}

// Renderiza manivelas nas subfaces do cubo
function renderCranks(cranks) {
  document.querySelectorAll(".crank").forEach((c) => c.remove());

  cranks.forEach((crank) => {
    const subface = document.querySelector(`[data-subface="${crank.face}"]`);
    if (subface) {
      // Inicializa ângulo da manivela
      crankState.crankAngles[crank.id] = 0;

      const crankEl = document.createElement("div");
      crankEl.className = "crank";
      crankEl.dataset.id = crank.id;
      crankEl.style.backgroundColor = crank.color;

      // Handle indicator
      const handle = document.createElement("div");
      handle.className = "crank-handle";
      crankEl.appendChild(handle);

      // Center dot
      const center = document.createElement("div");
      center.className = "crank-center";
      crankEl.appendChild(center);

      // Turn counter
      const turns = document.createElement("div");
      turns.className = "crank-turns";
      turns.textContent = "0 voltas";
      crankEl.appendChild(turns);

      subface.appendChild(crankEl);
    }
  });
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
  subfaceStates[subfaceId].switches[device.id] = false; // Start in off state

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

  // Click event listener
  switchEl.addEventListener("click", (e) => {
    e.stopPropagation();
    handleSwitchToggle(device.id, subfaceId);
  });

  subfaceEl.appendChild(switchEl);
}

// Handles switch toggle - toggles state, updates visual, tracks sequence
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

  // Track toggle sequence (only when turning ON)
  if (newState) {
    subfaceState.toggleSequence.push(switchId);
    // Check sequence after each toggle
    checkSwitchSequence(subfaceId);
  }
}

// Validates switch sequence against solution
function checkSwitchSequence(subfaceId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  const template = getTemplateById(subfaceState.templateId);
  if (!template) return;

  const toggleSequence = subfaceState.toggleSequence;
  const solution = template.solution;

  // Check each toggle in sequence
  for (let i = 0; i < toggleSequence.length; i++) {
    if (toggleSequence[i] !== solution[i]) {
      // Wrong order - mark as failed
      subfaceState.status = "failed";
      setSubfaceStatus(subfaceId, "failed");
      return;
    }
  }

  // Check if sequence is complete
  if (toggleSequence.length === solution.length) {
    // All switches toggled in correct order - mark as solved
    subfaceState.status = "solved";
    setSubfaceStatus(subfaceId, "solved");
  }
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
  display.textContent = `0/${device.target}`;
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

  // Click and press events
  counterEl.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    counterEl.classList.add("pressed");
  });
  counterEl.addEventListener("mouseup", () => {
    counterEl.classList.remove("pressed");
  });
  counterEl.addEventListener("mouseleave", () => {
    counterEl.classList.remove("pressed");
  });
  counterEl.addEventListener("click", (e) => {
    e.stopPropagation();
    handleCounterClick(device.id, subfaceId);
  });

  subfaceEl.appendChild(counterEl);
}

// Handles counter click - increments counter and validates
function handleCounterClick(counterId, subfaceId) {
  const subfaceState = subfaceStates[subfaceId];
  if (!subfaceState || subfaceState.status !== "pending") return;

  const counterState = subfaceState.counters[counterId];
  if (!counterState) return;

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
      display.textContent = `${counterState.current}/${counterState.target}`;
    }
  }

  // Check target
  checkCounterTarget(subfaceId);
}

// Validates if counter reached or exceeded target
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

  // Helper to create 3D key
  function create3DKey(label, isClear = false) {
    const key = document.createElement("div");
    key.className = `keypad-key-3d${isClear ? " clear" : ""}`;

    const faces = ["front", "back", "right", "left", "top", "bottom"];
    faces.forEach((face) => {
      const faceEl = document.createElement("div");
      faceEl.className = `btn-face btn-${face}`;
      if (face === "front") {
        faceEl.textContent = label;
      }
      key.appendChild(faceEl);
    });

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

  // Create buttons 1-9
  for (let i = 1; i <= 9; i++) {
    const key = create3DKey(String(i));
    key.addEventListener("click", (e) => {
      e.stopPropagation();
      handleKeypadPress(device.id, String(i), subfaceId);
    });
    buttonsContainer.appendChild(key);
  }

  // Create clear button
  const clearKey = create3DKey("C", true);
  clearKey.addEventListener("click", (e) => {
    e.stopPropagation();
    handleKeypadClear(device.id, subfaceId);
  });
  buttonsContainer.appendChild(clearKey);

  // Create 0 button
  const zeroKey = create3DKey("0");
  zeroKey.addEventListener("click", (e) => {
    e.stopPropagation();
    handleKeypadPress(device.id, "0", subfaceId);
  });
  buttonsContainer.appendChild(zeroKey);

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

  // Max 6 digits as per requirements
  if (keypadState.display.length >= 6) return;

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
  }
}

// Verifica sequência atual (para botões)
function checkSequence() {
  const currentIndex = gameState.currentSequence.length - 1;
  const expected = gameState.winningSequence[currentIndex];
  const clicked = gameState.currentSequence[currentIndex];

  // Se esperava manivela mas clicou botão - falha
  if (typeof expected === "object" && expected.crankId) {
    showFailure();
    return;
  }

  // Botão errado - falha imediata
  if (clicked !== expected) {
    showFailure();
    return;
  }

  // Sequência completa - vitória
  if (gameState.currentSequence.length === gameState.winningSequence.length) {
    showVictory();
  }
}

// Verifica sequência mista (após ação de manivela)
function checkMixedSequence() {
  // Sequência completa - vitória
  if (gameState.currentSequence.length === gameState.winningSequence.length) {
    showVictory();
  }
}

// Atualiza indicador de sequência
function updateSequenceIndicator() {
  const dots = document.querySelectorAll(".sequence-dot");
  dots.forEach((dot, index) => {
    if (index < gameState.currentSequence.length) {
      dot.classList.add("filled");
    } else {
      dot.classList.remove("filled");
    }
  });
}

// Exibe mensagem de vitória
function showVictory() {
  gameState.isGameOver = true;
  gameState.hasWon = true;
  const overlay = document.querySelector(".overlay");
  const message = document.querySelector(".message");
  message.textContent = "🎉 Você Venceu!";
  message.className = "message victory";
  overlay.classList.add("show");
}

// Exibe mensagem de falha
function showFailure() {
  gameState.isGameOver = true;
  gameState.hasWon = false;
  const overlay = document.querySelector(".overlay");
  const message = document.querySelector(".message");
  message.textContent = "❌ Sequência Errada!";
  message.className = "message failure";
  overlay.classList.add("show");
}

// Reinicia o jogo
function resetGame() {
  gameState.currentSequence = [];
  gameState.isGameOver = false;
  gameState.hasWon = false;

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
  overlay.classList.remove("show");

  updateSequenceIndicator();
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
  if (e.target.classList.contains("game-btn")) return;

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

// Inicializa o jogo
loadGameConfig();
