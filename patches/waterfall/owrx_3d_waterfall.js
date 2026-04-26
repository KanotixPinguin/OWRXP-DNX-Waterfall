/* OWRX_3D_WATERFALL_START */
/* OWRX 3D waterfall safe v5 slab cam
   Slab renderer with freer camera controls: yaw, pitch, roll, pan, zoom. */
(function () {
  "use strict";

  var STYLE_ID = "owrx-3d-waterfall-safe-v5-slab-cam-style";
  var WRAPPER_ATTR = "data-owrx-3d-waterfall-safe-v5-slab-cam-wrapper";
  var OVERLAY_ATTR = "data-owrx-3d-waterfall-safe-v5-slab-cam-overlay";
  var TOP_MASK_ATTR = "data-owrx-3d-top-mask";
  var TOGGLE_ATTR = "data-owrx-3d-waterfall-safe-v5-slab-cam-toggle";
  var SETTINGS_ATTR = "data-owrx-3d-waterfall-safe-v5-slab-cam-settings";
  var SETTINGS_KEY = "owrx.waterfall.safev5slabcam.settings";
  var MODE_KEY = "owrx.waterfall.safev5slabcam.mode";
  var VIEW_KEY = "owrx.waterfall.safev5slabcam.view_fix1";
  var DEFAULT_MODE = "old";
  var MIN_WIDTH = 260;
  var MIN_HEIGHT = 120;
  var MAX_BIND_TRIES = 60;
  var BIND_INTERVAL_MS = 1000;
  var SAMPLE_WIDTH = 1536;
  var SAMPLE_HEIGHT = 320;
  var FRAME_MS = 20;
  var LIVE_INTERVAL_MS = 20;

  var state = {
    tries: 0,
    bindTimer: 0,
    liveTimer: 0,
    sourceCanvas: null,
    sourceCanvases: [],
    wrapper: null,
    overlay: null,
    toggle: null,
    settings: null,
    overlayCtx: null,
    topMask: null,
    sampleCanvas: null,
    sampleCtx: null,
    bound: false,
    mode: loadMode(),
    splitFlip: loadSplitFlip(),
    yaw: 0.003,
    pitch: -2.693,
    roll: 0,
    zoom: 2.365,
    panX: -0.031,
    panY: -0.4,
    dragging: false,
    dragMode: "orbit",
    pointerId: null,
    startX: 0,
    startY: 0,
    startYaw: 0,
    startPitch: 0,
    startRoll: 0,
    startPanX: 0,
    startPanY: 0,
    lastSampleAt: 0,
    renderQueued: false,
    viewLoaded: false,
    sampleWidth: 1024,
    sampleHeight: 240,
    avgStrength: 0.32,
    renderStyle: "filled"
  };

  function loadMode() {
    try {
      var raw = window.localStorage.getItem(MODE_KEY);
      return raw === "3d" || raw === "old" || raw === "old3d" || raw === "legacy3d" ? raw : DEFAULT_MODE;
    } catch (err) {
      return DEFAULT_MODE;
    }
  }

  function loadSplitFlip() {
    try {
      return window.localStorage.getItem(SPLIT_FLIP_KEY) === "1";
    } catch (err) {
      return false;
    }
  }

  function saveSplitFlip(value) {
    try {
      window.localStorage.setItem(SPLIT_FLIP_KEY, value ? "1" : "0");
    } catch (err) {}
  }

  function saveMode(mode) {
    try {
      window.localStorage.setItem(MODE_KEY, mode);
    } catch (err) {}
  }

  function loadSettings() {
    try {
      var raw = window.localStorage.getItem(SETTINGS_KEY);
      if (!raw) return;
      var data = JSON.parse(raw);
      if (typeof data.sampleWidth === "number") state.sampleWidth = data.sampleWidth;
      if (typeof data.sampleHeight === "number") state.sampleHeight = data.sampleHeight;
      if (typeof data.avgStrength === "number") state.avgStrength = data.avgStrength;
      if (typeof data.speedFactor === "number") state.speedFactor = data.speedFactor;
      if (typeof data.liveIntervalMs === "number") LIVE_INTERVAL_MS = data.liveIntervalMs;
      if (typeof data.renderStyle === "string") state.renderStyle = data.renderStyle;
    } catch (err) {}
  }

  function saveSettings() {
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify({
        sampleWidth: state.sampleWidth,
        sampleHeight: state.sampleHeight,
        avgStrength: state.avgStrength,
        speedFactor: state.speedFactor,
        liveIntervalMs: LIVE_INTERVAL_MS,
        renderStyle: state.renderStyle
      }));
    } catch (err) {}
  }

  function applySettings() {
    SAMPLE_WIDTH = state.sampleWidth;
    SAMPLE_HEIGHT = state.sampleHeight;
    FRAME_MS = LIVE_INTERVAL_MS;
    state.sampleCanvas = null;
    state.sampleCtx = null;
    state.lastSampleAt = 0;
  }

  function loadView() {
    if (state.viewLoaded) return;
    state.viewLoaded = true;
    try {
      var raw = window.localStorage.getItem(VIEW_KEY);
      if (!raw) return;
      var data = JSON.parse(raw);
      if (typeof data.yaw === "number") state.yaw = data.yaw;
      if (typeof data.pitch === "number") state.pitch = data.pitch;
      if (typeof data.roll === "number") state.roll = data.roll;
      if (typeof data.zoom === "number") state.zoom = Math.min(data.zoom, 0.42);
      if (typeof data.panX === "number") state.panX = data.panX;
      if (typeof data.panY === "number") state.panY = data.panY;
    } catch (err) {}
  }

  function saveView() {
    try {
      window.localStorage.setItem(VIEW_KEY, JSON.stringify({
        yaw: round3(state.yaw),
        pitch: round3(state.pitch),
        roll: round3(state.roll),
        zoom: round3(state.zoom),
        panX: round3(state.panX),
        panY: round3(state.panY)
      }));
    } catch (err) {}
  }

  function round3(value) {
    return Math.round(value * 1000) / 1000;
  }

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      "[" + WRAPPER_ATTR + "] { position: relative !important; isolation: isolate; }",
      "[" + TOGGLE_ATTR + "] { position:absolute; top:8px; right:14px; z-index:1000030; display:inline-flex; gap:6px; padding:4px; border-radius:999px; background:transparent; border:0; box-shadow:none; backdrop-filter:none; }",
      "[" + TOGGLE_ATTR + "] button { appearance:none; border:1px solid #ffffff; background:#1414b8; color:#ffffff; border-radius:999px; padding:7px 14px; min-width:96px; font:700 13px/1.1 'Segoe UI',sans-serif; cursor:pointer; }",
      "[" + TOGGLE_ATTR + "] button.is-active { background:#c40000; color:#ffffff; border:1px solid #ffffff; box-shadow:none; }",
      "[" + SETTINGS_ATTR + "] { position:absolute; top:8px; left:14px; z-index:1000030; display:flex; gap:8px; align-items:center; padding:6px 8px; border-radius:10px; background:rgba(18,42,68,.22); border:1px solid rgba(120,220,255,.52); backdrop-filter:blur(4px); color:#ffffff; }",
      "[" + SETTINGS_ATTR + "] label { display:flex; gap:4px; align-items:center; font:600 12px/1.1 'Segoe UI',sans-serif; color:#ffffff; }",
      "[" + SETTINGS_ATTR + "] select, [" + SETTINGS_ATTR + "] button { height:28px; border-radius:7px; border:1px solid #ffffff; background:#1414b8; color:#ffffff; font:700 12px/1 'Segoe UI',sans-serif; padding:0 8px; }",
      "[" + SETTINGS_ATTR + "] button { background:#1414b8; cursor:pointer; }",
      "[" + OVERLAY_ATTR + "] { position:absolute; inset:0; display:none; z-index:10; pointer-events:none; background:#000; }",
      "[" + OVERLAY_ATTR + "].is-active { display:block; pointer-events:auto; }",
      "[" + TOP_MASK_ATTR + "] { position:absolute; left:0; right:0; top:0; height:32px; background:#000; z-index:1000004; pointer-events:none; display:none; }",
      "[" + TOP_MASK_ATTR + "].is-active { display:block; }"
    ].join("\n");
    document.head.appendChild(style);
  }

  function isVisibleCanvas(canvas) {
    if (!canvas || typeof canvas.getContext !== "function") return false;
    var rect = canvas.getBoundingClientRect();
    return rect.width >= MIN_WIDTH && rect.height >= MIN_HEIGHT;
  }

  function isLikelyWaterfallCanvas(canvas) {
    if (!isVisibleCanvas(canvas)) return false;
    var rect = canvas.getBoundingClientRect();
    var name = ((canvas.id || "") + " " + (canvas.className || "")).toLowerCase();
    var inKnownContainer = !!(canvas.closest && canvas.closest(
      "#openwebrx-panel-receiver, #openwebrx-main, .openwebrx-waterfall-container, .webrx-top-container"
    ));
    var looksWide = rect.width >= rect.height * 1.8;
    var hasHelpfulName = name.indexOf("waterfall") !== -1 || name.indexOf("spectrum") !== -1;
    return looksWide && (inKnownContainer || hasHelpfulName);
  }

  function findWaterfallCanvas() {
    var canvases = Array.prototype.slice.call(document.querySelectorAll("canvas"));
    var best = null;
    var bestScore = -1;
    canvases.forEach(function (canvas) {
      if (!isLikelyWaterfallCanvas(canvas)) return;
      var rect = canvas.getBoundingClientRect();
      var name = ((canvas.id || "") + " " + (canvas.className || "")).toLowerCase();
      var score = rect.width * rect.height;
      if (name.indexOf("waterfall") !== -1) score += 500000;
      if (name.indexOf("spectrum") !== -1) score += 250000;
      if (canvas.closest && canvas.closest("#openwebrx-panel-receiver")) score += 150000;
      if (score > bestScore) {
        best = canvas;
        bestScore = score;
      }
    });
    return best;
  }

  function ensureWrapper(canvas) {
    var wrapper = canvas.parentElement;
    if (!wrapper) return null;
    wrapper.setAttribute(WRAPPER_ATTR, "1");
    if (!wrapper.style.position) wrapper.style.position = "relative";
    return wrapper;
  }

  function ensureOverlay(wrapper) {
    var overlay = wrapper.querySelector("canvas[" + OVERLAY_ATTR + "]");
    if (overlay) return overlay;
    overlay = document.createElement("canvas");
    overlay.setAttribute(OVERLAY_ATTR, "1");
    overlay.addEventListener("pointerdown", onPointerDown, true);
    overlay.addEventListener("pointermove", onPointerMove, true);
    overlay.addEventListener("pointerup", onPointerUp, true);
    overlay.addEventListener("pointercancel", onPointerUp, true);
    overlay.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    overlay.addEventListener("wheel", onWheel, { passive: false });
    wrapper.appendChild(overlay);
    return overlay;
  }

  function ensureTopMask(wrapper) {
    var mask = wrapper.querySelector("div[" + TOP_MASK_ATTR + "]");
    if (mask) return mask;
    mask = document.createElement("div");
    mask.setAttribute(TOP_MASK_ATTR, "1");
    wrapper.appendChild(mask);
    return mask;
  }

  function ensureSettings(wrapper) {
    var panel = wrapper.querySelector("div[" + SETTINGS_ATTR + "]");
    if (panel) return panel;

    panel = document.createElement("div");
    panel.setAttribute(SETTINGS_ATTR, "1");

    function makeSelect(labelText, options, selected, onChange) {
      var label = document.createElement("label");
      var span = document.createElement("span");
      span.textContent = labelText;
      var select = document.createElement("select");
      options.forEach(function(opt) {
        var option = document.createElement("option");
        option.value = String(opt.value);
        option.textContent = opt.label;
        if (String(opt.value) === String(selected)) option.selected = true;
        select.appendChild(option);
      });
      select.addEventListener("change", function() {
        onChange(select.value);
        saveSettings();
        applySettings();
        queueRender();
      });
      label.appendChild(span);
      label.appendChild(select);
      panel.appendChild(label);
    }

    makeSelect("Samples", [
      { value: 512, label: "500" },
      { value: 1024, label: "1k" },
      { value: 2048, label: "2k" }
    ], state.sampleWidth, function(value) {
      state.sampleWidth = Number(value) || 1024;
    });

    makeSelect("FPS", [
      { value: 100, label: "10" },
      { value: 50, label: "20" },
      { value: 20, label: "50" },
      { value: 10, label: "100" }
    ], LIVE_INTERVAL_MS, function(value) {
      LIVE_INTERVAL_MS = Number(value) || 50;
      if (state.mode === "3d" || state.mode === "old3d") startLiveUpdates();
    });

    makeSelect("AVG", [
      { value: 0, label: "0" },
      { value: 0.10, label: "10" },
      { value: 0.18, label: "20" },
      { value: 0.32, label: "50" },
      { value: 0.42, label: "100" }
    ], state.avgStrength, function(value) {
      state.avgStrength = Number(value) || 0;
    });

    makeSelect("Speed", [
      { value: 1, label: "Slow" },
      { value: 2, label: "Normal" },
      { value: 3, label: "Fast" },
      { value: 4, label: "Very Fast" }
    ], state.speedFactor, function(value) {
      state.speedFactor = Number(value) || 2;
    });

    makeSelect("Style", [
      { value: "filled", label: "Filled" },
      { value: "outline", label: "Outline" }
    ], state.renderStyle, function(value) {
      state.renderStyle = value === "outline" ? "outline" : "filled";
    });

    var reset = document.createElement("button");
    reset.type = "button";
    reset.textContent = "Reset View";
    reset.addEventListener("click", function() {
      state.sampleWidth = 1024;
      LIVE_INTERVAL_MS = 20;
      FRAME_MS = 20;
      state.avgStrength = 0.32;
      state.speedFactor = 2;
      state.renderStyle = "filled";

      state.yaw = 0.003;
      state.pitch = -2.693;
      state.roll = 0;
      state.zoom = 2.365;
      state.panX = -0.031;
      state.panY = -0.4;

      saveSettings();
      applySettings();
      saveView();

      var panelRoot = state.settings;
      if (panelRoot) {
        var selects = panelRoot.querySelectorAll("select");
        Array.prototype.forEach.call(selects, function(select) {
          var label = "";
          if (select.parentElement) {
            var span = select.parentElement.querySelector("span");
            if (span) label = span.textContent;
          }
          if (label === "Samples") select.value = "1024";
          if (label === "FPS") select.value = "20";
          if (label === "AVG") select.value = "0.32";
          if (label === "Speed") select.value = "2";
          if (label === "Style") select.value = "filled";
        });
      }

      if (state.mode === "3d" || state.mode === "old3d" || state.mode === "legacy3d") {
        startLiveUpdates();
      }
      queueRender();
    });
    panel.appendChild(reset);

    wrapper.appendChild(panel);
    return panel;
  }

  function ensureToggle(wrapper) {
    var toggle = wrapper.querySelector("div[" + TOGGLE_ATTR + "]");
    if (toggle) return toggle;

    toggle = document.createElement("div");
    toggle.setAttribute(TOGGLE_ATTR, "1");

    function makeButton(label, mode) {
      var button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.setAttribute("data-mode", mode);
      button.addEventListener("click", function () {
        setMode(mode);
      });
      return button;
    }

    toggle.appendChild(makeButton("Standard", "old"));
    toggle.appendChild(makeButton("3D-Modern", "3d"));
    toggle.appendChild(makeButton("Std/3DM", "old3d"));
    toggle.appendChild(makeButton("3D-Old", "legacy3d"));

    var flipButton = document.createElement("button");
    flipButton.type = "button";
    flipButton.textContent = "Flip/Flop";
    flipButton.setAttribute("data-mode", "flipflop");
    flipButton.addEventListener("click", function () {
      state.splitFlip = !state.splitFlip;
      saveSplitFlip(state.splitFlip);
      updateOverlaySize();
      syncUi();
    });
    toggle.appendChild(flipButton);

    wrapper.appendChild(toggle);
    return toggle;
  }
  function updateToggleUi() {
    if (!state.toggle) return;
    var buttons = state.toggle.querySelectorAll("button");
    Array.prototype.forEach.call(buttons, function (button) {
      var mode = button.getAttribute("data-mode") || "";
      if (mode === "old") button.textContent = "Standard";
      if (mode === "3d") button.textContent = "3D-Modern";
      if (mode === "old3d") button.textContent = "Std/3DM";
      button.style.color = button.classList.contains("is-active") ? "#05121b" : "#f4fbff";
      button.style.opacity = "1";
      button.classList.toggle("is-active", mode === state.mode);
    });
  }
  function startLiveUpdates() {
    stopLiveUpdates();
    state.liveTimer = window.setInterval(function () {
      if ((state.mode !== "3d" && state.mode !== "old3d" && state.mode !== "legacy3d") || !state.bound) return;
      queueRender();
    }, LIVE_INTERVAL_MS);
  }
  function stopLiveUpdates() {
    if (!state.liveTimer) return;
    window.clearInterval(state.liveTimer);
    state.liveTimer = 0;
  }

  function syncUi() {
    if (state.overlay) {
      state.overlay.classList.toggle("is-active", state.mode === "3d" || state.mode === "old3d" || state.mode === "legacy3d");
    }
    if (state.topMask) {
      state.topMask.classList.toggle("is-active", state.mode === "old3d" && !state.splitFlip);
    }
    updateToggleUi();
    if (state.mode === "3d" || state.mode === "old3d" || state.mode === "legacy3d") {
      updateOverlaySize();
      stopLiveUpdates();
      state.lastSampleAt = 0;
      window.setTimeout(function () {
        if (state.mode !== "3d" && state.mode !== "old3d" && state.mode !== "legacy3d") return;
        startLiveUpdates();
        queueRender();
      }, 220);
    } else {
      stopLiveUpdates();
    }
  }
  function setMode(mode) {
    state.mode = (mode === "3d" || mode === "old3d" || mode === "legacy3d") ? mode : "old";

    if (state.mode === "legacy3d") {
      state.yaw = -0.015;
      state.pitch = -2.48;
      state.roll = 0;
      state.zoom = 2.18;
      state.panX = -0.02;
      state.panY = -0.34;
      saveView();
    }

    saveMode(state.mode);
    syncUi();
  }
  function clampView() {
    state.pitch = Math.max(-6.2, Math.min(6.2, state.pitch));
    state.yaw = Math.max(-2.3, Math.min(2.3, state.yaw));
    state.roll = Math.max(-1.2, Math.min(1.2, state.roll));
    state.zoom = Math.max(0.08, Math.min(12.0, state.zoom));
    state.panX = Math.max(-0.5, Math.min(0.5, state.panX));
    state.panY = Math.max(-0.4, Math.min(0.4, state.panY));
  }

  function onPointerDown(event) {
    if (state.mode !== "3d" && state.mode !== "old3d" && state.mode !== "legacy3d") return;
    if (event.button !== 0 && event.button !== 2) return;
    state.dragging = true;
    state.dragMode = event.altKey ? "roll" : ((event.button === 2 || event.shiftKey) ? "pan" : "orbit");
    state.pointerId = event.pointerId;
    state.startX = event.clientX;
    state.startY = event.clientY;
    state.startYaw = state.yaw;
    state.startPitch = state.pitch;
    state.startRoll = state.roll;
    state.startPanX = state.panX;
    state.startPanY = state.panY;
    if (state.overlay && state.overlay.setPointerCapture) {
      try { state.overlay.setPointerCapture(event.pointerId); } catch (err) {}
    }
    event.preventDefault();
  }

  function onPointerMove(event) {
    if (!state.dragging || event.pointerId !== state.pointerId) return;
    var dx = event.clientX - state.startX;
    var dy = event.clientY - state.startY;

    if (state.dragMode === "pan") {
      state.panX = state.startPanX + dx / Math.max(260, window.innerWidth) * 0.9;
      state.panY = state.startPanY + dy / Math.max(220, window.innerHeight) * 0.7;
    } else if (state.dragMode === "roll") {
      state.roll = state.startRoll - dx / Math.max(260, window.innerWidth) * 1.6;
      state.pitch = state.startPitch + dy / Math.max(220, window.innerHeight) * 0.9;
    } else {
      state.yaw = state.startYaw + dx / Math.max(260, window.innerWidth) * 3.4;
      state.pitch = state.startPitch + dy / Math.max(220, window.innerHeight) * 2.4;
    }

    clampView();
    saveView();
    queueRender();
    event.preventDefault();
  }

  function onPointerUp(event) {
    if (event.pointerId !== state.pointerId) return;
    state.dragging = false;
    state.pointerId = null;
    saveView();
  }

  function onWheel(event) {
    if (state.mode !== "3d" && state.mode !== "old3d" && state.mode !== "legacy3d") return;
    state.zoom *= event.deltaY > 0 ? 0.82 : 1.22;
    clampView();
    saveView();
    queueRender();
    event.preventDefault();
  }

  function ensureSampleCtx() {
    if (state.sampleCtx) return state.sampleCtx;
    state.sampleCanvas = document.createElement("canvas");
    state.sampleCanvas.width = SAMPLE_WIDTH;
    state.sampleCanvas.height = SAMPLE_HEIGHT;
    state.sampleCtx = state.sampleCanvas.getContext("2d", {
      willReadFrequently: true,
      alpha: false
    });
    return state.sampleCtx;
  }

  function updateOverlaySize() {
    if (!state.overlay || !state.wrapper) return false;
    var rect = state.wrapper.getBoundingClientRect();
    var dpr = Math.max(1, window.devicePixelRatio || 1);
    var splitRatio = 0.58;
    var topInsetCss = state.mode === "old3d" ? 32 : 0;
    var width = Math.max(1, Math.round(rect.width * dpr));
    var cssHeight = state.mode === "old3d"
      ? Math.max(1, Math.round(rect.height * splitRatio) - topInsetCss)
      : Math.max(1, Math.round(rect.height) - topInsetCss);
    var pixelHeight = Math.max(1, Math.round(cssHeight * dpr));
    var overlayTopCss = topInsetCss;

    if (state.mode === "old3d" && state.splitFlip) {
      overlayTopCss = Math.max(0, rect.height - cssHeight);
    }

    state.overlay.style.left = "0";
    state.overlay.style.right = "0";
    state.overlay.style.top = overlayTopCss + "px";
    state.overlay.style.background = "#000";
    state.overlay.style.height = cssHeight + "px";

    if (state.overlay.width !== width || state.overlay.height !== pixelHeight) {
      state.overlay.width = width;
      state.overlay.height = pixelHeight;
      state.overlayCtx = null;
      return true;
    }
    return false;
  }
  function updateSourceCanvases() {
    if (!state.wrapper) return [];
    state.sourceCanvases = Array.prototype.filter.call(
      state.wrapper.querySelectorAll("canvas"),
      function (canvas) {
        if (canvas === state.overlay) return false;
        return isVisibleCanvas(canvas);
      }
    );
    return state.sourceCanvases;
  }

  function getCanvasSortScore(canvas) {
    var z = Number(getComputedStyle(canvas).zIndex);
    return Number.isFinite(z) ? z : 0;
  }

  function sampleCompositeSource() {
    var ctx = ensureSampleCtx();
    if (!ctx || !state.wrapper) return null;

    var now = Date.now();
    if (now - state.lastSampleAt < FRAME_MS) {
      return ctx.getImageData(0, 0, SAMPLE_WIDTH, SAMPLE_HEIGHT);
    }

    var rect = state.wrapper.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;

    var canvases = updateSourceCanvases().slice().sort(function (a, b) {
      return getCanvasSortScore(a) - getCanvasSortScore(b);
    });

    if (!canvases.length) return null;

    try {
      ctx.clearRect(0, 0, SAMPLE_WIDTH, SAMPLE_HEIGHT);
      canvases.forEach(function (canvas) {
        var cRect = canvas.getBoundingClientRect();
        if (!cRect.width || !cRect.height) return;
        var dx = ((cRect.left - rect.left) / rect.width) * SAMPLE_WIDTH;
        var dy = ((cRect.top - rect.top) / rect.height) * SAMPLE_HEIGHT;
        var dw = (cRect.width / rect.width) * SAMPLE_WIDTH;
        var dh = (cRect.height / rect.height) * SAMPLE_HEIGHT;
        ctx.drawImage(canvas, dx, dy, dw, dh);
      });
      state.lastSampleAt = now;
      return ctx.getImageData(0, 0, SAMPLE_WIDTH, SAMPLE_HEIGHT);
    } catch (err) {
      return null;
    }
  }

  function getOverlayCtx() {
    if (state.overlayCtx) return state.overlayCtx;
    if (!state.overlay) return null;
    state.overlayCtx = state.overlay.getContext("2d", { alpha: true });
    return state.overlayCtx;
  }

  function luminance(r, g, b) {
    return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
  }

  function colorForValue(v) {
    var t = Math.max(0, Math.min(1, v));
    var r;
    var g;
    var b;

    if (t < 0.20) {
      var p0 = t / 0.20;
      r = 0;
      g = Math.round(30 + p0 * 60);
      b = Math.round(150 + p0 * 95);
    } else if (t < 0.46) {
      var p1 = (t - 0.20) / 0.26;
      r = Math.round(p1 * 40);
      g = Math.round(90 + p1 * 150);
      b = Math.round(245 - p1 * 85);
    } else if (t < 0.70) {
      var p2 = (t - 0.46) / 0.24;
      r = Math.round(40 + p2 * 95);
      g = Math.round(240 + p2 * 10);
      b = Math.round(160 - p2 * 70);
    } else if (t < 0.86) {
      var p3 = (t - 0.70) / 0.16;
      r = Math.round(135 + p3 * 120);
      g = Math.round(250 - p3 * 70);
      b = Math.round(90 - p3 * 55);
    } else if (t < 0.95) {
      var p4 = (t - 0.86) / 0.09;
      r = 255;
      g = Math.round(180 - p4 * 70);
      b = Math.round(35 - p4 * 20);
    } else {
      var p5 = (t - 0.95) / 0.05;
      r = 255;
      g = Math.round(110 - p5 * 50);
      b = Math.round(15 - p5 * 10);
    }

    return "rgb(" + Math.max(0, Math.min(255, r)) + "," + Math.max(0, Math.min(255, g)) + "," + Math.max(0, Math.min(255, b)) + ")";
  }
  function colorForValueOld(v) {
    var t = Math.max(0, Math.min(1, v));
    var r;
    var g;
    var b;

    if (t < 0.24) {
      var p0 = t / 0.24;
      r = 0;
      g = Math.round(28 + p0 * 42);
      b = Math.round(138 + p0 * 82);
    } else if (t < 0.52) {
      var p1 = (t - 0.24) / 0.28;
      r = Math.round(10 + p1 * 42);
      g = Math.round(70 + p1 * 120);
      b = Math.round(220 - p1 * 70);
    } else if (t < 0.78) {
      var p2 = (t - 0.52) / 0.26;
      r = Math.round(52 + p2 * 58);
      g = Math.round(190 + p2 * 22);
      b = Math.round(150 - p2 * 55);
    } else if (t < 0.93) {
      var p3 = (t - 0.78) / 0.15;
      r = Math.round(110 + p3 * 95);
      g = Math.round(212 - p3 * 52);
      b = Math.round(95 - p3 * 35);
    } else {
      var p4 = (t - 0.93) / 0.07;
      r = 205;
      g = Math.round(160 - p4 * 28);
      b = Math.round(60 - p4 * 18);
    }

    return "rgb(" + Math.max(0, Math.min(255, r)) + "," + Math.max(0, Math.min(255, g)) + "," + Math.max(0, Math.min(255, b)) + ")";
  }
  function rotate3(point, yaw, pitch, roll) {
    var x = point.x;
    var y = point.y;
    var z = point.z;

    var cosy = Math.cos(yaw);
    var siny = Math.sin(yaw);
    var x1 = x * cosy - z * siny;
    var z1 = x * siny + z * cosy;

    var cosp = Math.cos(pitch);
    var sinp = Math.sin(pitch);
    var y2 = y * cosp - z1 * sinp;
    var z2 = y * sinp + z1 * cosp;

    var cosr = Math.cos(roll);
    var sinr = Math.sin(roll);
    var x3 = x1 * cosr - y2 * sinr;
    var y3 = x1 * sinr + y2 * cosr;

    return { x: x3, y: y3, z: z2 };
  }

  function projectPoint(x, age, amplitude, viewport) {
    var centeredX = (x - 0.5) * 2;
    var edge = Math.abs(centeredX);
    var depth = age;
    var slabHeight;
    var worldDepth = viewport.worldDepth;

    if (state.mode === "legacy3d") {
      var centerLift = Math.max(0, 1 - edge * 0.92);
      slabHeight = amplitude * (0.42 + centerLift * 0.24);
      worldDepth = viewport.worldDepth * 0.78;
    } else {
      slabHeight = amplitude * 1.18 * (0.72 + Math.pow(1 - edge, 0.32) * 0.26);
    }

    var point = {
      x: centeredX * viewport.worldWidth * 0.5,
      y: -slabHeight * viewport.worldHeight,
      z: -depth * worldDepth
    };

    var rotated = rotate3(point, state.yaw, state.pitch, state.roll);
    var persp = viewport.camera / (viewport.camera - rotated.z + viewport.depthOffset);
    return {
      x: viewport.cx + state.panX * viewport.screenWidth + rotated.x * persp,
      y: viewport.baseY + state.panY * viewport.screenHeight - rotated.y * persp
    };
  }

  function drawBackground(ctx, width, height) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
  }

  function drawLabels(ctx, width, height) {
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.88)";
    ctx.font = "600 " + Math.max(11, Math.round(height * 0.028)) + "px Segoe UI, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("", width - 18, 24);
    ctx.restore();
  }

  function buildHeightRow(imageData, row) {
    var heights = new Array(SAMPLE_WIDTH);
    var data = imageData.data;
    for (var col = 0; col < SAMPLE_WIDTH; col++) {
      var offset = (row * SAMPLE_WIDTH + col) * 4;
      var intensity = luminance(data[offset], data[offset + 1], data[offset + 2]);
      var edge = Math.abs(col / (SAMPLE_WIDTH - 1) - 0.5) * 2;
      var flatBoost = 0.72 + Math.pow(1 - edge, 0.18) * 0.16;
      heights[col] = Math.pow(Math.max(0.02, intensity), 0.82) * flatBoost;
    }
    if (state.avgStrength > 0) {
      var centerWeight = Math.max(0.2, 1 - state.avgStrength * 2);
      var sideWeight = (1 - centerWeight) / 2;
      for (var s = 1; s < SAMPLE_WIDTH - 1; s++) {
        heights[s] = heights[s - 1] * sideWeight + heights[s] * centerWeight + heights[s + 1] * sideWeight;
      }
    }
    return heights;
  }

  function drawSlab(ctx, imageData) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var viewport = {
      cx: width * 0.5,
      baseY: height * 0.74,
      camera: width * 1.15 / Math.pow(state.zoom, 1.35),
      depthOffset: width * 0.06,
      worldWidth: width * 0.9,
      worldHeight: height * 0.28,
      worldDepth: height * 1.05,
      screenWidth: width,
      screenHeight: height
    };

    drawBackground(ctx, width, height);
    ctx.save();

    var rowStep = Math.max(1, Math.round(state.speedFactor || 1)) * 2;
    var motionScale = 1;

    if (state.mode === "legacy3d") {
      rowStep = Math.max(2, Math.round(state.speedFactor || 2)) * 2;
      motionScale = 0.68;
    }

    for (var row = SAMPLE_HEIGHT - rowStep; row >= 1; row -= rowStep) {
      var nextRow = Math.max(0, row - rowStep);
      var age0 = (row / (SAMPLE_HEIGHT - 1)) * motionScale;
      var age1 = (nextRow / (SAMPLE_HEIGHT - 1)) * motionScale;
      if (age1 < 0) age1 = 0;

      var cur = buildHeightRow(imageData, row);
      var next = buildHeightRow(imageData, nextRow);

      for (var col = 1; col < SAMPLE_WIDTH; col += 1) {
        var x0 = (col - 1) / (SAMPLE_WIDTH - 1);
        var x1 = col / (SAMPLE_WIDTH - 1);

        var p00 = projectPoint(x0, age0, cur[col - 1], viewport);
        var p10 = projectPoint(x1, age0, cur[col], viewport);
        var p11 = projectPoint(x1, age1, next[col], viewport);
        var p01 = projectPoint(x0, age1, next[col - 1], viewport);

        var v = (cur[col - 1] + cur[col] + next[col] + next[col - 1]) * 0.25;
        if (v < 0.045) continue;

        ctx.beginPath();
        ctx.moveTo(p00.x, p00.y);
        ctx.lineTo(p10.x, p10.y);
        ctx.lineTo(p11.x, p11.y);
        ctx.lineTo(p01.x, p01.y);
        ctx.closePath();

        if (state.mode === "legacy3d") {
          ctx.fillStyle = colorForValueOld(v);
          ctx.fill();
          ctx.strokeStyle = "rgba(110,170,255,0.30)";
          ctx.lineWidth = 0.7;
          ctx.stroke();
        } else if (state.renderStyle === "outline") {
          ctx.strokeStyle = colorForValue(v);
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          ctx.fillStyle = colorForValue(v);
          ctx.fill();
        }
      }
    }

    ctx.restore();
    drawLabels(ctx, width, height);
  }

  function render() {
    state.renderQueued = false;
    if ((state.mode !== "3d" && state.mode !== "old3d" && state.mode !== "legacy3d") || !state.bound || !state.overlay || !state.wrapper) return;
    updateOverlaySize();
    var imageData = sampleCompositeSource();
    if (!imageData) return;
    var ctx = getOverlayCtx();
    if (!ctx) return;
    drawSlab(ctx, imageData);
  }

  function queueRender() {
    if (state.renderQueued) return;
    state.renderQueued = true;
    window.requestAnimationFrame(render);
  }

  function bindOnce() {
    if (state.bound) return true;
    var canvas = findWaterfallCanvas();
    if (!canvas) return false;
    ensureStyle();
    loadSettings();
    applySettings();
    loadView();

    var wrapper = ensureWrapper(canvas);
    if (!wrapper) return false;

    state.sourceCanvas = canvas;
    state.wrapper = wrapper;
    state.overlay = ensureOverlay(wrapper);
    state.topMask = ensureTopMask(wrapper);
    state.settings = ensureSettings(wrapper);
    state.toggle = ensureToggle(wrapper);
    updateSourceCanvases();
    state.bound = true;
    updateOverlaySize();
    syncUi();
    return true;
  }

  function tickBind() {
    state.tries += 1;
    if (bindOnce()) {
      if (state.bindTimer) window.clearInterval(state.bindTimer);
      state.bindTimer = 0;
      return;
    }
    if (state.tries >= MAX_BIND_TRIES && state.bindTimer) {
      window.clearInterval(state.bindTimer);
      state.bindTimer = 0;
    }
  }

  function boot() {
    tickBind();
    if (!state.bound) {
      state.bindTimer = window.setInterval(tickBind, BIND_INTERVAL_MS);
    }
    window.addEventListener("resize", function () {
      if (!state.bound || (state.mode !== "3d" && state.mode !== "old3d" && state.mode !== "legacy3d")) return;
      updateOverlaySize();
      queueRender();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
/* OWRX_3D_WATERFALL_END */
