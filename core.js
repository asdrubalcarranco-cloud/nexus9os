/* ============================================================
   NEXUS‑9D — CORE ENGINE
   Archivo: core.js
   Autor: Asdrúbal / IA — Madrid 2026

   Los 9 cordones del sistema cognitivo dimensional.
   Este archivo es el núcleo inmutable de Nexus‑9D.
   Ninguna IA externa modifica este núcleo.
   Las IAs externas expanden. El núcleo permanece.
   ============================================================ */


/* ============================================================
   CORDÓN 1 — MOTOR DE INTENCIÓN
   Interpreta el lenguaje natural del usuario.
   Convierte frases en acciones internas del sistema.
   ============================================================ */
const Cordon1_Intencion = {

  acciones: {
    crear_documento:   ['cv', 'curriculum', 'carta', 'redact', 'escrib', 'document', 'resume'],
    buscar_info:       ['buscar', 'qué es', 'que es', 'definir', 'definición', 'wikipedia', 'información'],
    explicar_concepto: ['explica', 'cómo funciona', 'como funciona', 'entender', 'comprender', 'aprend'],
    estudiar:          ['estudiar', 'estudia', 'historia', 'ciencia', 'matemáticas', 'biología', 'química', 'física'],
    crear_arte:        ['diseñar', 'diseño', 'imagen', 'arte', 'visual', 'canva', 'ilustra'],
    calcular:          ['calcul', 'presupuesto', 'dinero', 'finanz', 'número', 'matemática', 'suma'],
    traducir:          ['traduc', 'translate', 'idioma', 'inglés', 'francés', 'alemán', 'lengua'],
    programar:         ['código', 'programar', 'programación', 'javascript', 'python', 'html', 'css', 'software'],
    productividad:     ['organizar', 'planificar', 'agenda', 'tarea', 'proyecto', 'productividad', 'gestión'],
    generico:          []
  },

  detectar(input) {
    const lower = input.toLowerCase();
    for (const [accion, palabras] of Object.entries(this.acciones)) {
      if (accion === 'generico') continue;
      if (palabras.some(p => lower.includes(p))) return accion;
    }
    return 'generico';
  }
};


/* ============================================================
   CORDÓN 2 — MOTOR COGNITIVO (N1–N4)
   Determina el nivel de complejidad de la respuesta.
   Analiza señales en el texto del usuario.
   ============================================================ */
const Cordon2_Cognitivo = {

  niveles: {
    N1: { nombre: 'Infantil',     descripcion: 'Explicación para niños. Analogías simples. Sin tecnicismos.' },
    N2: { nombre: 'Básico',       descripcion: 'Explicación clara para adultos sin conocimientos previos.' },
    N3: { nombre: 'Intermedio',   descripcion: 'Explicación técnica con terminología del área.' },
    N4: { nombre: 'Experto',      descripcion: 'Explicación avanzada con marcos teóricos y metodologías.' }
  },

  senalesExperto:  ['algoritmo', 'framework', 'arquitectura', 'paradigma', 'ontología', 'epistemología', 'metodología', 'axioma', 'teorema'],
  senalesAvanzado: ['técnico', 'sistema', 'estructura', 'análisis', 'proceso', 'función', 'módulo', 'protocolo'],
  senalesBasico:   ['simple', 'fácil', 'básico', 'sencillo', 'resumido', 'breve'],
  senalesInfantil: ['niño', 'niña', 'infantil', 'pequeño', 'hijo', 'hija', 'años'],

  detectar(input) {
    const lower = input.toLowerCase();
    if (this.senalesInfantil.some(s => lower.includes(s))) return 'N1';
    if (this.senalesBasico.some(s => lower.includes(s)))   return 'N2';
    if (this.senalesExperto.some(s => lower.includes(s)))  return 'N4';
    if (this.senalesAvanzado.some(s => lower.includes(s))) return 'N3';
    return 'N2'; // nivel por defecto
  }
};


/* ============================================================
   CORDÓN 3 — MOTOR DE DOMINIO
   Clasifica la intención en categorías funcionales.
   ============================================================ */
const Cordon3_Dominio = {

  dominios: {
    creacion:       ['crear_documento', 'crear_arte'],
    estudio:        ['estudiar', 'explicar_concepto'],
    busqueda:       ['buscar_info'],
    transformacion: ['traducir', 'calcular'],
    desarrollo:     ['programar'],
    productividad:  ['productividad'],
    generico:       ['generico']
  },

  clasificar(accion) {
    for (const [dominio, acciones] of Object.entries(this.dominios)) {
      if (acciones.includes(accion)) return dominio;
    }
    return 'generico';
  }
};


/* ============================================================
   CORDÓN 4 — MOTOR DE HERRAMIENTAS EXTERNAS
   Mapea dominios y acciones a recursos reales de internet.
   ============================================================ */
