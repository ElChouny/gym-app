# FitTracker - App de Seguimiento de Entrenamiento 🏋️‍♂️

FitTracker es un simulador de entrenamiento interactivo pensado para ofrecer un seguimiento completo de rutinas de gimnasio de forma accesible y gratuita.

## 📋 Descripción del Proyecto
En este módulo, el programa funciona como un **módulo de configuración de perfil de atleta**, procesando datos del usuario para definir metas de peso y calcular estimaciones de volumen semanal de entrenamiento.

## 📥 Datos que Solicita el Programa
Al cargar la página, la aplicación interactúa con el usuario solicitando:
1. **Nombre del usuario**: Texto para personalizar el flujo.
2. **Peso actual (en kg)**: Número (soporta decimales con `parseFloat`) para el punto de partida.
3. **Peso objetivo (en kg)**: Número para calcular la masa a ganar o perder.
4. **Días de entrenamiento por semana**: Número entero (1 a 7 con `parseInt`) para proyectar el volumen en minutos.

## 🚀 Pasos para Probar el Proyecto
1. Clona o descarga este repositorio en tu equipo.
2. Abre el archivo `index.html` en tu navegador web preferido (o utiliza la extensión **Live Server** en Visual Studio Code).
3. Interactúa con los mensajes emergentes (`prompt`) e ingresa tus datos.
4. Presiona **F12** en el navegador para abrir la **Consola de Desarrollador** (pestaña *Console*) y visualizar la salida detallada y estructurada del procesamiento de datos.