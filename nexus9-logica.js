/* ============================================================
   NEXUS‑9D — INTERFAZ Y CONTROLADOR
   Archivo: nexus9-logica.js
   Autor: Asdrúbal / IA — Madrid 2026

   Este archivo conecta la interfaz visual con el
   núcleo Nexus‑9D (core.js).
   El core contiene los 9 cordones.
   Este archivo solo maneja la UI.
   ============================================================ */


/* ---- RELOJ EN TIEMPO REAL ---- */
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent =
    now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();


/* ---- NAVEGACIÓN LATERAL ---- */
function setNav(el) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
}


/* ---- CHIPS RÁPIDOS ---- */
function fillCmd(text) {
  document.getElementById('cmdInput').value = text;
  processCommand();
}


/* ---- SELECTOR DE NIVEL COGNITIVO ---- */
function setLevel(tab, id) {
  document.querySelectorAll('.level-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.level-content').forEach(c => c.classList.remove('active'));
  tab.classList.add('active');
  document.getElementById(id).classList.add('active');
}


/* ---- ESTADO DE CARGA ---- */
function showLoading() {
  document.getElementById('welcomeState').style.display = 'none';
  document.getElementById('responseBlock').classList.remove('visible');

  let el = document.getElementById('loadingState');
  if (!el) {
    el = document.createElement('div');
    el.id = 'loadingState';
    el.innerHTML = `
      <div style="
        display:flex; flex-direction:column;
        align-items:center; justify-content:center;
        height:220px; gap:18px;
      ">
        <div style="position:relative; width:48px; height:48px;">
          <div style="
            position:absolute; inset:0;
            border:2px solid var(--border);
            border-top-color:var(--accent);
            border-radius:50%;
            animation:n9spin 0.75s linear infinite;
          "></div>
          <div style="
            position:absolute; inset:8px;
            border:2px solid var(--border);
            border-bottom-color:var(--accent2);
            border-radius:50%;
            animation:n9spin 1.2s linear infinite reverse;
          "></div>
        </div>
        <div style="font-size:0.68rem; letter-spacing:0.18em; color:var(--accent);">
          NEXUS‑9D PROCESANDO
        </div>
        <div id="loadingCordon" style="font-size:0.6rem; color:var(--text-dim); letter-spacing:0.1em;">
          Cordón 1 — Detectando intención...
        </div>
      </div>
      <style>@keyframes n9spin { to { transform:rotate(360deg); } }</style>
    `;
    document.querySelector('.response-area').appendChild(el);
  }
  el.style.display = 'block';

  // Animar los cordones mientras carga
  const mensajes = [
    'Cordón 1 — Detectando intención...',
    'Cordón 2 — Analizando nivel cognitivo...',
    'Cordón 3 — Clasificando dominio...',
    'Cordón 4 — Seleccionando herramientas...',
    'Cordón 5 — Transformando contenido...',
    'Cordón 6 — Preparando presentación...',
    'Cordón 7 — Evaluando módulos...',
    'Cordón 8 — Conectando con IA externa...',
    'Cordón 9 — Integrando respuesta final...'
  ];

  let i = 0;
  window._loadingInterval = setInterval(() => {
    const el = document.getElementById('loadingCordon');
    if (el && i < mensajes.length) {
      el.textContent = mensajes[i];
      i++;
    }
  }, 400);
}

function hideLoading() {
  const el = document.getElementById('loadingState');
  if (el) el.style.display = 'none';
  if (window._loadingInterval) {
    clearInterval(window._loadingInterval);
    window._loadingInterval = null;
  }
}


/* ---- ESTADO DE ERROR ---- */
function showError(msg) {
  hideLoading();
  document.getElementById('welcomeState').style.display = 'none';

  const response = document.getElementById('responseBlock');
  response.classList.add('visible');

  document.getElementById('responseHeader').textContent = 'ERROR DEL SISTEMA';
  document.getElementById('toolGrid').innerHTML = `
    <div style="
      grid-column:1/-1; padding:20px;
      border:1px solid rgba(255,80,80,0.3);
      border-radius:8px;
      background:rgba(255,80,80,0.05);
      color:#ff8080;
      font-size:0.75rem; line-height:1.7;
    ">
      <div style="font-weight:700; margin-bottom:8px;">⚠ Nexus‑9D no pudo completar el pipeline</div>
      <div style="color:var(--text-dim); font-size:0.68rem;">${msg}</div>
    </div>`;

  ['n1','n2','n3','n4'].forEach((id, i) => {
    document.getElementById(id).innerHTML = [
      'Hubo un problema. Inténtalo de nuevo.',
      'El sistema no pudo completar el procesamiento. Verifica tu conexión e inténtalo otra vez.',
      'Error en el pipeline de Nexus‑9D. Puede ser un problema de red o disponibilidad de la API.',
      'Pipeline execution failed. Possible causes: network error, API key missing, or CORS policy.'
    ][i];
  });

  document.querySelectorAll('.level-tab').forEach((t, i) => t.classList.toggle('active', i === 0));
  document.querySelectorAll('.level-content').forEach((c, i) => c.classList.toggle('active', i === 0));

  document.getElementById('aiBridgeText').innerHTML =
    `<span style="color:var(--text-dim); font-size:0.7rem">Consulta directamente una IA mientras se resuelve:</span>`;
  document.getElementById('aiChips').innerHTML = `
    <a class="ai-chip" href="https://claude.ai" target="_blank">→ Claude</a>
    <a class="ai-chip" href="https://copilot.microsoft.com" target="_blank">→ Copilot</a>
    <a class="ai-chip" href="https://gemini.google.com" target="_blank">→ Gemini</a>`;
}


