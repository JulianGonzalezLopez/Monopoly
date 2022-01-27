//Este array posee todas las propiedades que hay en el tablero
const PROPIEDADES = [
    {
        nombre: "SALIDA",
        precio: 0,
        comprable: false,
        hipoteca: 0,
        localizacion: 1
    },
    {
        nombre: "CASA_1",
        precio: 50,
        comprable: true,
        hipoteca: 25,
        localizacion: 2
    },
    {
        nombre: "SOPRESA",
        precio: 60,
        comprable: false,
        hipoteca: 30,
        localizacion: 3
    },
    {
        nombre: "CARCEL",
        precio: 0,
        comprable: false,
        hipoteca: 0,
        localizacion: 4
    },
    {
        nombre: "CASA_2",
        precio: 110,
        comprable: false,
        hipoteca: 50,
        localizacion: 5
    },
    {
        nombre: "CASA_3",
        precio: 120,
        comprable: false,
        hipoteca: 60,
        localizacion: 6
    },
    {
        nombre: "SORPRESA",
        precio: 0,
        comprable: false,
        hipoteca: 0,
        localizacion: 7
    },
    {
        nombre: "CASA_4",
        precio: 230,
        comprable: false,
        hipoteca: 100,
        localizacion: 8
    },
    {
        nombre: "CASA_5",
        precio: 240,
        comprable: false,
        hipoteca: 120,
        localizacion: 9
    },
    {
        nombre: "CASA_6",
        precio: 0,
        comprable: false,
        hipoteca: 0,
        localizacion: 10
    },
    {
        nombre: "SORPRESA",
        precio: 350,
        comprable: false,
        hipoteca: 150,
        localizacion: 11
    },
    {
        nombre: "CASA_7",
        precio: 360,
        comprable: false,
        hipoteca: 180,
        localizacion: 12
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
        this.dinero = 1500;
        this.propiedades = [];
        this.propiedadesHipotecadas = [];
        this.locacion = 0;
        this.tiempoEnCarcel = 0;
    }
    comprobarIguales(c){
        if(c == 4){
            this.tiempoEnCarcel += 3;
            this.comprobarCarcel(); 
        }
    }
    compraventa(){
        if (PROPIEDADES[this.locacion].comprable == true){
            if (this.dinero >= PROPIEDADES[this.locacion] ){
            }
        }
        else{
            console.log(PROPIEDADES[this.locacion.efecto])
        }
    }

    moverse(dado1,dado2){
        let cantidadDeIguales = 0;
        if(dado1 == dado2){
            this.locacion += dado1 + dado2;
            cantidadDeIguales += 1;
            if(this.locacion > 11){
                this.locacion -= 11;
            }
            this.comprobarIguales(cantidadDeIguales);
        }
        else{
            this.locacion += dado1 + dado2;
            if(this.locacion > 11){
                this.locacion -= 11;
            }
        }
    }
    comprobarCarcel(dado1,dado2){
        if(this.tiempoEnCarcel > 0){
            this.tiempoEnCarcel -= 1;
        }
        else{
            this.moverse(dado1,dado2);
        }
    }
    tirarDados(){
        let dado1 = Math.ceil(Math.random()*3);
        let dado2 = Math.ceil(Math.random()*3);
        this.comprobarCarcel(dado1,dado2);
    }
}
//Obtengo los elementos que han de ser desactivados en primera mano
let comprarButton = document.getElementById("comprar");
let venderButton = document.getElementById("vender");
let tirarButton = document.getElementById("tirar");
//Desactivo los elementos mencionados
comprarButton.disabled = true;
venderButton.disabled = true;
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
        venderButton.disabled = false;
        tirarButton.disabled = false;
    }
})
