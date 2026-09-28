// ==========================================
// FitTracker - Pre-Entrega 10: Fetch, Async/Await y Librerías
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

// Inicializo el catálogo vacío. Se llenará con el fetch.
let catalogo = [];

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


// --- 3. INICIALIZACIÓN (Storage) ---
document.addEventListener('DOMContentLoaded', () => {
    let perfilGuardado = null;
    let sesionGuardada = [];

    try {
        const storagePerfil = localStorage.getItem('fitTracker_perfil');
        if (storagePerfil) perfilGuardado = JSON.parse(storagePerfil);

        const storageSesion = localStorage.getItem('fitTracker_sesion');
        if (storageSesion) sesionGuardada = JSON.parse(storageSesion);
    } catch (error) {
        console.error("⚠️ Error al leer LocalStorage.", error);
        localStorage.removeItem('fitTracker_perfil');
        localStorage.removeItem('fitTracker_sesion');
    } 
    
    if (perfilGuardado) {
        const { nombre, pesoActual, pesoDeseado, frecuencia } = perfilGuardado;
        activarSimulador(nombre, pesoActual, pesoDeseado, frecuencia);
    }

    sesionDeHoy = sesionGuardada.map(ej => {
        const { id, nombre, categoria, series, reps, peso } = ej;
        return new Ejercicio(id, nombre, categoria, series, reps, peso);
    });
    
    contadorIdSesion = sesionDeHoy.length > 0 
        ? Math.max(...sesionDeHoy.map(ej => ej.id)) + 1 
        : 1;
        
    renderizarSesion();
});


// --- 4. EVENTO: REGISTRO DE PERFIL ---
formPerfil.addEventListener('submit', (evento) => {
    evento.preventDefault(); 

    const nombre = document.getElementById('input-nombre').value;
    const pesoActual = parseFloat(document.getElementById('input-peso-actual').value);
    const pesoDeseado = parseFloat(document.getElementById('input-peso-deseado').value);
    const frecuencia = parseInt(document.getElementById('input-frecuencia').value);

    const perfil = { nombre, pesoActual, pesoDeseado, frecuencia };
    localStorage.setItem('fitTracker_perfil', JSON.stringify(perfil));

    activarSimulador(nombre, pesoActual, pesoDeseado, frecuencia);
});

function activarSimulador(nombre, pesoActual, pesoDeseado, frecuencia) {
    let diferenciaPeso = pesoDeseado - pesoActual;
    let mensajeObjetivo = diferenciaPeso < 0 ? "bajar" : "subir";

    seccionPerfil.classList.add('oculto');
    seccionApp.classList.remove('oculto');

    saludoUsuario.innerHTML = `
        <h2>¡Hola ${nombre.toUpperCase()}! 👋</h2>
        <p>Tu objetivo es <strong>${mensajeObjetivo} ${Math.abs(diferenciaPeso)} kg</strong> entrenando ${frecuencia} días a la semana.</p>
        <button class="btn-delete mt-20" onclick="borrarPerfil()">Cerrar sesión / Borrar Perfil</button>
    `;

    // Llamo a la función asíncrona que trae los datos
    obtenerEjercicios();
}

function borrarPerfil() {
    localStorage.removeItem('fitTracker_perfil');
    localStorage.removeItem('fitTracker_sesion');
    location.reload(); 
}


// --- 5. ASINCRONISMO: FETCH A JSON LOCAL Y MANEJO DE ERRORES ---
async function obtenerEjercicios() {
    try {
        // Feedback visual mientras carga
        catalogoList.innerHTML = '<p class="text-muted">Cargando base de datos de ejercicios...</p>';

        // Realizo la petición asíncrona
        const respuesta = await fetch('./data/ejercicios.json');
        
        // Verifico que la respuesta de red sea exitosa
        if (!respuesta.ok) {
            throw new Error(`No se pudo cargar el archivo. Código: ${respuesta.status}`);
        }

        const data = await respuesta.json();
        
        // Transformo los datos planos en mi clase Ejercicio
        catalogo = data.map(ej => new Ejercicio(ej.id, ej.nombre, ej.categoria));

        // Muestro los datos en el DOM
        renderizarCatalogo(catalogo);

        // Notificación de éxito usando la librería Toastify
        Toastify({
            text: "✅ Catálogo cargado con éxito",
            duration: 3000,
            gravity: "bottom", 
            position: "right", 
            style: { background: "#4caf50" }
        }).showToast();

    } catch (error) {
        // Capturo el error si falla el fetch
        console.error("Error en la petición:", error);
        catalogoList.innerHTML = '<p class="text-danger">Error al cargar el catálogo de ejercicios. Intenta recargar la página.</p>';
        
        // Notificación de error con Toastify
        Toastify({
            text: "❌ Error de conexión al cargar ejercicios",
            duration: 4000,
            gravity: "bottom", 
            position: "right", 
            style: { background: "#f44336" }
        }).showToast();

    } finally {
        // Este bloque se ejecuta siempre, garantizando auditoría
        console.log("Proceso de petición fetch (obtenerEjercicios) finalizado.");
    }
}


// --- 6. RENDERIZADO DEL CATÁLOGO Y BÚSQUEDA ---
function renderizarCatalogo(arrayEjercicios) {
    catalogoList.innerHTML = ''; 

    arrayEjercicios.length === 0 
        ? catalogoList.innerHTML = '<p class="text-muted">No se encontraron ejercicios.</p>'
        : arrayEjercicios.forEach(ej => {
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


// --- 7. EVENTO: AGREGAR EJERCICIO Y RENDERIZAR SESIÓN ---
formEjercicio.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById('ej-nombre').value;
    const series = parseInt(document.getElementById('ej-series').value);
    const reps = parseInt(document.getElementById('ej-reps').value);
    const peso = parseFloat(document.getElementById('ej-peso').value);

    const nuevoEjercicio = new Ejercicio(contadorIdSesion, nombre, "Sesión", series, reps, peso);
    sesionDeHoy.push(nuevoEjercicio);
    contadorIdSesion++;

    localStorage.setItem('fitTracker_sesion', JSON.stringify(sesionDeHoy));
    formEjercicio.reset();
    renderizarSesion();

    // Librería: Feedback al usuario al agregar un ejercicio
    Toastify({
        text: `💪 ${nombre} agregado a tu rutina`,
        duration: 2500,
        gravity: "top", 
        position: "center", 
        style: { background: "#007bff", borderRadius: "8px" }
    }).showToast();
});

function renderizarSesion() {
    sesionList.innerHTML = '';

    if (sesionDeHoy.length === 0) {
        sesionList.innerHTML = '<p class="text-muted">Todavía no agregaste ejercicios hoy.</p>';
        spanVolumenTotal.innerText = '0';
        return;
    }

    let volumenTotal = 0;

    sesionDeHoy.forEach(ej => {
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
    sesionDeHoy = sesionDeHoy.filter(ej => ej.id !== idDeseado);
    localStorage.setItem('fitTracker_sesion', JSON.stringify(sesionDeHoy));
    renderizarSesion();
    
    Toastify({
        text: "🗑️ Ejercicio eliminado",
        duration: 2000,
        gravity: "top",
        position: "center",
        style: { background: "#6c757d", borderRadius: "8px" }
    }).showToast();
}