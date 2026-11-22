// ==============================================================
// LÓGICA PRINCIPAL - APLICACIÓN DE PREPARACIÓN TÉCNICA CUC
// ==============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Estado general de la aplicación
  const state = {
    currentMainMode: "teoria", // 'teoria', 'practica', 'simulador', 'flashcards'
    activeTheoryModuleId: THEORY_DATA.modulos[0].id,
    activePracticeSubtab: "logica", // 'logica', 'sql', 'web', 'git', 'ia'
    
    // Lógica y Algoritmos
    activeCodingId: PRACTICE_DATA.coding[0].id,
    codingLanguage: "js", // 'js' o 'py'
    userCodingDrafts: JSON.parse(localStorage.getItem("cuc_coding_drafts_v2") || "{}"),
    completedCodingIds: JSON.parse(localStorage.getItem("cuc_completed_coding_v2") || "[]"),
    failedCodingIds: JSON.parse(localStorage.getItem("cuc_failed_coding_v2") || "[]"),
    
    // SQL
    activeSqlId: PRACTICE_DATA.sql[0].id,
    userSqlDrafts: JSON.parse(localStorage.getItem("cuc_sql_drafts_v2") || "{}"),
    completedSqlIds: JSON.parse(localStorage.getItem("cuc_completed_sql_v2") || "[]"),
    failedSqlIds: JSON.parse(localStorage.getItem("cuc_failed_sql_v2") || "[]"),

    // Quizzes (Web, Git, IA)
    quizAnswers: JSON.parse(localStorage.getItem("cuc_quiz_answers_v2") || "{}"), // { 'web_1': { selected: 1, correct: true } }

    // Flashcards
    currentFlashcardIdx: 0,
    isCardFlipped: false,
    flashcardFilter: "Todas",

    // Temporizador
    timerMinutes: 45,
    timerSeconds: 0,
    timerRunning: false,
    timerInterval: null
  };

  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function playSuccessSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {}
  }

  // --- NAVEGACIÓN PRINCIPAL (MODOS) ---
  const mainModeBtns = {
    teoria: document.getElementById("nav-btn-teoria"),
    practica: document.getElementById("nav-btn-practica"),
    simulador: document.getElementById("nav-btn-simulador"),
    flashcards: document.getElementById("nav-btn-flashcards")
  };

  const mainViews = {
    teoria: document.getElementById("view-teoria"),
    practica: document.getElementById("view-practica"),
    simulador: document.getElementById("view-simulador"),
    flashcards: document.getElementById("view-flashcards")
  };

  function switchMainMode(mode) {
    state.currentMainMode = mode;

    Object.keys(mainModeBtns).forEach((key) => {
      const btn = mainModeBtns[key];
      const view = mainViews[key];
      const isActive = key === mode;

      if (btn) {
        btn.classList.toggle("active", isActive);
        btn.classList.toggle("bg-red-900/60", isActive);
        btn.classList.toggle("text-amber-300", isActive);
        btn.classList.toggle("border-b-2", isActive);
        btn.classList.toggle("border-amber-300", isActive);
        btn.classList.toggle("text-red-100", !isActive);
      }

      if (view) {
        view.classList.toggle("hidden", !isActive);
      }
    });

    if (mode === "teoria") {
      renderTheorySection();
    } else if (mode === "practica") {
      switchPracticeSubtab(state.activePracticeSubtab);
    } else if (mode === "simulador") {
      renderInterviewSimulator();
    } else if (mode === "flashcards") {
      renderFlashcards();
    }

    updateGlobalProgressBar();
    refreshIcons();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (mainModeBtns.teoria) mainModeBtns.teoria.addEventListener("click", () => switchMainMode("teoria"));
  if (mainModeBtns.practica) mainModeBtns.practica.addEventListener("click", () => switchMainMode("practica"));
  if (mainModeBtns.simulador) mainModeBtns.simulador.addEventListener("click", () => switchMainMode("simulador"));
  if (mainModeBtns.flashcards) mainModeBtns.flashcards.addEventListener("click", () => switchMainMode("flashcards"));

  const btnIrPracticar = document.getElementById("btn-ir-a-practicar");
  if (btnIrPracticar) {
    btnIrPracticar.addEventListener("click", () => switchMainMode("practica"));
  }

  // --- SECCIÓN TEÓRICA (MANUAL DE ESTUDIO 8 MÓDULOS) ---
  function renderTheorySection() {
    const navContainer = document.getElementById("theory-modules-nav");
    const contentBody = document.getElementById("theory-content-body");
    if (!navContainer || !contentBody) return;

    navContainer.innerHTML = THEORY_DATA.modulos.map((mod) => {
      const isActive = mod.id === state.activeTheoryModuleId;
      return `
        <button data-mod-id="${mod.id}" class="theory-mod-btn w-full text-left p-3 rounded-xl border transition flex items-start gap-3 ${
        isActive
          ? "bg-red-50 border-red-500 shadow-sm"
          : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
      }">
          <div class="w-8 h-8 rounded-lg ${isActive ? "bg-red-600 text-white" : "bg-slate-100 text-slate-600"} flex items-center justify-center shrink-0 mt-0.5">
            <i data-lucide="${mod.icono}" class="w-4 h-4"></i>
          </div>
          <div>
            <div class="font-bold text-xs ${isActive ? "text-red-950" : "text-slate-900"}">${mod.titulo}</div>
            <div class="text-[11px] text-slate-500 line-clamp-2 mt-0.5">${mod.descripcion}</div>
          </div>
        </button>
      `;
    }).join("");

    navContainer.querySelectorAll(".theory-mod-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeTheoryModuleId = btn.dataset.modId;
        renderTheorySection();
      });
    });

    const mod = THEORY_DATA.modulos.find((m) => m.id === state.activeTheoryModuleId) || THEORY_DATA.modulos[0];
    contentBody.innerHTML = `
      <div class="border-b pb-4 mb-6">
        <span class="text-xs font-bold text-red-600 uppercase tracking-wide">Manual Técnico CUC • ${THEORY_DATA.modulos.indexOf(mod) + 1} de ${THEORY_DATA.modulos.length}</span>
        <h2 class="text-2xl font-black text-slate-900 mt-1">${mod.titulo}</h2>
        <p class="text-xs text-slate-600 mt-1">${mod.descripcion}</p>
      </div>

      <div class="space-y-6">
        ${mod.secciones.map((sec) => `
          <div class="p-5 bg-slate-50/70 border border-slate-200 rounded-2xl">
            <h3 class="text-base font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-200/80 pb-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-600"></span>
              ${sec.subtitulo}
            </h3>
            <div class="prose max-w-none text-slate-700">
              ${sec.contenido}
            </div>
          </div>
        `).join("")}
      </div>
    `;

    refreshIcons();
  }

  // --- SECCIÓN PRÁCTICA: SUB-PESTAÑAS ---
  const practiceSubtabBtns = document.querySelectorAll(".practice-subtab-btn");
  const practiceSubpanels = {
    logica: document.getElementById("practice-panel-logica"),
    sql: document.getElementById("practice-panel-sql"),
    web: document.getElementById("practice-panel-web"),
    git: document.getElementById("practice-panel-git"),
    ia: document.getElementById("practice-panel-ia")
  };

  function switchPracticeSubtab(tab) {
    state.activePracticeSubtab = tab;

    practiceSubtabBtns.forEach((btn) => {
      const active = btn.dataset.practiceSub === tab;
      btn.classList.toggle("active", active);
      btn.classList.toggle("bg-red-700", active);
      btn.classList.toggle("text-white", active);
      btn.classList.toggle("text-slate-700", !active);
    });

    Object.keys(practiceSubpanels).forEach((k) => {
      if (practiceSubpanels[k]) {
        practiceSubpanels[k].classList.toggle("hidden", k !== tab);
      }
    });

    if (tab === "logica") {
      renderCodingPractice();
    } else if (tab === "sql") {
      renderSqlPractice();
    } else if (tab === "web") {
      renderWebPractice();
    } else if (tab === "git") {
      renderGitPractice();
    } else if (tab === "ia") {
      renderIaPractice();
    }

    refreshIcons();
  }

  practiceSubtabBtns.forEach((btn) => {
    btn.addEventListener("click", () => switchPracticeSubtab(btn.dataset.practiceSub));
  });

  // --- SUBSECCIÓN: LÓGICA Y ALGORITMOS (25 RETOS CON TABLERO LIMPIO) ---
  function updateCodingScoreboard() {
    const buenas = state.completedCodingIds.length;
    const malas = state.failedCodingIds.length;
    const total = PRACTICE_DATA.coding.length;
    const scoreboard = document.getElementById("coding-scoreboard");
    if (scoreboard) {
      scoreboard.innerHTML = `
        <div class="flex flex-wrap items-center gap-3 text-xs font-semibold">
          <span class="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg flex items-center gap-1">
            <i data-lucide="check" class="w-3.5 h-3.5"></i> Buenas: <strong>${buenas}</strong>
          </span>
          <span class="px-2.5 py-1 bg-red-100 text-red-800 rounded-lg flex items-center gap-1">
            <i data-lucide="x" class="w-3.5 h-3.5"></i> Con Errores: <strong>${malas}</strong>
          </span>
          <span class="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
            Total Retos: <strong>${total}</strong>
          </span>
        </div>
      `;
    }
  }

  function updateCodingSidebarList() {
    const listContainer = document.getElementById("practice-challenges-list");
    const countEl = document.getElementById("practice-completed-count");
    if (countEl) {
      countEl.textContent = `${state.completedCodingIds.length} / ${PRACTICE_DATA.coding.length} resueltos`;
    }
    updateCodingScoreboard();
    if (!listContainer) return;

    listContainer.innerHTML = PRACTICE_DATA.coding.map((ch) => {
      const isDone = state.completedCodingIds.includes(ch.id);
      const isFailed = state.failedCodingIds.includes(ch.id);
      const isActive = ch.id === state.activeCodingId;
      return `
        <button data-id="${ch.id}" class="coding-item w-full text-left p-2.5 rounded-lg border text-xs transition flex items-center justify-between ${
        isActive
          ? "bg-red-50 border-red-500 font-bold text-red-950 shadow-xs"
          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
      }">
          <div class="flex items-center gap-2 truncate">
            <span class="w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
              isDone ? "bg-emerald-500 text-white" : isFailed ? "bg-red-500 text-white" : "bg-slate-200 text-slate-500"
            }">${isDone ? "✓" : isFailed ? "✕" : ""}</span>
            <span class="truncate">${ch.titulo}</span>
          </div>
          <span class="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
            ch.dificultad === "Fácil" ? "bg-emerald-100 text-emerald-800" : ch.dificultad === "Media" ? "bg-amber-100 text-amber-800" : "bg-purple-100 text-purple-800"
          }">${ch.dificultad}</span>
        </button>
      `;
    }).join("");

    listContainer.querySelectorAll(".coding-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeCodingId = btn.dataset.id;
        renderCodingPractice();
      });
    });
  }

  function renderCodingPractice() {
    const tituloEl = document.getElementById("reto-titulo");
    const descEl = document.getElementById("reto-desc");
    const catEl = document.getElementById("reto-categoria");
    const difEl = document.getElementById("reto-dificultad");
    const pistasEl = document.getElementById("reto-pistas");
    const editor = document.getElementById("reto-editor-area");
    const solucionCode = document.getElementById("reto-solucion-code");
    const solucionBox = document.getElementById("reto-solucion-box");
    const feedbackArea = document.getElementById("reto-feedback-area");
    const extLabel = document.getElementById("file-ext-label");

    updateCodingSidebarList();

    const ch = PRACTICE_DATA.coding.find((c) => c.id === state.activeCodingId) || PRACTICE_DATA.coding[0];
    if (!ch) return;

    tituloEl.textContent = ch.titulo;
    descEl.textContent = ch.descripcion;
    catEl.textContent = ch.categoria;
    difEl.textContent = ch.dificultad;
    difEl.className = `text-xs font-semibold px-2 py-0.5 rounded-full ${
      ch.dificultad === "Fácil" ? "bg-emerald-100 text-emerald-800" : ch.dificultad === "Media" ? "bg-amber-100 text-amber-800" : "bg-purple-100 text-purple-800"
    }`;

    pistasEl.innerHTML = ch.pistas.map((p, i) => `
      <li class="mb-1"><strong>Pista ${i + 1}:</strong> ${p}</li>
    `).join("");

    if (solucionBox) solucionBox.classList.add("hidden");
    
    // Solución explicada tanto en JS como en Python
    if (solucionCode) {
      solucionCode.innerHTML = `
<span class="text-emerald-400 font-bold block mb-1">// Solución en JavaScript:</span>
${ch.solucionExplicadaJs}

<span class="text-amber-400 font-bold block mt-3 mb-1"># Solución en Python:</span>
${ch.solucionExplicadaPy}
      `;
    }

    // Tablero completamente limpio sin soluciones pre-hechas
    const draftKey = `${ch.id}_${state.codingLanguage}`;
    const defaultTemplate = state.codingLanguage === "js" ? ch.defaultTemplateJs : ch.defaultTemplatePy;
    editor.value = state.userCodingDrafts[draftKey] !== undefined ? state.userCodingDrafts[draftKey] : defaultTemplate;

    if (extLabel) extLabel.textContent = state.codingLanguage;

    feedbackArea.innerHTML = `
      <div class="text-xs text-slate-500 italic p-3 bg-slate-50 rounded border border-slate-200">
        El tablero está listo y en blanco. Escribe tu código y haz clic en <strong>"Probar y Calificar Solución"</strong>.
      </div>
    `;

    refreshIcons();
  }

  // Cambio de lenguaje (JS / Python)
  const btnLangJs = document.getElementById("reto-lang-js");
  const btnLangPy = document.getElementById("reto-lang-py");

  if (btnLangJs && btnLangPy) {
    btnLangJs.addEventListener("click", () => {
      state.codingLanguage = "js";
      btnLangJs.classList.add("bg-red-700", "text-white");
      btnLangJs.classList.remove("text-slate-600");
      btnLangPy.classList.remove("bg-red-700", "text-white");
      btnLangPy.classList.add("text-slate-600");
      renderCodingPractice();
    });

    btnLangPy.addEventListener("click", () => {
      state.codingLanguage = "py";
      btnLangPy.classList.add("bg-red-700", "text-white");
      btnLangPy.classList.remove("text-slate-600");
      btnLangJs.classList.remove("bg-red-700", "text-white");
      btnLangJs.classList.add("text-slate-600");
      renderCodingPractice();
    });
  }

  // Botón Limpiar Tablero (Limpia 100% el tablero)
  const btnLimpiar = document.getElementById("btn-limpiar-tablero");
  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", () => {
      const editor = document.getElementById("reto-editor-area");
      editor.value = "";
      const draftKey = `${state.activeCodingId}_${state.codingLanguage}`;
      delete state.userCodingDrafts[draftKey];
      localStorage.setItem("cuc_coding_drafts_v2", JSON.stringify(state.userCodingDrafts));
      editor.focus();
    });
  }

  // Revelar Solución
  const btnRevelar = document.getElementById("btn-revelar-solucion");
  if (btnRevelar) {
    btnRevelar.addEventListener("click", () => {
      const box = document.getElementById("reto-solucion-box");
      box.classList.toggle("hidden");
      btnRevelar.innerHTML = box.classList.contains("hidden")
        ? `<i data-lucide="eye" class="w-3.5 h-3.5"></i> Ver Solución Explicada (JS & Python)`
        : `<i data-lucide="eye-off" class="w-3.5 h-3.5"></i> Ocultar Solución`;
      refreshIcons();
    });
  }

  // Evaluador & Corrector
  const btnProbar = document.getElementById("btn-probar-reto");
  if (btnProbar) {
    btnProbar.addEventListener("click", () => {
      const ch = PRACTICE_DATA.coding.find((c) => c.id === state.activeCodingId);
      const editor = document.getElementById("reto-editor-area");
      const feedback = document.getElementById("reto-feedback-area");
      const userCode = editor.value.trim();

      const draftKey = `${ch.id}_${state.codingLanguage}`;
      state.userCodingDrafts[draftKey] = editor.value;
      localStorage.setItem("cuc_coding_drafts_v2", JSON.stringify(state.userCodingDrafts));

      if (!userCode) {
        feedback.innerHTML = `
          <div class="p-3 bg-amber-50 border border-amber-300 rounded-lg text-xs text-amber-900">
            ⚠️ <strong>Tablero vacío:</strong> Escribe tu propia lógica dentro de la función antes de calificar.
          </div>
        `;
        return;
      }

      feedback.innerHTML = `<div class="p-3 text-xs text-slate-600">⏳ Evaluando casos de prueba y verificando corrección...</div>`;

      setTimeout(() => {
        if (state.codingLanguage === "js") {
          let allPassed = true;
          let testResultsHtml = "";
          let failExplanation = "";

          try {
            for (let i = 0; i < ch.tests.length; i++) {
              const test = ch.tests[i];
              let passed = false;
              let actualResult = undefined;
              let caughtError = null;

              try {
                if (test.customRunner) {
                  passed = test.customRunner(userCode);
                  actualResult = passed ? "Comportamiento validado" : "Fallo en validación";
                } else {
                  const fnName = test.label.split("(")[0].trim();
                  const runWrapper = new Function(
                    `
                    ${userCode}
                    if (typeof ${fnName} === 'function') {
                      return ${fnName}.apply(null, ${JSON.stringify(test.input)});
                    }
                    throw new Error("No se encontró la función '${fnName}'. Asegúrate de no cambiarle el nombre.");
                    `
                  );
                  actualResult = runWrapper();
                  passed = JSON.stringify(actualResult) === JSON.stringify(test.expected);
                }
              } catch (err) {
                caughtError = err.message;
                passed = false;
              }

              if (!passed) {
                allPassed = false;
                if (!failExplanation) {
                  if (caughtError) {
                    failExplanation = `<strong>Error de ejecución:</strong> ${caughtError}`;
                  } else if (actualResult === undefined) {
                    failExplanation = `<strong>Diagnóstico de corrección:</strong> Tu función retornó <code class="bg-red-100 px-1 rounded">undefined</code>. Recuerda colocar la sentencia <code class="bg-red-100 px-1 rounded font-bold">return</code> para devolver el resultado.`;
                  } else {
                    failExplanation = `<strong>Diagnóstico de corrección:</strong> Para la entrada <code class="bg-red-100 px-1 rounded">${JSON.stringify(test.input)}</code>, tu código produjo <code class="bg-red-100 px-1 rounded">${JSON.stringify(actualResult)}</code>, pero la respuesta esperada era <code class="bg-emerald-100 px-1 rounded text-emerald-900 font-bold">${JSON.stringify(test.expected)}</code>.`;
                  }
                }
              }

              testResultsHtml += `
                <div class="p-2.5 rounded-lg border mb-1.5 text-xs flex items-center justify-between ${
                  passed ? "bg-emerald-50 border-emerald-300 text-emerald-900" : "bg-red-50 border-red-300 text-red-900"
                }">
                  <span>${passed ? "✅ Caso superado:" : "❌ Caso fallido:"} ${test.label}</span>
                  <span class="font-bold font-mono text-[11px]">${passed ? "OK" : "ERROR"}</span>
                </div>
              `;
            }

            if (allPassed) {
              playSuccessSound();
              if (!state.completedCodingIds.includes(ch.id)) {
                state.completedCodingIds.push(ch.id);
                localStorage.setItem("cuc_completed_coding_v2", JSON.stringify(state.completedCodingIds));
              }
              // Quitar de fallidos si ya lo pasó
              state.failedCodingIds = state.failedCodingIds.filter(id => id !== ch.id);
              localStorage.setItem("cuc_failed_coding_v2", JSON.stringify(state.failedCodingIds));

              feedback.innerHTML = `
                <div class="p-4 bg-emerald-50 border border-emerald-300 rounded-xl mb-3 text-emerald-900 text-xs">
                  <div class="font-bold text-sm flex items-center gap-1.5 mb-1">
                    🎉 ¡Solución Perfecta! Todos los casos de prueba superados.
                  </div>
                  <p class="leading-relaxed">
                    Tu código cumple al 100% con los requerimientos de la prueba técnica de la CUC.
                  </p>
                </div>
                <div>${testResultsHtml}</div>
              `;
            } else {
              if (!state.failedCodingIds.includes(ch.id)) {
                state.failedCodingIds.push(ch.id);
                localStorage.setItem("cuc_failed_coding_v2", JSON.stringify(state.failedCodingIds));
              }

              feedback.innerHTML = `
                <div class="p-4 bg-red-50 border border-red-300 rounded-xl mb-3 text-red-900 text-xs">
                  <div class="font-bold text-sm flex items-center gap-1.5 mb-1">
                    🔍 Corrección Requerida:
                  </div>
                  <p class="leading-relaxed mb-2">${failExplanation}</p>
                  <p class="text-[11px] text-red-700 italic">
                    Corrige tu código en el tablero y vuelve a probar. También puedes consultar la solución explicada en JS y Python con el botón superior.
                  </p>
                </div>
                <div>${testResultsHtml}</div>
              `;
            }
          } catch (globalErr) {
            feedback.innerHTML = `
              <div class="p-4 bg-red-50 border border-red-300 rounded-xl text-red-900 text-xs">
                <strong>Error de sintaxis en el código:</strong> ${globalErr.message}
              </div>
            `;
          }
        } else {
          // Modo Python
          feedback.innerHTML = `
            <div class="p-4 bg-amber-50 border border-amber-300 rounded-xl text-amber-950 text-xs">
              <div class="font-bold text-sm mb-1">🐍 Modo Python (Validación de Estructura):</div>
              <p class="mb-2">Tu código Python ha sido guardado exitosamente. En la prueba presencial de la CUC revisarán sintaxis, complejidad Big-O y nombres descriptivos.</p>
              <div class="flex justify-between items-center mt-3 pt-2 border-t border-amber-200">
                <span class="text-xs text-slate-600">¿Tu solución resuelve todos los casos descritos?</span>
                <button id="btn-marcar-py-ok" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold transition">
                  Marcar como Resuelto
                </button>
              </div>
            </div>
          `;

          const btnPyOk = document.getElementById("btn-marcar-py-ok");
          if (btnPyOk) {
            btnPyOk.addEventListener("click", () => {
              if (!state.completedCodingIds.includes(ch.id)) {
                state.completedCodingIds.push(ch.id);
                localStorage.setItem("cuc_completed_coding_v2", JSON.stringify(state.completedCodingIds));
                playSuccessSound();
                updateCodingSidebarList();
                updateGlobalProgressBar();
              }
            });
          }
        }

        updateCodingSidebarList();
        updateGlobalProgressBar();
        refreshIcons();
      }, 250);
    });
  }

  // --- SUBSECCIÓN: SQL (25 RETOS CON TABLERO LIMPIO) ---
  function updateSqlScoreboard() {
    const buenas = state.completedSqlIds.length;
    const malas = state.failedSqlIds.length;
    const total = PRACTICE_DATA.sql.length;
    const scoreboard = document.getElementById("sql-scoreboard");
    if (scoreboard) {
      scoreboard.innerHTML = `
        <div class="flex flex-wrap items-center gap-3 text-xs font-semibold">
          <span class="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg flex items-center gap-1">
            <i data-lucide="check" class="w-3.5 h-3.5"></i> Consultas Correctas: <strong>${buenas}</strong>
          </span>
          <span class="px-2.5 py-1 bg-red-100 text-red-800 rounded-lg flex items-center gap-1">
            <i data-lucide="x" class="w-3.5 h-3.5"></i> Con Errores: <strong>${malas}</strong>
          </span>
          <span class="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
            Total Ejercicios SQL: <strong>${total}</strong>
          </span>
        </div>
      `;
    }
  }

  function updateSqlChallengeButtons() {
    const btnContainer = document.getElementById("sql-challenge-buttons");
    updateSqlScoreboard();
    if (!btnContainer) return;

    btnContainer.innerHTML = PRACTICE_DATA.sql.map((sq) => {
      const isDone = state.completedSqlIds.includes(sq.id);
      const isFailed = state.failedSqlIds.includes(sq.id);
      const isActive = sq.id === state.activeSqlId;
      return `
        <button data-sql-id="${sq.id}" class="sql-btn px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition ${
        isActive
          ? "bg-red-700 text-white border-red-700 font-bold shadow-xs"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
      }">
          ${isDone ? "✓ " : isFailed ? "✕ " : ""}${sq.titulo}
        </button>
      `;
    }).join("");

    btnContainer.querySelectorAll(".sql-btn").forEach((b) => {
      b.addEventListener("click", () => {
        state.activeSqlId = b.dataset.sqlId;
        renderSqlPractice();
      });
    });
  }

  function renderSqlPractice() {
    const tituloEl = document.getElementById("sql-reto-titulo");
    const enunciadoEl = document.getElementById("sql-reto-enunciado");
    const editor = document.getElementById("sql-editor-area");
    const solucionText = document.getElementById("sql-solucion-text");
    const solucionBox = document.getElementById("sql-solucion-box");
    const feedbackBox = document.getElementById("sql-feedback-container");

    updateSqlChallengeButtons();

    const sq = PRACTICE_DATA.sql.find((s) => s.id === state.activeSqlId) || PRACTICE_DATA.sql[0];
    if (!sq) return;

    tituloEl.textContent = sq.titulo;
    enunciadoEl.textContent = sq.enunciado;
    if (solucionText) solucionText.textContent = sq.solucion;
    if (solucionBox) solucionBox.classList.add("hidden");

    // Tablero en blanco
    editor.value = state.userSqlDrafts[sq.id] !== undefined ? state.userSqlDrafts[sq.id] : "";

    feedbackBox.innerHTML = `
      <div class="text-xs text-slate-500 italic p-3 bg-slate-50 rounded border border-slate-200">
        Escribe tu consulta SQL en el tablero y pulsa <strong>"Ejecutar y Validar Consulta"</strong>.
      </div>
    `;

    refreshIcons();
  }

  // Limpiar SQL (100% limpio)
  const btnLimpiarSql = document.getElementById("btn-limpiar-sql");
  if (btnLimpiarSql) {
    btnLimpiarSql.addEventListener("click", () => {
      const editor = document.getElementById("sql-editor-area");
      editor.value = "";
      delete state.userSqlDrafts[state.activeSqlId];
      localStorage.setItem("cuc_sql_drafts_v2", JSON.stringify(state.userSqlDrafts));
      editor.focus();
    });
  }

  // Ver solución SQL
  const btnVerSql = document.getElementById("btn-ver-solucion-sql");
  if (btnVerSql) {
    btnVerSql.addEventListener("click", () => {
      const box = document.getElementById("sql-solucion-box");
      box.classList.toggle("hidden");
      btnVerSql.innerHTML = box.classList.contains("hidden")
        ? `<i data-lucide="eye" class="w-3.5 h-3.5"></i> Ver Consulta Modelo`
        : `<i data-lucide="eye-off" class="w-3.5 h-3.5"></i> Ocultar Consulta`;
      refreshIcons();
    });
  }

  // Ejecutar y Validar SQL
  const btnRunSql = document.getElementById("btn-ejecutar-sql");
  if (btnRunSql) {
    btnRunSql.addEventListener("click", () => {
      const sq = PRACTICE_DATA.sql.find((s) => s.id === state.activeSqlId);
      const editor = document.getElementById("sql-editor-area");
      const feedback = document.getElementById("sql-feedback-container");
      const query = editor.value.trim().toUpperCase();

      state.userSqlDrafts[sq.id] = editor.value;
      localStorage.setItem("cuc_sql_drafts_v2", JSON.stringify(state.userSqlDrafts));

      if (!query) {
        feedback.innerHTML = `
          <div class="p-3 bg-amber-50 border border-amber-300 rounded text-xs text-amber-900">
            ⚠️ <strong>Tablero vacío:</strong> Escribe tu propia consulta SQL antes de ejecutar.
          </div>
        `;
        return;
      }

      const isCorrect = sq.criterio(query);

      if (isCorrect) {
        playSuccessSound();
        if (!state.completedSqlIds.includes(sq.id)) {
          state.completedSqlIds.push(sq.id);
          localStorage.setItem("cuc_completed_sql_v2", JSON.stringify(state.completedSqlIds));
        }
        state.failedSqlIds = state.failedSqlIds.filter(id => id !== sq.id);
        localStorage.setItem("cuc_failed_sql_v2", JSON.stringify(state.failedSqlIds));

        feedback.innerHTML = `
          <div class="p-4 bg-emerald-50 border border-emerald-300 rounded-xl mb-3 text-emerald-900 text-xs">
            <div class="font-bold text-sm mb-1">🎉 ¡Consulta SQL Correcta!</div>
            <p>Tu consulta cumple con las cláusulas requeridas para este ejercicio en la base de datos de la CUC.</p>
          </div>
        `;
      } else {
        if (!state.failedSqlIds.includes(sq.id)) {
          state.failedSqlIds.push(sq.id);
          localStorage.setItem("cuc_failed_sql_v2", JSON.stringify(state.failedSqlIds));
        }

        feedback.innerHTML = `
          <div class="p-4 bg-red-50 border border-red-300 rounded-xl mb-3 text-red-900 text-xs">
            <div class="font-bold text-sm mb-1">🔍 Corrección SQL:</div>
            <p class="mb-1">${sq.explicacion}</p>
            <p class="text-[11px] text-red-700 italic">Revisa si incluiste las cláusulas requeridas (JOIN, GROUP BY, WHERE o HAVING según el enunciado).</p>
          </div>
        `;
      }

      updateSqlChallengeButtons();
      updateGlobalProgressBar();
      refreshIcons();
    });
  }

  // --- SUBSECCIONES WEB, GIT, IA QUIZZES (25 CASOS CADA UNO) ---
  function renderQuizCategory(containerId, scoreboardId, items, categoryKey) {
    const container = document.getElementById(containerId);
    const scoreboard = document.getElementById(scoreboardId);
    if (!container) return;

    // Calcular puntajes para esta categoría
    let correctCount = 0;
    let wrongCount = 0;
    items.forEach((q, idx) => {
      const key = `${categoryKey}_${idx}`;
      if (state.quizAnswers[key] !== undefined) {
        if (state.quizAnswers[key].correct) correctCount++;
        else wrongCount++;
      }
    });

    if (scoreboard) {
      scoreboard.innerHTML = `
        <div class="flex flex-wrap items-center gap-3 text-xs font-semibold mb-4 p-3 bg-white rounded-xl border">
          <span class="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg flex items-center gap-1">
            <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-700"></i> Aciertos: <strong>${correctCount}</strong>
          </span>
          <span class="px-2.5 py-1 bg-red-100 text-red-900 rounded-lg flex items-center gap-1">
            <i data-lucide="x" class="w-3.5 h-3.5 text-red-700"></i> Fallos: <strong>${wrongCount}</strong>
          </span>
          <span class="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg">
            Total Casos: <strong>${items.length}</strong>
          </span>
          <span class="text-slate-500 ml-auto">
            Efectividad: <strong>${correctCount + wrongCount > 0 ? Math.round((correctCount / (correctCount + wrongCount)) * 100) : 0}%</strong>
          </span>
        </div>
      `;
    }

    container.innerHTML = items.map((q, idx) => {
      const key = `${categoryKey}_${idx}`;
      const savedAns = state.quizAnswers[key];

      return `
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl mb-3">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold text-red-700 uppercase tracking-wide">Caso ${idx + 1} de ${items.length}</span>
            ${savedAns ? `
              <span class="text-xs font-bold px-2 py-0.5 rounded ${savedAns.correct ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}">
                ${savedAns.correct ? '✓ Correcto' : '✕ Incorrecto'}
              </span>
            ` : ''}
          </div>
          <h4 class="font-bold text-sm text-slate-900 mb-2">${q.titulo}</h4>
          <p class="text-xs text-slate-700 mb-3 bg-white p-2.5 rounded border border-slate-200">${q.escenario}</p>
          
          <div class="space-y-1.5 mb-3">
            ${q.opciones.map((op, oIdx) => {
              const isSelected = savedAns && savedAns.selected === oIdx;
              const isCorrectOpt = oIdx === q.correcta;
              let btnClass = "bg-white text-slate-800 border-slate-200 hover:bg-slate-100";
              if (savedAns) {
                if (isCorrectOpt) {
                  btnClass = "bg-emerald-50 border-emerald-500 font-bold text-emerald-950";
                } else if (isSelected && !savedAns.correct) {
                  btnClass = "bg-red-50 border-red-500 font-bold text-red-950";
                }
              }

              return `
                <button data-cat="${categoryKey}" data-q-idx="${idx}" data-op-idx="${oIdx}" class="quiz-option-btn w-full text-left p-2.5 rounded-lg border text-xs transition ${btnClass}">
                  ${op}
                </button>
              `;
            }).join("")}
          </div>

          <div id="quiz-ans-${categoryKey}-${idx}" class="${savedAns ? '' : 'hidden'} p-3 rounded-lg text-xs border ${
            savedAns ? (savedAns.correct ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-red-50 border-red-300 text-red-950') : ''
          }">
            ${savedAns ? `
              <strong>${savedAns.correct ? '✅ ¡Respuesta Correcta!' : '❌ Explicación y Corrección:'}</strong><br/>
              <span class="mt-1 block">${q.explicacion}</span>
            ` : ''}
          </div>
        </div>
      `;
    }).join("");

    container.querySelectorAll(".quiz-option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cat = btn.dataset.cat;
        const qIdx = parseInt(btn.dataset.qIdx, 10);
        const opIdx = parseInt(btn.dataset.opIdx, 10);
        const q = items[qIdx];
        const key = `${cat}_${qIdx}`;

        const isCorrect = opIdx === q.correcta;
        if (isCorrect) playSuccessSound();

        state.quizAnswers[key] = {
          selected: opIdx,
          correct: isCorrect
        };
        localStorage.setItem("cuc_quiz_answers_v2", JSON.stringify(state.quizAnswers));

        // Re-renderizar para actualizar estados y colores
        renderQuizCategory(containerId, scoreboardId, items, categoryKey);
        updateGlobalProgressBar();
        refreshIcons();
      });
    });
  }

  function renderWebPractice() {
    renderQuizCategory("web-quiz-container", "web-scoreboard", PRACTICE_DATA.web, "web");
  }

  function renderGitPractice() {
    renderQuizCategory("git-quiz-container", "git-scoreboard", PRACTICE_DATA.git, "git");
  }

  function renderIaPractice() {
    renderQuizCategory("ia-quiz-container", "ia-scoreboard", PRACTICE_DATA.ia, "ia");
  }

  // --- MODO SIMULADOR ORAL (25 PREGUNTAS) ---
  function renderInterviewSimulator() {
    const container = document.getElementById("simulador-questions-list");
    if (!container) return;

    container.innerHTML = APP_DATA.preguntasEntrevista.map((q, idx) => `
      <div class="bg-white border rounded-xl p-5 shadow-xs mb-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded">
            Pregunta ${idx + 1} de ${APP_DATA.preguntasEntrevista.length} • ${q.tipo}
          </span>
          <span class="text-xs text-slate-400">Modalidad Presencial CUC</span>
        </div>
        <h4 class="font-bold text-base text-slate-900 mb-3">${q.pregunta}</h4>
        
        <div class="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-3">
          <div class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <i data-lucide="check-square" class="w-4 h-4 text-emerald-600"></i> Rúbrica: Lo que el evaluador técnico busca escuchar:
          </div>
          <ul class="text-xs text-slate-600 space-y-1 list-disc list-inside">
            ${q.rubrica.map(r => `<li>${r}</li>`).join("")}
          </ul>
        </div>

        <button data-answer-target="ans-${q.id}" class="btn-reveal-answer text-xs font-semibold text-red-700 hover:text-red-800 flex items-center gap-1">
          <i data-lucide="eye" class="w-3.5 h-3.5"></i> Ver Respuesta Modelo Verbalizada
        </button>

        <div id="ans-${q.id}" class="hidden mt-3 p-3 bg-red-50/50 border border-red-200 rounded-lg text-xs text-slate-700 leading-relaxed">
          <strong class="text-red-900 block mb-1">Cómo verbalizar tu respuesta:</strong>
          "${q.respuestaModelo}"
        </div>
      </div>
    `).join("");

    container.querySelectorAll(".btn-reveal-answer").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = document.getElementById(btn.dataset.answerTarget);
        if (target) {
          target.classList.toggle("hidden");
          btn.innerHTML = target.classList.contains("hidden")
            ? `<i data-lucide="eye" class="w-3.5 h-3.5 inline mr-1"></i> Ver Respuesta Modelo Verbalizada`
            : `<i data-lucide="eye-off" class="w-3.5 h-3.5 inline mr-1"></i> Ocultar Respuesta`;
          refreshIcons();
        }
      });
    });
  }

  // --- MODO FLASHCARDS (30+ TARJETAS) ---
  function getFilteredFlashcards() {
    if (state.flashcardFilter === "Todas") {
      return APP_DATA.flashcards;
    }
    return APP_DATA.flashcards.filter(f => f.categoria === state.flashcardFilter);
  }

  function renderFlashcards() {
    const cards = getFilteredFlashcards();
    const cardEl = document.getElementById("flashcard-inner");
    const categoryEl = document.getElementById("flashcard-category");
    const counterEl = document.getElementById("flashcard-counter");
    const questionEl = document.getElementById("flashcard-question");
    const answerEl = document.getElementById("flashcard-answer");

    if (!cardEl || cards.length === 0) return;

    if (state.currentFlashcardIdx >= cards.length) {
      state.currentFlashcardIdx = 0;
    }

    const currentCard = cards[state.currentFlashcardIdx];

    state.isCardFlipped = false;
    cardEl.classList.remove("rotate-y-180");

    categoryEl.textContent = currentCard.categoria;
    counterEl.textContent = `${state.currentFlashcardIdx + 1} de ${cards.length}`;
    questionEl.textContent = currentCard.pregunta;
    answerEl.textContent = currentCard.respuesta;
  }

  const cardFlipper = document.getElementById("flashcard-container");
  if (cardFlipper) {
    cardFlipper.addEventListener("click", () => {
      const cardEl = document.getElementById("flashcard-inner");
      state.isCardFlipped = !state.isCardFlipped;
      cardEl.classList.toggle("rotate-y-180", state.isCardFlipped);
    });
  }

  const btnNextCard = document.getElementById("btn-next-card");
  const btnPrevCard = document.getElementById("btn-prev-card");

  if (btnNextCard) {
    btnNextCard.addEventListener("click", () => {
      const cards = getFilteredFlashcards();
      state.currentFlashcardIdx = (state.currentFlashcardIdx + 1) % cards.length;
      renderFlashcards();
    });
  }

  if (btnPrevCard) {
    btnPrevCard.addEventListener("click", () => {
      const cards = getFilteredFlashcards();
      state.currentFlashcardIdx = (state.currentFlashcardIdx - 1 + cards.length) % cards.length;
      renderFlashcards();
    });
  }

  const filterBtns = document.querySelectorAll(".flashcard-filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.flashcardFilter = btn.dataset.cat;
      state.currentFlashcardIdx = 0;
      filterBtns.forEach(b => {
        b.classList.remove("bg-red-700", "text-white");
        b.classList.add("bg-slate-200", "text-slate-700");
      });
      btn.classList.add("bg-red-700", "text-white");
      btn.classList.remove("bg-slate-200", "text-slate-700");
      renderFlashcards();
    });
  });

  // --- TEMPORIZADOR ---
  const timerDisplay = document.getElementById("timer-display");
  const timerBtnStart = document.getElementById("timer-btn-start");
  const timerBtnReset = document.getElementById("timer-btn-reset");

  function updateTimer() {
    if (!timerDisplay) return;
    const m = String(state.timerMinutes).padStart(2, "0");
    const s = String(state.timerSeconds).padStart(2, "0");
    timerDisplay.textContent = `${m}:${s}`;
  }

  function startTimer() {
    if (state.timerRunning) {
      clearInterval(state.timerInterval);
      state.timerRunning = false;
      timerBtnStart.textContent = "Iniciar";
    } else {
      state.timerRunning = true;
      timerBtnStart.textContent = "Pausar";
      state.timerInterval = setInterval(() => {
        if (state.timerSeconds === 0) {
          if (state.timerMinutes === 0) {
            clearInterval(state.timerInterval);
            state.timerRunning = false;
            playSuccessSound();
            alert("⏰ ¡Bloque de estudio completado!");
            timerBtnStart.textContent = "Iniciar";
            return;
          }
          state.timerMinutes--;
          state.timerSeconds = 59;
        } else {
          state.timerSeconds--;
        }
        updateTimer();
      }, 1000);
    }
  }

  if (timerBtnStart) timerBtnStart.addEventListener("click", startTimer);
  if (timerBtnReset) {
    timerBtnReset.addEventListener("click", () => {
      clearInterval(state.timerInterval);
      state.timerRunning = false;
      state.timerMinutes = 45;
      state.timerSeconds = 0;
      if (timerBtnStart) timerBtnStart.textContent = "Iniciar";
      updateTimer();
    });
  }

  // --- PROGRESO GLOBAL ---
  function updateGlobalProgressBar() {
    const totalItems = PRACTICE_DATA.coding.length + PRACTICE_DATA.sql.length + PRACTICE_DATA.web.length + PRACTICE_DATA.git.length + PRACTICE_DATA.ia.length;
    let completedItems = state.completedCodingIds.length + state.completedSqlIds.length;
    
    // Sumar aciertos de quizzes
    Object.values(state.quizAnswers).forEach(ans => {
      if (ans.correct) completedItems++;
    });

    const pct = Math.min(100, Math.round((completedItems / totalItems) * 100));

    const bar = document.getElementById("global-progress-bar");
    const txt = document.getElementById("global-progress-text");

    if (bar) bar.style.width = `${pct}%`;
    if (txt) txt.textContent = `${pct}% Completado (${completedItems}/${totalItems})`;
  }

  // Inicializar
  switchMainMode("teoria");
  updateTimer();
  refreshIcons();
});
