# FitTracker - App de Seguimiento de Entrenamiento 🏋️‍♂️

FitTracker es un simulador interactivo de seguimiento de entrenamiento para gimnasio desarrollado en JavaScript.

## 📋 Evolución del Proyecto
- **Módulo 1:** Configuración inicial del perfil de atleta (metas de peso y estimación de tiempo semanal).
- **Módulo 2 (Pre-Entrega 2):** Registro dinámico de una sesión de entrenamiento mediante un simulador con bucles (`while`) y estructuras condicionales (`if / else if / else`). Permite desglosar la rutina por ejercicios, series y repeticiones por serie, clasificando el enfoque (Fuerza Máxima, Hipertrofia o Resistencia Muscular) e informando el volumen total acumulado.

## ⚙️ Lógica de Control de Flujo
1. **Bucle de captura (`while`):** Registra múltiples ejercicios de forma iterativa hasta que el usuario ingresa la palabra clave `'ESC'`.
2. **Estructuras condicionales:**
   - Valida entradas numéricas positivas para series y repeticiones (`isNaN`).
   - Clasifica el esfuerzo según repeticiones por serie (Fuerza, Hipertrofia o Resistencia).
3. **Resumen acumulativo:** Muestra por alerta y consola total de ejercicios, series globales, volumen total de repeticiones y promedio por ejercicio.

## 🚀 Pasos para Probar el Proyecto
1. Abre `index.html` en tu navegador (o mediante **Live Server** en VS Code).
2. Completa los datos de perfil inicial.
3. Carga tus ejercicios indicando la cantidad de series y repeticiones por serie.
4. Escribe `ESC` en el nombre del ejercicio para cerrar la sesión.
5. Abre la consola de desarrollador (**F12**) para revisar el informe detallado y el resumen global.