function iniciarJuego() {
  // Obtener el alias ingresado por el usuario
  var alias = document.getElementById('alias').value;

  // Verificar si el alias ya existe en el LocalStorage
  if (localStorage.getItem(alias) !== null) {
    // Si existe, mostrar mensaje de bienvenida 
    mostrarMensajes("¡Hola de Nuevo, " + alias + "!");
  } else {
    // Si no existe, mostrar mensaje para nuevos jugadores
    mostrarMensajes("¡Hola Novato!");
    // Guardar el alias del jugador
    guardarAliasYpuntaje(alias);
  }

  // Mostrar los resultados en la pantalla
  mostrarResultados();
}

function guardarAliasYpuntaje(alias) {
  // Verificar si ya existe un puntaje para el alias
  var puntajeExistente = localStorage.getItem(alias + "_puntaje");
  if (puntajeExistente === null) {
      // Si no existe un puntaje, establecer el puntaje inicial en 0
      var puntajeInicial = 0;
      localStorage.setItem(alias + "_puntaje", puntajeInicial);
  }
  // Guardar el alias del jugador
  localStorage.setItem("nombreJugador", alias);
}


function mostrarMensajes(mensaje) {
  // Cambiar el texto según el mensaje proporcionado
  document.getElementById('mensaje').innerText = mensaje;
}

function mostrarResultados() {
  var nombreJugador = document.getElementById('alias').value;
  var puntaje = localStorage.getItem(nombreJugador + "_puntaje");
  var tiempoJuego = localStorage.getItem(nombreJugador + "_tiempoJuego");

  // Mostrar los resultados en algún elemento HTML
  document.getElementById("resultados").innerHTML = "Nombre del jugador: " + nombreJugador + "<br>Puntaje: " + puntaje + "<br>Tiempo de juego: " + tiempoJuego;
}
