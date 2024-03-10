// Variable para almacenar el intervalo del cronómetro
let intervalo;
let tiempoInicial = 0; // Tiempo inicial en segundos


// Función para iniciar el cronómetro
function iniciarCronometro() {
    let contador = document.getElementById('cronometro');
    contador.style.position = 'absolute';
    contador.style.top = '20px'; // Ajusta la posición vertical del cronómetro
    contador.style.right = '450px'; // Ajusta la posición horizontal del cronómetro para que esté a la derecha
    contador.style.fontSize = '18px'; // Ajusta el tamaño de la fuente del cronómetro
    contador.style.color = 'white'; // Cambia el color del texto a blanco
    contador.style.background = '#0047ab'; // Cambia el fondo a un azul fuerte
    contador.style.padding = '10px'; // Añade relleno alrededor del texto
    contador.style.borderRadius = '10px'; // Añade bordes redondeados
    contador.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)'; // Agrega sombra al texto para mejorar la legibilidad

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

// // Función para detener el cronómetro
// function detenerCronometro() {
//     clearInterval(intervalo);
// }

// // Función para reiniciar el cronómetro
// function reiniciarCronometro() {
//     detenerCronometro();
//     document.getElementById('cronometro').textContent = '00:00:00';
// }

// Llamar a la función iniciarCronometro() cuando la página haya cargado completamente
window.onload = function() {
    iniciarCronometro();
}