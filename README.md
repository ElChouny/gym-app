# FitTracker - Simulador de Rutinas y Volumen de Entrenamiento

## Descripción del Proyecto
FitTracker es una aplicación web interactiva diseñada para gestionar entrenamientos y calcular el volumen de carga (series x repeticiones x peso). Este proyecto es mi entrega para el curso de JavaScript, demostrando una arquitectura de estado moderna, persistencia local y comportamiento asíncrono.

## Características Nuevas (Pre-entrega 9: Asincronismo)
- **Temporizadores y Notificaciones:** Utilizo `setTimeout()` para generar eventos asíncronos sin bloquear el hilo principal. A los pocos segundos de iniciar sesión, se inyecta dinámicamente un aviso flotante ("Tip del día") que luego desaparece automáticamente.
- **Manejo de Errores Defensivo:** Implementé un bloque `try-catch-finally` durante la fase crítica de inicialización (cuando recupero y parseo los datos del `localStorage` con `JSON.parse()`). Si la cadena JSON resulta estar corrupta, el simulador captura el error en el `catch`, limpia la base de datos local para evitar el quiebre de la app y registra la auditoría en el `finally`.

## Características Anteriores (Pre-entrega 8)
- **Registro de Perfil:** Cálculos dinámicos basados en inputs del usuario.
- **Catálogo Interactivo:** Búsqueda en tiempo real mediante manipulación del array de objetos.
- **Persistencia de Datos (LocalStorage):** Sincronización continua del estado (sesión y perfil) usando JSON.
- **Operadores Modernos:** Utilización de Nullish Coalescing (`??`), operadores ternarios y destructuring.

## Estructura del Repositorio
- `index.html` (Vista principal)
- `css/` -> `style.css` (Hoja de estilos)
- `js/` -> `main.js` (Lógica central del simulador)

## Autor
Antonio Tomas Torquatti