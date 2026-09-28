🏋️ FitTracker - Simulador de Entrenamiento

Este proyecto es un simulador interactivo para la gestión y seguimiento de rutinas de entrenamiento. Está desarrollado con JavaScript Vanilla y estructurado mediante manipulación del DOM y manejo de eventos.

📌 Estado del Proyecto

Pre-Entrega 7: Interfaz dinámica con DOM y eventos.
En esta etapa, el proyecto migró completamente de las alertas y prompts en consola a una interfaz gráfica y dinámica 100% funcional en el navegador.

🚀 Funcionalidades Principales

Gestión de Perfil de Usuario:

Al iniciar, la aplicación solicita los datos básicos (nombre, peso actual, peso deseado y frecuencia de entrenamiento).

Calcula automáticamente si el objetivo es de déficit (bajar de peso) o superávit (subir de peso) y genera un mensaje personalizado.

Catálogo Dinámico de Ejercicios:

Muestra una lista de ejercicios predefinidos estructurados bajo el concepto Push/Pull/Legs.

Buscador en tiempo real: Permite filtrar los ejercicios del catálogo por nombre o categoría mediante eventos de teclado (keyup).

Registro de Sesión Diaria:

Un formulario permite registrar los ejercicios realizados en el día ingresando nombre, series, repeticiones y peso.

La lista de la sesión se actualiza visualmente al instante sin recargar la página.

Permite eliminar un ejercicio registrado en caso de error.

Cálculo de Volumen Total:

A medida que se agregan ejercicios, el simulador calcula y actualiza en pantalla el volumen total movido en la sesión (Series × Repeticiones × Peso).

📁 Estructura de Archivos

El proyecto respeta la siguiente estructura de carpetas:

/
├── index.html       # Estructura principal de la interfaz
├── css/
│   └── style.css    # Estilos de la aplicación
└── js/
    └── main.js      # Lógica de la aplicación y manipulación del DOM


🛠️ Conocimientos Técnicos Aplicados

Sintaxis y Lógica en JS: Variables, condicionales, bucles, funciones.

Programación Orientada a Objetos (POO): Clases y métodos para el modelado de los ejercicios.

Arrays y Funciones de Orden Superior: Uso de métodos como filter(), map(), push(), y forEach() para gestionar las colecciones de datos.

Interacción con HTML (DOM): Uso de getElementById, createElement, innerHTML y manipulación de clases CSS desde JavaScript.

Eventos: Manejo de eventos submit (formularios), click (botones de acción) y keyup (búsqueda dinámica).

💻 Instrucciones de Uso

Clonar o descargar el repositorio.

Abrir el archivo index.html en cualquier navegador web moderno.

Completar el perfil inicial para acceder al simulador de rutinas.