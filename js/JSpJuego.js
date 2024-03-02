
function iniciar(){
    //permiso para arrastrar de las imagenes
    var imagenes = document.querySelectorAll('#cajasimagenes > img');
    for(var i=0; i<imagenes.length; i++){
        imagenes[i].addEventListener('dragstart', arrastrar, false);
        imagenes[i].addEventListener('dragend', finalizado, false);
    } 

    //permiso para soltar en el lienzo
   var soltar1 = document.getElementById('lienzo1');
   var lienzo1 = soltar1.getContext('2d');
   soltar1.addEventListener('dragenter',eventoEnter, false);
   soltar1.addEventListener('dragover',eventoSobre, false);
   soltar1.addEventListener('drop',eventoDrop, false); 
 
  // Cargar la imagen de fondo
    var img1 = new Image();
    img1.onload = function() {
        // Ajustar la imagen al tamaño del lienzo
        lienzo1.drawImage(img1, 0, 0, soltar1.width, soltar1.height);
    };
    img1.src = "../media/casas/Pokemon8.png";

   // Permisos para el segundo lienzo (repetir para los demás lienzos si es necesario)
   var soltar2 = document.getElementById('lienzo2');
   var lienzo2 = soltar2.getContext('2d');
   soltar2.addEventListener('dragenter', eventoEnter, false);
   soltar2.addEventListener('dragover', eventoSobre, false);
   soltar2.addEventListener('drop', eventoDrop, false);

    // Cargar la imagen de fondo
    var img2 = new Image();
    img2.onload = function() {
        // Ajustar la imagen al tamaño del lienzo
        lienzo2.drawImage(img2, 0, 0, soltar2.width, soltar2.height);
    };
    img2.src = "../media/casas/Donkey4.png";

   // Permisos para el tercer lienzo (repetir para los demás lienzos si es necesario)
   var soltar3 = document.getElementById('lienzo3');
   var lienzo3 = soltar3.getContext('2d');
   soltar3.addEventListener('dragenter', eventoEnter, false);
   soltar3.addEventListener('dragover', eventoSobre, false);
   soltar3.addEventListener('drop', eventoDrop, false);

    // Cargar la imagen de fondo
    var img3 = new Image();
    img3.onload = function() {
        // Ajustar la imagen al tamaño del lienzo
        lienzo3.drawImage(img3, 0, 0, soltar3.width, soltar3.height);
    };
    img3.src = "../media/casas/Cuphead9.png";
}

//funciones para el drag and drop
function eventoEnter(e){
    console.log("soy el evento dragente");
    e.preventDefault();
}

function eventoSobre(e){
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

    // Calcular el tamaño adecuado para la imagen
    var anchoImagen = Math.min(elemento.width, lienzo.width * 0.6); // Limitar el ancho al 80% del ancho del lienzo
    var altoImagen = Math.min(elemento.height, lienzo.height * 0.6); // Limitar el alto al 80% del alto del lienzo

    // Calcular las coordenadas para que el centro de la imagen coincida con el centro del lienzo
    var posX = (lienzo.width - anchoImagen) / 2;
    var posY = (lienzo.height - altoImagen) / 2;

    contexto.drawImage(elemento, posX, posY, anchoImagen, altoImagen);
}




//funciones de las imagenes
//funcion para ser visible la imagen en el lienzo
function finalizado(e){
    elemento = e.target;
    elemento.style.visibility = 'hidden';
}

function arrastrar(e){
    elemento = e.target;
    e.dataTransfer.setData('Text', elemento.getAttribute('id'));
    e.dataTransfer.setDragImage(e.target, 0, 0);
}



window.addEventListener('load', iniciar, false);

