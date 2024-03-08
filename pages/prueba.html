<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Juego de Arrastrar Personajes a Casas</title>
    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            font-family: 'Press Start 2P', cursive;
            background-color: #222;
            color: #fff;
        }

        #lienzoContainer {
            display: flex;
            margin-top: 20px;
        }

        .lienzo {
            border: 2px solid #fff;
            margin-right: 20px;
            position: relative;
            width: 430px;
            height: 430px;
            overflow: hidden;
        }

        .imagen-casa {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            visibility: hidden;
        }

        #cajasimagenes {
            margin-top: 20px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        #cajasimagenes div {
            width: 200px;
            height: 215px;
            margin: 10px;
            cursor: grab;
            background-size: cover;
            position: relative;
        }

        #cajasimagenes div img {
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            visibility: hidden;
        }

        #mensajeJuego {
            margin-top: 20px;
            font-size: 24px;
            text-align: center;
            transition: opacity 0.5s ease-in-out;
        }
    </style>
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
</head>
<body>

    <!-- Lienzos para las casas -->
    <div id="lienzoContainer">
        <div id="lienzo1" class="lienzo"></div>
        <div id="lienzo2" class="lienzo"></div>
        <div id="lienzo3" class="lienzo"></div>
    </div>

    <!-- Sección para las imágenes de los personajes -->
    <section id="cajasimagenes">
        <!-- Aquí se agregarán dinámicamente las imágenes de los personajes -->
    </section>

    <!-- Mensaje del juego -->
    <div id="mensajeJuego"></div>

    <script>
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
    </script>
</body>
</html>