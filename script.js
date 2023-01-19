/*tasks:
1- fecha de cierre: minimo y maximo (min dia actual, maximo 1 mes desde fecha creacion)
2- Setear precio x numero minimo y máximo
3- Setear minimo y maximo de numeros) 
4- fecha de sorteo: minimo y máximo
5- Setear minimo de números para que se cierre el sorteo.
**extra: agregar icono con "?" para info sobre cada form-
------------------------------------------------------------------
6- Crear grilla segun cantidad de numeros seleccionados
7-calcular total recaudado por el momento
8-Bloquear numeros ya seleccionados
9-Generar Numero automaticamente al llegar la hora de sorteo
10- Determinar que numero gano el sorteo
11- Crear 10 usuarios
12- Que cada usuario pueda elegir los nros que quiera
13-el sist determina quien ganó */

/* 
1--------------fecha  minima------------------------------
*/

//let fechaMinCierre = document.getElementById("fecha-cierre");
let fechaMinSorteo = document.getElementById("fecha-sorteo");

let today = new Date();
let minutos = today.getMinutes();
let hora = today.getHours();
let dia = today.getDate();
let mes = today.getMonth() + 1;
let año = today.getUTCFullYear();


if(dia<10) {
    dia = "0" + dia;
}
if(mes<10) {
    mes = "0" + mes;
}
if(hora<10) {
    hora = "0" + hora;
}
if(minutos<10) {
    minutos = "0" + minutos;
}
// FORMATO DE FECHA PARA SETEAR MINIMO PERMITIDO POR INPUT
let fechaMin = año +"-" + mes + "-" + dia + "T" + hora + ":" + minutos;

fechaMinSorteo.setAttribute("min", fechaMin);

/*
1-----------------fecha maxima (1 AÑO A PARTIR DE HOY)------------------------------
*/

let fechaMaxCierre = document.getElementById("fecha-cierre");
let fechaMaxSorteo = document.getElementById("fecha-sorteo");

let diaMaximo = (año + 1) +"-" + mes + "-" + (dia) +" " + hora + ":" + minutos ;

//fechaMaxCierre.setAttribute("max", diaMaximo);
fechaMaxSorteo.setAttribute("max", diaMaximo);

/* 
---------Submit Form-----------
*/
formulario = document.getElementById("form");

let cantidadNum = document.getElementById("cantidad-numeros");
let precioNum = document.getElementById("precio-numero");
let fechaSorteo = document.getElementById("fecha-sorteo");
let fechaCierre = document.getElementById("fecha-cierre");
let minimoNum = document.getElementById("min-numeros");
let listaConfirm = document.getElementById("listaConfirm");
let liCantidad = document.createElement("li");
let liPrecio = document.createElement("li");
let liFechaCierre = document.createElement("li");
let liFechaSorteo = document.createElement("li");
let liMinimoNum = document.createElement("li");
let popup = document.getElementById("popupConfirmacion");
let formHeader = document.getElementById("form-header");

//funcion mostrar popup
function showPopup () {
    popup.style.display = "block"
}

//funcion Ocultar Form y header
function ocultarForm () {
    form.style.display = "none"
    
};

//Asignar LI a lista de popup
liCantidad.textContent = "Cantidad de Numeros: " + cantidadNum.value;
listaConfirm.appendChild(liCantidad);
listaConfirm.appendChild(liPrecio);
listaConfirm.appendChild(liFechaCierre);
listaConfirm.appendChild(liFechaSorteo);
listaConfirm.appendChild(liMinimoNum);

formulario.addEventListener("submit", function(event) {
       event.preventDefault();
      // console.log(cantidadNum.value,precioNum.value, fechaSorteo.value)
       liCantidad.textContent = "Cantidad de Numeros: " + cantidadNum.value;
       liPrecio.textContent = "Precio por Numero: " + precioNum.value;
       liFechaSorteo.textContent = "Fecha realizacion Sorteo: " + (fechaSorteo.value).replace("T"," ");
      // console.log(fechaMinSorteo);
       ocultarForm();
       showPopup ();
} );

// -------- cerrar popup con "cancelar"  ------

let cancelarPopup = document.querySelector(".boton-cancelar")

function cerrarPopup() {
    popup.style.display = "none";
    formulario.style.display = "block";
}

cancelarPopup.addEventListener("click" , cerrarPopup );

//-------crear grilla con numeros al confirmar -----
let confirmRifa = document.querySelector(".boton-confirmar");
let contenedorNumeros = document.getElementById("contenedorNumeros");
let tituloTickets = document.getElementById("titulo-tickets");


function confirmarRifa() {
    popup.style.display = "none";
    contenedorNumeros.classList.add("contenedor-show");
    startCountdown();
    showContador();
    loopArray();
    crearLista();
    divRandom.style.display = "block";
    generarGif();
    displayLista();
    //convertPdf();
}

confirmRifa.addEventListener("click", confirmarRifa);

