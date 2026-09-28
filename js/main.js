// ==========================================
// FitTracker - Pre-Entrega 9: Asincronismo y Promesas
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


// --- 3. INICIALIZACIÓN Y MANEJO DE ERRORES (try-catch-finally) ---
document.addEventListener('DOMContentLoaded', () => {
    let perfilGuardado = null;
    let sesionGuardada = [];

    // Utilizo try-catch para evitar que un JSON corrupto rompa mi simulador
    try {
        const storagePerfil = localStorage.getItem('fitTracker_perfil');
        if (storagePerfil) {
            perfilGuardado = JSON.parse(storagePerfil);
        }

        const storageSesion = localStorage.getItem('fitTracker_sesion');
        if (storageSesion) {
            sesionGuardada = JSON.parse(storageSesion);
        }
    } catch (error) {
        console.error("⚠️ Error al leer los datos guardados en LocalStorage. Reiniciando estado.", error);
        // Si hay error (ej. modificaron el JSON a mano en el navegador), limpio el storage por seguridad
        localStorage.removeItem('fitTracker_perfil');
        localStorage.removeItem('fitTracker_sesion');
    } finally {
        // Este bloque se ejecuta siempre, indicando que la fase de carga finalizó
        console.log("✔️ Intento de carga de datos inicializado (Bloque finally ejecutado).");
    }
    
    // Si la lectura fue exitosa, procedo a inicializar la app
    if (perfilGuardado) {
        const { nombre, pesoActual, pesoDeseado, frecuencia } = perfilGuardado;
        activarSimulador(nombre, pesoActual, pesoDeseado, frecuencia);
    }

    // Re-instancio los objetos de la sesión para no perder los métodos de la clase
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

    renderizarCatalogo(catalogo);
    
    // Llamo a mi temporizador asíncrono
    mostrarNotificacionAsincrona();
}

function borrarPerfil() {
    localStorage.removeItem('fitTracker_perfil');
    localStorage.removeItem('fitTracker_sesion');
    location.reload(); 
}


// --- 5. ASINCRONISMO (Temporizador con setTimeout) ---
function mostrarNotificacionAsincrona() {
    // Genero una espera de 3 segundos antes de mostrar el mensaje
    setTimeout(() => {
        // Creo el elemento dinámicamente desde JS
        const notificacion = document.createElement('div');
        notificacion.innerHTML = `<p>🔔 <strong>Tip del día:</strong> ¡No olvides mantenerte hidratado durante tu rutina!</p>`;
        
        // Le aplico estilos en línea para asegurarme de que se vea por encima de todo
        notificacion.style.position = 'fixed';
        notificacion.style.bottom = '20px';
        notificacion.style.right = '20px';
        notificacion.style.backgroundColor = '#2c3e50';
        notificacion.style.color = '#fff';
        notificacion.style.padding = '15px 20px';
        notificacion.style.borderRadius = '8px';
        notificacion.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        notificacion.style.zIndex = '9999';
        notificacion.style.transition = 'opacity 0.5s ease';
        notificacion.style.opacity = '0';
        
        document.body.appendChild(notificacion);

        // Hago que aparezca suavemente
        setTimeout(() => notificacion.style.opacity = '1', 100);

        // Lo elimino del DOM después de 5 segundos para no molestar al usuario
        setTimeout(() => {
            notificacion.style.opacity = '0';
            setTimeout(() => notificacion.remove(), 500); 
        }, 5000);

    }, 3000); // 3000ms = 3 segundos de retraso inicial
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
}