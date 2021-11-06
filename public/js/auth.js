async function registerAction() {
  const data2 = [
    (email = document.getElementById("emailRegister").value),
    (password = document.getElementById("passwordRegister").value),
    (nombre = document.getElementById("nombreRegister").value),
    (apellido = document.getElementById("apellidoRegister").value),
    (dni = document.getElementById("dniRegister").value),
  ];
  if (await inputNotNull(data2)) {
    const senData = {
      email : document.getElementById("emailRegister").value,
      password : document.getElementById("passwordRegister").value,
      nombre : document.getElementById("nombreRegister").value,
      apellido : document.getElementById("apellidoRegister").value,
      dni : document.getElementById("dniRegister").value,
    };
    
    ajax("POST", "/register", senData, function (res) {
      console.log(res)
      if (res === "Usuario registrado") {
        console.log("dsadas")
        window.location.href = "/cines";
      }
      if (res.status === 400) {
        alert("Error en el registro");
      }
      if (res === "Usuario ya existe") {
        alert("El usuario ya existe");
      }
    });
  } else {
    alert("Error en el registro");
  }
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
  if (isNaN(Number(input.value))) {
    pintarBorderEnGris(input);
  } else {
    pintarBordeEnRojo(input);
    return false;
  }
}

/* Limitamos Input de DNI */
function verifyDNI(input) {
  if (input.value.length > 8) {
    input.value = input.value.slice(0, 8);
  }
}

function validatePassword(input) {
  console.log(input.value.length);
  if (input.value.length < 7) {
    input.style.borderColor = "red";
  }
}

/* Login */
async function validateStart() {
  const data = [
    email = document.getElementById("usuarioId").value,
    password = document.getElementById("passwordId").value,
  ];
  if (await inputNotNull(data)) {
    const sendData = { email: data[0], password: data[1] };
    ajax("POST", "/login", sendData, function (res) {
      if (res === "Bienvenido") {
        window.location.href = "/cines";
      }
      if (res === "Contraseña incorrecta") {
        alert("Contraseña incorrecta");
      }
      if (res == "Usuario no existe") {
        alert("El usuario no existe");
      }
    });
  } else {
    alert("No puede haber campos vacios");
  }
}

async function inputNotNull(inputs) {
  inputs.map((input) => {
    console.log(input.length === 0);
    if (input.length === 0) {
      return false;
    }
  });
  return true;
}

/* Otras utilidades */
function pintarBordeEnRojo(input) {
  input.style.borderColor = "red";
}

function pintarBorderEnGris(input) {
  input.style.borderColor = "#ced4da";
}

function logout() {
  ajax("GET", "/logout", null, function (res) {
    console.log(res)
    if (res === "logout") {
      window.location.href = "/";
    }
  });
}