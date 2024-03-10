const mapeoCasasPersonajes = {
    '../media/Casas/Cuphead9.png': {
        personaje: '../media/Personajes/Cuphead.png',
        sonido: '../media/audios/sonido_personajes/Cuphead.wav',
        voz: '../media/audios/voz_personajes/cuphead.wav',
        nombre: 'Cuphead'
    },
    '../media/Casas/Donkey4.png': {
        personaje: '../media/Personajes/DonkeyKong.png',
        sonido: '../media/audios/sonido_personajes/Donkeykong.wav',
        voz: '../media/audios/voz_personajes/donkeykong.wav',
        nombre: 'Donkey Kong'
    },
    '../media/Casas/KirbyDL2.png': {
        personaje: '../media/Personajes/Kirby.png',
        sonido: '../media/audios/sonido_personajes/Kirby.wav',
        voz: '../media/audios/voz_personajes/kirby.wav',
        nombre: 'Kirby'
    },
    '../media/Casas/MarioB1.png': {
        personaje: '../media/Personajes/MarioBros.png',
        sonido: '../media/audios/sonido_personajes/Mario.wav',
        voz: '../media/audios/voz_personajes/mariobros.wav',
        nombre: 'Mario Bros'
    },
    '../media/Casas/Minecraft6.png': {
        personaje: '../media/Personajes/Minecraft.png',
        sonido: '../media/audios/sonido_personajes/Minecraft.wav',
        voz: '../media/audios/voz_personajes/minecraft.wav',
        nombre: 'Minecraft'
    },
    '../media/Casas/Packman7.png': {
        personaje: '../media/Personajes/Pacman.png',
        sonido: '../media/audios/sonido_personajes/Pacman.wav',
        voz: '../media/audios/voz_personajes/pacman.wav',
        nombre: 'Pacman'
    },
    '../media/Casas/Pokemon8.png': {
        personaje: '../media/Personajes/Pokemon.png',
        sonido: '../media/audios/sonido_personajes/Pokemon.wav',
        voz: '../media/audios/voz_personajes/pokemon.wav',
        nombre: 'Pokemon'
    },
    '../media/Casas/Sonic3.png': {
        personaje: '../media/Personajes/Sonic.png',
        sonido: '../media/audios/sonido_personajes/Sonic.wav',
        voz: '../media/audios/voz_personajes/sonic.wav',
        nombre: 'Sonic'
    },
    '../media/Casas/Zelda5.png': {
        personaje: '../media/Personajes/Zelda.png',
        sonido: '../media/audios/sonido_personajes/Zelda.wav',
        voz: '../media/audios/voz_personajes/zelda.wav',
        nombre: 'Zelda'
    }
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
    for (var i = 0; lienzos && i < lienzos.length; i++) {
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

    var imagenesPersonajesFiltradas = Object.values(mapeoCasasPersonajes)
        .filter(personaje => imagenesSeleccionadas.includes(Object.keys(mapeoCasasPersonajes)
        .find(casa => mapeoCasasPersonajes[casa].personaje === personaje.personaje)));

    document.getElementById('cajasimagenes').innerHTML = '';

    for (var i = 0; i < imagenesPersonajesFiltradas.length; i++) {
        var divPersonaje = document.createElement('div');
        divPersonaje.style.width = '190px';
        divPersonaje.style.height = '190px';
        divPersonaje.style.marginRight = '60px';
        divPersonaje.style.marginTop = '60px';
        divPersonaje.style.backgroundImage = 'url(' + imagenesPersonajesFiltradas[i].personaje + ')';
        divPersonaje.id = 'div' + i;
        divPersonaje.draggable = true;
        divPersonaje.addEventListener('dragstart', arrastrar, false);
        divPersonaje.addEventListener('dragend', finalizado, false);

        var imgPersonaje = document.createElement('img');
        imgPersonaje.src = imagenesPersonajesFiltradas[i].personaje;
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
if (mapeoCasasPersonajes[imagenCasaActual].personaje === imagenPersonajeActual) {
    var imgPersonaje = divPersonaje.querySelector('img');

    // Crear un nuevo elemento img con la misma fuente
    var imgNueva = document.createElement('img');
    imgNueva.src = imgPersonaje.src;
    imgNueva.classList.add('imagen-personaje');

    // Posicionar y ajustar el tamaño de la imagen
    imgNueva.style.position = 'absolute';
    imgNueva.style.top = '50%';
    imgNueva.style.left = '50%';
    imgNueva.style.transform = 'translate(-50%, -50%)';
    imgNueva.style.maxWidth = '40%';
    imgNueva.style.maxHeight = '40%';

    lienzo.appendChild(imgNueva);

    // Agregar un elemento para mostrar el nombre debajo de la imagen en el lienzo
    const nombrePersonajeEnLienzo = document.createElement('div');
    nombrePersonajeEnLienzo.textContent = mapeoCasasPersonajes[imagenCasaActual].nombre;
    nombrePersonajeEnLienzo.style.textAlign = 'center';
    nombrePersonajeEnLienzo.style.fontSize = '12px';
    nombrePersonajeEnLienzo.style.color = '#fff';
    lienzo.appendChild(nombrePersonajeEnLienzo);

    // Ocultar el div que contiene la imagen arrastrada
    divPersonaje.style.visibility = 'hidden';

    // Reproducir sonido del personaje y luego la voz
    reproducirSonidoYVozPorOrden(mapeoCasasPersonajes[imagenCasaActual].sonido, mapeoCasasPersonajes[imagenCasaActual].voz);

    mostrarMensaje("¡Felicidades! ¡Acertaste!", "verde");
} else {
    mostrarMensaje("Inténtalo de nuevo", "rojo");
}
}
}


function reproducirSonidoYVozPorOrden(sonido, voz) {
    var audioSonido = new Audio(sonido);
    var audioVoz = new Audio(voz);

    // Reproducir sonido primero
    audioSonido.play();

    // Cuando el sonido haya terminado, reproducir la voz
    audioSonido.addEventListener('ended', function () {
        audioVoz.play();
    });
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