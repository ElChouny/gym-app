// ==========================================
// FitTracker - Módulo 1: Perfil de Usuario
// Pre-Entrega 1 - Desarrollo Web / JS
// ==========================================

// 1. Captura de datos del usuario mediante prompt()
const nombreUsuario = prompt("¡Bienvenido a FitTracker! ¿Cómo te llamás?");
const pesoActualTexto = prompt("Ingresá tu peso actual en kg (ej: 75.5):");
const pesoObjetivoTexto = prompt("Ingresá tu peso objetivo en kg (ej: 80.0):");
const diasEntrenamientoTexto = prompt("¿Cuántos días a la semana querés entrenar? (1 a 7):");

// 2. Conversión de tipos de datos (Strings a Numbers)
const pesoActual = parseFloat(pesoActualTexto);
const pesoObjetivo = parseFloat(pesoObjetivoTexto);
const diasEntrenamiento = parseInt(diasEntrenamientoTexto);

// 3. Procesamiento y operaciones matemáticas
const diferenciaPeso = pesoObjetivo - pesoActual;
const minutosSemanalesEstimados = diasEntrenamiento * 60; // Estimación de 60 min por sesión

// 4. Transformación de texto y concatenación lógica
let mensajeMeta = "";

if (diferenciaPeso > 0) {
    mensajeMeta = `Tu objetivo es ganar ${diferenciaPeso.toFixed(1)} kg de masa muscular.`;
} else if (diferenciaPeso < 0) {
    mensajeMeta = `Tu objetivo es bajar ${Math.abs(diferenciaPeso).toFixed(1)} kg de peso.`;
} else {
    mensajeMeta = "Tu objetivo es mantener tu peso actual y ganar fuerza.";
}

const resumenPerfil = `¡Hola, ${nombreUsuario}!
Perfil registrado con éxito:
- Días a entrenar: ${diasEntrenamiento} días por semana (~${minutosSemanalesEstimados} min semanales).
- ${mensajeMeta}`;

// 5. Salida de resultados al usuario
alert(resumenPerfil);

// Mapeo detallado en consola de desarrollador
console.log("=== PERFIL DE ATLETA CREADO ===");
console.log(`Nombre: ${nombreUsuario}`);
console.log(`Peso Actual: ${pesoActual} kg`);
console.log(`Peso Objetivo: ${pesoObjetivo} kg`);
console.log(`Días semanales: ${diasEntrenamiento}`);
console.log(`Diferencia de peso calculada: ${diferenciaPeso} kg`);
console.log(`Estimación semanal: ${minutosSemanalesEstimados} minutos`);