let divTicket;
//loop crear Tickets
function loopArray() {
    for (let i = 1; i <= cantidadNum.value ; i++) {
        let divTicket = document.createElement("div");
        divTicket.innerText = (i) ;
        divTicket.classList.add("ticket");
        contenedorNumeros.appendChild(divTicket);
        divTicket.setAttribute("id","div"+ i); 
        divTicket.addEventListener("click", function (e) {
            e.preventDefault();
            nroTicket = e.target;
                    
          if (nroTicket.classList.contains("ticketSeleccionado")) {
                dialogComprado.showModal();
                let ticket = nroTicket.innerHTML
                if (ticket.includes("<br>")) {
                    indice=  ticket.indexOf("<");
                    var nticket = ticket.slice(0,indice);
       //             return nticket;
                             }
                //     i= nroTicket.innerHTML - 1;
                 tituloModal.innerHTML = "Ticket Seleccionado: " + nticket;
                nombreComprado.innerHTML = "Ticket Comprado: " + lista[(nticket -1 )].numero +"- " + lista[nticket - 1].nombre;// + lista[i].nombre +" ";//+ lista[i].nro;
                cerrarComprado();
                borrarComprado();
       //         console.log(nroTicket.innerHTML)
      //          console.log(lista)
            }
            else {
                dialogTicket.showModal();
                tituloModal.innerHTML = "Ticket Seleccionado: " + nroTicket.innerHTML;
            }
            cancelarSeleccion();
            return nroTicket;
        })
        }     
    }
       
//----------random number generator-----------

let divRandom = document.querySelector(".random-number-div")
let contenedorRandom = document.getElementById("random-number")
//let random;
function randomGenerator () {
    random = Math.floor(Math.random() * cantidadNum.value + 1);
    contenedorRandom.innerHTML = random;
    
}

//----------    cuenta regresiva -----------

//-------mostrar contador al confirmar rifa --------------
let divContador = document.querySelector(".contenedor-contador");
let divCountGanador = document.querySelector(".count-ganador-container");

function showContador() {
    divCountGanador.style.display = "flex";
    divContador.style.display= "block";
    divCountGanador.classList.add(".count-ganador-container-mobile");
    
}

//var x = setInterval(countdown, 1000)
function startCountdown () {
     x = setInterval(countdown, 1000)
}

function stopCountdown () {
    clearInterval(x);
}
function countdown () {
    let sorteoDate = new Date (fechaSorteo.value);
    let hoy = new Date();
    let cuentaRegresiva = (sorteoDate.getTime()) - (hoy.getTime());
    let sorteoDias = Math.floor(cuentaRegresiva/(1000*60*60*24));
    let sorteoHoras = Math.floor(cuentaRegresiva % (1000*60*60*24) / (1000*60*60));
    let sorteoMinutos = Math.floor((cuentaRegresiva % (1000*60*60)) /(1000*60));
    let sorteoSegundos = Math.floor((cuentaRegresiva % (1000*60)) / 1000);
    
    

    document.getElementById("dias").innerHTML = sorteoDias;
    document.getElementById("horas").innerHTML = sorteoHoras;
    document.getElementById("minutos").innerHTML = sorteoMinutos;
    document.getElementById("segundos").innerHTML = sorteoSegundos;

    if (sorteoDias < 10) {
        document.getElementById("dias").innerHTML = "0 "+ sorteoDias;
    }
    if (sorteoHoras < 10) {
        document.getElementById("horas").innerHTML = "0 "+ sorteoHoras;
    }
    if (sorteoMinutos < 10) {
        document.getElementById("minutos").innerHTML = "0 "+ sorteoMinutos;
    }
    if (sorteoSegundos < 10) {
        document.getElementById("segundos").innerHTML = "0 "+ sorteoSegundos;
    }
    if (cuentaRegresiva <60000 && cuentaRegresiva > 0) {
        
    }
    if (cuentaRegresiva <= 0) {
        randomGenerator();
        stopCountdown(x);
        document.getElementById("dias").innerHTML = "00";
        document.getElementById("horas").innerHTML = "00";
        document.getElementById("minutos").innerHTML = "00";
        document.getElementById("segundos").innerHTML = "00";
        ganador();
        botonReload (divRandom);
        }
 }
// -------BLOQUEAR COMPRA DE TICKETS ------

// -------Seleccionar ticket y elegir nombre Comprador ------
let dialogTicket = document.getElementById("selector-ticket");
let nombreComprador = document.getElementById("nombreComprador");
let cancelarModal = document.getElementById("cancelarModal");
let confirmarTicket = document.getElementById("confirmarTicket");
let tituloModal = document.getElementById("ticketTitle");
let listaNombres = document.querySelector(".lista-tickets");


confirmarTicket.addEventListener("click", guardarNombre);
nombreComprador.addEventListener("keyup",function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        guardarNombre();
    }
});

let lista = [];
function crearLista() {
    for ( i = 1; i <= cantidadNum.value; i++) {
        lista.push({numero:(i) , nombre: "Sin Comprador"}  )
    }
}

//let listaOrdenada = []

