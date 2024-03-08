// Variable para almacenar el intervalo del cronómetro
let intervalo;

// Función para iniciar el cronómetro
function iniciarCronometro() {
    let tiempoInicial = 0; // Tiempo inicial en segundos
    let contador = document.getElementById('cronometro');

    // Función que actualiza el cronómetro cada segundo
    intervalo = setInterval(() => {
        let horas = Math.floor(tiempoInicial / 3600);
        let minutos = Math.floor((tiempoInicial % 3600) / 60);
        let segundos = tiempoInicial % 60;

        // Formatear los valores de tiempo como cadenas de dos dígitos
        horas = horas.toString().padStart(2, '0');
        minutos = minutos.toString().padStart(2, '0');
        segundos = segundos.toString().padStart(2, '0');

        // Actualizar el texto del cronómetro
        contador.textContent = `${horas}:${minutos}:${segundos}`;

        // Incrementar el tiempo en un segundo
        tiempoInicial++;
    }, 1000); // Actualizar cada segundo (1000 milisegundos)
}

// Función para detener el cronómetro
function detenerCronometro() {
    clearInterval(intervalo);
}

// Función para reiniciar el cronómetro
function reiniciarCronometro() {
    detenerCronometro();
    document.getElementById('cronometro').textContent = '00:00:00';
}

// Llamar a la función iniciarCronometro() cuando la página haya cargado completamente
window.onload = function() {
    iniciarCronometro();
}