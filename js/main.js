// ==========================================
// FitTracker - Pre-Entrega 7: Interfaz con DOM y Eventos
// ==========================================

// --- 1. CLASE Y DATOS BASE (Mantenemos la lógica intacta) ---
class Ejercicio {
    constructor(id, nombre, categoria, series = 0, reps = 0, peso = 0) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria; 
        this.series = series;
        this.reps = reps;
        this.peso = peso;
    }

    calcularVolumen() {
        return this.series * this.reps * this.peso;
    }
}

// Catálogo predefinido
const catalogo = [
    new Ejercicio(1, "Press de Banca", "Push"),
    new Ejercicio(2, "Flexiones", "Push"),
    new Ejercicio(3, "Dominadas", "Pull"),
    new Ejercicio(4, "Remo con Barra", "Pull"),
    new Ejercicio(5, "Sentadilla Libre", "Legs"),
    new Ejercicio(6, "Prensa", "Legs"),
    new Ejercicio(7, "Curl de Biceps", "Pull"),
    new Ejercicio(8, "Vuelos Laterales", "Push")
];

// Array para guardar los ejercicios de hoy
let sesionDeHoy = [];
let contadorIdSesion = 1;


// --- 2. SELECCIÓN DE ELEMENTOS DEL DOM ---
const seccionPerfil = document.getElementById('seccion-perfil');
const seccionApp = document.getElementById('seccion-app');
const formPerfil = document.getElementById('form-perfil');
const saludoUsuario = document.getElementById('saludo-usuario');

const catalogoList = document.getElementById('catalogo-list');
const buscadorEjercicios = document.getElementById('buscador-ejercicios');

const formEjercicio = document.getElementById('form-ejercicio');
const sesionList = document.getElementById('sesion-list');
const spanVolumenTotal = document.getElementById('volumen-total');


// --- 3. EVENTO 1: REGISTRO DE PERFIL (Reemplaza los prompts) ---
formPerfil.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Evita que se recargue la página

    // Capturo los valores de los inputs
    const nombre = document.getElementById('input-nombre').value;
    const pesoActual = parseFloat(document.getElementById('input-peso-actual').value);
    const pesoDeseado = parseFloat(document.getElementById('input-peso-deseado').value);
    const frecuencia = parseInt(document.getElementById('input-frecuencia').value);

    // La lógica original de cálculos
    let diferenciaPeso = pesoDeseado - pesoActual;
    let mensajeObjetivo = diferenciaPeso < 0 ? "bajar" : "subir";

    // Oculto el perfil y muestro la app
    seccionPerfil.classList.add('oculto');
    seccionApp.classList.remove('oculto');

    // Modifico el DOM para saludar
    saludoUsuario.innerHTML = `
        <h2>¡Hola ${nombre.toUpperCase()}! 👋</h2>
        <p>Tu objetivo es <strong>${mensajeObjetivo} ${Math.abs(diferenciaPeso)} kg</strong> entrenando ${frecuencia} días a la semana.</p>
    `;

    // Renderizo el catálogo por primera vez
    renderizarCatalogo(catalogo);
});


// --- 4. RENDERIZADO DINÁMICO DEL CATÁLOGO ---
function renderizarCatalogo(arrayEjercicios) {
    catalogoList.innerHTML = ''; // Limpiamos el contenedor

    if (arrayEjercicios.length === 0) {
        catalogoList.innerHTML = '<p class="text-muted">No se encontraron ejercicios.</p>';
        return;
    }

    arrayEjercicios.forEach(ej => {
        // Uso de backticks para inyectar HTML 
        const divItem = document.createElement('div');
        divItem.className = 'item';
        divItem.innerHTML = `
            <div class="item-info">
                <h4>${ej.nombre}</h4>
                <p>Categoría: <span class="tag">${ej.categoria}</span></p>
            </div>
            <button class="btn-secondary" style="width: auto; padding: 0.4rem;" onclick="copiarAlFormulario('${ej.nombre}')">Usar</button>
        `;
        catalogoList.appendChild(divItem);
    });
}

// Función auxiliar para que al clickear "Usar" en el catálogo, se llene el input
function copiarAlFormulario(nombreEj) {
    document.getElementById('ej-nombre').value = nombreEj;
}


// --- 5. EVENTO 2 (TECLADO): FILTRO DE BÚSQUEDA ---
buscadorEjercicios.addEventListener('keyup', (evento) => {
    const textoBusqueda = evento.target.value.toLowerCase();
    
    // Filtro usando el método filter de entregas pasadas
    const filtrados = catalogo.filter(ej => 
        ej.nombre.toLowerCase().includes(textoBusqueda) || 
        ej.categoria.toLowerCase().includes(textoBusqueda)
    );
    
    // Vuelvo a renderizar solo los filtrados
    renderizarCatalogo(filtrados);
});


// --- 6. EVENTO 3: AGREGAR EJERCICIO A LA SESIÓN ---
formEjercicio.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById('ej-nombre').value;
    const series = parseInt(document.getElementById('ej-series').value);
    const reps = parseInt(document.getElementById('ej-reps').value);
    const peso = parseFloat(document.getElementById('ej-peso').value);

    // Creo el objeto instanciando tu clase
    const nuevoEjercicio = new Ejercicio(contadorIdSesion, nombre, "Sesión", series, reps, peso);
    sesionDeHoy.push(nuevoEjercicio);
    contadorIdSesion++;

    // Reseteo el formulario
    formEjercicio.reset();

    // Actualizo la vista de la sesión
    renderizarSesion();
});


// --- 7. RENDERIZADO DE LA SESIÓN Y FEEDBACK VISUAL ---
function renderizarSesion() {
    sesionList.innerHTML = '';

    if (sesionDeHoy.length === 0) {
        sesionList.innerHTML = '<p class="text-muted">Todavía no agregaste ejercicios hoy.</p>';
        spanVolumenTotal.innerText = '0';
        return;
    }

    let volumenTotal = 0;

    sesionDeHoy.forEach(ej => {
        volumenTotal += ej.calcularVolumen();

        const divItem = document.createElement('div');
        divItem.className = 'item';
        divItem.innerHTML = `
            <div class="item-info">
                <h4>${ej.nombre}</h4>
                <p>${ej.series} series x ${ej.reps} reps | ${ej.peso} kg</p>
                <p class="text-muted">Volumen: ${ej.calcularVolumen()} kg</p>
            </div>
            <button class="btn-delete" onclick="eliminarDeSesion(${ej.id})">Eliminar</button>
        `;
        sesionList.appendChild(divItem);
    });

    // Actualizo el DOM con el volumen total calculado
    spanVolumenTotal.innerText = volumenTotal;
}

// Función para interactuar y eliminar un ítem agregado
function eliminarDeSesion(idDeseado) {
    sesionDeHoy = sesionDeHoy.filter(ej => ej.id !== idDeseado);
    renderizarSesion();
}