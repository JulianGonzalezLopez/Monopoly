//Este array posee todas las propiedades que hay en el tablero
var y = 0;
const PROPIEDADES = [
    {
        nombre: "SALIDA",
        precio: 0,
        comprable: false,
        hipoteca: 0,
        localizacion: 1,
        precioCaer: 0
    },
    {
        nombre: "CASA_1",
        precio: 50,
        comprable: true,
        hipoteca: 25,
        localizacion: 2,
        precioCaer: 5
    },
    {
        nombre: "SOPRESA",
        precio: 60,
        comprable: false,
        hipoteca: 30,
        localizacion: 3,
        precioCaer: 7
    },
    {
        nombre: "CARCEL",
        precio: 0,
        comprable: false,
        hipoteca: 0,
        localizacion: 4,
        precioCaer: 0
    },
    {
        nombre: "CASA_2",
        precio: 110,
        comprable: true,
        hipoteca: 50,
        localizacion: 5,
        precioCaer: 11
    },
    {
        nombre: "CASA_3",
        precio: 120,
        comprable: true,
        hipoteca: 60,
        localizacion: 6,
        precioCaer: 13
    },
    {
        nombre: "SORPRESA",
        precio: 0,
        comprable: false,
        hipoteca: 0,
        localizacion: 7,
        precioCaer: 0
    },
    {
        nombre: "CASA_4",
        precio: 230,
        comprable: true,
        hipoteca: 100,
        localizacion: 8,
        precioCaer: 23
    },
    {
        nombre: "CASA_5",
        precio: 240,
        comprable: true,
        hipoteca: 120,
        localizacion: 9,
        precioCaer: 25
    },
    {
        nombre: "CASA_6",
        precio: 260,
        comprable: true,
        hipoteca: 150,
        localizacion: 10,
        precioCaer: 28
    },
    {
        nombre: "SORPRESA",
        precio: 350,
        comprable: false,
        hipoteca: 150,
        localizacion: 11,
        precioCaer: 0
    },
    {
        nombre: "CASA_7",
        precio: 360,
        comprable: true,
        hipoteca: 180,
        localizacion: 12,
        precioCaer: 40
    },
]
//Este array vacio portará todos los jugadores creados
let jugadores = [];
//Mantiene el ritmo de la partida entre tira y tirada
let clock = 0;
//Defino la clase jugador junto con todos los metodos que puede llevar a cabo
class jugador{
    constructor(nombre){
        this.nombre = nombre;
        this.dinero = 700;
        this.propiedades = [];
        this.propiedadesHipotecadas = [];
        this.locacion = 0;
        this.tiempoEnCarcel = 0;
        this.cargas = 0;
    }

    comprobarCargas(){
        console.log(this.cargas)
        if(this.cargas == 0){
            tirarButton.disabled = true;
        }
        else{
            tirarButton.disabled = false;
        }
    }

    comprobarCarcelCasilla(){
        if (this.locacion == 4){
            this.tiempoEnCarcel +=3;
        }
    }

    comprobarIguales(c){
        if(c == 4){
            this.tiempoEnCarcel = 3;
            this.comprobarCarcel(); 
        }
    }

    moverse(dado1,dado2){
        this.cargas = 0;
        let cantidadDeIguales = 0;
        if(dado1 == dado2){
            cantidadDeIguales += 1;
            this.cargas = 1;
            this.comprobarIguales(cantidadDeIguales);
        }      
        this.locacion += dado1 + dado2;
        if(this.locacion > 11){
            this.locacion -= 11;
        }
    }
    comprobarCarcel(){
        if(this.tiempoEnCarcel > 0){
            this.tiempoEnCarcel -= 1;
            tirarButton.disabled = true;
        }
        else{
            tirarButton.disabled = false;
        }
    }
    tirarDados(){
        let dado1 = Math.ceil(Math.random()*3);
        let dado2 = Math.ceil(Math.random()*3);
        console.log("DADO 1 " +dado1);
        console.log("DADO 2 " +dado2);
        this.comprobarCarcel();
        this.moverse(dado1,dado2);
    }
}

