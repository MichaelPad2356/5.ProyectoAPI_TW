  // Array asociativo para mapear casas a personajes
  const mapeoCasasPersonajes = {
    '../media/Casas/Cuphead9.png': '../media/Personajes/Cuphead.png',
    '../media/Casas/Donkey4.png': '../media/Personajes/DonkeyKong.png',
    '../media/Casas/KirbyDL2.png': '../media/Personajes/Kirby.png',
    '../media/Casas/MarioB1.png': '../media/Personajes/MarioBros.png',
    '../media/Casas/Minecraft6.png': '../media/Personajes/Minecraft.png',
    '../media/Casas/Packman7.png': '../media/Personajes/Pacman.png',
    '../media/Casas/Pokemon8.png': '../media/Personajes/Pokemon.png',
    '../media/Casas/Sonic3.png': '../media/Personajes/Sonic.png',
    '../media/Casas/Zelda5.png': '../media/Personajes/Zelda.png'
};

const valoresCasas = {
    '../media/Casas/Cuphead9.png': 10,
    '../media/Casas/Donkey4.png': 20,
    '../media/Casas/KirbyDL2.png': 30,
    '../media/Casas/MarioB1.png': 40,
    '../media/Casas/Minecraft6.png': 50,
    '../media/Casas/Packman7.png': 60,
    '../media/Casas/Pokemon8.png': 70,
    '../media/Casas/Sonic3.png': 80,
    '../media/Casas/Zelda5.png': 90
};

const valoresPersonajes = {
    '../media/Personajes/Cuphead.png': 10,
    '../media/Personajes/DonkeyKong.png': 20,
    '../media/Personajes/Kirby.png': 30,
    '../media/Personajes/MarioBros.png': 40,
    '../media/Personajes/Minecraft.png': 50,
    '../media/Personajes/Pacman.png': 60,
    '../media/Personajes/Pokemon.png': 70,
    '../media/Personajes/Sonic.png': 80,
    '../media/Personajes/Zelda.png': 90
};


// Array para almacenar las imágenes seleccionadas
let imagenesSeleccionadas = [];

function iniciar() {
    // Permiso para arrastrar las imágenes
    var imagenes = document.querySelectorAll('#cajasimagenes > img');
    for (var i = 0; i < imagenes.length; i++) {
        imagenes[i].addEventListener('dragstart', arrastrar, false);
        imagenes[i].addEventListener('dragend', finalizado, false);
        // Establecer la posición inicial fuera del lienzo
        imagenes[i].style.position = 'absolute';
        imagenes[i].style.left = '-1000px';
        imagenes[i].style.top = '-1000px';
    }

    // Permiso para soltar en el lienzo
    var lienzos = document.querySelectorAll('.lienzo');
    for (var i = 0; i < lienzos.length; i++) {
        lienzos[i].addEventListener('dragenter', eventoEnter, false);
        lienzos[i].addEventListener('dragover', eventoSobre, false);
        lienzos[i].addEventListener('drop', eventoDrop, false);
    }

    // Verificar si ya se seleccionaron imágenes, si no, selecciónalas
    if (imagenesSeleccionadas.length === 0) {
        // Selecciona tres imágenes aleatorias sin repetir
        imagenesSeleccionadas = seleccionarImagenesAleatorias(Object.keys(mapeoCasasPersonajes), 3);
    }

    // Cargar la imagen de fondo para cada lienzo y asociarla con la casa correspondiente
    for (var i = 0; i < lienzos.length; i++) {
        var lienzo = lienzos[i];
        var contexto = lienzo.getContext('2d');

        // Obtener la imagen de la casa asociada
        var imagenCasa = imagenesSeleccionadas[i];
        console.log(imagenCasa);

        // Crear la imagen de la casa y dibujarla en el lienzo
        var imgCasa = new Image();
        imgCasa.src = imagenCasa;
        imgCasa.onload = function (contexto, imgCasa) {
            return function() {
                contexto.drawImage(imgCasa, 0, 0, lienzo.width, lienzo.height);

                // Agregar evento de drop único para cada lienzo
                lienzo.addEventListener('drop', function(e) {
                    eventoDrop(e, this); // Llamar a eventoDrop con el lienzo actual
                }, false);
            };
        }(contexto, imgCasa);
    }

    // Filtrar las imágenes de los personajes para mostrar solo aquellos cuyas casas están en los lienzos
    var imagenesPersonajesFiltradas = Object.values(mapeoCasasPersonajes).filter(personaje => imagenesSeleccionadas.includes(Object.keys(mapeoCasasPersonajes).find(casa => mapeoCasasPersonajes[casa] === personaje)));

    // Limpiar la sección "cajasimagenes"
    document.getElementById('cajasimagenes').innerHTML = '';

    // Crear y agregar las imágenes de los personajes en la sección "cajasimagenes"
    for (var i = 0; i < imagenesPersonajesFiltradas.length; i++) {
        var imgPersonaje = document.createElement('img');
        imgPersonaje.src = imagenesPersonajesFiltradas[i];
        imgPersonaje.id = 'img' + i; // Asegúrate de que los IDs sean únicos
        imgPersonaje.draggable = true;
        imgPersonaje.addEventListener('dragstart', arrastrar, false);
        imgPersonaje.addEventListener('dragend', finalizado, false);
        document.getElementById('cajasimagenes').appendChild(imgPersonaje);
    }
}


