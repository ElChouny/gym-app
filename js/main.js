// ==========================================
// FitTracker - Aplicación Web Interactiva
// ==========================================

(() => {
    'use strict';

    // --- 1. CLASE Y MODELO DE DATOS ---
    class Ejercicio {
        constructor(id, nombre, categoria, series = 0, reps = 0, peso = 0) {
            this.id = id;
            this.nombre = nombre;
            this.categoria = categoria; 
            this.series = series;
            this.reps = reps;
            this.peso = peso;
        }

        // Método para calcular el volumen total
        calcularVolumen() {
            return this.series * this.reps * this.peso;
        }
    }

    // Estado global de la aplicación
    let catalogoEjercicios = [];
    let sesionDeHoy = [];
    let contadorIdSesion = 1;

    // --- 2. CAPTURA DE ELEMENTOS DEL DOM ---
    const seccionPerfil = document.getElementById('seccion-perfil');
    const seccionApp = document.getElementById('seccion-app');
    const formPerfil = document.getElementById('form-perfil');
    const saludoUsuario = document.getElementById('saludo-usuario');
    const tipDiaContainer = document.getElementById('tip-dia-container');

    const catalogoList = document.getElementById('catalogo-list');
    const buscadorEjercicios = document.getElementById('buscador-ejercicios');

    const formEjercicio = document.getElementById('form-ejercicio');
    const sesionList = document.getElementById('sesion-list');
    const spanVolumenTotal = document.getElementById('volumen-total');
    const btnVaciarRutina = document.getElementById('btn-vaciar-rutina');
    const btnFinalizarSesion = document.getElementById('btn-finalizar-sesion');


    // --- 3. INICIALIZACIÓN Y PERSISTENCIA (Storage) ---
    document.addEventListener('DOMContentLoaded', () => {
        let perfilGuardado = null;
        let sesionGuardada = [];

        try {
            // Operador Lógico OR / Nullish Coalescing para inicialización limpia
            const storagePerfil = localStorage.getItem('fitTracker_perfil');
            perfilGuardado = storagePerfil ? JSON.parse(storagePerfil) : null;

            const storageSesion = localStorage.getItem('fitTracker_sesion');
            sesionGuardada = storageSesion ? JSON.parse(storageSesion) : [];
        } catch (error) {
            console.error("Error al leer LocalStorage. Reajustando estado.", error);
            localStorage.removeItem('fitTracker_perfil');
            localStorage.removeItem('fitTracker_sesion');
        } 
        
        // Si el usuario ya configuró su perfil, activamos la app
        if (perfilGuardado) {
            const { nombre, pesoActual, pesoDeseado, frecuencia } = perfilGuardado; // Destructuring
            activarSimulador(nombre, pesoActual, pesoDeseado, frecuencia);
        }

        // Rehidratación de instancias de clase mediante la HOF .map()
        sesionDeHoy = sesionGuardada.map(ej => {
            const { id, nombre, categoria, series, reps, peso } = ej;
            return new Ejercicio(id, nombre, categoria, series, reps, peso);
        });
        
        // Asignación de ID consecutivo
        contadorIdSesion = sesionDeHoy.length > 0 
            ? Math.max(...sesionDeHoy.map(ej => ej.id)) + 1 
            : 1;
            
        renderizarSesion();
        mostrarTipDelDia();
        configurarDelegacionEventos();
    });


    // --- 4. REGISTRO Y CONFIGURACIÓN DE PERFIL ---
    formPerfil.addEventListener('submit', (evento) => {
        evento.preventDefault(); 

        const nombre = document.getElementById('input-nombre').value.trim();
        const pesoActual = parseFloat(document.getElementById('input-peso-actual').value);
        const pesoDeseado = parseFloat(document.getElementById('input-peso-deseado').value);
        const frecuencia = parseInt(document.getElementById('input-frecuencia').value);

        if (!nombre || isNaN(pesoActual) || isNaN(pesoDeseado) || isNaN(frecuencia)) return;

        const perfil = { nombre, pesoActual, pesoDeseado, frecuencia };
        localStorage.setItem('fitTracker_perfil', JSON.stringify(perfil));

        activarSimulador(nombre, pesoActual, pesoDeseado, frecuencia);
    });

    function activarSimulador(nombre, pesoActual, pesoDeseado, frecuencia) {
        // Uso de Operador Ternario
        const diferenciaPeso = pesoDeseado - pesoActual;
        const mensajeObjetivo = diferenciaPeso < 0 ? "bajar" : "subir";

        seccionPerfil.classList.add('oculto');
        seccionApp.classList.remove('oculto');

        // Manipulación limpia del DOM para prevenir inyección XSS
        saludoUsuario.textContent = '';

        const h2 = document.createElement('h2');
        h2.textContent = `¡Hola ${nombre.toUpperCase()}! 👋`;

        const p = document.createElement('p');
        p.innerHTML = `Tu objetivo es <strong>${mensajeObjetivo} ${Math.abs(diferenciaPeso)} kg</strong> entrenando ${frecuencia} días por semana.`;

        const btnCerrar = document.createElement('button');
        btnCerrar.className = 'btn-delete mt-20';
        btnCerrar.id = 'btn-borrar-perfil';
        btnCerrar.textContent = 'Borrar Perfil y Reiniciar App';

        saludoUsuario.appendChild(h2);
        saludoUsuario.appendChild(p);
        saludoUsuario.appendChild(btnCerrar);

        obtenerEjercicios();
    }

    function solicitarConfirmacionBorrarPerfil() {
        Swal.fire({
            title: '¿Borrar perfil y datos?',
            text: "Esta acción vaciará completamente el Storage del simulador.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#334155',
            confirmButtonText: 'Sí, borrar todo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear(); 
                location.reload(); 
            }
        });
    }


    // --- 5. ASINCRONISMO: FETCH CON ASYNC/AWAIT Y TRY-CATCH-FINALLY ---
    async function obtenerEjercicios() {
        try {
            catalogoList.innerHTML = '<p class="text-muted">Cargando base de datos de ejercicios...</p>';

            const respuesta = await fetch('./data/ejercicios.json');
            
            if (!respuesta.ok) {
                throw new Error(`Error en la petición HTTP: ${respuesta.status}`);
            }

            const data = await respuesta.json();
            
            // Transformación con la HOF .map()
            catalogoEjercicios = data.map(ej => new Ejercicio(ej.id, ej.nombre, ej.categoria));
            renderizarCatalogo(catalogoEjercicios);

            Toastify({
                text: "✅ Base de datos cargada correctamente",
                duration: 2500,
                gravity: "bottom", 
                position: "right", 
                className: "toast-exito"
            }).showToast();

        } catch (error) {
            console.error("Error al consumir la API/JSON local:", error);
            catalogoList.innerHTML = '<p class="text-danger">⚠️ Error al cargar el catálogo de ejercicios. Recuerda ejecutar el proyecto desde un servidor local HTTP (ej: Live Server en VS Code).</p>';
            
            Toastify({
                text: "❌ Error de conexión al cargar catálogo",
                duration: 4000,
                gravity: "bottom", 
                position: "right", 
                className: "toast-error"
            }).showToast();

        } finally {
            console.log("Consulta de datos asíncrona completada.");
        }
    }


    // --- 6. BÚSQUEDA Y RENDERIZADO DEL CATÁLOGO ---
    function renderizarCatalogo(arrayEjercicios) {
        catalogoList.innerHTML = ''; 

        if (arrayEjercicios.length === 0) {
            catalogoList.innerHTML = '<p class="text-muted">No se encontraron ejercicios coincidentes.</p>';
            return;
        }

        // Renderizado usando la HOF .forEach()
        arrayEjercicios.forEach(ej => {
            const { nombre, categoria } = ej; // Destructuring
            
            const divItem = document.createElement('div');
            divItem.className = 'item';

            const divInfo = document.createElement('div');
            divInfo.className = 'item-info';

            const h4 = document.createElement('h4');
            h4.textContent = nombre;

            const pTag = document.createElement('p');
            pTag.innerHTML = `Categoría: <span class="tag">${categoria}</span>`;

            divInfo.appendChild(h4);
            divInfo.appendChild(pTag);

            const btnUsar = document.createElement('button');
            btnUsar.className = 'btn-secondary btn-usar-ejercicio';
            btnUsar.style.width = 'auto';
            btnUsar.style.padding = '0.4rem 0.8rem';
            btnUsar.dataset.nombre = nombre;
            btnUsar.textContent = 'Seleccionar';

            divItem.appendChild(divInfo);
            divItem.appendChild(btnUsar);

            catalogoList.appendChild(divItem);
        });
    }

    // Filtrado en tiempo real utilizando la HOF .filter()
    buscadorEjercicios.addEventListener('keyup', (evento) => {
        const textoBusqueda = evento.target.value.toLowerCase();
        const filtrados = catalogoEjercicios.filter(ej => 
            ej.nombre.toLowerCase().includes(textoBusqueda) || 
            ej.categoria.toLowerCase().includes(textoBusqueda)
        );
        renderizarCatalogo(filtrados);
    });


    // --- 7. REGISTRO Y CÁLCULOS DE LA RUTINA DEL DÍA ---
    formEjercicio.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const nombreInput = document.getElementById('ej-nombre').value.trim();
        const series = parseInt(document.getElementById('ej-series').value);
        const reps = parseInt(document.getElementById('ej-reps').value);
        const peso = parseFloat(document.getElementById('ej-peso').value);

        if (!nombreInput || isNaN(series) || isNaN(reps) || isNaN(peso)) return;

        const nuevoEjercicio = new Ejercicio(contadorIdSesion, nombreInput, "Sesión", series, reps, peso);
        sesionDeHoy.push(nuevoEjercicio);
        contadorIdSesion++;

        // Operación de Guardado / Modificación en Storage
        localStorage.setItem('fitTracker_sesion', JSON.stringify(sesionDeHoy));
        
        formEjercicio.reset();
        renderizarSesion();

        Toastify({
            text: `💪 ${nombreInput} añadido a la rutina`,
            duration: 2500,
            gravity: "top", 
            position: "center", 
            className: "toast-info"
        }).showToast();
    });

    function renderizarSesion() {
        sesionList.innerHTML = '';

        if (sesionDeHoy.length === 0) {
            sesionList.innerHTML = '<p class="text-muted">No has registrado ejercicios para hoy.</p>';
            spanVolumenTotal.innerText = '0';
            btnVaciarRutina.classList.add('oculto');
            btnFinalizarSesion.classList.add('oculto');
            return;
        }

        btnVaciarRutina.classList.remove('oculto');
        btnFinalizarSesion.classList.remove('oculto');

        // Cálculo acumulativo obligatorio usando la HOF .reduce()
        const volumenTotalCalculado = sesionDeHoy.reduce((acumulado, ej) => {
            return acumulado + ej.calcularVolumen();
        }, 0);

        spanVolumenTotal.innerText = volumenTotalCalculado;

        // Renderizado dinámico de la rutina
        sesionDeHoy.forEach(ej => {
            const { id, nombre, series, reps, peso } = ej; // Destructuring
            const volumenItem = ej.calcularVolumen(); 

            const divItem = document.createElement('div');
            divItem.className = 'item';

            const divInfo = document.createElement('div');
            divInfo.className = 'item-info';

            const h4 = document.createElement('h4');
            h4.textContent = nombre;

            const pDetalle = document.createElement('p');
            pDetalle.textContent = `${series} series × ${reps} reps | ${peso} kg por serie`;

            const pVolumen = document.createElement('p');
            pVolumen.className = 'text-muted';
            pVolumen.textContent = `Volumen de carga: ${volumenItem} kg`;

            divInfo.appendChild(h4);
            divInfo.appendChild(pDetalle);
            divInfo.appendChild(pVolumen);

            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn-delete btn-eliminar-ejercicio';
            btnEliminar.dataset.id = id;
            btnEliminar.textContent = 'Eliminar';

            divItem.appendChild(divInfo);
            divItem.appendChild(btnEliminar);

            sesionList.appendChild(divItem);
        });
    }

    // Eliminación de ítem individual mediante la HOF .filter()
    function eliminarDeSesion(idDeseado) {
        sesionDeHoy = sesionDeHoy.filter(ej => ej.id !== idDeseado);
        localStorage.setItem('fitTracker_sesion', JSON.stringify(sesionDeHoy));
        renderizarSesion();
        
        Toastify({
            text: "🗑️ Ejercicio eliminado de la rutina",
            duration: 2000,
            gravity: "top",
            position: "center",
            className: "toast-delete"
        }).showToast();
    }

    // Vaciar sesión completa con SweetAlert2
    function solicitarVaciarRutina() {
        Swal.fire({
            title: '¿Vaciar la rutina del día?',
            text: "Se eliminarán todos los ejercicios agregados en la sesión actual.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#f59e0b',
            cancelButtonColor: '#334155',
            confirmButtonText: 'Sí, vaciar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                sesionDeHoy = [];
                localStorage.removeItem('fitTracker_sesion');
                renderizarSesion();
                
                Toastify({
                    text: "🧹 Rutina del día vaciada",
                    duration: 2000,
                    gravity: "top",
                    position: "center",
                    className: "toast-delete"
                }).showToast();
            }
        });
    }

    // Cierre y confirmación del circuito de negocio del simulador
    function finalizarEntrenamiento() {
        const totalVolumen = sesionDeHoy.reduce((acc, ej) => acc + ej.calcularVolumen(), 0);
        const cantidadEjercicios = sesionDeHoy.length;

        Swal.fire({
            title: '🎉 ¡Entrenamiento Completado!',
            html: `
                <p style="margin-bottom: 10px;">¡Gran trabajo hoy!</p>
                <p><strong>Ejercicios completados:</strong> ${cantidadEjercicios}</p>
                <p><strong>Volumen total levantado:</strong> ${totalVolumen} kg</p>
            `,
            icon: 'success',
            confirmButtonColor: '#10b981',
            confirmButtonText: 'Registrar y Guardar'
        }).then(() => {
            sesionDeHoy = [];
            localStorage.removeItem('fitTracker_sesion');
            renderizarSesion();
        });
    }


    // --- 8. DELEGACIÓN DE EVENTOS CENTRALIZADA ---
    function configurarDelegacionEventos() {
        // Seleccionar ejercicio desde el catálogo
        catalogoList.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-usar-ejercicio');
            if (btn) {
                document.getElementById('ej-nombre').value = btn.dataset.nombre;
            }
        });

        // Eliminar ejercicio individual de la rutina
        sesionList.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-eliminar-ejercicio');
            if (btn) {
                eliminarDeSesion(parseInt(btn.dataset.id));
            }
        });

        // Eventos de la botonera principal
        saludoUsuario.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'btn-borrar-perfil') {
                solicitarConfirmacionBorrarPerfil();
            }
        });

        btnVaciarRutina.addEventListener('click', solicitarVaciarRutina);
        btnFinalizarSesion.addEventListener('click', finalizarEntrenamiento);
    }


    // --- 9. FUNCIONALIDAD ADICIONAL (Tip dinámico diferido) ---
    function mostrarTipDelDia() {
        setTimeout(() => {
            const tipDiv = document.createElement('div');
            tipDiv.className = 'tip-banner';
            tipDiv.textContent = '💡 Tip de rendimiento: Descansa entre 90 y 120 segundos entre series pesadas para maximizar la fuerza y la hipertrofia.';
            tipDiaContainer.appendChild(tipDiv);
        }, 1500);
    }

})();