function loginAction() {
  const mail = document.getElementById("emailRegister");
  const constraseña = document.getElementById("passwordRegister");
  ajax("POST", "/login", null, function (res) {});
}
