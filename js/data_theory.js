// ==============================================================
// MANUAL TÉCNICO EXHAUSTIVO Y DETALLADO - UNIVERSIDAD DE LA COSTA (CUC)
// ==============================================================

const THEORY_DATA = {
  modulos: [
    {
      id: "teoria-complejidad-logica",
      titulo: "1. Complejidad Algorítmica y Notación Big-O",
      icono: "activity",
      descripcion: "Análisis de tiempo y espacio, complejidades O(1), O(log N), O(N), O(N log N), O(N²), y optimización de algoritmos.",
      secciones: [
        {
          subtitulo: "1.1 ¿Qué es la Notación Big-O y Por Qué Importa en la Entrevista?",
          contenido: `
<h4 class="text-base font-bold text-slate-900 mb-2">Fundamento Matemático y Práctico</h4>
<p class="text-sm text-slate-700 leading-relaxed mb-3">
La notación Big-O describe el <strong>comportamiento asintótico</strong> de un algoritmo a medida que el tamaño de la entrada ($N$) tiende a infinito. Los evaluadores de la CUC no solo evalúan si tu código funciona, sino cómo escala cuando la universidad procese miles de estudiantes simultáneamente.
</p>

<div class="overflow-x-auto mb-4 border rounded-xl">
  <table class="w-full text-xs text-left">
    <thead class="bg-slate-100 text-slate-800 border-b">
      <tr>
        <th class="p-2.5 font-bold">Complejidad</th>
        <th class="p-2.5 font-bold">Nombre</th>
        <th class="p-2.5 font-bold">Rendimiento</th>
        <th class="p-2.5 font-bold">Ejemplo Típico</th>
      </tr>
    </thead>
    <tbody class="divide-y text-slate-600">
      <tr class="bg-emerald-50/50">
        <td class="p-2.5 font-bold font-mono text-emerald-800">O(1)</td>
        <td class="p-2.5">Constante</td>
        <td class="p-2.5 font-semibold text-emerald-700">Excelente</td>
        <td class="p-2.5">Acceso a un índice de array (<code class="bg-emerald-100 px-1 rounded">arr[0]</code>) o búsqueda por clave en diccionario/hash map.</td>
      </tr>
      <tr class="bg-emerald-50/30">
        <td class="p-2.5 font-bold font-mono text-emerald-800">O(log N)</td>
        <td class="p-2.5">Logarítmica</td>
        <td class="p-2.5 font-semibold text-emerald-700">Muy Bueno</td>
        <td class="p-2.5">Búsqueda binaria en una lista previamente ordenada. Cada paso divide el problema a la mitad.</td>
      </tr>
      <tr class="bg-blue-50/40">
        <td class="p-2.5 font-bold font-mono text-blue-800">O(N)</td>
        <td class="p-2.5">Lineal</td>
        <td class="p-2.5 font-semibold text-blue-700">Aceptable</td>
        <td class="p-2.5">Un solo bucle for recorriendo una lista de inicio a fin (ej: encontrar el número mayor).</td>
      </tr>
      <tr class="bg-amber-50/40">
        <td class="p-2.5 font-bold font-mono text-amber-800">O(N log N)</td>
        <td class="p-2.5">Quasilineal</td>
        <td class="p-2.5 font-semibold text-amber-700">Moderado</td>
        <td class="p-2.5">Algoritmos de ordenación eficientes (MergeSort, QuickSort promedio, TimSort en Python/JS <code class="bg-amber-100 px-1 rounded">arr.sort()</code>).</td>
      </tr>
      <tr class="bg-red-50/50">
        <td class="p-2.5 font-bold font-mono text-red-800">O(N²)</td>
        <td class="p-2.5">Cuadrática</td>
        <td class="p-2.5 font-semibold text-red-700">Pobre / Ineficiente</td>
        <td class="p-2.5">Bucles for anidados comparando cada elemento contra todos los demás (ej: fuerza bruta de Two Sum o BubbleSort).</td>
      </tr>
    </tbody>
  </table>
</div>
          `
        },
        {
          subtitulo: "1.2 Complejidad Espacial (Memoria Auxiliar) vs. Complejidad Temporal",
          contenido: `
<p class="text-sm text-slate-700 leading-relaxed mb-3">
La <strong>complejidad espacial</strong> mide cuánta memoria adicional en RAM requiere tu algoritmo excluyendo la entrada. 
En una entrevista técnica, existe un compromiso clásico (*trade-off*): a menudo usamos más memoria (creando un <code class="bg-slate-100 text-red-700 px-1 rounded">Set</code> o diccionario auxiliar de tamaño $O(N)$) para reducir drásticamente el tiempo de ejecución de $O(N^2)$ a $O(N)$.
</p>
<div class="p-3 bg-red-50 border-l-4 border-red-600 rounded-r text-xs text-red-950">
  <strong>Consejo para la prueba presencial:</strong> Menciona siempre al evaluador: <em>"Esta solución tiene una complejidad temporal de O(N) y una complejidad espacial de O(N) por la tabla hash auxiliar; si requerimos O(1) en memoria, podríamos ordenar la lista in-place a costo de O(N log N) en tiempo"</em>. Esto demuestra criterio de ingeniería sénior.
</div>
          `
        }
      ]
    },
    {
      id: "teoria-estructuras",
      titulo: "2. Estructuras de Datos Fundamentales",
      icono: "code",
      descripcion: "Strings, Arrays, Listas dinámicas, Tablas Hash, Pilas, Colas, Matrices y Conjuntos (Sets).",
      secciones: [
        {
          subtitulo: "2.1 Strings y Manipulación de Cadenas",
          contenido: `
<h4 class="text-base font-bold text-slate-900 mb-2">Inmutabilidad y Operaciones Esenciales</h4>
<p class="text-sm text-slate-700 leading-relaxed mb-3">
En JavaScript y Python, las cadenas son inmutables. Modificar un carácter genera una nueva cadena en memoria.
</p>
<div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-xs font-mono">
  <div class="p-3 bg-slate-900 text-slate-200 rounded-lg">
    <span class="text-emerald-400 font-bold block mb-1">// JavaScript Clave</span>
    str.trim(); // Quitar espacios bordes<br/>
    str.toLowerCase(); str.toUpperCase();<br/>
    str.split(""); // Convertir a array<br/>
    str.slice(inicio, fin); // Subcadena<br/>
    str.replace(/[^a-z0-9]/gi, ""); // Regex limpia
  </div>
  <div class="p-3 bg-slate-900 text-slate-200 rounded-lg">
    <span class="text-amber-400 font-bold block mb-1"># Python Clave</span>
    s.strip() # Quitar espacios bordes<br/>
    s.lower(); s.upper()<br/>
    list(s) # Convertir a lista de chars<br/>
    s[inicio:fin] # Slicing<br/>
    s[::-1] # Invertir cadena completo
  </div>
</div>
          `
        },
        {
          subtitulo: "2.2 Arreglos/Listas vs. Tablas Hash (Diccionarios / Objetos)",
          contenido: `
<p class="text-sm text-slate-700 leading-relaxed mb-3">
Las <strong>Tablas Hash</strong> calculan una función hash matemática sobre la clave para determinar la posición en memoria, logrando inserción, lectura y eliminación en $O(1)$ en promedio.
</p>
<ul class="list-disc list-inside space-y-1.5 text-xs text-slate-700 mb-3">
  <li><strong>Array / Lista:</strong> Ideal cuando el orden posicional importa y se accede mediante índices numéricos (0, 1, 2...).</li>
  <li><strong>Hash Map (Objeto / Diccionario):</strong> Ideal para conteo de frecuencias, indexación rápida por IDs o nombres, y eliminación de búsquedas repetidas.</li>
  <li><strong>Set (Conjunto):</strong> Almacena valores únicos sin duplicados con comprobación de pertenencia <code class="bg-slate-100 px-1 rounded">set.has(x)</code> o <code class="bg-slate-100 px-1 rounded">x in my_set</code> en $O(1)$.</li>
</ul>
          `
        },
        {
          subtitulo: "2.3 Pilas (Stacks), Colas (Queues) y Matrices 2D",
          contenido: `
<div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-xs">
  <div class="p-3 bg-white border rounded-xl">
    <strong class="text-slate-900 block mb-1">Pila (Stack - LIFO: Last In, First Out)</strong>
    <p class="text-slate-600 mb-2">El último elemento en entrar es el primero en salir. Usos: deshacer cambios (Ctrl+Z), validación de paréntesis balanceados <code class="bg-slate-100 px-1 rounded">({[]})</code> y llamadas recursivas.</p>
    <code class="bg-slate-100 block p-1 rounded font-mono">push() y pop() en JS/Python</code>
  </div>
  <div class="p-3 bg-white border rounded-xl">
    <strong class="text-slate-900 block mb-1">Cola (Queue - FIFO: First In, First Out)</strong>
    <p class="text-slate-600 mb-2">El primer elemento en entrar es el primero en salir. Usos: filas de atención a turnos estudiantiles, colas de impresión y recorridos BFS en grafos.</p>
    <code class="bg-slate-100 block p-1 rounded font-mono">push() y shift() en JS / collections.deque en Python</code>
  </div>
</div>
          `
        }
      ]
    },
    {
      id: "teoria-poo-solid",
      titulo: "3. Programación Orientada a Objetos y Principios SOLID",
      icono: "layers",
      descripcion: "Clases, constructores, encapsulamiento, herencia, polimorfismo, abstracción y principios de diseño limpio.",
      secciones: [
        {
          subtitulo: "3.1 Los 4 Pilares de la Programación Orientada a Objetos",
          contenido: `
<div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-xs">
  <div class="p-3 bg-white border rounded-xl">
    <strong class="text-red-700 block mb-1">1. Encapsulamiento</strong>
    <p class="text-slate-600">Restricción del acceso directo a los componentes internos de un objeto. Se exponen métodos getters/setters o métodos de negocio para validar cambios de estado (ej: no permitir saldo negativo en una cuenta bancaria).</p>
  </div>
  <div class="p-3 bg-white border rounded-xl">
    <strong class="text-red-700 block mb-1">2. Abstracción</strong>
    <p class="text-slate-600">Ocultar detalles de implementación complejos y mostrar solo la funcionalidad esencial. El usuario llama a <code class="bg-slate-100 px-1 rounded">calcularPromedio()</code> sin necesidad de saber cómo itera internamente.</p>
  </div>
  <div class="p-3 bg-white border rounded-xl">
    <strong class="text-red-700 block mb-1">3. Herencia</strong>
    <p class="text-slate-600">Reutilización de código donde una clase hija adquiere propiedades y métodos de una clase padre (<code class="bg-slate-100 px-1 rounded">class EstudianteBecado extends Estudiante</code>).</p>
  </div>
  <div class="p-3 bg-white border rounded-xl">
    <strong class="text-red-700 block mb-1">4. Polimorfismo</strong>
    <p class="text-slate-600">Capacidad de distintas clases de responder al mismo método de manera diferente (ej: tanto <code class="bg-slate-100 px-1 rounded">Profesor</code> como <code class="bg-slate-100 px-1 rounded">Estudiante</code> tienen <code class="bg-slate-100 px-1 rounded">obtenerIdentificacion()</code> con formatos propios).</p>
  </div>
</div>
          `
        },
        {
          subtitulo: "3.2 Nociones de Principios SOLID en Desarrollo Moderno",
          contenido: `
<p class="text-sm text-slate-700 leading-relaxed mb-3">
SOLID son 5 principios de diseño orientado a objetos para crear software mantenible y escalable:
</p>
<ul class="space-y-1.5 text-xs text-slate-700 list-disc list-inside mb-3">
  <li><strong>S (Single Responsibility):</strong> Una clase o función debe tener una única razón para cambiar.</li>
  <li><strong>O (Open/Closed):</strong> El código debe estar abierto a la extensión pero cerrado a la modificación.</li>
  <li><strong>L (Liskov Substitution):</strong> Los subtipos deben ser sustituibles por sus tipos base sin romper el programa.</li>
  <li><strong>I (Interface Segregation):</strong> Muchas interfaces específicas son mejores que una sola interfaz general inflada.</li>
  <li><strong>D (Dependency Inversion):</strong> Depender de abstracciones, no de implementaciones concretas.</li>
</ul>
          `
        }
      ]
    },
    {
      id: "teoria-web-apis",
      titulo: "4. Arquitectura Web, Protocolo HTTP, APIs REST y Seguridad",
      icono: "globe",
      descripcion: "Ciclo de vida cliente-servidor, métodos HTTP, códigos de estado, estructura JSON, autenticación y seguridad.",
      secciones: [
        {
          subtitulo: "4.1 El Ciclo de Vida de una Petición HTTP",
          contenido: `
<p class="text-sm text-slate-700 leading-relaxed mb-3">
Cuando un usuario ingresa al portal de la CUC o una app móvil consume datos:
</p>
<ol class="list-decimal list-inside space-y-1.5 text-xs text-slate-700 mb-4">
  <li><strong>Resolución DNS:</strong> El navegador traduce el dominio (<code class="bg-slate-100 px-1 rounded">cuc.edu.co</code>) a una dirección IP numérica.</li>
  <li><strong>Apretón de Manos (TCP/TLS Handshake):</strong> Se establece una conexión cifrada segura HTTPS (puerto 443).</li>
  <li><strong>Envío de la Petición (Request):</strong> Se envía el método HTTP, la URL, los encabezados (*Headers*) y el cuerpo (*Body* en JSON).</li>
  <li><strong>Procesamiento en Backend:</strong> El servidor (Node.js, Python FastAPI/Django, etc.) valida credenciales, consulta la base de datos SQL y genera la respuesta.</li>
  <li><strong>Respuesta (Response):</strong> Se devuelve el código de estado (ej: 200 OK) y los datos en JSON.</li>
</ol>
          `
        },
        {
          subtitulo: "4.2 Métodos HTTP e Idempotencia",
          contenido: `
<div class="overflow-x-auto mb-3 border rounded-xl">
  <table class="w-full text-xs text-left">
    <thead class="bg-slate-100 text-slate-800 border-b">
      <tr>
        <th class="p-2.5 font-bold">Método</th>
        <th class="p-2.5 font-bold">Propósito Semántico</th>
        <th class="p-2.5 font-bold">¿Idempotente?</th>
        <th class="p-2.5 font-bold">¿Lleva Body?</th>
      </tr>
    </thead>
    <tbody class="divide-y text-slate-600">
      <tr>
        <td class="p-2 font-mono font-bold text-blue-700">GET</td>
        <td class="p-2">Obtener / consultar datos del servidor</td>
        <td class="p-2 text-emerald-700 font-bold">Sí</td>
        <td class="p-2">No</td>
      </tr>
      <tr>
        <td class="p-2 font-mono font-bold text-emerald-700">POST</td>
        <td class="p-2">Crear un nuevo recurso en la base de datos</td>
        <td class="p-2 text-red-700 font-bold">No</td>
        <td class="p-2">Sí (JSON)</td>
      </tr>
      <tr>
        <td class="p-2 font-mono font-bold text-amber-700">PUT</td>
        <td class="p-2">Reemplazar completamente un recurso existente</td>
        <td class="p-2 text-emerald-700 font-bold">Sí</td>
        <td class="p-2">Sí (JSON)</td>
      </tr>
      <tr>
        <td class="p-2 font-mono font-bold text-purple-700">PATCH</td>
        <td class="p-2">Actualizar parcialmente campos específicos</td>
        <td class="p-2 text-red-700 font-bold">No siempre</td>
        <td class="p-2">Sí (JSON)</td>
      </tr>
      <tr>
        <td class="p-2 font-mono font-bold text-red-700">DELETE</td>
        <td class="p-2">Eliminar un recurso del servidor</td>
        <td class="p-2 text-emerald-700 font-bold">Sí</td>
        <td class="p-2">Opcional</td>
      </tr>
    </tbody>
  </table>
</div>
          `
        },
        {
          subtitulo: "4.3 Códigos de Estado HTTP y Seguridad Básica",
          contenido: `
<div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-xs">
  <div class="p-3 bg-slate-50 border rounded-xl">
    <strong class="text-slate-900 block mb-1">Autenticación vs Autorización</strong>
    <p class="text-slate-600 mb-2"><strong>401 Unauthorized:</strong> No autenticado (el sistema no sabe quién eres; falta token o credenciales).<br/><strong>403 Forbidden:</strong> No autorizado (sé quién eres, pero tu rol no tiene permisos para este recurso).</p>
  </div>
  <div class="p-3 bg-slate-50 border rounded-xl">
    <strong class="text-slate-900 block mb-1">Manejo Seguro de API Keys y Tokens</strong>
    <p class="text-slate-600 mb-2">Las API Keys y secretos de base de datos NUNCA deben ir en el código frontend ni en repositorios Git públicos. Deben almacenarse en variables de entorno (<code class="bg-slate-200 px-1 rounded">.env</code>) y consumirse desde el backend.</p>
  </div>
</div>
          `
        }
      ]
    },
    {
      id: "teoria-sql",
      titulo: "5. Bases de Datos Relacionales (SQL) y Normalización",
      icono: "database",
      descripcion: "Modelo relacional, llaves primarias/foráneas, consultas SELECT, JOINs, agregaciones GROUP BY/HAVING y subconsultas.",
      secciones: [
        {
          subtitulo: "5.1 Integridad Referencial: Llaves Primarias y Foráneas",
          contenido: `
<h4 class="text-base font-bold text-slate-900 mb-2">El Corazón del Modelo Relacional</h4>
<p class="text-sm text-slate-700 leading-relaxed mb-3">
Una <strong>Primary Key (PK)</strong> garantiza unicidad e identificación absoluta para cada fila. Una <strong>Foreign Key (FK)</strong> asegura que ninguna relación apunte al vacío (integridad referencial).
</p>
<div class="p-3 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono mb-3">
  CREATE TABLE matriculas (<br/>
  &nbsp;&nbsp;id INT PRIMARY KEY AUTO_INCREMENT,<br/>
  &nbsp;&nbsp;estudiante_id INT NOT NULL,<br/>
  &nbsp;&nbsp;curso_id INT NOT NULL,<br/>
  &nbsp;&nbsp;nota DECIMAL(3, 2),<br/>
  &nbsp;&nbsp;FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id) ON DELETE CASCADE,<br/>
  &nbsp;&nbsp;FOREIGN KEY (curso_id) REFERENCES cursos(id)<br/>
  );
</div>
          `
        },
        {
          subtitulo: "5.2 Guía Definitiva de JOINs y Agregaciones",
          contenido: `
<div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-xs">
  <div class="p-3 bg-white border rounded-xl">
    <strong class="text-red-700 block mb-1">INNER JOIN vs LEFT JOIN</strong>
    <p class="text-slate-600"><strong>INNER JOIN:</strong> Solo filas con coincidencia en ambas tablas.<br/><strong>LEFT JOIN:</strong> Todas las filas de la tabla izquierda, rellenando con NULL si no hay matrícula o curso correspondiente.</p>
  </div>
  <div class="p-3 bg-white border rounded-xl">
    <strong class="text-red-700 block mb-1">WHERE vs HAVING</strong>
    <p class="text-slate-600"><strong>WHERE:</strong> Filtra filas individuales antes de agrupar.<br/><strong>HAVING:</strong> Filtra grupos creados por GROUP BY evaluando funciones agregadas como <code class="bg-slate-100 px-1 rounded">HAVING AVG(nota) &gt;= 4.0</code>.</p>
  </div>
</div>
          `
        }
      ]
    },
    {
      id: "teoria-git",
      titulo: "6. Control de Versiones con Git y Flujos de Equipo",
      icono: "git-branch",
      descripcion: "Los 3 estados de Git, ramas, resolución de conflictos, comandos de rescate (stash, reset, revert) y convenciones semánticas.",
      secciones: [
        {
          subtitulo: "6.1 Los 3 Árboles de Git y Comandos Esenciales",
          contenido: `
<p class="text-sm text-slate-700 leading-relaxed mb-3">
Git gestiona los archivos en 3 áreas:
</p>
<ul class="list-disc list-inside space-y-1.5 text-xs text-slate-700 mb-3">
  <li><strong>Working Directory:</strong> Tus archivos físicos en el disco donde escribes código.</li>
  <li><strong>Staging Area (Index):</strong> Zona de preparación donde agregas los cambios con <code class="bg-slate-100 px-1 rounded">git add</code> antes de congelarlos.</li>
  <li><strong>Commit History (Repository):</strong> La base de datos permanente con los snapshots históricos registrados con <code class="bg-slate-100 px-1 rounded">git commit</code>.</li>
</ul>
          `
        },
        {
          subtitulo: "6.2 Comandos de Rescate y Buenas Prácticas",
          contenido: `
<div class="space-y-2 text-xs mb-3 font-mono">
  <div class="p-2.5 bg-slate-900 text-slate-200 rounded flex justify-between">
    <span>git stash / git stash pop</span>
    <span class="text-slate-400 font-sans">Guardar cambios en el bolsillo para cambiar de rama rápidamente</span>
  </div>
  <div class="p-2.5 bg-slate-900 text-slate-200 rounded flex justify-between">
    <span>git reset --soft HEAD~1</span>
    <span class="text-slate-400 font-sans">Deshacer el último commit sin borrar tus modificaciones</span>
  </div>
  <div class="p-2.5 bg-slate-900 text-slate-200 rounded flex justify-between">
    <span>git revert &lt;hash&gt;</span>
    <span class="text-slate-400 font-sans">Crear un commit inverso seguro para ramas compartidas en producción</span>
  </div>
</div>
          `
        }
      ]
    },
    {
      id: "teoria-ia-rag",
      titulo: "7. Inteligencia Artificial Aplicada, LLMs y RAG",
      icono: "sparkles",
      descripcion: "Arquitectura de LLMs, parámetros de inferencia, Prompt Engineering profesional, RAG y criterio asistido.",
      secciones: [
        {
          subtitulo: "7.1 Cómo Funcionan los Modelos de Lenguaje (LLMs)",
          contenido: `
<p class="text-sm text-slate-700 leading-relaxed mb-3">
Los LLMs son modelos autoregresivos que calculan la distribución de probabilidad de la siguiente palabra o token.
</p>
<ul class="list-disc list-inside space-y-1.5 text-xs text-slate-700 mb-3">
  <li><strong>Tokens:</strong> Unidades atómicas de texto. ~1 token = 4 caracteres o 0.75 palabras.</li>
  <li><strong>Temperatura:</strong> Control de entropía en la selección de tokens. 0.0 a 0.2 para código/SQL determinista; 0.8+ para redacción creativa.</li>
  <li><strong>Alucinaciones:</strong> Invención de datos falsos cuando el modelo no tiene información fáctica en su ventana de contexto.</li>
</ul>
          `
        },
        {
          subtitulo: "7.2 Prompt Engineering y Salidas JSON Estructuradas",
          contenido: `
<p class="text-sm text-slate-700 leading-relaxed mb-3">
Para integrar IA en el backend de la universidad, el prompt debe exigir estructura estricta:
</p>
<div class="p-3 bg-purple-50 border border-purple-200 rounded-lg text-xs font-mono text-purple-950 mb-3">
  <strong>System Prompt:</strong> Eres un clasificador académico para la Universidad CUC. Devuelve ÚNICAMENTE un objeto JSON.<br/>
  <strong>JSON Schema:</strong> {"codigo_materia": string, "aprobado": boolean, "motivo": string}
</div>
          `
        },
        {
          subtitulo: "7.3 Arquitectura RAG (Retrieval-Augmented Generation)",
          contenido: `
<p class="text-sm text-slate-700 leading-relaxed mb-3">
RAG inyecta fragmentos de documentos internos de la universidad en tiempo de ejecución. Convierte documentos en embeddings numéricos, busca por similitud de coseno en una base vectorial (Chroma/Pinecone) y le dice al LLM: <em>"Responde únicamente basado en los siguientes 3 artículos"</em>. Elimina alucinaciones al 99%.
</p>
          `
        }
      ]
    },
    {
      id: "teoria-estrategia-presencial",
      titulo: "8. Estrategia y Comunicación para la Prueba Presencial CUC",
      icono: "mic",
      descripcion: "El método 'Piensa en Voz Alta', preguntas clarificadoras antes de escribir código y manejo de casos límite.",
      secciones: [
        {
          subtitulo: "8.1 Las 3 Reglas de Oro del Evaluador Técnico",
          contenido: `
<div class="space-y-3 text-xs mb-3">
  <div class="p-3 bg-red-50 border-l-4 border-red-600 rounded-r">
    <strong class="text-red-950 block mb-1">1. Piensa en Voz Alta (Think Out Loud)</strong>
    <p class="text-slate-700">El evaluador busca entender cómo descompones problemas complejos. Habla mientras diseñas el algoritmo.</p>
  </div>
  <div class="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r">
    <strong class="text-amber-950 block mb-1">2. Pregunta Antes de Asumir</strong>
    <p class="text-slate-700">¿El arreglo puede estar vacío? ¿Puede contener números negativos? ¿Hay que distinguir mayúsculas? Preguntar demuestra rigor técnico.</p>
  </div>
  <div class="p-3 bg-emerald-50 border-l-4 border-emerald-600 rounded-r">
    <strong class="text-emerald-950 block mb-1">3. Prioriza que Funcione, Luego Optimiza</strong>
    <p class="text-slate-700">Primero haz una solución funcional correcta. Luego discute con el jurado cómo reducirías la complejidad temporal de O(N²) a O(N).</p>
  </div>
</div>
          `
        }
      ]
    }
  ]
};
