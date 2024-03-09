function iniciarJuego() {
    // Obtener el alias ingresado por el usuario
    var alias = document.getElementById('alias').value;
  
    // Verificar si el alias ya existe en el LocalStorage
    if (localStorage.getItem(alias) === null) {
      // Si no existe, almacenar el alias, contador de puntos y mejor tiempo a cero
      localStorage.setItem(alias, JSON.stringify({ puntos: 0, mejorTiempo: 0 }));
    }
  
    // Mostrar los resultados en la pantalla
    mostrarResultados(alias);
  }
  
  function mostrarResultados(alias) {
    // Obtener los datos del LocalStorage para el alias dado
    var datos = JSON.parse(localStorage.getItem(alias));
  
    // Mostrar la pantalla de resultados
    document.getElementById('resultados').style.display = 'block';
  
    // Mostrar los resultados en la pantalla
    document.getElementById('puntos').innerText = 'Puntos: ' + datos.puntos;
    document.getElementById('mejorTiempo').innerText = 'Mejor Tiempo: ' + datos.mejorTiempo + ' segundos';
  }
  