const Cordon4_Herramientas = {

  mapa: {
    crear_documento: [
      { icono: '📄', nombre: 'Google Docs',    url: 'https://docs.google.com',        desc: 'Editor de texto gratuito en la nube' },
      { icono: '🎨', nombre: 'Canva',           url: 'https://www.canva.com',          desc: 'Diseño visual con plantillas' },
      { icono: '📝', nombre: 'Notion',          url: 'https://www.notion.so',          desc: 'Documentos y bases de datos' },
    ],
    buscar_info: [
      { icono: '📖', nombre: 'Wikipedia',       url: 'https://es.wikipedia.org',       desc: 'Enciclopedia libre universal' },
      { icono: '🔍', nombre: 'Google',          url: 'https://www.google.com',         desc: 'Buscador universal' },
      { icono: '🎓', nombre: 'Khan Academy',    url: 'https://es.khanacademy.org',     desc: 'Educación gratuita de calidad' },
    ],
    explicar_concepto: [
      { icono: '🎓', nombre: 'Khan Academy',    url: 'https://es.khanacademy.org',     desc: 'Explicaciones estructuradas' },
      { icono: '📖', nombre: 'Wikipedia',       url: 'https://es.wikipedia.org',       desc: 'Enciclopedia libre universal' },
      { icono: '▶️', nombre: 'YouTube',         url: 'https://www.youtube.com',        desc: 'Videos explicativos' },
    ],
    estudiar: [
      { icono: '🎓', nombre: 'Khan Academy',    url: 'https://es.khanacademy.org',     desc: 'Cursos gratuitos completos' },
      { icono: '📚', nombre: 'Coursera',        url: 'https://www.coursera.org',       desc: 'Cursos universitarios online' },
      { icono: '🔬', nombre: 'Britannica',      url: 'https://www.britannica.com',     desc: 'Enciclopedia académica' },
    ],
    crear_arte: [
      { icono: '🎨', nombre: 'Canva',           url: 'https://www.canva.com',          desc: 'Diseño gráfico en el navegador' },
      { icono: '🖼️', nombre: 'Adobe Express',  url: 'https://express.adobe.com',      desc: 'Diseño profesional gratuito' },
      { icono: '✏️', nombre: 'Figma',           url: 'https://www.figma.com',          desc: 'Diseño UI/UX colaborativo' },
    ],
    calcular: [
      { icono: '📊', nombre: 'Google Sheets',   url: 'https://sheets.google.com',      desc: 'Hoja de cálculo gratuita' },
      { icono: '🧮', nombre: 'Calculadora',     url: 'https://www.calculator.net',     desc: 'Calculadoras especializadas' },
      { icono: '💰', nombre: 'Wallet',          url: 'https://budgetbakers.com',       desc: 'Control financiero personal' },
    ],
    traducir: [
      { icono: '🌐', nombre: 'DeepL',           url: 'https://www.deepl.com',          desc: 'Traducción de alta calidad con IA' },
      { icono: '🔤', nombre: 'Google Translate',url: 'https://translate.google.com',   desc: 'Traducción instantánea' },
      { icono: '📖', nombre: 'Reverso',         url: 'https://www.reverso.net',        desc: 'Traducción con contexto real' },
    ],
    programar: [
      { icono: '💻', nombre: 'CodePen',         url: 'https://codepen.io',             desc: 'Editor de código en el navegador' },
      { icono: '📚', nombre: 'freeCodeCamp',    url: 'https://www.freecodecamp.org',   desc: 'Aprender programación gratis' },
      { icono: '📖', nombre: 'MDN Web Docs',    url: 'https://developer.mozilla.org',  desc: 'Documentación técnica oficial' },
    ],
    productividad: [
      { icono: '📋', nombre: 'Notion',          url: 'https://www.notion.so',          desc: 'Gestión de proyectos y notas' },
      { icono: '✅', nombre: 'Todoist',         url: 'https://todoist.com',            desc: 'Gestión de tareas' },
      { icono: '📅', nombre: 'Google Calendar', url: 'https://calendar.google.com',    desc: 'Organización del tiempo' },
    ],
    generico: [
      { icono: '🔍', nombre: 'Google',          url: 'https://www.google.com',         desc: 'Buscador universal' },
      { icono: '📖', nombre: 'Wikipedia',       url: 'https://es.wikipedia.org',       desc: 'Enciclopedia libre' },
      { icono: '◉',  nombre: 'Claude AI',       url: 'https://claude.ai',              desc: 'Asistente IA avanzado' },
    ]
  },

  obtener(accion) {
    return this.mapa[accion] || this.mapa['generico'];
  }
};


/* ============================================================
   CORDÓN 5 — MOTOR DE TRANSFORMACIÓN
   Define qué tipo de procesamiento necesita el contenido.
   ============================================================ */
