# FitTracker - App de Seguimiento de Entrenamiento 🏋️‍♂️

FitTracker es un simulador interactivo para el registro y análisis de rutinas de gimnasio, desarrollado de forma evolutiva en JavaScript.

## 📋 Evolución del Proyecto

- **Pre-Entrega 1 & 2:** Perfil de atleta, uso de variables, condicionales (`if/else`) y bucles (`while`).
- **Pre-Entrega 3:** Modularización del código usando Funciones (Declaradas y Flecha).
- **Pre-Entrega 4:** Manejo de Arrays, métodos de manipulación (`push`, `unshift`, `pop`) e iteración con `for...of`.
- **Pre-Entrega 5 (Actual):** Modelado de datos mediante **Clases (Class)**, uso de `this`, métodos de instancia, y creación de objetos mediante el operador `new`.

## 🛠️ Implementación de Objetos y Clases

1. **Clase Principal (`EjercicioGym`):**
   - Sirve como "molde" o fábrica para cada actividad registrada en el simulador.
2. **Propiedades Inicializadas (con `this`):**
   - `nombre` (String), `series` (Number), `repsPorSerie` (Number), `pesoCargado` (Number), `volumenTotal` (Number), `enfoque` (String).
3. **Métodos de Instancia:**
   - `calcularVolumen()`: Modifica la propiedad `volumenTotal` multiplicando series, reps y peso.
   - `determinarEnfoque()`: Modifica la propiedad `enfoque` evaluando la cantidad de repeticiones ingresadas.
   - `aumentarPeso(kgExtra)`: Método que actualiza una propiedad del objeto y gatilla un recálculo interno.
4. **Instanciación:**
   - Se crearon múltiples instancias usando `new EjercicioGym(...)` tanto de forma estática (para validación por consola) como de forma dinámica dentro del bucle interactivo de la app.

## 🚀 Pasos para Probar el Proyecto

1. Abrí `index.html` en tu navegador web.
2. Presioná **F12** y abrí la pestaña **Consola** para visualizar cómo se instancian los 3 objetos de prueba requeridos por la consigna.
3. Completá tu nombre y días de entrenamiento en las ventanas emergentes.
4. Ingresá ejercicios reales en el bucle interactivo. Cada ejercicio se instanciará como un nuevo **Objeto** y se guardará en un Array de la sesión.
5. Escribí `ESC` para finalizar la carga y ver el recorrido final de todos los objetos en la consola.