//Obtengo los elementos que han de ser desactivados en primera mano
let comprarButton = document.getElementById("comprar");
let terminarButton = document.getElementById("terminarTurno");
let tirarButton = document.getElementById("tirar");
//Desactivo los elementos mencionados
comprarButton.disabled = true;
terminarButton.disabled = true;
tirarButton.disabled = true;
//Obtengo el elemento crearButton y le agrego su Evento correspondiente, crear
let crearButton = document.getElementById("crearButton");
crearButton.addEventListener("click",()=>{
    let auxNombre = document.getElementById("nombreJugador").value;
    if (auxNombre != ""){
        console.log(auxNombre);
        let auxVar = new jugador(auxNombre);
        jugadores.push(auxVar);
        console.log(jugadores);
        document.getElementById("nombreJugador").value = "";
    }
    else{
        console.log("cualquiera");
    }
})
//Obtengo el elemento iniciarButton y le agrego su evento correspondiente, iniciar el juego siempre y cuando haya 1 o + jugadores
let iniciarButton = document.getElementById("iniciar");
iniciarButton.addEventListener("click",()=>{
    if(jugadores.length < 1){
        window.alert("No hay jugadores");
    }
    else{
        crearButton.disabled = true;
        comprarButton.disabled = false;
        terminarTurno.disabled = false;
        tirarButton.disabled = false;
        let aux = ""
        for (let i = 0; i < jugadores.length; i++){
            aux+= " " + jugadores[i].nombre;
        }
        document.getElementById("jugadoresActuales").innerText ="Jugadores: " + aux;
        clock -= 1;
        settearTurno();
    }

})
let vueltaDado = ()=>{
    if (clock >= jugadores.length){
        clock = 0;
    }
}

tirarButton.addEventListener("click",()=>{
    console.log(jugadores[clock].locacion)
    jugadores[clock].tirarDados();
    console.log(jugadores[clock].locacion)
    jugadores[clock].comprobarCargas();
    console.log(jugadores[clock].locacion)
    actualizarValores();   
    pagarImpuestos();
})

let pagarImpuestos = ()=>{
    let pro = PROPIEDADES[jugadores[clock].locacion-1];
    let anashe = false;
    if (pro.comprable == false){
        jugadores[clock].propiedades.map((x)=>{if (pro == x){anashe = true}})
    }
    if (anashe == false){
        console.log(jugadores[clock].dinero);
        jugadores[clock].dinero -= pro.precioCaer;
        console.log(jugadores[clock].dinero)
    }
}

comprarButton.addEventListener("click",()=>{
    if (jugadores[clock].dinero >= PROPIEDADES[jugadores[clock].locacion].precio && PROPIEDADES[jugadores[clock].locacion-1].comprable == true){
        jugadores[clock].propiedades.push(PROPIEDADES[jugadores[clock].locacion-1]);
        console.log("PUSHEADO")
        PROPIEDADES[jugadores[clock].locacion-1].comprable = false;
        jugadores[clock].dinero -= PROPIEDADES[jugadores[clock].locacion-1].precio;
    }
    else{
        comprarButton.style.backgroundColor = "#red";
    }
})

let noEsCero = ()=>{
    if (jugadores[clock].locacion == 0){
        y = 0
    }
    else{
        y = 1;
    }
}

let actualizarValores = ()=>{
    noEsCero();
    document.getElementById("nombreActual").innerText ="Nombre jugador actual: " + jugadores[clock].nombre;
    document.getElementById("dineroActual").innerText ="Dinero: " + jugadores[clock].dinero;
    document.getElementById("propiedadesActual").innerText ="Propiedades: " + jugadores[clock].propiedades.map((x)=>{return x.nombre})
    document.getElementById("propiedadesHipoActual").innerText ="Propiedades hipotecadas: " + jugadores[clock].propiedadesHipotecadas;
    document.getElementById("tiempoCarcelActual").innerText ="Tiempo en carcel: " + jugadores[clock].tiempoEnCarcel;
    document.getElementById("casActual").innerText = "Casilla actual: " + jugadores[clock].locacion + "\n " + PROPIEDADES[jugadores[clock].locacion-y].nombre;
    document.getElementById("preActual").innerText = "Precio: " + PROPIEDADES[jugadores[clock].locacion-y].precio;
    document.getElementById("hipoActual").innerText = "Hipoteca: " + PROPIEDADES[jugadores[clock].locacion-y].hipoteca;
    document.getElementById("preCaerActual").innerText = "Precio por caer: " + PROPIEDADES[jugadores[clock].locacion-y].precioCaer;
}

let settearTurno = ()=>{
    clock += 1;
    vueltaDado();
    actualizarValores();
    jugadores[clock].comprobarCarcel();
}

terminarTurno.addEventListener("click", ()=>{
    settearTurno();

})



