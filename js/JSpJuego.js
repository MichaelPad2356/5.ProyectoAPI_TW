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

let imagenesSeleccionadas = [];
let mensajeTimeout;

function iniciar() {
    var imagenes = document.querySelectorAll('#cajasimagenes > div');
    for (var i = 0; i < imagenes.length; i++) {
        imagenes[i].addEventListener('dragstart', arrastrar, false);
        imagenes[i].addEventListener('dragend', finalizado, false);
        imagenes[i].style.position = 'absolute';
        imagenes[i].style.left = '-1000px';
        imagenes[i].style.top = '-1000px';
    }

    var lienzos = document.querySelectorAll('.lienzo');
    for (var i = 0; i < lienzos.length; i++) {
        lienzos[i].addEventListener('dragenter', eventoEnter, false);
        lienzos[i].addEventListener('dragover', eventoSobre, false);
        lienzos[i].addEventListener('drop', eventoDrop, false);
    }

    if (imagenesSeleccionadas.length === 0) {
        imagenesSeleccionadas = seleccionarImagenesAleatorias(Object.keys(mapeoCasasPersonajes), 3);
    }

    for (var i = 0; i < lienzos.length; i++) {
        var lienzo = lienzos[i];
        var imagenCasa = imagenesSeleccionadas[i];

        lienzo.style.backgroundImage = 'url(' + imagenCasa + ')';
    }

    var imagenesPersonajesFiltradas = Object.values(mapeoCasasPersonajes).filter(personaje => imagenesSeleccionadas.includes(Object.keys(mapeoCasasPersonajes).find(casa => mapeoCasasPersonajes[casa] === personaje)));

    document.getElementById('cajasimagenes').innerHTML = '';

    for (var i = 0; i < imagenesPersonajesFiltradas.length; i++) {
        var divPersonaje = document.createElement('div');
        divPersonaje.style.backgroundImage = 'url(' + imagenesPersonajesFiltradas[i] + ')';
        divPersonaje.id = 'div' + i;
        divPersonaje.draggable = true;
        divPersonaje.addEventListener('dragstart', arrastrar, false);
        divPersonaje.addEventListener('dragend', finalizado, false);

        var imgPersonaje = document.createElement('img');
        imgPersonaje.src = imagenesPersonajesFiltradas[i];
        imgPersonaje.draggable = false;
        divPersonaje.appendChild(imgPersonaje);

        document.getElementById('cajasimagenes').appendChild(divPersonaje);
    }
}

function finalizado(e) {
    var elemento = e.target;
    // No es necesario ocultar la imagen en esta función
}

function arrastrar(e) {
    var elemento = e.target;
    e.dataTransfer.setData('Text', elemento.getAttribute('id'));
    e.dataTransfer.setDragImage(elemento, elemento.clientWidth / 2, elemento.clientHeight / 2);
}

function eventoEnter(e) {
    e.preventDefault();
}

function eventoSobre(e) {
    e.preventDefault();
}

function eventoDrop(e) {
    e.preventDefault();
    var id = e.dataTransfer.getData('Text');
    var elemento = document.getElementById(id);
    var lienzo = e.target;

    if (lienzo.classList.contains('lienzo')) {
        var imagenCasaActual = lienzo.style.backgroundImage.replace('url("', '').replace('")', '');
        var imagenPersonajeActual = elemento.style.backgroundImage.replace('url("', '').replace('")', '');

        // Verificar si la imagen del personaje coincide con la casa correspondiente
        if (mapeoCasasPersonajes[imagenCasaActual] === imagenPersonajeActual) {
            var divPersonaje = document.getElementById(id);
            var divClon = divPersonaje.cloneNode(true);
            divPersonaje.style.visibility = 'hidden';
            lienzo.appendChild(divClon);
            mostrarMensaje("¡Felicidades! ¡Acertaste!", "verde");
        } else {
            mostrarMensaje("Inténtalo de nuevo", "rojo");
        }
    }
}

//Imagenes aleatorias
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

function mostrarMensaje(mensaje, color) {
    const mensajeJuego = document.getElementById("mensajeJuego");
    mensajeJuego.textContent = mensaje;
    mensajeJuego.style.color = color;
    mensajeJuego.style.opacity = 1;

    clearTimeout(mensajeTimeout);
    mensajeTimeout = setTimeout(function() {
        mensajeJuego.style.opacity = 0;
    }, 2000);
}

window.addEventListener('load', iniciar, false);