function changeColor() {
    if (nroTicket.classList.contains("ticket")) {
        nroTicket.classList.remove("ticket");
        nroTicket.classList.add("ticketSeleccionado")
        }
    else {
        nroTicket.classList.add("ticket");
        nroTicket.classList.remove("ticketSeleccionado")
    }
} 
function guardarNombre() {
    let nombre = nombreComprador.value;
    let nro = Number (nroTicket.innerHTML);
    nroTicket.innerHTML = nro + " " + `<br>` + nombre
    lista.splice(nro-1 ,1 , {numero: nro, nombre:nombre } );  
    changeColor();
    listaNombres.innerHTML = `
    ${generarLista(lista)}`;
    nombreComprador.value = "";
    ticketsVendidos = ticketsVendidos + 1;
    calculoventas();
    // listaNombres.style.display = "inline-block"
    dialogTicket.close();
    return nro;
    
}


function generarLista(arr) {
    let item = "";
    for(let i = 0; i < arr.length; i++) {
        if (arr[i].nombre != "Sin Comprador" )
        item += `<p>${arr[i].numero +" - " + arr[i].nombre}</p>`;
    }
    return item;
}

function cancelarSeleccion () {
        cancelarModal.addEventListener("click",  ()=> {
        dialogTicket.close();
        
        }) 
    }

// ===========FUNCION SELECCIONAR GIF NUMEROS ================
let gifNumeros = document.querySelector(".numbers-gif")
function generarGif() {
   if (cantidadNum.value < 100) {
   gifNumeros.setAttribute("src", "./random2.gif")
   }
   else {
       gifNumeros.setAttribute("src", "./random3.gif" )
   }
}
// ===========FUNCION SELECCIONAR DIV ================




// ===========FUNCION TICKET GANADOR ================
function ganador() {
    let ticketGanador = lista[(random-1)].numero;
    let nombreGanador = lista[(random-1)].nombre;
    gifNumeros.style.display = "none"
    contenedorRandom.innerHTML = "El Ganador es: " + ticketGanador +" - " + nombreGanador + `<br/>`;
    
    }
// ===========FUNCION BOTON RELOAD ================
let divBtnReload = document.querySelector(".reloadBtn-container");

function botonReload (contenedor) {
    let reloadBtn = document.createElement("button");
    reloadBtn.innerHTML = "Nueva Rifa";
    reloadBtn.classList.add("boton-reload");
    contenedor.appendChild(reloadBtn);
    reloadBtn.addEventListener("click", () => { window.location.reload(true)})
}
    
    
//----------MODAL TICKET YA COMPRADO-----------
let dialogComprado = document.getElementById("dialog-comprados");
let cancelarComprado = document.getElementById("cancelar-comprado");
let eliminarComprado = document.getElementById("eliminar-comprado");
let nombreComprado = document.getElementById("nombre-ticket-comprado");


function cerrarComprado () {
    cancelarComprado.addEventListener("click", ()=> {
        dialogComprado.close();
    })
}
let nro;
function borrarComprado() {
    eliminarComprado.addEventListener("click", function() {
    let ticket = nroTicket.innerHTML;
    if (ticket.includes("<br>")) {
        indice=  ticket.indexOf("<");
        let newticket = ticket.slice(0,indice);
        nroTicket.innerHTML = newticket;
        ticketsVendidos = ticketsVendidos - 1;
        calculoventas();
          }
    //let nombre= nombreComprador.value;
      nroTicket.classList.add("ticket")
      nroTicket.classList.remove("ticketSeleccionado");
    let nro = Number (nroTicket.innerHTML);
    lista.splice(nro-1 ,1 , {numero: nro, nombre:"Sin Comprador" } );
    listaNombres.innerHTML = `
    ${generarLista(lista)}`;
    dialogComprado.close();
      })
   }

// ===========CONVERTIR LISTA A PDF ================
let buttonPdf = document.getElementById("convert-pdf");
let divPdf = document.querySelector(".div-botones");
let hideList = document.getElementById("hide-list");
let convertList = document.getElementById("convert-list")

buttonPdf.addEventListener("click", ()=>  html2pdf().from(contenedorNumeros).toPdf().save("tickets"))
convertList.addEventListener("click", ()=>  html2pdf().from(listaNombres).save("lista"))

function displayLista() {
    divPdf.style.display = "flex";
   
    hideList.addEventListener("click", ()=> {
        if (hideList.innerHTML == "Ocultar Lista") {
            listaNombres.style.display = "none";
            hideList.innerHTML = "Mostrar Lista";
        }
        else { hideList.innerHTML = "Ocultar Lista"
               listaNombres.style.display = "block";
        }
        } )
    }

// ===========CALCULO TOTAL DE VENTAS================
let ticketsVendidos = 0;
let totalventas = document.querySelector(".total-ventas");

function calculoventas() {
    console.log(ticketsVendidos);
 total = Number (precioNum.value) * ticketsVendidos;
 totalventas.innerHTML = "tickets vendidos: " + ticketsVendidos + "- " + "total recaudado: " + total;
}




