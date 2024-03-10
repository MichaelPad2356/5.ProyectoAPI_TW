document.getElementById('restartGame').addEventListener('click', startGame);

function startGame() {
    // Oculta la pantalla de felicitación y muestra el canvas
    document.getElementById('congratulationsScreen').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'flex';
    // Aquí iría la inicialización de tu juego
}

function PlayAudio(){
    document.getElementById('musicaFondo').play();
}

function PlayAudio() {
    var audio = document.getElementById('musicaFondo');
    audio.volume = 0.1; // Establece el volumen al 50%
    audio.play();
}

function endGame(alias, score, time) {
    // Mostrar la pantalla de felicitación
    document.getElementById('gameCanvas').style.display = 'none';
    document.getElementById('congratulationsScreen').style.display = 'flex';
    document.getElementById('playerAlias').textContent = alias;
    // Suponiendo que hayas añadido finalScore en tu HTML:
    document.getElementById('finalScore').textContent = `Puntuación Final: ${score}`;

    // Almacenar y actualizar el mejor tiempo en LocalStorage
    const bestTime = localStorage.getItem('bestTime') ? parseInt(localStorage.getItem('bestTime')) : Infinity;
    if (time < bestTime) {
        localStorage.setItem('bestTime', time);
        // Asegúrate de que existe un elemento para el mejor tiempo en tu HTML
        document.getElementById('bestTime').textContent = `Mejor tiempo: ${time} segundos`;
    } else {
        document.getElementById('bestTime').textContent = `Mejor tiempo: ${bestTime} segundos`;
    }

    // Almacenar y actualizar la puntuación en LocalStorage
    localStorage.setItem('score', score);
    localStorage.setItem('aliasUsuario', alias); // Asegúrate de añadir esto
}
/*vhvhgcvcu*/
function mostrarPantallaFelicitaciones() {
    // Recuperar datos del usuario
    var aliasUsuario = localStorage.getItem("aliasUsuario");
    var puntajeFinal = localStorage.getItem("puntajeFinal");

    // Encontrar el tbody de la tabla por su ID
    var tbody = document.getElementById("tablaPuntuaciones");

    // Crear una nueva fila y celdas para el alias y el puntaje
    var fila = document.createElement("tr");
    var celdaAlias = document.createElement("td");
    var celdaPuntaje = document.createElement("td");

    // Asignar el alias y el puntaje a las celdas
    celdaAlias.textContent = aliasUsuario;
    celdaPuntaje.textContent = puntajeFinal;

    // Añadir las celdas a la fila, y la fila al tbody de la tabla
    fila.appendChild(celdaAlias);
    fila.appendChild(celdaPuntaje);
    tbody.appendChild(fila);

    // Mostrar la pantalla de felicitaciones
    document.getElementById('congratulationsScreen').style.display = 'flex';
}

// esta función se llama cuando el juego termina
 endGame('AliasDelJugador', 500, 120);
// Esto es solo un ejemplo; deberás integrarlo con la lógica de fin de juego de tu aplicación
mostrarPantallaFelicitaciones();
