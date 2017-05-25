window.onload = initApp;
var formRegister;
var database;
var config = {
    apiKey: "AIzaSyDT9Mtc91Yx0zSrBylkZcjll8LyGvz0naY",
    authDomain: "openviosperu-80885.firebaseapp.com",
    databaseURL: "https://openviosperu-80885.firebaseio.com",
    storageBucket: "openviosperu-80885.appspot.com",
    messagingSenderId: "41996574751"
};
firebase.initializeApp(config);
//*projectId: "openviosperu-80885",

function initApp(){
    formRegister = document.getElementById('formRegisterFire');
    formRegister.addEventListener('submit', sendRegister, false)
    database = firebase.database().ref().child('registro');
    getDataRegister();
}

function getDataRegister(){
    database.on('value', function(api){
        var dataRegister = api.val();
        for(var key in dataRegister){
            console.log(dataRegister[key].ApellidosCompletos);
        }
        //*notifyMe()
    });
}

function sendRegister(event){
    event.preventDefault();
    console.log(event.target.ApellidosCompletos.value);
    database.push({
        ApellidosCompletos: event.target.ApellidosCompletos.value,
        Correo: event.target.Correo.value,
        DNI: event.target.DNI.value,
        Direccion: event.target.Direccion.value,
        NombresCompletos: event.target.NombresCompletos.value,
        RUC: event.target.RUC.value,
        Telefonos: event.target.Telefonos.value
    });
    formRegister.reset();
}


function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("");
  }

  // Let's check whether notification permissions have alredy been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Gracias por registrarte!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied' || Notification.permission === "default") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Gracias por registrarte!");
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}


//*function writeUserData(nombre, apellidos, telefonos, correo, direccion,DNI, RUC){
//*    firebase.database().ref('users/' + nombre + " " + apellidos).set({
//*        nombre: nombre,
//*        apellidos: apellidos,
//*        telefonos: telefonos,
//*        correo: correo,
//*        direccion: direccion,
//*        DNI: DNI,
//*        RUC: RUC
//*    });
//*}
//*var enviar = document.getElementById("enviar-btn");
//*var gracias = document.getElementById("gracias");
//*
//*var formulario = document.getElementsByTagName("input");
//*var nombre = formulario[0].value;
//*var apellidos = formulario[1].value;
//*var telefonos = formulario[2].value;
//*var correo = formulario[3].value;
//*var direccion = formulario[4].value;
//*var DNI = formulario[5].value;
//*var RUC = formulario[6].value;
//*enviar.addEventListener('click', function()
//*{
//*    formulario = document.getElementsByTagName("input");
//*    nombre = formulario[0].value;
//*    apellidos = formulario[1].value;
//*    telefonos = formulario[2].value;
//*    correo = formulario[3].value;
//*    direccion = formulario[4].value;
//*    DNI = formulario[5].value;
//*    RUC = formulario[6].value;
//*
//*    if(nombre=="" || apellidos=="" 
//*        || telefonos=="" || correo=="" 
//*        || direccion=="")return;
//*
//*    writeUserData(nombre, apellidos,telefonos, correo,direccion,DNI, RUC);
//*    gracias.classList.remove("hide");
//*    gracias.classList.add("show");
//*    console.log(formulario, apellidos, telefonos, correo, direccion, DNI, RUC);
//*});