/* ---- RENDERIZAR RESPUESTA COMPLETA DE NEXUS‑9D ---- */
function renderRespuesta(resultado) {
  hideLoading();

  const response = document.getElementById('responseBlock');
  response.classList.add('visible');

  const ia = resultado.respuestaIA;

  // Título generado por la IA
  document.getElementById('responseHeader').textContent = ia.titulo;

  // Herramientas seleccionadas por el Cordón 4
  document.getElementById('toolGrid').innerHTML = resultado.herramientas.map(t => `
    <a class="tool-card" href="${t.url}" target="_blank" rel="noopener">
      <div class="tool-card-icon">${t.icono}</div>
      <div class="tool-card-name">${t.nombre}</div>
      <div class="tool-card-desc">${t.desc}</div>
    </a>
  `).join('');

  // Niveles cognitivos N1–N4 generados por la IA
  document.getElementById('n1').innerHTML = ia.niveles.n1;
  document.getElementById('n2').innerHTML = ia.niveles.n2;
  document.getElementById('n3').innerHTML = ia.niveles.n3;
  document.getElementById('n4').innerHTML = ia.niveles.n4;

  // Activar el nivel cognitivo detectado por el Cordón 2
  const nivelMap = { N1: 0, N2: 1, N3: 2, N4: 3 };
  const nivelIndex = nivelMap[resultado.nivel] ?? 1;
  document.querySelectorAll('.level-tab').forEach((t, i) => t.classList.toggle('active', i === nivelIndex));
  document.querySelectorAll('.level-content').forEach((c, i) => c.classList.toggle('active', i === nivelIndex));

  // Puente IA — Cordón 8
  document.getElementById('aiBridgeText').innerHTML =
    `<em style="color:var(--text-dim); font-size:0.68rem">${ia.promptIA}</em><br><br>` +
    `<span style="color:var(--accent3); font-size:0.72rem">${ia.promptTexto}</span>`;

  document.getElementById('aiChips').innerHTML = resultado.enlacesIA.map(l =>
    `<a class="ai-chip" href="${l.url}" target="_blank" rel="noopener">${l.nombre}</a>`
  ).join('');

  // Mostrar información del pipeline en consola (para desarrolladores)
  console.group('%c⟡ Nexus‑9D Pipeline', 'color:#00d4ff; font-weight:bold;');
  console.log('C1 Intención:', resultado.accion);
  console.log('C2 Nivel:', resultado.nivel);
  console.log('C3 Dominio:', resultado.dominio);
  console.log('C5 Transformación:', resultado.transformacion.tipo);
  console.log('C6 Formato:', resultado.formato);
  console.log('C7 Módulos extra:', resultado.modulosExtra);
  console.groupEnd();
}


/* ---- PROCESADOR PRINCIPAL — PUNTO DE ENTRADA ---- */
async function processCommand() {
  const input = document.getElementById('cmdInput').value.trim();
  if (!input) return;

  // Verificar que el core de Nexus‑9D está cargado
  if (!window.Nexus9D) {
    showError('El núcleo Nexus‑9D (core.js) no está cargado. Verifica que el archivo core.js existe en la misma carpeta.');
    return;
  }

  showLoading();

  try {
    // Ejecutar el pipeline completo de los 9 cordones
    const resultado = await window.Nexus9D.procesar(input);
    renderRespuesta(resultado);
  } catch (err) {
    console.error('[Nexus-9D]', err);
    showError(err.message || 'Error desconocido en el pipeline.');
  }
}


/* ---- TECLA ENTER ---- */
document.getElementById('cmdInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') processCommand();
});
