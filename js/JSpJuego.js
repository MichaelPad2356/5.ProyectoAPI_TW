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

    // Mostrar la imagen antes de dibujarla en el lienzo
    elemento.style.visibility = 'visible';

    // Verificar si la suelta ocurrió dentro de alguno de los tres lienzos
    if (lienzo.classList.contains('lienzo')) {
        // Calcular el tamaño adecuado para la imagen
        var anchoImagen = Math.min(elemento.width, lienzo.width * 0.6);
        var altoImagen = Math.min(elemento.height, lienzo.height * 0.6);

        var posX = (lienzo.width - anchoImagen) / 2;
        var posY = (lienzo.height - altoImagen) / 2;

        contexto.drawImage(elemento, posX, posY, anchoImagen, altoImagen);

        // Ocultar la imagen solo si se soltó dentro de uno de los lienzos
        elemento.style.visibility = 'hidden';
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