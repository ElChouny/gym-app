// ==========================================
// FitTracker - App de Seguimiento de Entrenamiento
// Pre-Entrega 2: Perfil + Registro Completo por Series y Repeticiones
// ==========================================

// ------------------------------------------
// PARTE 1: Configuración del Perfil (Pre-Entrega 1)
// ------------------------------------------
alert("¡Bienvenido a FitTracker! Vamos a configurar tu perfil y registrar tu entrenamiento de hoy. 🏋️‍♂️");

const nombreUsuario = prompt("¿Cómo te llamás?");
const pesoActualTexto = prompt("Ingresá tu peso actual en kg (ej: 75.5):");
const pesoObjetivoTexto = prompt("Ingresá tu peso objetivo en kg (ej: 80.0):");
const diasEntrenamientoTexto = prompt("¿Cuántos días a la semana querés entrenar? (1 a 7):");

// Conversión de tipos de datos
const pesoActual = parseFloat(pesoActualTexto);
const pesoObjetivo = parseFloat(pesoObjetivoTexto);
const diasEntrenamiento = parseInt(diasEntrenamientoTexto);

// Procesamiento matemático
const diferenciaPeso = pesoObjetivo - pesoActual;
const minutosSemanalesEstimados = diasEntrenamiento * 60;

// Determinación del objetivo
let mensajeMeta = "";
if (diferenciaPeso > 0) {
    mensajeMeta = `Tu objetivo es ganar ${diferenciaPeso.toFixed(1)} kg de masa muscular.`;
} else if (diferenciaPeso < 0) {
    mensajeMeta = `Tu objetivo es bajar ${Math.abs(diferenciaPeso).toFixed(1)} kg de peso.`;
} else {
    mensajeMeta = "Tu objetivo es mantener tu peso actual y ganar fuerza.";
}

// Reporte inicial por consola
console.log("=== PERFIL DE ATLETA CREADO ===");
console.log(`Nombre: ${nombreUsuario}`);
console.log(`Peso Actual: ${pesoActual} kg | Peso Objetivo: ${pesoObjetivo} kg`);
console.log(`Días semanales: ${diasEntrenamiento} (~${minutosSemanalesEstimados} min)`);
console.log(`Objetivo: ${mensajeMeta}`);

alert(`¡Perfil cargado, ${nombreUsuario}!\n- ${mensajeMeta}\n- Proyección semanal: ${minutosSemanalesEstimados} minutos.`);


// ------------------------------------------
// PARTE 2: Registro de Sesión (Series + Repeticiones)
// ------------------------------------------
alert("¡Ahora vamos a registrar la sesión de hoy con sus Series y Repeticiones! 📝");

let totalEjercicios = 0;
let totalSeriesGlobal = 0;
let totalRepeticionesGlobal = 0;
let continuar = true;

// BUCLE WHILE: Permite registrar ejercicios de forma iterativa hasta escribir 'ESC'
while (continuar) {
    let nombreEjercicio = prompt(
        "Ingresá el nombre del ejercicio (o escribí 'ESC' para terminar la sesión):"
    );

    // CONDICIONAL 1: Evalúa cierre de sesión o campo vacío
    if (nombreEjercicio === null || nombreEjercicio.trim().toUpperCase() === "ESC") {
        continuar = false;
        console.log("🛑 Finalizando el registro de la sesión de entrenamiento...");
    } else if (nombreEjercicio.trim() === "") {
        alert("⚠️ El nombre del ejercicio no puede estar vacío.");
    } else {
        let seriesTexto = prompt(`¿Cuántas series hiciste de ${nombreEjercicio}? (ej: 4)`);
        let series = parseInt(seriesTexto);

        let repsPorSerieTexto = prompt(`¿Cuántas repeticiones por serie hiciste en ${nombreEjercicio}? (ej: 10)`);
        let repsPorSerie = parseInt(repsPorSerieTexto);

        // CONDICIONAL 2: Validación de datos numéricos
        if (isNaN(series) || series <= 0 || isNaN(repsPorSerie) || repsPorSerie <= 0) {
            alert("⚠️ Por favor, ingresá números válidos y mayores a 0 para series y repeticiones.");
            console.log(`❌ Intento fallido al registrar "${nombreEjercicio}": datos inválidos.`);
        } else {
            // CÁLCULO DE VOLUMEN POR EJERCICIO
            let totalRepsEjercicio = series * repsPorSerie;

            // ACUMULADORES GLOBALES
            totalEjercicios++;
            totalSeriesGlobal += series;
            totalRepeticionesGlobal += totalRepsEjercicio;

            // CONDICIONAL 3 BIFURCADO: Clasificación del esfuerzo según repeticiones por serie
            let evaluacionEsfuerzo = "";
            if (repsPorSerie < 6) {
                evaluacionEsfuerzo = "Rango de Fuerza Máxima 💥";
            } else if (repsPorSerie <= 12) {
                evaluacionEsfuerzo = "Rango Ideal de Hipertrofia 💪";
            } else {
                evaluacionEsfuerzo = "Rango de Resistencia Muscular 🏃‍♂️";
            }

            // SALIDA EN CONSOLA Y ALERTA POR EJERCICIO
            console.log(`✅ Ejercicio #${totalEjercicios}: ${nombreEjercicio}`);
            console.log(`   - Detalle: ${series} series × ${repsPorSerie} reps/serie = ${totalRepsEjercicio} reps totales`);
            console.log(`   - Enfoque: ${evaluacionEsfuerzo}`);

            alert(`Registrado: ${nombreEjercicio}\n- ${series} series de ${repsPorSerie} reps (${totalRepsEjercicio} reps en total)\n- Enfoque: ${evaluacionEsfuerzo}`);
        }
    }
}

// ------------------------------------------
// SALIDA FINAL Y RESUMEN GLOBAL
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