const Cordon5_Transformacion = {

  tipos: {
    crear_documento:   'estructurar',
    buscar_info:       'resumir',
    explicar_concepto: 'analogia',
    estudiar:          'pasos',
    crear_arte:        'lista',
    calcular:          'pasos',
    traducir:          'convertir',
    programar:         'estructurar',
    productividad:     'pasos',
    generico:          'resumir'
  },

  instrucciones: {
    resumir:      'Presenta la información como un resumen claro y conciso.',
    estructurar:  'Organiza la respuesta en secciones con estructura lógica.',
    analogia:     'Usa analogías y ejemplos concretos para explicar.',
    pasos:        'Presenta la respuesta como una serie de pasos numerados.',
    lista:        'Presenta opciones como una lista de elementos.',
    convertir:    'Transforma el contenido manteniendo el significado original.'
  },

  obtener(accion) {
    const tipo = this.tipos[accion] || 'resumir';
    return { tipo, instruccion: this.instrucciones[tipo] };
  }
};


/* ============================================================
   CORDÓN 6 — MOTOR DE PRESENTACIÓN
   Define el formato visual de la respuesta.
   ============================================================ */
const Cordon6_Presentacion = {

  formatos: {
    creacion:       'tarjetas_con_pasos',
    estudio:        'explicacion_con_niveles',
    busqueda:       'resumen_con_enlaces',
    transformacion: 'resultado_directo',
    desarrollo:     'codigo_con_explicacion',
    productividad:  'lista_accionable',
    generico:       'respuesta_general'
  },

  obtener(dominio) {
    return this.formatos[dominio] || 'respuesta_general';
  }
};


/* ============================================================
   CORDÓN 7 — MOTOR DE EXPANSIÓN MODULAR
   Detecta si se necesitan módulos adicionales.
   ============================================================ */
const Cordon7_Expansion = {

  modulos: {
    'crear_documento': ['modulo_plantillas', 'modulo_exportar'],
    'estudiar':        ['modulo_quiz',        'modulo_resumen'],
    'programar':       ['modulo_editor',      'modulo_debug'],
    'calcular':        ['modulo_graficos',    'modulo_exportar'],
    'generico':        []
  },

  evaluar(accion) {
    return this.modulos[accion] || [];
  }
};


/* ============================================================
   CORDÓN 8 — MOTOR DE INTEROPERABILIDAD IA
   Define cómo Nexus‑9D se relaciona con IAs externas.
   El núcleo no cambia. Las IAs expanden.
   ============================================================ */
const Cordon8_Interoperabilidad = {

  ias: {
    claude:  { nombre: 'Claude AI',          url: 'https://claude.ai',               fortaleza: 'razonamiento, escritura, análisis' },
    copilot: { nombre: 'Microsoft Copilot',  url: 'https://copilot.microsoft.com',   fortaleza: 'productividad, Office, búsqueda' },
    gemini:  { nombre: 'Gemini',             url: 'https://gemini.google.com',       fortaleza: 'búsqueda, multimedia, Google' },
    chatgpt: { nombre: 'ChatGPT',            url: 'https://chat.openai.com',         fortaleza: 'generación de texto, código' }
  },

  // Qué IAs son más relevantes según el dominio
  recomendadas: {
    creacion:       ['claude', 'copilot'],
    estudio:        ['claude', 'gemini'],
    busqueda:       ['gemini', 'copilot'],
    transformacion: ['claude', 'chatgpt'],
    desarrollo:     ['chatgpt', 'claude'],
    productividad:  ['copilot', 'claude'],
    generico:       ['claude', 'copilot', 'gemini']
  },

  generarPrompt(accion, nivel, inputUsuario) {
    const prompts = {
      crear_documento:   `Ayúdame a crear un documento profesional sobre: "${inputUsuario}". Nivel de detalle: ${nivel}.`,
      buscar_info:       `Explícame de forma completa y estructurada: "${inputUsuario}". Nivel: ${nivel}.`,
      explicar_concepto: `Explica el concepto de "${inputUsuario}" con ejemplos reales. Nivel ${nivel}.`,
      estudiar:          `Crea una guía de estudio completa sobre "${inputUsuario}". Nivel ${nivel}.`,
      programar:         `Ayúdame a programar: "${inputUsuario}". Explica el código paso a paso.`,
      calcular:          `Ayúdame a calcular o gestionar: "${inputUsuario}". Muestra el proceso.`,
      traducir:          `Traduce y explica el contexto de: "${inputUsuario}".`,
      generico:          `Responde de forma completa y útil a: "${inputUsuario}".`
    };
    return prompts[accion] || prompts['generico'];
  },

  obtenerEnlaces(dominio) {
    const ids = this.recomendadas[dominio] || ['claude', 'copilot'];
    return ids.map(id => ({
      nombre: `→ ${this.ias[id].nombre}`,
      url:    this.ias[id].url
    }));
  }
};


