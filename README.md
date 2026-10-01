# FitTracker - Simulador Interactivo de Entrenamiento y Control de Cargas

## Descripción del Proyecto
**FitTracker** es una aplicación web interactiva desarrollada para permitir a los usuarios planificar rutinas de fuerza, seleccionar ejercicios de una base de datos centralizada y calcular de forma automatizada el **volumen total de carga en kilogramos** (Series × Repeticiones × Peso).

Este proyecto constituye la **Entrega Final del curso de JavaScript**, integrando el consumo asíncrono de datos con Fetch, persistencia de estado mediante Web Storage, manipulación dinámica del DOM sin alertas nativas y librerías externas de interfaz de usuario.

---

## 🛠️ Tecnologías e Integraciones
* **HTML5 & CSS3:** Maquetación semántica, diseño responsivo CSS Grid y estilos personalizados.
* **JavaScript ES6+:** Programación Orientada a Objetos (Clases), manipulación del DOM, desacoplamiento de eventos y sintaxis avanzada (destructuring, operador ternario, operadores lógicos).
* **Fetch API (Async/Await):** Carga e integración asíncrona de la base de datos simulada en `/data/ejercicios.json`.
* **Web Storage (LocalStorage):** Persistencia y gestión completa de datos (guardar, modificar, eliminar y vaciar).
* **Librerías Externas:**
  * **SweetAlert2:** Para ventanas emergentes interactivas de confirmación y cierre del circuito de entrenamiento.
  * **Toastify.js:** Para notificaciones contextuales y no invasivas.

---

## 🚀 Instrucciones de Ejecución Local

Para garantizar la correcta ejecución del consumo asíncrono (`fetch`), el proyecto debe ser servido mediante un servidor HTTP local debido a las restricciones CORS de los navegadores al utilizar el protocolo `file://`.

### Pasos para ejecutar:
1. Clonar el repositorio: `git clone https://github.com/TU_USUARIO/fit-tracker.git`
2. Abrir la carpeta del proyecto en **Visual Studio Code**.
3. Iniciar un servidor HTTP local:
   * **Opción recomendada:** Hacer clic derecho sobre `index.html` y seleccionar **Open with Live Server**.
   * **Opción alternativa:** Ejecutar `npx serve` desde la terminal integrada en la raíz del proyecto.
4. Abrir la consola del navegador (**F12**) para inspeccionar los eventos y el estado de la aplicación.

---

## 📂 Estructura del Repositorio
```text
fit-tracker/
├── assets/
│   ├── favicon.svg          # Ícono de pestaña del navegador
│   └── logo.svg             # Logo principal de la aplicación
├── css/
│   └── style.css            # Estilos principales de la aplicación
├── data/
│   └── ejercicios.json      # Base de datos simulada en JSON
├── js/
│   └── main.js              # Lógica principal, asincronismo y eventos
├── index.html               # Archivo HTML único en raíz
└── README.md                # Documentación del proyecto

👤 Autor
Antonio Tomas Torquatti