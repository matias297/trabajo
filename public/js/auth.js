function registerAction() {
  const data2 = {
    email: document.getElementById("emailRegister").value,
    password: document.getElementById("passwordRegister").value,
    nombre: document.getElementById("nombreRegister").value,
    apellido: document.getElementById("apellidoRegister").value,
    dni: document.getElementById("dniRegister").value,
  };

  ajax("POST", "/register", data2, function (res) {
    if (res.status === 200) {
      window.location.href = "/cines";
    }
    if (res.status === 400) {
      alert("Error en el registro");
    }
    if (res.status === 409) {
      alert("El usuario ya existe");
    }
  });
}

/*Validamos formato tipo email */
function isEmail(inputEmail) {
  const arrayEmail = inputEmail.value.split("@");
  /*Que tenga arroba */
  if (arrayEmail.length === 2) {
    pintarBorderEnGris(inputEmail);
  } else {
    pintarBordeEnRojo(inputEmail);
    return false;
  }

  /*Verificamos que tenga dominio */
  if (arrayEmail[1].length > 0) {
    pintarBorderEnGris(inputEmail);
  } else {
    pintarBordeEnRojo(inputEmail);
    return false;
  }

  /*Verificamos que tenga . */
  if (arrayEmail[1].includes(".")) {
    pintarBorderEnGris(inputEmail);
  } else {
    pintarBordeEnRojo(inputEmail);
    return false;
  }
}

/* Verificamos que los valores del input sean Letras */
function isString(input) {
  if (isNaN(Number((input.value)))){
    pintarBorderEnGris(input);
  } else {
    pintarBordeEnRojo(input);
    return false
  }
}

/* Limitamos Input de DNI */
function verifyDNI(input){
  if (input.value.length > 8) {
    input.value = input.value.slice(0,8); 
  }
}


/* Login */
async function validateStart() {
  const { value: mail } = document.getElementById("usuarioId");
  const { value: constraseña } = document.getElementById("passwordId");
  const data = { email: mail, password: constraseña };
  ajax("POST", "/login", data, function (res) {
    if (res === "Bienvenido") {
      window.location.href = "/cine";
    }
    if (res === "Contraseña incorrecta") {
      alert("Contraseña incorrecta");
    }
    if (res == "Usuario no existe") {
      alert("El usuario no existe");
    }
  });
}


/* Otras utilidades */
function pintarBordeEnRojo(input) {
  input.style.borderColor = "red";
}

function pintarBorderEnGris(input) {
  input.style.borderColor = "#ced4da";
}
