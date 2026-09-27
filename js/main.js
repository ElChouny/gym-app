// ==========================================
// FitTracker - App de Seguimiento de Entrenamiento
// Pre-Entrega 6: Integración de Perfil + Funciones de Orden Superior
// ==========================================

alert("¡Bienvenido a FitTracker! Tu asistente de entrenamiento.");

// --- 1. REGISTRO DE PERFIL (Mantenemos lo de entregas anteriores) ---
let nombreUsuario = prompt("Ingresá tu nombre:");
let pesoActual = parseFloat(prompt("Ingresá tu peso actual (kg):"));
let pesoDeseado = parseFloat(prompt("Ingresá tu peso objetivo (kg):"));
let frecuencia = parseInt(prompt("¿Cuántos días a la semana pensás entrenar?"));

// Validación: si el usuario cancela o pone letras donde van números, se lo volvemos a pedir
while (!nombreUsuario || isNaN(pesoActual) || isNaN(pesoDeseado) || isNaN(frecuencia)) {
    alert("⚠️ Por favor, ingresá datos válidos para armar tu perfil.");
    nombreUsuario = prompt("Ingresá tu nombre:");
    pesoActual = parseFloat(prompt("Ingresá tu peso actual (kg):"));
    pesoDeseado = parseFloat(prompt("Ingresá tu peso objetivo (kg):"));
    frecuencia = parseInt(prompt("¿Cuántos días a la semana pensás entrenar?"));
}

let diferenciaPeso = pesoDeseado - pesoActual;
let mensajeObjetivo = diferenciaPeso < 0 ? "bajar" : "subir";

// Saludamos al usuario con la info que calculamos
alert(`¡Hola ${nombreUsuario}!\nTu objetivo es ${mensajeObjetivo} ${Math.abs(diferenciaPeso)} kg entrenando ${frecuencia} días a la semana. ¡Vamos con todo!`);


// --- 2. CLASE Y ARRAY DE OBJETOS (Pre-entregas 4, 5 y 6) ---
class Ejercicio {
    constructor(nombre, categoria, dificultad, series = 0, reps = 0, peso = 0) {
        this.nombre = nombre;
        this.categoria = categoria; 
        this.dificultad = dificultad;
        this.series = series;
        this.reps = reps;
        this.peso = peso;
    }

    // Método para calcular el volumen
    calcularVolumen() {
        return this.series * this.reps * this.peso;
    }
}

// Catálogo base con la clase instanciada
const catalogo = [
    new Ejercicio("Press de Banca", "Push", "Media"),
    new Ejercicio("Flexiones", "Push", "Baja"),
    new Ejercicio("Dominadas", "Pull", "Alta"),
    new Ejercicio("Remo con Barra", "Pull", "Media"),
    new Ejercicio("Sentadilla Libre", "Legs", "Alta"),
    new Ejercicio("Prensa", "Legs", "Media"),
    new Ejercicio("Curl de Biceps", "Pull", "Baja"),
    new Ejercicio("Vuelos Laterales", "Push", "Baja")
];

const sesionDeHoy = [];

// --- 3. MENÚ INTERACTIVO CON FUNCIONES DE ORDEN SUPERIOR ---
let continuar = true;

while (continuar) {
    // Usamos el nombre registrado para personalizar el menú
    let opcion = prompt(
        `🏋️ MENÚ DE ${nombreUsuario.toUpperCase()} 🏋️\n\n` +
        "1. Filtrar ejercicios por grupo muscular (Push/Pull/Legs)\n" +
        "2. Buscar información de un ejercicio puntual\n" +
        "3. Registrar un ejercicio realizado hoy\n" +
        "4. Finalizar sesión y ver resumen\n\n" +
        "Escribí el número de la opción:"
    );

    switch (opcion) {
        case "1":
            // .filter() y .map()
            let catBuscada = prompt("¿Qué rutina toca? Escribí 'Push', 'Pull' o 'Legs':").toLowerCase();
            const filtrados = catalogo.filter((ej) => ej.categoria.toLowerCase() === catBuscada);
            
            if (filtrados.length > 0) {
                let nombresFiltrados = filtrados.map((ej) => ej.nombre).join(" - ");
                alert(`Ejercicios de ${catBuscada.toUpperCase()} disponibles:\n${nombresFiltrados}`);
                console.log(`Filtro (${catBuscada}):`, filtrados);
            } else {
                alert("Categoría no encontrada. Recordá escribir Push, Pull o Legs.");
            }
            break;

        case "2":
            // .find()
            let nombreBuscado = prompt("¿Qué ejercicio buscás? (Ej: Dominadas, Prensa...):").toLowerCase();
            const encontrado = catalogo.find((ej) => ej.nombre.toLowerCase() === nombreBuscado);
            
            if (encontrado) {
                alert(`¡Encontrado!\nNombre: ${encontrado.nombre}\nCategoría: ${encontrado.categoria}\nDificultad: ${encontrado.dificultad}`);
                console.log("Búsqueda individual:", encontrado);
            } else {
                alert("No tenemos ese ejercicio en el catálogo base.");
            }
            break;

        case "3":
            let ejRealizado = prompt("Nombre del ejercicio que hiciste:");
            let cantSeries = parseInt(prompt("¿Cuántas series?"));
            let cantReps = parseInt(prompt("¿Cuántas repeticiones por serie?"));
            let kgUsados = parseFloat(prompt("¿Con cuántos KG trabajaste?"));

            if (ejRealizado && cantSeries > 0 && cantReps > 0 && kgUsados >= 0) {
                let nuevoEj = new Ejercicio(ejRealizado, "Personalizado", "N/A", cantSeries, cantReps, kgUsados);
                sesionDeHoy.push(nuevoEj);
                alert(`✅ ¡Registrado! Agregaste: ${nuevoEj.nombre}`);
            } else {
                alert("⚠️ Datos inválidos. Registro cancelado.");
            }
            break;

        case "4":
            continuar = false; 
            
            if (sesionDeHoy.length > 0) {
                // .map() y .reduce()
                const resumenNombres = sesionDeHoy.map((ej) => ej.nombre).join(" | ");
                const volumenTotalSesion = sesionDeHoy.reduce((acumulador, ej) => acumulador + ej.calcularVolumen(), 0);
                
                // Resumen usando los datos del perfil inicial
                alert(
                    "🛑 SESIÓN FINALIZADA 🛑\n\n" +
                    `Entrenador: ${nombreUsuario}\n` +
                    `Progreso de peso: De ${pesoActual}kg a ${pesoDeseado}kg\n\n` +
                    `Ejercicios de hoy:\n${resumenNombres}\n\n` +
                    `🔥 VOLUMEN TOTAL MOVIDO: ${volumenTotalSesion} KG.`
                );
                
                console.log("=== RESUMEN FINAL ===");
                console.log("Historial de la sesión:", sesionDeHoy);
                console.log(`Volumen total de entrenamiento: ${volumenTotalSesion} KG`);
            } else {
                alert(`No registraste nada hoy, ${nombreUsuario}. ¡No aflojes que hay que llegar a los ${pesoDeseado}kg!`);
            }
            break;

        default:
            alert("Opción no válida. Ingresá un número del 1 al 4.");
            break;
    }
}