// function iniciarJuego() {
//     // Obtener el alias ingresado por el usuario
//     var alias = document.getElementById('alias').value;
  
//     // Verificar si el alias ya existe en el LocalStorage
//     if (localStorage.getItem(alias) === null) {
//       // Si no existe, almacenar el alias, contador de puntos y mejor tiempo a cero
//       localStorage.setItem(alias, JSON.stringify({ puntos: 0, mejorTiempo: 0 }));
      
//       // Mostrar mensaje para nuevos jugadores
//       mostrarMensajes("Hola Novato");
//     } else {
//       // Si ya existe, mostrar mensaje de bienvenida
//       mostrarMensajes("Hola de Nuevo");
//     }
  
//     // Mostrar los resultados en la pantalla
//     mostrarResultados(alias);
//   }
  
//   function mostrarMensajes(mensaje) {
//     // Cambiar el texto según el mensaje proporcionado
//     document.getElementById('mensaje').innerText = mensaje;
//   }
  
//   function mostrarResultados(alias) {
//     // Obtener los datos del LocalStorage para el alias dado
//     var datos = JSON.parse(localStorage.getItem(alias));
  
//     // Mostrar la pantalla de resultados
//     document.getElementById('resultados').style.display = 'block';
  
//     // Mostrar los resultados en la pantalla
//     document.getElementById('puntos').innerText = 'Puntos: ' + datos.puntos;
//     document.getElementById('mejorTiempo').innerText = 'Mejor Tiempo: ' + datos.mejorTiempo + ' segundos';
//   }
  
// Arreglo para almacenar los jugadores
let jugadores = [];

// Obtener los datos de localStorage si existen
const datosJugadoresGuardados = JSON.parse(localStorage.getItem('jugadores')) || [];
jugadores = datosJugadoresGuardados;

// Función para guardar los datos en localStorage
function guardarDatos() {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
}

// Función para buscar un jugador por su alias
function buscarJugador(alias) {
    return jugadores.find(jugador => jugador.alias === alias);
}

// Función para agregar un nuevo jugador
function agregarJugador(alias) {
    const nuevoJugador = {
        alias,
        puntos: 0,
        mejorTiempo: 0
    };
    jugadores.push(nuevoJugador);
    guardarDatos();
    localStorage.setItem('currentAlias',alias)

}

// Función para mostrar las estadísticas del jugador
function mostrarEstadisticas(jugador) {
    const estadisticasDiv = document.getElementById('estadisticas');
    estadisticasDiv.innerHTML = `
        <h2>Estadísticas de ${jugador.alias}</h2>
        <p>Puntos: ${jugador.puntos}</p>
        <p>Mejor Tiempo: ${jugador.mejorTiempo}</p>
    `;
}

// Evento click en el botón "Ingresar"
document.getElementById('ingresar').addEventListener('click', () => {
    const alias = document.getElementById('alias').value.trim();
    if (alias) {
        const jugador = buscarJugador(alias);
        if (jugador) {
            mostrarEstadisticas(jugador);
            setTimeout(() => {
                window.location.href = 'PantallaJuego.html';
            }, 3000); // Redirige a PantallaJuego.html después de 3 segundos (3000 milisegundos)
        } else {
            agregarJugador(alias);
            alert(`El jugador ${alias} ha sido agregado.`);
            setTimeout(() => {
                window.location.href = 'PantallaJuego.html';
            }, 3000); // Redirige a PantallaJuego.html después de 3 segundos (3000 milisegundos)
        }
    } else {
        alert('Por favor, ingrese un alias.');
    }
});