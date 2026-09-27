# FitTracker - App de Seguimiento de Entrenamiento 🏋️‍♂️

FitTracker es un simulador interactivo para el registro y análisis de rutinas de gimnasio.

## 📋 Evolución del Proyecto

- **Pre-Entrega 1, 2, 3:** Lógica base, perfiles, bucles (`while`), condicionales y modularización con funciones.
- **Pre-Entrega 4 y 5:** Manejo de Arrays, creación de la `class Ejercicio`, uso de `this` e instanciación de objetos.
- **Pre-Entrega 6 (Actual):** Implementación de Funciones de Orden Superior (Higher-Order Functions) integradas a un menú interactivo.

## 🛠️ Funciones de Orden Superior Implementadas

1. **Métodos de Búsqueda:**
   - `.filter()`: Implementado en la Opción 1 del menú para crear un nuevo array filtrando los ejercicios según su grupo muscular (Push / Pull / Legs).
   - `.find()`: Implementado en la Opción 2 para buscar un objeto específico dentro del catálogo usando su propiedad nombre.

2. **Métodos de Transformación:**
   - `.map()`: Utilizado para extraer únicamente la propiedad `nombre` de los objetos y mostrarlos de forma amigable al usuario en alertas de texto plano.
   - `.reduce()`: Implementado en la Opción 4 al finalizar la sesión. Itera sobre el array `sesionDeHoy` calculando y sumando el volumen total de entrenamiento (series × reps × peso) de todos los ejercicios registrados.

## 🚀 Cómo probar el código
1. Abrí `index.html` en el navegador (el archivo JS está linkeado correctamente con `defer` en el `<head>`).
2. Interactuá con el menú mediante el `prompt`.
3. Revisá la consola (`F12`) para ver las impresiones detalladas de los arrays y objetos filtrados/encontrados.