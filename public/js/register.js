function registerAction() {

  const data2 = {
    email: document.getElementById("emailRegister").value,
    password: document.getElementById("passwordRegister").value,
    nombre: document.getElementById("nombreRegister").value,
    apellido: document.getElementById("apellidoRegister").value,
    dni: document.getElementById("dniRegister").value,
  }

  ajax("POST", "/register", data2, function(res){
    if(res.status === 200){
      window.location.href = "/cines"
    }
    if(res.status === 400){
      alert("Error en el registro")
    }
    if(res.status === 409){
      alert("El usuario ya existe")
    }
  })


}

function isEmail(){
  const inputEmail = document.getElementById("emailRegister")
  const arrayEmail = inputEmail.value.split("@")
  /*Que tenga arroba */
  if(arrayEmail.length < 2){
    inputEmail.style.border = "1px red solid";
  }else{
    inputEmail.style.border = "1px gray solid";
  }
  /*Verificamos la primera parte */
  if(arrayEmail[0] === ''){
    inputEmail.style.border = "1px red solid";
  }else{
    inputEmail.style.border = "1px gray solid";
  }
  /*Verificamos que tengo domino y .com */
  
}

function passwordOk(){

}

function isString(){
    
}

function isDNI(){

}


async function validateStart(){
  const {value : mail} = document.getElementById("usuarioId");
  const {value : constraseña} = document.getElementById("passwordId");
  const data = {email: mail, password: constraseña}
  ajax("POST", "/login", data, function (res) {
    if(res === "Bienvenido"){
      window.location.href = "/cines"
    }
    if(res === "Contraseña incorrecta"){
      alert("Contraseña incorrecta")
    }
    if(res == "Usuario no existe"){
      alert("El usuario no existe")
    }
  });
}

async function isMail(){
  const input = document.querySelector(".usuarioId");

}

async function validatePassword(){
  
}