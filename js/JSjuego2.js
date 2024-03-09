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

    // Recuperar imágenes almacenadas en el localStorage de la primera pantalla
    const imagenesLocalStorage = JSON.parse(localStorage.getItem('elementosPantalla1'));

    // Filtrar las imágenes para la segunda pantalla
    imagenesSeleccionadas = seleccionarImagenesAleatorias(
        Object.keys(mapeoCasasPersonajes).filter(img => !imagenesLocalStorage.includes(img)),
        3
    );

    for (var i = 0; i < lienzos.length; i++) {
        var lienzo = lienzos[i];
        var imagenCasa = imagenesSeleccionadas[i];

        lienzo.style.backgroundImage = 'url(' + imagenCasa + ')';
        lienzo.style.backgroundSize = '100% 100%';
        lienzo.style.backgroundRepeat = 'no-repeat';
        lienzo.style.backgroundPosition = 'center'; 
    }

    var imagenesPersonajesFiltradas = Object.values(mapeoCasasPersonajes).filter(personaje => imagenesSeleccionadas.includes(Object.keys(mapeoCasasPersonajes).find(casa => mapeoCasasPersonajes[casa] === personaje)));

    document.getElementById('cajasimagenes').innerHTML = '';

    for (var i = 0; i < imagenesPersonajesFiltradas.length; i++) {
        var divPersonaje = document.createElement('div');
        divPersonaje.style.width = '190px';
        divPersonaje.style.height = '190px';
        divPersonaje.style.marginRight = '60px';
        divPersonaje.style.marginTop = '60px';
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
    var divPersonaje = document.getElementById(id);
    var lienzo = e.target;

    if (lienzo.classList.contains('lienzo')) {
        var imagenCasaActual = lienzo.style.backgroundImage.replace('url("', '').replace('")', '');
        var imagenPersonajeActual = divPersonaje.style.backgroundImage.replace('url("', '').replace('")', '');

        // Verificar si el lienzo ya tiene una imagen
        if (lienzo.querySelector('.imagen-personaje')) {
            mostrarMensaje("Ya no puedes colocar aquí", "rojo");
            return;
        }

        // Verificar si la imagen del personaje coincide con la casa correspondiente
        if (mapeoCasasPersonajes[imagenCasaActual] === imagenPersonajeActual) {
            var imgPersonaje = divPersonaje.querySelector('img');

            var imgNueva = document.createElement('img');
            imgNueva.src = imgPersonaje.src;
            imgNueva.classList.add('imagen-personaje');

            imgNueva.style.position = 'absolute';
            imgNueva.style.top = '50%';
            imgNueva.style.left = '50%';
            imgNueva.style.transform = 'translate(-50%, -50%)';
            imgNueva.style.maxWidth = '40%';
            imgNueva.style.maxHeight = '40%';

            lienzo.appendChild(imgNueva);

            divPersonaje.style.visibility = 'hidden';

            mostrarMensaje("¡Felicidades! ¡Acertaste!", "verde");
        } else {
            mostrarMensaje("Inténtalo de nuevo", "rojo");
        }
    }
}

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
    var mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = mensaje;
    mensajeDiv.classList.add('mensaje');

    if (color === "verde") {
        mensajeDiv.classList.add('mensaje-verde');
    } else if (color === "rojo") {
        mensajeDiv.classList.add('mensaje-rojo');
    }

    document.body.appendChild(mensajeDiv);

    setTimeout(function() {
        mensajeDiv.remove();
    }, 2000); // Eliminar el mensaje después de 5 segundos (5000 milisegundos)
}

window.addEventListener('load', iniciar, false);