/* ============================================================
   CORDÓN 9 — MOTOR DE INTEGRACIÓN TOTAL
   Pipeline completo. Une los 9 cordones.
   Produce el contexto final para la IA y la interfaz.
   ============================================================ */
const Cordon9_Integracion = {

  async integrar(inputUsuario) {

    // C1 — Detectar intención
    const accion  = Cordon1_Intencion.detectar(inputUsuario);

    // C2 — Detectar nivel cognitivo
    const nivel   = Cordon2_Cognitivo.detectar(inputUsuario);

    // C3 — Clasificar dominio
    const dominio = Cordon3_Dominio.clasificar(accion);

    // C4 — Obtener herramientas
    const herramientas = Cordon4_Herramientas.obtener(accion);

    // C5 — Definir transformación
    const transformacion = Cordon5_Transformacion.obtener(accion);

    // C6 — Definir formato de presentación
    const formato = Cordon6_Presentacion.obtener(dominio);

    // C7 — Evaluar módulos adicionales
    const modulosExtra = Cordon7_Expansion.evaluar(accion);

    // C8 — Preparar interoperabilidad IA
    const enlacesIA  = Cordon8_Interoperabilidad.obtenerEnlaces(dominio);
    const promptIA   = Cordon8_Interoperabilidad.generarPrompt(accion, nivel, inputUsuario);

    // C9 — Construir contexto completo para la IA
    const contexto = {
      inputUsuario,
      accion,
      nivel,
      dominio,
      herramientas,
      transformacion,
      formato,
      modulosExtra,
      enlacesIA,
      promptIA
    };

    // Llamar a la IA con el contexto completo de los 9 cordones
    const respuestaIA = await Cordon9_Integracion.llamarIA(contexto);

    return {
      ...contexto,
      respuestaIA
    };
  },

  async llamarIA(contexto) {

    const systemPrompt = `Eres el motor cognitivo de Nexus‑9D, un sistema operativo cognitivo dimensional creado por Asdrúbal.

Tu arquitectura se basa en 9 cordones funcionales. El sistema ya ha procesado la entrada del usuario y te entrega el siguiente contexto:

- Acción detectada: ${contexto.accion}
- Nivel cognitivo: ${contexto.nivel} (${Cordon2_Cognitivo.niveles[contexto.nivel]?.descripcion})
- Dominio: ${contexto.dominio}
- Tipo de transformación: ${contexto.transformacion.tipo}
- Instrucción de transformación: ${contexto.transformacion.instruccion}
- Formato de presentación: ${contexto.formato}

Tu tarea es generar la respuesta final. Responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional, sin markdown, sin bloques de código. Solo el JSON puro.

Estructura obligatoria:
{
  "titulo": "TÍTULO EN MAYÚSCULAS (máximo 8 palabras)",
  "niveles": {
    "n1": "Explicación nivel infantil. Máximo 2 frases simples.",
    "n2": "Explicación básica para adulto. Máximo 3 frases claras.",
    "n3": "Explicación técnica con terminología. Máximo 4 frases.",
    "n4": "Explicación experta con conceptos avanzados. Máximo 5 frases."
  },
  "promptIA": "Una frase invitando a profundizar con IA externa",
  "promptTexto": "\\"El prompt exacto que el usuario puede copiar y usar\\""
}

Reglas:
- Responde siempre en español
- El nivel activo es ${contexto.nivel}, pero genera todos los niveles
- Aplica la transformación: ${contexto.transformacion.instruccion}
- JSON perfectamente válido`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: "user", content: contexto.inputUsuario }]
      })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const rawText = data.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('')
      .trim()
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    return JSON.parse(rawText);
  }
};


/* ============================================================
   EXPORTAR — Los 9 cordones disponibles globalmente
   ============================================================ */
window.Nexus9D = {
  C1: Cordon1_Intencion,
  C2: Cordon2_Cognitivo,
  C3: Cordon3_Dominio,
  C4: Cordon4_Herramientas,
  C5: Cordon5_Transformacion,
  C6: Cordon6_Presentacion,
  C7: Cordon7_Expansion,
  C8: Cordon8_Interoperabilidad,
  C9: Cordon9_Integracion,

  // Punto de entrada principal del sistema
  async procesar(input) {
    return await Cordon9_Integracion.integrar(input);
  }
};

console.log('%c⟡ NEXUS‑9D CORE CARGADO', 'color:#00d4ff; font-weight:bold; font-size:14px;');
console.log('%cLos 9 cordones están activos. Sistema listo.', 'color:#00ff9d; font-size:11px;');
