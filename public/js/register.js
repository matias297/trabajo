function registerAction() {
  const email = document.getElementById("emailRegister").value;
  const password = document.getElementById("passwordRegister").value;
  const nombre = document.getElementById("nombreRegister").value;
  const apellido = document.getElementById("apellidoRegister").value;
  const dni = document.getElementById("dniRegister").value;
  const data = {nombre, email, password, apellido, dni}
  const data2 = {
    email: document.getElementById("emailRegister").value,
    password: document.getElementById("passwordRegister").value,
    nombre: document.getElementById("nombreRegister").value,
    apellido: document.getElementById("apellidoRegister").value,
    dni: document.getElementById("dniRegister").value,
  }
  ajax("POST", "/register", data, function(res){
    window.location.href = "/cines"
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