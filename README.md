# FitTracker - App de Seguimiento de Entrenamiento 🏋️‍♂️

FitTracker es un simulador interactivo para el registro y análisis de rutinas de gimnasio, desarrollado de forma evolutiva en JavaScript.

## 📋 Evolución del Proyecto

- **Pre-Entrega 1:** Configuración inicial del perfil del atleta (cálculo de metas de peso y proyección de tiempo semanal).
- **Pre-Entrega 2:** Control de flujo interactivo mediante bucles (`while`) y condicionales (`if / else`) para el registro continuo de ejercicios.
- **Pre-Entrega 3:** Modularización con **Funciones Declaradas** y **Funciones Flecha**, paso de parámetros, retornos (`return`) y procesamiento encadenado.
- **Pre-Entrega 4 (Actual):** Uso e interacción con **Arrays** para administrar el catálogo oficial de ejercicios del gimnasio (métodos de extremos, búsqueda, actualización por índice e iteración).

## 🛠️ Métodos y Operaciones con Arrays Implementadas

1. **Creación e Inicialización:** Array `catalogoEjercicios` con 5 elementos semánticos iniciales.
2. **Manipulación de Extremos:**
   - `push()`: Agrega un nuevo ejercicio al final de la colección.
   - `unshift()`: Agrega un ejercicio de prioridad/calentamiento al inicio.
   - `pop()`: Elimina el último elemento y lo muestra en consola (`Se ha eliminado el elemento: [nombre]`).
3. **Búsqueda y Validación:**
   - `includes()`: Verifica la existencia de un ejercicio solicitado por `prompt`.
   - `indexOf()`: Retorna el índice/posición exacta del elemento buscado.
4. **Actualización por Índice:**
   - `splice()`: Reemplaza un elemento concreto en una posición del array sin alterar el resto.
5. **Recorrido Iterativo:**
   - Bucle `for...of` dentro de la función `listarCatalogoEjercicios(lista)` para imprimir el catálogo formateado.

## 🚀 Pasos para Probar el Proyecto

1. Abrí `index.html` en tu navegador web o mediante la extensión **Live Server** en VS Code.
2. Completá los datos del perfil de usuario.
3. Observá las operaciones automáticas sobre el catálogo en la consola y realizá una búsqueda interactiva por cuadro de diálogo.
4. Cargá los ejercicios realizados durante la sesión (escribí `ESC` para finalizar).
5. Presioná **F12** para verificar los registros en la consola del navegador.