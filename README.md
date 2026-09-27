// ==========================================
// FitTracker - App de Seguimiento de Entrenamiento
// Evolución Acumulada: Pre-Entrega 1 + 2 + 3 (Funciones)
// ==========================================

// ------------------------------------------
// LO NUEVO (Pre-Entrega 3): DECLARACIÓN DE FUNCIONES REUTILIZABLES
// ------------------------------------------

// 1. FUNCIÓN FLECHA: Valida que los números ingresados sean válidos y mayores a cero
const esNumeroValido = (numero) => !isNaN(numero) && numero > 0;

// 2. FUNCIÓN FLECHA: Calcula el volumen total por ejercicio (Series × Reps)
const calcularVolumenEjercicio = (series, repsPorSerie) => series * repsPorSerie;

// 3. FUNCIÓN DECLARADA: Clasifica el enfoque de entrenamiento según el rango de repeticiones
function evaluarEnfoque(repsPorSerie) {
    if (repsPorSerie < 6) {
        return "Rango de Fuerza Máxima 💥";
    } else if (repsPorSerie <= 12) {
        return "Rango Ideal de Hipertrofia 💪";
    } else {
        return "Rango de Resistencia Muscular 🏃‍♂️";
    }
}

// 4. FUNCIÓN DECLARADA (Flujo Encadenado): Une los datos usando las funciones anteriores
function procesarEjercicio(nombre, series, repsPorSerie) {
    const volumenTotal = calcularVolumenEjercicio(series, repsPorSerie);
    const enfoque = evaluarEnfoque(repsPorSerie);

    return {
        nombre: nombre,
        series: series,
        repsPorSerie: repsPorSerie,
        volumenTotal: volumenTotal,
        enfoque: enfoque
    };
}

// 5. FUNCIÓN DECLARADA: Muestra la salida en consola y alertas
function mostrarSalidaEjercicio(ejercicio, numeroEjercicio) {
    console.log(`✅ Ejercicio #${numeroEjercicio}: ${ejercicio.nombre}`);
    console.log(`   - Detalle: ${ejercicio.series} series × ${ejercicio.repsPorSerie} reps/serie = ${ejercicio.volumenTotal} reps totales`);
    console.log(`   - Enfoque: ${ejercicio.enfoque}`);

    alert(`Registrado: ${ejercicio.nombre}\n- ${ejercicio.series} series de ${ejercicio.repsPorSerie} reps (${ejercicio.volumenTotal} reps totales)\n- Enfoque: ${ejercicio.enfoque}`);
}


// ------------------------------------------
// PARTE 1 (Pre-Entrega 1): Configuración del Perfil de Atleta
// ------------------------------------------
alert("¡Bienvenido a FitTracker! Vamos a configurar tu perfil y registrar tu entrenamiento de hoy. 🏋️‍♂️");

const nombreUsuario = prompt("¿Cómo te llamás?");
const pesoActual = parseFloat(prompt("Ingresá tu peso actual en kg (ej: 75.5):"));
const pesoObjetivo = parseFloat(prompt("Ingresá tu peso objetivo en kg (ej: 80.0):"));
const diasEntrenamiento = parseInt(prompt("¿Cuántos días a la semana querés entrenar? (1 a 7):"));

const diferenciaPeso = pesoObjetivo - pesoActual;
const minutosSemanalesEstimados = diasEntrenamiento * 60;

let mensajeMeta = "";
if (diferenciaPeso > 0) {
    mensajeMeta = `Tu objetivo es ganar ${diferenciaPeso.toFixed(1)} kg de masa muscular.`;
} else if (diferenciaPeso < 0) {
    mensajeMeta = `Tu objetivo es bajar ${Math.abs(diferenciaPeso).toFixed(1)} kg de peso.`;
} else {
    mensajeMeta = "Tu objetivo es mantener tu peso actual y ganar fuerza.";
}

console.log("=== PERFIL DE ATLETA CREADO ===");
console.log(`Nombre: ${nombreUsuario}`);
console.log(`Peso Actual: ${pesoActual} kg | Peso Objetivo: ${pesoObjetivo} kg`);
console.log(`Días semanales: ${diasEntrenamiento} (~${minutosSemanalesEstimados} min)`);
console.log(`Objetivo: ${mensajeMeta}`);

alert(`¡Perfil cargado, ${nombreUsuario}!\n- ${mensajeMeta}\n- Proyección semanal: ${minutosSemanalesEstimados} minutos.`);


// ------------------------------------------
// PARTE 2 Y 3 (Pre-Entrega 2 + 3): Bucle Interactivo invocando las Funciones
// ------------------------------------------
alert("¡Ahora vamos a registrar la sesión de hoy usando nuestras funciones! 📝");

let totalEjercicios = 0;
let totalSeriesGlobal = 0;
let totalRepeticionesGlobal = 0;
let continuar = true;

while (continuar) {
    let nombreEjercicio = prompt(
        "Ingresá el nombre del ejercicio (o escribí 'ESC' para terminar la sesión):"
    );

    if (nombreEjercicio === null || nombreEjercicio.trim().toUpperCase() === "ESC") {
        continuar = false;
        console.log("🛑 Finalizando el registro de la sesión de entrenamiento...");
    } else if (nombreEjercicio.trim() === "") {
        alert("⚠️ El nombre del ejercicio no puede estar vacío.");
    } else {
        let series = parseInt(prompt(`¿Cuántas series hiciste de ${nombreEjercicio}? (ej: 4)`));
        let repsPorSerie = parseInt(prompt(`¿Cuántas repeticiones por serie hiciste en ${nombreEjercicio}? (ej: 10)`));

        // Invocación a la función de validación
        if (!esNumeroValido(series) || !esNumeroValido(repsPorSerie)) {
            alert("⚠️ Por favor, ingresá números válidos y mayores a 0 para series y repeticiones.");
            console.log(`❌ Intento fallido al registrar "${nombreEjercicio}": datos inválidos.`);
        } else {
            totalEjercicios++;

            // Invocación a la función encadenada de procesamiento
            const datosEjercicio = procesarEjercicio(nombreEjercicio, series, repsPorSerie);

            // Acumuladores globales
            totalSeriesGlobal += datosEjercicio.series;
            totalRepeticionesGlobal += datosEjercicio.volumenTotal;

            // Invocación a la función de salida por pantalla/consola
            mostrarSalidaEjercicio(datosEjercicio, totalEjercicios);
        }
    }
}

// ------------------------------------------
// RESUMEN GLOBAL FINAL DE LA SESIÓN
// ------------------------------------------
console.log("==========================================");
console.log("=== RESUMEN GLOBAL DE LA SESIÓN ===");
console.log(`Atleta: ${nombreUsuario}`);
console.log(`Ejercicios distintos: ${totalEjercicios}`);
console.log(`Total de series realizadas: ${totalSeriesGlobal}`);
console.log(`Volumen total de repeticiones: ${totalRepeticionesGlobal}`);

if (totalEjercicios > 0) {
    const promedioRepsPorEjercicio = (totalRepeticionesGlobal / totalEjercicios).toFixed(1);
    console.log(`Promedio de repeticiones por ejercicio: ${promedioRepsPorEjercicio}`);
    alert(`¡Sesión finalizada con éxito, ${nombreUsuario}! 🎉\n- Ejercicios: ${totalEjercicios}\n- Series totales: ${totalSeriesGlobal}\n- Repeticiones totales: ${totalRepeticionesGlobal}`);
} else {
    console.log("No se registraron ejercicios en esta sesión.");
    alert("Sesión finalizada sin ejercicios registrados.");
}