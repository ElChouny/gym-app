// ==========================================
// FitTracker - Pre-Entrega 8: Storage, JSON y Operadores Modernos
// ==========================================

// --- 1. CLASE Y DATOS BASE ---
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


// --- 3. INICIALIZACIÓN (Persistencia y recuperación del estado) ---
document.addEventListener('DOMContentLoaded', () => {
    // Uso de Nullish Coalescing (??) para asignar null si no hay datos
    const perfilGuardado = JSON.parse(localStorage.getItem('fitTracker_perfil')) ?? null;
    
    if (perfilGuardado) {
        // Uso de DESTRUCTURING para extraer las propiedades del objeto guardado
        const { nombre, pesoActual, pesoDeseado, frecuencia } = perfilGuardado;
        activarSimulador(nombre, pesoActual, pesoDeseado, frecuencia);
    }

    // Uso de Nullish Coalescing (??) para iniciar con array vacío si no hay sesión
    const sesionGuardada = JSON.parse(localStorage.getItem('fitTracker_sesion')) ?? [];
    
    // Re-instancio los objetos para no perder los métodos de la clase
    sesionDeHoy = sesionGuardada.map(ej => {
        // DESTRUCTURING del objeto iterado
        const { id, nombre, categoria, series, reps, peso } = ej;
        return new Ejercicio(id, nombre, categoria, series, reps, peso);
    });
    
    // Operador TERNARIO (?) para calcular el próximo ID a utilizar
    contadorIdSesion = sesionDeHoy.length > 0 
        ? Math.max(...sesionDeHoy.map(ej => ej.id)) + 1 
        : 1;
        
    renderizarSesion();
});


// --- 4. EVENTO: REGISTRO DE PERFIL ---
formPerfil.addEventListener('submit', (evento) => {
    evento.preventDefault(); 

    // Capturo los valores
    const nombre = document.getElementById('input-nombre').value;
    const pesoActual = parseFloat(document.getElementById('input-peso-actual').value);
    const pesoDeseado = parseFloat(document.getElementById('input-peso-deseado').value);
    const frecuencia = parseInt(document.getElementById('input-frecuencia').value);

    // Guardo en LocalStorage
    const perfil = { nombre, pesoActual, pesoDeseado, frecuencia };
    localStorage.setItem('fitTracker_perfil', JSON.stringify(perfil));

    activarSimulador(nombre, pesoActual, pesoDeseado, frecuencia);
});

function activarSimulador(nombre, pesoActual, pesoDeseado, frecuencia) {
    let diferenciaPeso = pesoDeseado - pesoActual;
    
    // Operador TERNARIO (?) para definir si el objetivo es subir o bajar
    let mensajeObjetivo = diferenciaPeso < 0 ? "bajar" : "subir";

    seccionPerfil.classList.add('oculto');
    seccionApp.classList.remove('oculto');

    saludoUsuario.innerHTML = `
        <h2>¡Hola ${nombre.toUpperCase()}! 👋</h2>
        <p>Tu objetivo es <strong>${mensajeObjetivo} ${Math.abs(diferenciaPeso)} kg</strong> entrenando ${frecuencia} días a la semana.</p>
        <button class="btn-delete mt-20" onclick="borrarPerfil()">Cerrar sesión / Borrar Perfil</button>
    `;

    renderizarCatalogo(catalogo);
}

function borrarPerfil() {
    localStorage.removeItem('fitTracker_perfil');
    localStorage.removeItem('fitTracker_sesion');
    location.reload(); 
}


// --- 5. RENDERIZADO DEL CATÁLOGO Y BÚSQUEDA ---
function renderizarCatalogo(arrayEjercicios) {
    catalogoList.innerHTML = ''; 

    // Operador TERNARIO para manejar el renderizado vacío vs con datos
    arrayEjercicios.length === 0 
        ? catalogoList.innerHTML = '<p class="text-muted">No se encontraron ejercicios.</p>'
        : arrayEjercicios.forEach(ej => {
            // DESTRUCTURING para no tener que escribir ej.nombre y ej.categoria
            const { nombre, categoria } = ej;
            
            const divItem = document.createElement('div');
            divItem.className = 'item';
            divItem.innerHTML = `
                <div class="item-info">
                    <h4>${nombre}</h4>
                    <p>Categoría: <span class="tag">${categoria}</span></p>
                </div>
                <button class="btn-secondary" style="width: auto; padding: 0.4rem;" onclick="copiarAlFormulario('${nombre}')">Usar</button>
            `;
            catalogoList.appendChild(divItem);
        });
}

function copiarAlFormulario(nombreEj) {
    document.getElementById('ej-nombre').value = nombreEj;
}

buscadorEjercicios.addEventListener('keyup', (evento) => {
    const textoBusqueda = evento.target.value.toLowerCase();
    
    const filtrados = catalogo.filter(ej => 
        ej.nombre.toLowerCase().includes(textoBusqueda) || 
        ej.categoria.toLowerCase().includes(textoBusqueda)
    );
    
    renderizarCatalogo(filtrados);
});


// --- 6. EVENTO: AGREGAR EJERCICIO A LA SESIÓN (Actualización de estado) ---
formEjercicio.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById('ej-nombre').value;
    const series = parseInt(document.getElementById('ej-series').value);
    const reps = parseInt(document.getElementById('ej-reps').value);
    const peso = parseFloat(document.getElementById('ej-peso').value);

    // Agrego al array de datos en JS
    const nuevoEjercicio = new Ejercicio(contadorIdSesion, nombre, "Sesión", series, reps, peso);
    sesionDeHoy.push(nuevoEjercicio);
    contadorIdSesion++;

    // Guardo versión actualizada en localStorage
    localStorage.setItem('fitTracker_sesion', JSON.stringify(sesionDeHoy));

    formEjercicio.reset();
    
    // Vuelvo a renderizar la vista
    renderizarSesion();
});


// --- 7. RENDERIZADO DE LA SESIÓN ---
function renderizarSesion() {
    sesionList.innerHTML = '';

    if (sesionDeHoy.length === 0) {
        sesionList.innerHTML = '<p class="text-muted">Todavía no agregaste ejercicios hoy.</p>';
        spanVolumenTotal.innerText = '0';
        return;
    }

    let volumenTotal = 0;

    sesionDeHoy.forEach(ej => {
        // DESTRUCTURING
        const { id, nombre, series, reps, peso } = ej;
        const volumen = ej.calcularVolumen(); 
        
        volumenTotal += volumen;

        const divItem = document.createElement('div');
        divItem.className = 'item';
        divItem.innerHTML = `
            <div class="item-info">
                <h4>${nombre}</h4>
                <p>${series} series x ${reps} reps | ${peso} kg</p>
                <p class="text-muted">Volumen: ${volumen} kg</p>
            </div>
            <button class="btn-delete" onclick="eliminarDeSesion(${id})">Eliminar</button>
        `;
        sesionList.appendChild(divItem);
    });

    spanVolumenTotal.innerText = volumenTotal;
}

function eliminarDeSesion(idDeseado) {
    // Actualizo el array (estado)
    sesionDeHoy = sesionDeHoy.filter(ej => ej.id !== idDeseado);
    
    // Sincronizo con LocalStorage
    localStorage.setItem('fitTracker_sesion', JSON.stringify(sesionDeHoy));
    
    // Renderizo la vista
    renderizarSesion();
}