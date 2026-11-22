// ==============================================================
// BANCO EXPANDIDO DE ENTREVISTA ORAL (25+) Y FLASHCARDS (30+)
// ==============================================================

const APP_DATA = {
  infoConvocatoria: {
    institucion: "Universidad de la Costa (CUC)",
    cargo: "Practicante en Sistemas, Análisis y Desarrollo de Software o afines",
    enfoque: "Lógica de programación, desarrollo web/SQL/Git y herramientas de Inteligencia Artificial aplicada",
    contacto: "unidadgta@cuc.edu.co"
  },

  // FLASHCARDS (30+ TARJETAS TÉCNICAS)
  flashcards: [
    {
      categoria: "Lógica",
      pregunta: "¿Cuál es la diferencia entre un Arreglo (Array) y una Tabla Hash (Diccionario / Objeto)?",
      respuesta: "Un Array indexa elementos por posición numérica secuencial (0, 1, 2...). Una Tabla Hash indexa pares clave-valor, permitiendo búsquedas, inserciones y eliminaciones en tiempo constante promedio O(1)."
    },
    {
      categoria: "Lógica",
      pregunta: "¿Por qué en JavaScript '==' es distinto de '==='?",
      respuesta: "'==' compara únicamente por valor tras realizar coerción automática de tipos (ej: '5' == 5 es true). '===' compara valor Y tipo estrictamente sin coerción (ej: '5' === 5 es false). En entrevistas, ¡siempre recomienda usar '==='!"
    },
    {
      categoria: "Lógica",
      pregunta: "¿Qué significa que un algoritmo tenga complejidad temporal O(N²)?",
      respuesta: "Significa que el tiempo de ejecución crece proporcionalmente al cuadrado del tamaño de la entrada. Suele ocurrir por bucles for anidados y se debe evitar siempre que sea posible usando tablas hash O(N)."
    },
    {
      categoria: "Lógica",
      pregunta: "¿Qué es una Pila (Stack) y en qué casos prácticos se utiliza?",
      respuesta: "Estructura LIFO (Last In, First Out). Se utiliza para deshacer acciones (Ctrl+Z), evaluar expresiones matemáticas, validar paréntesis balanceados y llamadas recursivas en la pila de llamadas."
    },
    {
      categoria: "Lógica",
      pregunta: "¿Qué es una Cola (Queue) y cuál es su principio?",
      respuesta: "Estructura FIFO (First In, First Out). El primer elemento en ingresar es el primero en ser procesado. Se utiliza para colas de impresión, procesamiento de eventos y algoritmos de búsqueda en anchura (BFS)."
    },
    {
      categoria: "POO",
      pregunta: "¿Cuáles son los 4 pilares de la Programación Orientada a Objetos?",
      respuesta: "Encapsulamiento (ocultar estado interno), Abstracción (exponer solo lo esencial), Herencia (reutilizar código de clases base) y Polimorfismo (comportamientos especializados para un mismo método)."
    },
    {
      categoria: "POO",
      pregunta: "¿Qué diferencia hay entre una Clase y un Objeto?",
      respuesta: "Una Clase es el molde, plano o plantilla que define los atributos y métodos. Un Objeto es la instancia concreta de esa clase en memoria creada mediante el operador 'new' o invocación del constructor."
    },
    {
      categoria: "SQL",
      pregunta: "¿Qué diferencia hay entre WHERE y HAVING en SQL?",
      respuesta: "WHERE filtra filas individuales ANTES de que se ejecute la agregación o agrupación. HAVING filtra grupos creados por GROUP BY DESPUÉS de calcular agregaciones (ej: HAVING COUNT(*) > 5 o HAVING AVG(nota) >= 4.0)."
    },
    {
      categoria: "SQL",
      pregunta: "¿Qué es una Llave Primaria (Primary Key)?",
      respuesta: "Identificador único, irrepetible y no nulo para cada fila de una tabla (ej: 'id' o 'documento_identidad'). Asegura la integridad de entidad."
    },
    {
      categoria: "SQL",
      pregunta: "¿Qué es una Llave Foránea (Foreign Key)?",
      respuesta: "Columna que hace referencia a la Primary Key de otra tabla. Establece relaciones entre entidades y garantiza la integridad referencial."
    },
    {
      categoria: "SQL",
      pregunta: "¿Cuál es la diferencia entre INNER JOIN y LEFT JOIN?",
      respuesta: "INNER JOIN solo retorna registros que tienen coincidencia exacta en ambas tablas. LEFT JOIN retorna TODOS los registros de la tabla izquierda, rellenando con NULL si no hay coincidencia a la derecha."
    },
    {
      categoria: "SQL",
      pregunta: "¿Para qué sirve la cláusula DISTINCT en SQL?",
      respuesta: "Se utiliza en la sentencia SELECT para eliminar filas duplicadas en el conjunto de resultados, asegurando que cada valor devuelto sea único."
    },
    {
      categoria: "Web",
      pregunta: "¿Qué es la Idempotencia en métodos HTTP?",
      respuesta: "Una operación es idempotente si ejecutarla varias veces consecutivas produce el mismo efecto en el servidor que ejecutarla una sola vez. GET, PUT y DELETE son idempotentes; POST NO es idempotente."
    },
    {
      categoria: "Web",
      pregunta: "¿Cuál es la diferencia entre los códigos HTTP 401 y 403?",
      respuesta: "401 Unauthorized indica falta de autenticación (el servidor no sabe quién eres). 403 Forbidden indica falta de autorización (sé quién eres, pero tu rol o permisos no te permiten acceder a este recurso)."
    },
    {
      categoria: "Web",
      pregunta: "¿Qué significan los códigos de estado 200, 201 y 204?",
      respuesta: "200 OK (petición exitosa con datos devueltos), 201 Created (recurso creado con éxito tras un POST), y 204 No Content (operación exitosa sin cuerpo de retorno en la respuesta)."
    },
    {
      categoria: "Web",
      pregunta: "¿Qué es CORS y por qué ocurre un error de CORS en el navegador?",
      respuesta: "Cross-Origin Resource Sharing. Es una política de seguridad del navegador que bloquea peticiones de un origen web hacia otro dominio o puerto distinto a menos que el servidor incluya encabezados Access-Control-Allow-Origin."
    },
    {
      categoria: "Web",
      pregunta: "¿Cuál es la diferencia entre PUT y PATCH?",
      respuesta: "PUT reemplaza la totalidad del recurso existente con el nuevo payload enviado. PATCH actualiza únicamente los campos específicos modificados sin afectar los demás."
    },
    {
      categoria: "Web",
      pregunta: "¿Por qué las API Keys nunca deben guardarse en el frontend?",
      respuesta: "Porque el código frontend (HTML, JS) se descarga y es visible en el navegador de cualquier usuario. Los atacantes pueden inspeccionar el código, robar la clave y consumir servicios a expensas de la universidad."
    },
    {
      categoria: "Git",
      pregunta: "¿Cuál es la diferencia entre 'git fetch' y 'git pull'?",
      respuesta: "'git fetch' descarga los cambios y ramas del repositorio remoto pero NO los mezcla con tu código local. 'git pull' hace un 'git fetch' seguido inmediatamente de un 'git merge' automático."
    },
    {
      categoria: "Git",
      pregunta: "¿Para qué sirve el comando 'git stash'?",
      respuesta: "Guarda temporalmente en una pila interna todos los cambios no confirmados del directorio de trabajo y staging, permitiéndote cambiar de rama con el árbol limpio y recuperar tus cambios luego con 'git stash pop'."
    },
    {
      categoria: "Git",
      pregunta: "¿Cuál es la diferencia entre 'git reset --soft' y 'git reset --hard'?",
      respuesta: "'git reset --soft HEAD~1' deshace el último commit pero conserva los cambios en el staging area. 'git reset --hard HEAD~1' deshace el commit y destruye permanentemente las modificaciones en los archivos."
    },
    {
      categoria: "Git",
      pregunta: "¿Cómo se resuelve un conflicto de merge en Git?",
      respuesta: "Abriendo los archivos con conflicto, revisando las marcas <<<<<<< HEAD y >>>>>>>, seleccionando la versión correcta de código, eliminando las marcas, guardando el archivo y ejecutando 'git add' y 'git commit'."
    },
    {
      categoria: "IA",
      pregunta: "¿Qué es RAG y por qué una empresa lo prefiere antes que re-entrenar un modelo?",
      respuesta: "RAG (Retrieval-Augmented Generation) inyecta información actualizada y privada en el prompt en tiempo de consulta. Es muchísimo más económico, rápido de actualizar y evita alucinaciones sin el costo millonario de re-entrenar pesos."
    },
    {
      categoria: "IA",
      pregunta: "¿Qué efecto tiene ajustar la Temperatura a 0.0 vs 0.9 al llamar un LLM?",
      respuesta: "Temperatura 0.0 hace que el modelo elija siempre el token más probable (respuesta determinista, repetible y precisa, perfecta para código/SQL). Temperatura 0.9 introduce mayor variabilidad y creatividad."
    },
    {
      categoria: "IA",
      pregunta: "¿Qué es un Token en el contexto de Modelos de Lenguaje?",
      respuesta: "Es la unidad mínima de texto que procesa un LLM (fragmento de palabra o sílaba). Aproximadamente 1 token equivale a 4 caracteres en inglés o 3 en español. Se usan para medir ventanas de contexto y cobros de API."
    },
    {
      categoria: "IA",
      pregunta: "¿Qué es una Alucinación en Inteligencia Artificial?",
      respuesta: "Una respuesta falsa, inventada o inexacta generada por el LLM con total elocuencia y seguridad verbal. Ocurre porque los modelos predicen secuencias probables de texto, no verdades fácticas verificadas."
    },
    {
      categoria: "IA",
      pregunta: "¿Qué es Few-Shot Prompting?",
      respuesta: "Proveer dos o tres ejemplos de pares Entrada -> Salida deseada dentro del prompt antes de solicitar la tarea real, ayudando al modelo a fijar el patrón y formato exacto."
    },
    {
      categoria: "IA",
      pregunta: "¿Qué es un Embedding Vectorial?",
      respuesta: "Una representación matemática en forma de vector de números de coma flotante que codifica el significado semántico de un texto en un espacio multidimensional."
    },
    {
      categoria: "Entrevista",
      pregunta: "¿Qué debes hacer de inmediato si un evaluador te pone un ejercicio con un enunciado poco claro?",
      respuesta: "No empezar a codificar a ciegas. Hacer preguntas clarificadoras: '¿Los datos de entrada pueden venir vacíos o nulos?', '¿Debo manejar números negativos?', '¿Cuál debe ser el tipo de retorno?'. Demuestra madurez y comunicación técnica."
    },
    {
      categoria: "Entrevista",
      pregunta: "¿En qué consiste la técnica 'Piensa en Voz Alta'?",
      respuesta: "Verbalizar constantemente tu razonamiento y deducción lógica antes y mientras escribes código. Los evaluadores valoran el proceso analítico y cómo manejas la incertidumbre tanto o más que la solución final."
    }
  ],

  // BANCO DE ENTREVISTA ORAL PRESENCIAL (25 PREGUNTAS CON RÚBRICA Y RESPUESTA MODELO)
  preguntasEntrevista: [
    {
      id: "ent_1",
      tipo: "Lógica y Algoritmos",
      pregunta: "¿Cómo determinarías si dos cadenas son anagramas? Explica tu lógica en voz alta antes de escribir código.",
      rubrica: [
        "Preguntar si se consideran mayúsculas y espacios.",
        "Comprobar longitudes al inicio: si difieren, descartar inmediatamente.",
        "Mencionar solución con ordenación O(N log N) y optimización con tabla hash en O(N)."
      ],
      respuestaModelo: "Validaría primero casos borde: si las longitudes difieren, retorno false. Luego limpiaría espacios y convertiría a minúsculas. Usaría una tabla hash para contar frecuencias de la primera palabra incrementando y la segunda decrementando. Si al final todas las cuentas son cero, son anagramas en tiempo O(N) lineal."
    },
    {
      id: "ent_2",
      tipo: "Lógica y Algoritmos",
      pregunta: "¿Cómo resolverías el problema de encontrar dos números en un arreglo que sumen un valor objetivo en tiempo O(N)?",
      rubrica: [
        "Mencionar que la fuerza bruta con dos bucles for toma O(N²).",
        "Proponer el uso de un mapa hash (diccionario) para almacenar complementos ya vistos en una sola pasada.",
        "Mencionar la complejidad espacial O(N) del mapa."
      ],
      respuestaModelo: "En lugar de comparar todos contra todos en O(N²), recorro la lista una sola vez con un mapa hash. En cada paso calculo el complemento restando el número actual del objetivo. Si el complemento ya existe en el mapa, retorno ambos índices inmediatamente. Esto reduce el tiempo a O(N) a cambio de O(N) en memoria."
    },
    {
      id: "ent_3",
      tipo: "Bases de Datos (SQL)",
      pregunta: "Imagina que en la CUC tenemos una tabla de Estudiantes y otra de Matrículas. ¿Cómo obtendrías los estudiantes con promedio superior a 4.5 para una beca?",
      rubrica: [
        "Uso correcto de INNER JOIN entre estudiantes y matriculas.",
        "Uso de GROUP BY con estudiante_id o nombre.",
        "Uso de HAVING AVG(nota) >= 4.5 en vez de WHERE.",
        "Explicar por qué WHERE no puede filtrar sobre funciones agregadas."
      ],
      respuestaModelo: "Haría un SELECT de e.id, e.nombre y AVG(m.nota_definitiva) haciendo INNER JOIN con matriculas ON e.id = m.estudiante_id, agrupando con GROUP BY e.id, e.nombre y filtrando con HAVING AVG(m.nota_definitiva) >= 4.5. Uso HAVING porque WHERE filtra filas individuales antes de agrupar, mientras HAVING filtra los grupos resultantes tras la agregación."
    },
    {
      id: "ent_4",
      tipo: "Bases de Datos (SQL)",
      pregunta: "¿Cuándo usarías un LEFT JOIN en lugar de un INNER JOIN en el sistema académico?",
      rubrica: [
        "Identificar la necesidad de no perder registros de la tabla izquierda.",
        "Dar el ejemplo de estudiantes recién ingresados que no tienen materias matriculadas aún.",
        "Manejo de valores NULL resultantes a la derecha."
      ],
      respuestaModelo: "Usaría LEFT JOIN cuando necesito listar a TODOS los estudiantes de la universidad, independientemente de si ya tienen materias matriculadas o no. Con INNER JOIN los estudiantes de primer ingreso sin notas desaparecerían del reporte; con LEFT JOIN aparecen con valores NULL en las notas, permitiéndonos identificarlos."
    },
    {
      id: "ent_5",
      tipo: "Desarrollo Web & APIs",
      pregunta: "Si una petición POST para crear un estudiante tarda 10 segundos en responder, ¿cómo diagnosticarías el problema?",
      rubrica: [
        "Revisar pestaña Network de las herramientas de desarrollador (DevTools).",
        "Inspeccionar latencia del backend vs consulta en base de datos.",
        "Verificar si la tabla SQL tiene índices en las columnas de búsqueda.",
        "Verificar si se están ejecutando tareas pesadas síncronas que deberían ser asíncronas."
      ],
      respuestaModelo: "Comenzaría revisando la pestaña Network en el navegador para ver si el tiempo se gasta en TTFB (Time to First Byte, del servidor) o en transferencia. En el servidor colocaría logs de tiempo: si es la base de datos, revisaría si falta un índice en una llave foránea o si hay bloqueos de transacciones; si es envío de correos o procesamiento pesado, lo movería a una cola de tareas asíncronas."
    },
    {
      id: "ent_6",
      tipo: "Desarrollo Web & APIs",
      pregunta: "¿Cuál es la diferencia entre autenticación y autorización y qué códigos HTTP representan sus fallos?",
      rubrica: [
        "Definir autenticación como comprobación de identidad (quién eres).",
        "Definir autorización como comprobación de permisos (qué puedes hacer).",
        "Asociar 401 Unauthorized a autenticación y 403 Forbidden a autorización."
      ],
      respuestaModelo: "Autenticación es verificar quién es el usuario mediante contraseña o token; si falla, se retorna 401 Unauthorized. Autorización es verificar qué permisos o roles tiene ese usuario identificado; si un estudiante intenta borrar una materia de otro estudiante, el sistema sabe quién es pero no tiene permiso, retornando 403 Forbidden."
    },
    {
      id: "ent_7",
      tipo: "Control de Versiones (Git)",
      pregunta: "Si estás a mitad de una funcionalidad y te piden con urgencia cambiarte a 'main' para corregir un bug, ¿qué comandos usas?",
      rubrica: [
        "Mención de git stash para guardar cambios temporalmente.",
        "Cambio de rama con git checkout main o git switch main.",
        "Retorno y restauración de cambios con git stash pop."
      ],
      respuestaModelo: "Ejecutaría 'git stash' para guardar mis archivos modificados en la pila interna de Git sin ensuciar la historia. Luego me paso a main con 'git switch main', creo la rama del hotfix y cuando termine y regrese a mi rama, ejecuto 'git stash pop' para desapilar y continuar exactamente donde estaba."
    },
    {
      id: "ent_8",
      tipo: "Control de Versiones (Git)",
      pregunta: "¿Cómo le explicarías a un compañero de equipo qué es un conflicto de Git y cómo resolverlo?",
      rubrica: [
        "Explicar que ocurre cuando dos personas modificaron las mismas líneas del mismo archivo.",
        "Describir las marcas de conflicto (<<<<<<< HEAD, =======, >>>>>>>).",
        "Mencionar la edición manual consensuada y la finalización con git add y commit."
      ],
      respuestaModelo: "Le explicaría que un conflicto surge cuando Git no puede decidir automáticamente qué cambio conservar porque ambas ramas tocaron las mismas líneas. Abro el archivo, identifico la sección de HEAD (nuestra rama) y de la rama entrante, converso con mi compañero para definir cuál código es el correcto, borro las etiquetas de conflicto, guardo y hago git add y git commit."
    },
    {
      id: "ent_9",
      tipo: "Inteligencia Artificial Aplicada",
      pregunta: "Si en la CUC te piden crear un asistente de IA para que los estudiantes consulten el reglamento estudiantil, ¿cómo diseñarías la solución?",
      rubrica: [
        "Proponer arquitectura RAG en vez de re-entrenar el modelo.",
        "Mencionar chunking de los PDFs y generación de embeddings.",
        "Uso de base de datos vectorial para búsqueda por similitud semántica.",
        "Configurar temperatura baja (0.0 a 0.2) y System Prompt estricto."
      ],
      respuestaModelo: "Diseñaría un sistema RAG (Retrieval-Augmented Generation). Primero fragmentaría el reglamento en bloques de texto con solapamiento y generaría embeddings en una base vectorial como Pinecone o Chroma. Cuando el estudiante pregunte, busco los 3 artículos más pertinentes por similitud de coseno, los inyecto en el prompt con temperatura 0.0 y un System Prompt que le prohíba inventar y le exija citar el número de artículo."
    },
    {
      id: "ent_10",
      tipo: "Inteligencia Artificial Aplicada",
      pregunta: "¿Por qué un desarrollador nunca debe copiar ciegamente el código que genera ChatGPT o GitHub Copilot?",
      rubrica: [
        "Mención de alucinaciones de librerías (package hallucination).",
        "Riesgos de brechas de seguridad (inyección SQL, XSS, código desactualizado).",
        "Omisión de casos borde o manejo deficiente de excepciones.",
        "Responsabilidad legal y técnica del desarrollador."
      ],
      respuestaModelo: "Porque los LLMs generan secuencias de texto probabilísticas, no código garantizado. Pueden usar métodos deprecados, alucinar librerías inexistentes que pueden ser explotadas por atacantes, o ignorar casos borde como entradas nulas. Como desarrollador, mi responsabilidad es auditar línea por línea, entender el porqué de la lógica y escribir pruebas unitarias que verifiquen el comportamiento."
    },
    {
      id: "ent_11",
      tipo: "Lógica y Algoritmos",
      pregunta: "¿Cómo encontrarías si un número entero es primo en tiempo óptimo O(sqrt(N))?",
      rubrica: [
        "Descartar números menores o iguales a 1.",
        "Explicar que basta con verificar divisibilidad hasta la raíz cuadrada de N.",
        "Demostrar por qué los factores se repiten después de sqrt(N)."
      ],
      respuestaModelo: "Si N <= 1 no es primo. Para probar divisores, en lugar de recorrer hasta N en O(N), basta con iterar desde 2 hasta la raíz cuadrada de N (i * i <= N). Esto es porque si N tiene un factor mayor que su raíz, forzosamente el otro factor complementario debe ser menor. Esto reduce la complejidad a O(sqrt(N))."
    },
    {
      id: "ent_12",
      tipo: "POO y Arquitectura",
      pregunta: "¿Qué es el Encapsulamiento y qué problema previene en un sistema universitario?",
      rubrica: [
        "Definición de encapsulamiento como protección de atributos internos.",
        "Uso de métodos para aplicar reglas de negocio.",
        "Ejemplo: evitar que se asigne una nota de 8.5 o negativa."
      ],
      respuestaModelo: "El encapsulamiento consiste en hacer privados los atributos de un objeto y permitir su lectura o modificación únicamente a través de métodos controlados. En la CUC, evita que código externo asigne directamente nota = -10 o nota = 9.0; el método agregarNota(n) valida que la calificación esté estrictamente entre 0.0 y 5.0 antes de guardarla."
    },
    {
      id: "ent_13",
      tipo: "Bases de Datos (SQL)",
      pregunta: "¿Qué es un Índice en una base de datos relacional y cuál es su costo?",
      rubrica: [
        "Explicar que un índice acelera las consultas SELECT (búsquedas B-Tree O(log N)).",
        "Explicar el costo: ralentiza las inserciones y actualizaciones (INSERT/UPDATE) y ocupa espacio extra en disco."
      ],
      respuestaModelo: "Un índice es una estructura de datos (generalmente un árbol B) que acelera drásticamente las consultas de lectura SELECT en columnas muy buscadas, como la cédula o código del estudiante. Su costo es que ocupa memoria adicional y hace que las operaciones de escritura (INSERT, UPDATE, DELETE) sean más lentas porque el motor debe actualizar el índice en cada cambio."
    },
    {
      id: "ent_14",
      tipo: "Desarrollo Web & APIs",
      pregunta: "¿Qué es un Token JWT y qué ventajas tiene sobre las sesiones tradicionales en base de datos?",
      rubrica: [
        "Definir JWT como un token autocontenido y firmado digitalmente.",
        "Mencionar que es stateless (el servidor no necesita consultar la base de datos en cada petición).",
        "Facilidad de escalabilidad horizontal en microservicios."
      ],
      respuestaModelo: "Un JWT (JSON Web Token) contiene la información del usuario firmada criptográficamente en el propio token. A diferencia de las sesiones en memoria o base de datos que requieren una consulta I/O en cada petición HTTP, con JWT el backend simplemente valida la firma matemática con su clave secreta, permitiendo que la API sea sin estado y escale fácilmente entre varios servidores."
    },
    {
      id: "ent_15",
      tipo: "Inteligencia Artificial Aplicada",
      pregunta: "¿Qué es la Ventana de Contexto (Context Window) de un LLM y cómo gestionas textos que la superen?",
      rubrica: [
        "Definir la ventana de contexto como el límite máximo de tokens que el modelo puede retener a la vez.",
        "Mencionar técnicas: chunking de documentos, resúmenes jerárquicos o arquitectura RAG."
      ],
      respuestaModelo: "La ventana de contexto es la cantidad máxima de tokens que el modelo puede procesar conjuntamente entre entrada y salida. Si un reglamento de 500 páginas supera la ventana, no podemos adjuntarlo completo. La solución es dividirlo en fragmentos (chunking) y usar un índice vectorial para recuperar únicamente los 3 o 4 párrafos relevantes a la pregunta del estudiante."
    },
    {
      id: "ent_16",
      tipo: "Lógica y Algoritmos",
      pregunta: "¿Cómo eliminarías duplicados de un arreglo sin usar librerías externas ni la clase Set?",
      rubrica: [
        "Explicar el uso de un arreglo resultado y un objeto o diccionario auxiliar para registrar elementos vistos.",
        "Verificar existencia en O(1) con el objeto para mantener O(N) total."
      ],
      respuestaModelo: "Crearía un arreglo vacío para el resultado y un objeto auxiliar como tabla hash de vistos. Iteraría el arreglo original elemento por elemento; si el elemento no existe como clave en el objeto de vistos, lo agrego al resultado y marco vistos[elemento] = true. Esto resuelve el problema en O(N) de tiempo y O(N) de memoria."
    },
    {
      id: "ent_17",
      tipo: "Control de Versiones (Git)",
      pregunta: "¿Cuál es la diferencia entre 'git reset' y 'git revert' y cuándo usarías cada uno?",
      rubrica: [
        "git reset reescribe la historia local retrocediendo el puntero (riesgoso en ramas públicas).",
        "git revert crea un nuevo commit inverso que deshace los cambios de forma segura.",
        "Regla: usar reset en ramas personales locales y revert en main/producción compartida."
      ],
      respuestaModelo: "git reset mueve el puntero de la rama hacia atrás reescribiendo la historia, lo cual es ideal si solo está en mi máquina local. Pero si el commit ya fue subido a la rama main compartida por todo el equipo, reescribir la historia rompería los repositorios de los demás; en ese caso se usa git revert, que crea un nuevo commit que desactiva los cambios de forma segura."
    },
    {
      id: "ent_18",
      tipo: "Desarrollo Web & Seguridad",
      pregunta: "¿En qué consiste un ataque de Cross-Site Scripting (XSS) y cómo se previene en frontend?",
      rubrica: [
        "Definir XSS como la inyección de scripts JavaScript en el navegador de otros usuarios.",
        "Explicar consecuencias: robo de cookies de sesión, redirecciones maliciosas.",
        "Prevención: sanitizar entradas y escapar caracteres HTML especiales antes de renderizar."
      ],
      respuestaModelo: "XSS ocurre cuando una aplicación web muestra datos ingresados por usuarios sin sanitizarlos, permitiendo que un atacante guarde código JavaScript malicioso (por ejemplo en el campo de comentarios de un foro universitario). Cuando otros estudiantes abren la página, el script se ejecuta en sus navegadores pudiendo robar tokens. Se previene escapando caracteres como < y > y usando frameworks modernos como React o frameworks que desinfectan el DOM automáticamente."
    },
    {
      id: "ent_19",
      tipo: "Bases de Datos (SQL)",
      pregunta: "¿Qué significa que una transacción de base de datos cumpla con las propiedades ACID?",
      rubrica: [
        "Atomicidad: Todo se ejecuta o nada se ejecuta.",
        "Consistencia: La BD pasa de un estado válido a otro respetando restricciones.",
        "Aislamiento (Isolation): Transacciones concurrentes no interfieren entre sí.",
        "Durabilidad: Cambios confirmados sobreviven a reinicios o caídas."
      ],
      respuestaModelo: "ACID garantiza fiabilidad en bases de datos: Atomicidad asegura que si una transacción tiene 5 pasos (como matricular un curso y cobrar el valor) y el último falla, se hace rollback de todo. Consistencia preserva las reglas de integridad. Aislamiento impide que dos transacciones simultáneas se pisen datos. Y Durabilidad asegura que los datos confirmados no se pierdan si el servidor se apaga."
    },
    {
      id: "ent_20",
      tipo: "Inteligencia Artificial Aplicada",
      pregunta: "¿Qué es un System Prompt y en qué se diferencia del User Prompt?",
      rubrica: [
        "System Prompt define el rol, tono, restricciones y contexto base del modelo antes de interactuar.",
        "User Prompt es la instrucción específica o pregunta enviada por el usuario final.",
        "El System Prompt tiene mayor peso jerárquico para prevenir desviaciones del modelo."
      ],
      respuestaModelo: "El System Prompt establece las reglas fundamentales, la identidad y las restricciones del modelo (por ejemplo: 'Eres un evaluador académico de la CUC, responde únicamente en español y devuelve JSON'). El User Prompt es el mensaje dinámico del usuario ('Califica este texto'). El System Prompt asegura consistencia y evita que el usuario manipule fácilmente las reglas del sistema."
    },
    {
      id: "ent_21",
      tipo: "Lógica y Algoritmos",
      pregunta: "¿Cómo aplanarías un arreglo con múltiples niveles de anidación sin usar .flat()?",
      rubrica: [
        "Proponer un enfoque recursivo o con pila iterativa.",
        "Comprobar si el elemento actual es un arreglo (Array.isArray).",
        "Si es arreglo, llamar recursivamente; si no, agregar al resultado."
      ],
      respuestaModelo: "Crearía una función recursiva con un acumulador. Iteraría cada elemento de la lista: si el elemento es un arreglo mediante Array.isArray(), llamo a la función recursivamente pasando ese subarreglo; si es un elemento atómico, lo empujo al acumulador. Al finalizar devuelvo el acumulador plano."
    },
    {
      id: "ent_22",
      tipo: "Resolución de Problemas y Actitud",
      pregunta: "Si durante la prueba técnica presencial te quedas totalmente bloqueado en un ejercicio, ¿qué haces?",
      rubrica: [
        "No quedarse callado ni congelarse frente al evaluador.",
        "Comunicar honestamente el razonamiento hasta ese momento.",
        "Proponer un caso de prueba simplificado para desbloquear la lógica.",
        "Pedir clarificación o una pequeña pista al evaluador con madurez profesional."
      ],
      respuestaModelo: "En lugar de quedarme en silencio frustrado, le comunicaría al evaluador mi razonamiento: 'Tengo clara la entrada y salida, pero estoy dudando entre usar un mapa hash o dos punteros para optimizar el ciclo'. Simplificaría el problema con un ejemplo manual pequeño de 3 elementos en el tablero. Demostrar resiliencia, comunicación y serenidad ante la presión es lo que buscan en un futuro practicante."
    },
    {
      id: "ent_23",
      tipo: "Desarrollo Web & Rendimiento",
      pregunta: "¿Qué estrategias aplicarías si la página web de notas tarda demasiado en cargar en el navegador del estudiante?",
      rubrica: [
        "Comprimir imágenes y activos estáticos.",
        "Implementar paginación o carga diferida (lazy loading).",
        "Usar almacenamiento en caché (HTTP Caching / Service Workers).",
        "Minificar archivos JS/CSS."
      ],
      respuestaModelo: "Primero mediría con Lighthouse para identificar si el cuello de botella es red, renderizado o backend. Minificaría y comprimiría con Gzip/Brotli los archivos estáticos, implementaría lazy loading en imágenes y componentes pesados, activaría caché HTTP mediante cabeceras Cache-Control y paginaría los listados para no renderizar miles de registros en el DOM de golpe."
    },
    {
      id: "ent_24",
      tipo: "Inteligencia Artificial Aplicada",
      pregunta: "¿Cómo evaluarías la calidad de las respuestas de un modelo de IA en producción?",
      rubrica: [
        "Mención de métricas automáticas (similitud semántica, coherencia, tasa de alucinación).",
        "Evaluación con humanos en el bucle (Human-in-the-loop / feedback con pulgares arriba/abajo).",
        "Uso de un segundo LLM como evaluador (LLM-as-a-Judge) con rúbricas estrictas."
      ],
      respuestaModelo: "Combinaría tres capas: primero métricas de feedback directo de usuarios (botones de útil/no útil); segundo, un dataset de prueba curado con respuestas de referencia contra el que corro evaluaciones periódicas; y tercero, la técnica 'LLM-as-a-Judge', donde un modelo más potente evalúa las respuestas generadas contra una rúbrica de precisión y ausencia de alucinaciones."
    },
    {
      id: "ent_25",
      tipo: "Alineación Institucional CUC",
      pregunta: "¿Por qué te interesa realizar tus prácticas profesionales en el área de desarrollo de software de la Universidad de la Costa?",
      rubrica: [
        "Conocimiento del lema y visión de la CUC ('Formamos profesionales que transforman el mundo').",
        "Interés genuino por adquirir experiencia real en proyectos de software educativos e institucionales.",
        "Actitud de aprendizaje continuo, proactividad y aplicación de nuevas tecnologías como Inteligencia Artificial."
      ],
      respuestaModelo: "Me motiva enormemente porque la Universidad de la Costa es un referente de innovación educativa y transformación social en la región Caribe. Realizar mis prácticas aquí me permite aplicar mis bases de programación en proyectos reales con impacto directo en miles de estudiantes, mientras aprendo de un equipo profesional y aporto mi entusiasmo por la tecnología y las herramientas de Inteligencia Artificial."
    }
  ]
};
