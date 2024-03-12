 function fechaTR()//Creada por andra lara osuna
{
    // Creamos array con los meses y dias en español
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const dias = ['Domingo', 'Lunes', 'martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    //objeto de fecha
    var fecha_ES = new Date();
    //Seleccionar onjeto de html
    var fecha=document.getElementById("reloj");

    //guardamos horas minutos y segundos en variables independientes
    hora = fecha_ES.getHours()
    minuto = fecha_ES.getMinutes()
    segundo = fecha_ES.getSeconds()
    //condición para mostrar hora, minutos y segundos de manera correcta
    if(minuto<=9){
        minuto="0"+minuto;
    }
    if(segundo<=9){
        segundo="0"+segundo;
    }
    if(hora<=9){
        hora="0"+hora;
    }
    //imprimir 
    fecha.innerHTML=(dias[fecha_ES.getDay()] + ', ' + fecha_ES.getDate() + ' de ' + meses[fecha_ES.getMonth()] + ' de ' + fecha_ES.getUTCFullYear())+
    "<br>"+"🕐"+hora + " : " + minuto + " : " + segundo+"🕐";
}
 
 
 
 
 
 let numCorrectas = 0; // Variable para almacenar el número de respuestas correctas
        let numPreguntas = 0; // Variable para almacenar el número total de preguntas
        let num1, num2; // Variables para almacenar los números generados para la pregunta

        function generarPregunta() {
            num1 = Math.floor(Math.random() * 20) + 1; // Genera un número aleatorio entre 1 y 20
            num2 = Math.floor(Math.random() * 20) + 1; // Genera otro número aleatorio entre 1 y 20
            var operacion = num1 + num2; // Calcula la operacion de los dos números generados
            return `${num1} + ${num2}`; // Retorna una cadena con la pregunta en el formato "num1 + num2"
          }

        function verificarRespuesta() {
            var respuesta = document.getElementById("respuesta").value; // Obtiene el valor ingresado en el campo de respuesta
            var resultado = document.getElementById("resultado"); // Elemento para mostrar el resultado
            var pregunta = document.getElementById("pregunta"); // Elemento donde se muestra la pregunta
            var inputRespuesta = document.getElementById("respuesta"); // Campo de respuesta
            var operacion1 = num1 + num2; // Calcula la operacion esperada

            if (parseInt(respuesta) === operacion1) { // Verifica si la respuesta ingresada es correcta
                numCorrectas++; // Incrementa el contador de respuestas correctas
                resultado.innerHTML = "¡Respuesta correcta!"; // Muestra el mensaje de respuesta correcta
                pregunta.classList.add("correcta"); // Agrega la clase "correcta" al elemento de la pregunta
                inputRespuesta.classList.remove("incorrecta"); // Remueve la clase "incorrecta" del campo de respuesta
                resultado.style.color="#2b631b";
                
            } else {
                resultado.innerHTML = "Respuesta incorrecta."; // Muestra el mensaje de respuesta incorrecta
                pregunta.classList.add("incorrecta"); // Agrega la clase "incorrecta" al elemento de la pregunta
                inputRespuesta.classList.add("incorrecta"); // Agrega la clase "incorrecta" al campo de respuesta
                resultado.style.color="#6b1c18";
            }
            numPreguntas++; // Incrementa el contador de preguntas realizadas
            document.getElementById("respuesta").value = ""; // Limpia el campo de respuesta

            if (numPreguntas > 0) {
                document.getElementById("pregunta").innerHTML = generarPregunta(); // Genera una nueva pregunta y la muestra
            } else {
                document.getElementById("pregunta").innerHTML = ""; // Borra la pregunta actual
                document.getElementById("respuesta").disabled = true; // Deshabilita el campo de respuesta
                document.getElementById("resultado").innerHTML = `Has respondido ${numCorrectas} preguntas correctamente de ${numPreguntas}.`; // Muestra el resultado final del juego
            }
        }
        function iniciarProgreso() {  //Creado por Francisco Moroyoquí parra
            const barraProgreso = document.getElementById("progress-bar-fill");
            let width = 100;
            let countdown = 60; // 60 segundos en total

            const interval = setInterval(() => {
                countdown--;
                width = (countdown / 60) * 100;
                barraProgreso.style.width = width + "%";

                if (countdown <= 10) {
                    barraProgreso.classList.add("red");
                }

                if (countdown <= 0) {
                    clearInterval(interval);

                    sessionStorage.setItem('puntaje',numCorrectas);
                    window.location.href = "redireccionandoM.html";
                }
            }, 1000);
        }


        document.addEventListener('DOMContentLoaded', function() {
            const generarDiv = document.getElementById("generar"); // Elemento contenedor donde se generará el juego

            const preguntaDiv = document.createElement("div"); // Crea un nuevo div para mostrar la pregunta
            preguntaDiv.id = "pregunta";
            preguntaDiv.style.display = "none"; // Oculta el div inicialmente
            preguntaDiv.innerHTML = generarPregunta(); // Genera y muestra la primera pregunta
            generarDiv.appendChild(preguntaDiv); // Agrega el div al contenedor principal

            const respuestaInput = document.createElement("input"); // Crea un nuevo campo de respuesta
            respuestaInput.type = "text";
            respuestaInput.id = "respuesta";
            respuestaInput.style.display = "none"; // Oculta el campo de respuesta inicialmente
            respuestaInput.addEventListener("keyup", function(event) { // Agrega un evento para verificar la respuesta al presionar Enter
                if (event.key === "Enter") {
                    verificarRespuesta();
                }
            });
            generarDiv.appendChild(respuestaInput); // Agrega el campo de respuesta al contenedor principal

            const resultadoDiv = document.createElement("div"); // Crea un nuevo div para mostrar el resultado
            resultadoDiv.id = "resultado";
            generarDiv.appendChild(resultadoDiv); // Agrega el div al contenedor principal

            const cuentaRegresivaDiv = document.createElement("div"); // Crea un nuevo div para mostrar la cuenta regresiva
            cuentaRegresivaDiv.id = "cuenta-regresiva";
            cuentaRegresivaDiv.textContent = "3"; // Inicia la cuenta regresiva en 3
            cuentaRegresivaDiv.style.fontSize = "150%";
            cuentaRegresivaDiv.style.textAlign = "center";
            cuentaRegresivaDiv.style.marginTop = "5%";
            generarDiv.appendChild(cuentaRegresivaDiv); // Agrega el div al contenedor principal

            let cuentaRegresiva = 3; // Inicia la cuenta regresiva en 3
            const intervaloCuentaRegresiva = setInterval(function() {
                cuentaRegresiva--;
                cuentaRegresivaDiv.textContent = cuentaRegresiva; // Actualiza el valor de la cuenta regresiva en el div

                if (cuentaRegresiva === 0) {
                    
                    clearInterval(intervaloCuentaRegresiva); // Detiene la cuenta regresiva
                    cuentaRegresivaDiv.style.display = "none"; // Oculta el div de la cuenta regresiva
                    document.getElementById("respuesta").disabled = false; // Habilita el campo de respuesta
                    preguntaDiv.style.display = "block"; // Muestra el div de la pregunta
                    respuestaInput.style.display = "block"; // Muestra el campo de respuesta
                    respuestaInput.focus(); // Establece el foco en el campo de respuesta
                    resultadoDiv.style.display = "block"; // Muestra el div del resultado
                    iniciarProgreso(); // Iniciar la barra de carga al llegar a cero la cuenta regresiva
                    const barraProgreso = document.getElementById("progress-bar-fill");
                    barraProgreso.style.width = "100%";
                
                }
            }, 1000); // Actualiza la cuenta regresiva cada segundo
        });


    