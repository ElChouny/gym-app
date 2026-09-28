# FitTracker - Simulador de Rutinas y Volumen de Entrenamiento

## Descripción del Proyecto
FitTracker es una aplicación web interactiva diseñada para gestionar entrenamientos y calcular el volumen de carga (series x repeticiones x peso). Este proyecto es mi entrega para el curso de JavaScript, demostrando una arquitectura de estado moderna, persistencia local y comportamiento asíncrono con consumo de APIs.

## Características Nuevas (Pre-entrega 10: Fetch y Librerías)
- **Consumo de API Local (Fetch API):** Migré el catálogo estático a un archivo `ejercicios.json` dentro de una carpeta `/data`. Implementé una función asíncrona (`async/await`) para consumir esta data simulando una base de datos real.
- **Manejo de Errores Defensivo:** Utilizo la estructura `try-catch-finally` dentro de la petición Fetch. Si el archivo JSON no está disponible o la red falla, capturo el error y notifico al usuario sin romper el código.
- **Integración de Librería (Toastify):** Reemplacé los console.logs y alertas nativas incorporando la librería Toastify vía CDN para brindar un feedback elegante y no bloqueante (Notificaciones de carga exitosa, error de conexión, y alertas al agregar/eliminar ejercicios de la rutina).

## Características Anteriores
- **Registro de Perfil:** Cálculos dinámicos basados en inputs del usuario.
- **Persistencia de Datos (LocalStorage):** Sincronización continua del estado usando JSON.
- **Operadores Modernos:** Utilización de Nullish Coalescing (`??`), operadores ternarios y destructuring.

## Estructura del Repositorio
- `index.html` (Vista principal)
- `data/` -> `ejercicios.json` (Base de datos simulada)
- `css/` -> `style.css` (Hoja de estilos)
- `js/` -> `main.js` (Lógica central del simulador)

## Autor
Antonio Tomas Torquatti