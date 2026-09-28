# FitTracker - Simulador de Rutinas y Volumen de Entrenamiento

## Descripción del Proyecto
FitTracker es una aplicación web interactiva diseñada para gestionar entrenamientos y calcular el volumen de carga (series x repeticiones x peso). Este proyecto es mi entrega para el curso de JavaScript, donde aplico todo lo aprendido sobre manipulación del DOM, eventos, persistencia de datos y operadores modernos.

## Características (Pre-entrega 8)
- **Registro de Perfil:** Permite ingresar nombre, peso actual, peso deseado y días de entrenamiento para calcular el objetivo (subir/bajar de peso).
- **Catálogo Interactivo:** Búsqueda en tiempo real de ejercicios precargados por nombre o categoría.
- **Gestión de Sesión:** Permite agregar y eliminar ejercicios a la rutina diaria.
- **Cálculo Automático:** Calcula el volumen total de la sesión en tiempo real a través de un método de clase.
- **Persistencia de Datos (LocalStorage):** La aplicación mantiene el estado. Si se recarga la página (F5) o se cierra el navegador, tanto el perfil del usuario como la sesión de ejercicios se recuperan intactos utilizando `JSON.parse` y `JSON.stringify`.
- **Operadores Modernos y Destructuring:** Optimización del código mediante desestructuración de objetos, operadores ternarios (`? :`) y el operador Nullish Coalescing (`??`) para la inicialización de variables.

## Estructura del Código
- Utilizo Clases (`class Ejercicio`) con constructores y métodos propios.
- Genero contenido HTML de forma completamente dinámica mediante JavaScript, inyectando tarjetas de ejercicio en el DOM sin utilizar prompts ni alerts.
- Sincronizo el estado de mi array en JS con el LocalStorage en cada evento de agregar o eliminar (CRUD básico). Al extraer la información del Storage, vuelvo a instanciar los objetos para preservar los métodos de mi clase.

## Tecnologías Utilizadas
- HTML5
- CSS3 (Variables, Flexbox, Grid)
- JavaScript Vanilla (ES6+)

## Autor
Antonio Tomas Torquatti