// Resto de las funciones (arrastrar, eventoEnter, eventoSobre, eventoDrop, seleccionarImagenesAleatorias, etc.)

// Llama a la función iniciar al cargar la página
window.addEventListener('load', iniciar, false);

// Resto del código JavaScript (arrastrar, eventoEnter, eventoSobre, eventoDrop, seleccionarImagenesAleatorias, etc.)
// ...

// Funciones de las imágenes
function finalizado(e) {
    // elemento = e.target;
    // elemento.style.visibility = 'hidden';
}

function arrastrar(e) {
    elemento = e.target;
    e.dataTransfer.setData('Text', elemento.getAttribute('id'));
    e.dataTransfer.setDragImage(e.target, 0, 0);
}

function eventoEnter(e) {
    console.log("soy el evento dragente");
    e.preventDefault();
}

function eventoSobre(e) {
    console.log("soy el evento dragover");
    e.preventDefault();
}

// Función para manejar el evento de soltar
function eventoDrop(e) {
    e.preventDefault();
    var id = e.dataTransfer.getData('Text');
    var elemento = document.getElementById(id);
    var lienzo = e.target;
    var contexto = lienzo.getContext('2d');

    // Verificar si la suelta ocurrió dentro de alguno de los tres lienzos
    if (lienzo.classList.contains('lienzo')) {
        // Verificar si ya hay una imagen presente en el lienzo
        var imagenesEnLienzo = lienzo.getElementsByTagName('img');
        if (imagenesEnLienzo.length === 0) {
            // Calcular el tamaño adecuado para la imagen
            var anchoImagen = Math.min(elemento.width, lienzo.width * 0.6);
            var altoImagen = Math.min(elemento.height, lienzo.height * 0.6);

            var posX = (lienzo.width - anchoImagen) / 2;
            var posY = (lienzo.height - altoImagen) / 2;

            // Dibujar la imagen en el lienzo
            contexto.drawImage(elemento, posX, posY, anchoImagen, altoImagen);

            // Ocultar la imagen solo si se soltó dentro de uno de los lienzos
            elemento.style.visibility = 'hidden';

            // Deshabilitar el evento de soltar para este lienzo
            lienzo.removeEventListener('drop', eventoDrop);
        }
    }
    //verificar las casas y personajes
     // Obtener la ruta de la imagen de fondo del lienzo
     var imagenFondo = lienzo.toDataURL();

     // Obtener el valor asociado a la imagen de fondo del lienzo
     var valorImagenFondo = valoresCasas[imagenFondo];
 
     // Obtener el valor asociado a la imagen soltada
     var valorImagenSoltada = valoresPersonajes[elemento.src];
 
     // Verificar si el valor de la imagen soltada coincide con el valor de la imagen de fondo del lienzo
     if (parseInt(valorImagenSoltada) === parseInt(valorImagenFondo)) {
         // Mostrar el mensaje de felicitación
         alert('¡Felicidades! Has colocado la imagen correcta en el lienzo.');
     } 
}


// Función para seleccionar imágenes aleatorias sin repetir
function seleccionarImagenesAleatorias(imagenes, cantidad) {
    const imagenesAleatorias = [];
    const copiaImagenes = [...imagenes];

    for (let i = 0; i < cantidad; i++) {
        const indiceAleatorio = Math.floor(Math.random() * copiaImagenes.length);
        const imagenSeleccionada = copiaImagenes.splice(indiceAleatorio, 1)[0];
        imagenesAleatorias.push(imagenSeleccionada);
    }

    return imagenesAleatorias;
}