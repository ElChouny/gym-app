// ==========================================
// FitTracker - App de Seguimiento de Entrenamiento
// Evolución Acumulada: Pre-Entregas 1 a 4 + Pre-Entrega 5 (Clases y Objetos)
// ==========================================

// ------------------------------------------
// PRE-ENTREGA 5: MODELADO DE LA ENTIDAD CON CLASS
// ------------------------------------------

// 1. Definición de la Clase (PascalCase) con al menos 4 propiedades
class EjercicioGym {
    constructor(nombre, series, repsPorSerie, pesoCargado) {
        this.nombre = nombre;
        this.series = series;
        this.repsPorSerie = repsPorSerie;
        this.pesoCargado = pesoCargado; // nueva variable para hacer más completo el objeto
        this.volumenTotal = 0;
        this.enfoque = "";
    }

    // 2. Método 1: Calcula un valor en base a las propiedades del objeto usando 'this'
    calcularVolumen() {
        // Fórmula de volumen de entrenamiento: Series x Repeticiones x Peso
        this.volumenTotal = this.series * this.repsPorSerie * this.pesoCargado;
    }

    // 3. Método 2: Modifica el estado del objeto evaluando una condición
    determinarEnfoque() {
        if (this.repsPorSerie < 6) {
            this.enfoque = "Fuerza Máxima 💥";
        } else if (this.repsPorSerie <= 12) {
            this.enfoque = "Hipertrofia 💪";
        } else {
            this.enfoque = "Resistencia 🏃‍♂️";
        }
    }

    // 4. Método 3: Modifica directamente una propiedad ingresando un valor nuevo
    aumentarPeso(kgExtra) {
        this.pesoCargado += kgExtra;
        this.calcularVolumen(); // Recalculamos el volumen al cambiar el peso
        console.log(`⬆️ Se aumentó el peso de "${this.nombre}" a ${this.pesoCargado}kg.`);
    }
}

// ------------------------------------------
// INSTANCIACIÓN Y VERIFICACIÓN (Requisito Pre-Entrega 5)
// ------------------------------------------
console.log("--- 🏗️ PRUEBA DE INSTANCIACIÓN DE OBJETOS ---");

// Creación de al menos 3 instancias usando 'new' guardadas en constantes
const ejercicioPrueba1 = new EjercicioGym("Press de Banca Plano", 4, 10, 80);
const ejercicioPrueba2 = new EjercicioGym("Sentadilla Libre", 4, 8, 100);
const ejercicioPrueba3 = new EjercicioGym("Peso Muerto Rumano", 3, 5, 120);

// Ejecución de los métodos para poblar los datos calculados
ejercicioPrueba1.calcularVolumen();
ejercicioPrueba1.determinarEnfoque();

ejercicioPrueba2.calcularVolumen();
ejercicioPrueba2.determinarEnfoque();

ejercicioPrueba3.calcularVolumen();
ejercicioPrueba3.determinarEnfoque();

// Verificación en consola mostrando los objetos completos
console.log("Objeto 1 (Estado inicial):", ejercicioPrueba1);
console.log("Objeto 2 (Estado inicial):", ejercicioPrueba2);
console.log("Objeto 3 (Estado inicial):", ejercicioPrueba3);

// Probamos el método que modifica propiedades de un objeto existente
ejercicioPrueba2.aumentarPeso(10);
console.log("Objeto 2 (Estado Modificado tras aumentar peso):", ejercicioPrueba2);
console.log("----------------------------------------------");


// ------------------------------------------
// MANTENIMIENTO DEL PROYECTO ANTERIOR (Arrays y Perfil)
// ------------------------------------------
const catalogoEjercicios = ["Sentadilla", "Press de Banca", "Peso Muerto", "Dominadas", "Remo con Barra"];
catalogoEjercicios.push("Curl de Bíceps");
catalogoEjercicios.unshift("Movilidad Articular");

alert("¡Bienvenido a FitTracker! Vamos a configurar tu perfil de atleta. 🏋️‍♂️");

const nombreUsuario = prompt("¿Cómo te llamás?");
const diasEntrenamiento = parseInt(prompt("¿Cuántos días a la semana querés entrenar? (1 a 7):"));
console.log(`Atleta: ${nombreUsuario} | Días de entrenamiento: ${diasEntrenamiento}`);

// ------------------------------------------
// BUCLE INTERACTIVO: Integración de Clases en el Simulador
// ------------------------------------------
alert("¡Registremos los ejercicios de tu sesión de hoy creando objetos en vivo! 📝");

const sesionActual = []; // Array vacío para guardar los OBJETOS generados
let continuar = true;

while (continuar) {
    let nombreEj = prompt("Ingresá el nombre del ejercicio realizado (o escribí 'ESC' para terminar):");

    if (nombreEj === null || nombreEj.trim().toUpperCase() === "ESC") {
        continuar = false;
        console.log("🛑 Finalizando registro...");
    } else if (nombreEj.trim() === "") {
        alert("⚠️ El nombre no puede estar vacío.");
    } else {
        let seriesEj = parseInt(prompt(`¿Cuántas series hiciste de ${nombreEj}?`));
        let repsEj = parseInt(prompt(`¿Cuántas repeticiones por serie hiciste?`));
        let pesoEj = parseFloat(prompt(`¿Con cuántos kilos (kg) trabajaste?`));

        if (isNaN(seriesEj) || seriesEj <= 0 || isNaN(repsEj) || repsEj <= 0 || isNaN(pesoEj) || pesoEj < 0) {
            alert("⚠️ Ingresá valores numéricos válidos mayores a 0.");
        } else {
            // ¡MAGIA DE OBJETOS!: Instanciamos un objeto nuevo con los datos del usuario
            const nuevoEjercicio = new EjercicioGym(nombreEj, seriesEj, repsEj, pesoEj);
            
            // Usamos los métodos de la clase para autocompletar la info
            nuevoEjercicio.calcularVolumen();
            nuevoEjercicio.determinarEnfoque();

            // Guardamos el objeto en el Array de la sesión
            sesionActual.push(nuevoEjercicio);

            alert(`✅ ¡Registrado! ${nuevoEjercicio.nombre}\n- Enfoque: ${nuevoEjercicio.enfoque}\n- Volumen total movido: ${nuevoEjercicio.volumenTotal} kg.`);
        }
    }
}

// ------------------------------------------
// REPORTE FINAL RECORRIENDO EL ARRAY DE OBJETOS (For...of)
// ------------------------------------------
console.log("==========================================");
console.log(`=== RESUMEN DE LA SESIÓN DE ${nombreUsuario.toUpperCase()} ===`);

if (sesionActual.length > 0) {
    let volumenTotalSesion = 0;

    for (const item of sesionActual) {
        console.log(`👉 ${item.nombre}: ${item.series}x${item.repsPorSerie} con ${item.pesoCargado}kg | Total: ${item.volumenTotal}kg movidos (${item.enfoque})`);
        volumenTotalSesion += item.volumenTotal;
    }

    console.log(`🏆 VOLUMEN TOTAL MOVIDO EN LA SESIÓN: ${volumenTotalSesion} kg.`);
    alert(`¡Sesión terminada!\nHiciste ${sesionActual.length} ejercicios.\nMoviste un total de ${volumenTotalSesion} kg hoy. ¡Felicidades!`);
} else {
    console.log("No se registraron ejercicios.");
}