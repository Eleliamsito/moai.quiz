//CÓDIGO HECHO POR: CARMEN ANDREA LARA OSUNA 


//función reloj tiempo real
fechaTR();
setInterval(fechaTR, 1000);
//se declara variable de tipo boolean para posteriormente ejecutar funciones
let aleatorias = true;


//al abrir la pagina el programa lee la base de datos donde se almacenan las preguntas 
window.onload = function () {
    basePreguntas = readText("preguntasCG.json");
    interprete = JSON.parse(basePreguntas);
    escogerPreguntaAleatoria();
};

//Variables 
let pregunta;
let respuestasPosibles;

//arreglo con los botones para sincronizar las funciones con estos mismos
btns= [
    select_id("btn1"),
    select_id("btn2"),
    select_id("btn3"),
    select_id("btn4")
];
let npreguntas = [];

let preguntasRespondidas = 0;
let respuestasCorrectas = 0;
let respuestasIncorrectas = 0;

function escogerPreguntaAleatoria() {
  let n;
  if (aleatorias) {
    //se genera un numero aleatorio y se multiplica por la longitud de la base y se guarda en variable 
    n = Math.floor(Math.random() * interprete.length);
  } else {
    n = 0;
  }

  while (npreguntas.includes(n)) {
    n++;
    
  }
  //cada vez que se responde una pregunta, se agrega un nuevo elemento al arreglo, n es el parametro a agregar 
  npreguntas.push(n);
  //se agrega 1 al contador de preguntas
  preguntasRespondidas++;
  //se escoge una pregunta
  escogerPregunta(n);
}

function escogerPregunta(n) {
  //se selecciona una pregunta de la base de datos, como solo es 1 se pone indice 0
  pregunta = interprete[n];
  //se toman los datos de la base y se imprimen en la trivia
  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;
  select_id("numero").innerHTML = n;
  let pc = respuestasCorrectas;
  if (preguntasRespondidas > 1) {
    select_id("puntaje").innerHTML = pc + "/" + (preguntasRespondidas - 1);
  } else {
    select_id("puntaje").innerHTML = "";
  }






////////////////////////////////////////////////////////////////////////////////////////////////////////





  //CODIGO HECHO POR: MARIAN LIZETH BORCHARDT CASTELLANOS**************************************************
  desordenarrespuestasPosibles(pregunta);
  //condición para verificar si la pregunta seleccionada cuenta o no con una imagen 
  if (pregunta.imagen) {
    //se toma el dato con la dirección y se le asigna como atributo 
    select_id("imagen").setAttribute("src", pregunta.imagen);
    //tamaño de imagen
    style("imagen").height = "200px";
    style("imagen").width = "100%";
  } else {
    //si no hay imagen los valores quedan en 0
    style("imagen").height = "0px";
    style("imagen").width = "0px";
    setTimeout(() => {
      //y se da una dirección nula 
      select_id("imagen").setAttribute("src", "");
    }, 500);
  }
}


function desordenarrespuestasPosibles(pregunta) {
  //Arreglo que contenga las posibles respuestasPosibles
  respuestasPosibles = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3,
  ];
  //desordenamos el arreglo utlizando .sort
  respuestasPosibles.sort(() => Math.random() - 0.5);
  //seleccionamos los botones que se encuentran en el html y les asignamos un indice diferente a cada uno
  select_id("btn1").innerHTML = respuestasPosibles[0];
  select_id("btn2").innerHTML = respuestasPosibles[1];
  select_id("btn3").innerHTML = respuestasPosibles[2];
  select_id("btn4").innerHTML = respuestasPosibles[3];
}

let suspender_botones = false;



function click_btn(i) {
  if (suspender_botones) {
    return;
  }
  suspender_botones = true;
  //si la respuesta seleccionada es igual a la respuesta correcta 
  if (respuestasPosibles[i] == pregunta.respuesta) {
    //Se suma uno al contador de respuestas correctas
    respuestasCorrectas++;
    //el botón se torna verde
    btns[i].style.background = "#c6f0af";
    
  } else {
    //si no es correcta el boton se torna rojo
    btns[i].style.background = "#f0c2c2";
    //y se suma uno al contador de respuestas incorrectas
    respuestasIncorrectas++;
  }

  for (let j = 0; j < 4; j++) {
    if (respuestasPosibles[j] == pregunta.respuesta) {
      btns[j].style.background = "#c6f0af";
      break;
    }
  }
  //función para esperar cierto tiempo entre cada pregunta
  setTimeout(() => {



    ///////////////////////////////////////////////////////////////////////////////////
    //CÓDIGO HECHO POR CARMEN ANDREA LARA OSUNA *****************************************************************************

    //condición que permite evaluar si hay 5 o más respuestas incorrectas 
    if(respuestasIncorrectas>=5){
      //se crea una variable con el puntaje y se lleva a otra página
      var Puntuación=respuestasCorrectas+"/"+preguntasRespondidas;
      var mensaje="No te preocupes..."
      sessionStorage.setItem('puntos', Puntuación);
      sessionStorage.setItem('mensaje', mensaje);
      window.location.href="redireccionando.html";
    }else if(respuestasCorrectas>=30){
      var Puntuación=respuestasCorrectas+"/"+preguntasRespondidas;
      var mensaje="¡GANASTE!"
      sessionStorage.setItem('puntos', Puntuación);
      sessionStorage.setItem('mensaje', mensaje);
      window.location.href="redireccionando.html";

    }
    //Se utiliza esta función para mostrar la siguiente pregunta 
    reiniciar();
    //indica que ningun boton esta presionado 
    suspender_botones = false;
    //tiempo del timeout
  }, 3000);

}


//funcion para regresar el boton a su normalidad
function reiniciar() {
  for (const btn of btns) {
    btn.style.background = "white";
  }
  //se ejecuta la funcion para seleccionar otra pregunta
  escogerPreguntaAleatoria();
}

//funcion que selecciona todos los elementos dentro de HTML por su ID
function select_id(id) {
  return document.getElementById(id);
}
//funcion que toma el css de los elementos
function style(id) {
  return select_id(id).style;
}

function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}



