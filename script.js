const form = document.getElementById("formulario");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const btn = document.getElementById("btn-enviar");

const erroNome = document.getElementById("erro-nome");
const erroEmail = document.getElementById("erro-email");
const mensagem = document.getElementById("mensagem");


function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}


function validarFormulario() {
  let valido = true;

  
  if (nome.value.trim() === "") {
    erroNome.textContent = "Nome obrigatório";
    nome.classList.add("invalido");
    valido = false;
  } else {
    erroNome.textContent = "";
    nome.classList.remove("invalido");
  }


  if (!emailValido(email.value.trim())) {
    erroEmail.textContent = "Email inválido";
    email.classList.add("invalido");
    valido = false;
  } else {
    erroEmail.textContent = "";
    email.classList.remove("invalido");
  }

  btn.disabled = !valido;
  return valido;
}


nome.addEventListener("input", validarFormulario);
email.addEventListener("input", validarFormulario);


form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!validarFormulario()) return;

  mensagem.textContent = "Formulário enviado com sucesso!";
  mensagem.style.color = "green";

  form.reset();
  btn.disabled = true;
});
