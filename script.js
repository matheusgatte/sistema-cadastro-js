const form = document.getElementById("formulario");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const btn = document.getElementById("btn-enviar");

const erroNome = document.getElementById("erro-nome");
const erroEmail = document.getElementById("erro-email");
const mensagem = document.getElementById("mensagem");

const lista = document.getElementById("lista");

nome.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // impede o submit
    email.focus(); // vai pro campo email
  }
});


// Carrega contatos do localStorage
let contatos = JSON.parse(localStorage.getItem("contatos")) || [];

// Salvar no localStorage
function salvarNoLocalStorage() {
  localStorage.setItem("contatos", JSON.stringify(contatos));
}

// Renderizar lista de contatos
function renderizarLista() {
  lista.innerHTML = "";

  contatos.forEach((contato, index) => {
    lista.innerHTML += `
      <div class="item-contato">
        <strong>${contato.nome}</strong> - ${contato.email}
        <button onclick="excluir(${index})">Excluir</button>
      </div>
    `;
  });
}

// Excluir contato
function excluir(index) {
  contatos.splice(index, 1);
  salvarNoLocalStorage();
  renderizarLista();

  mensagem.textContent = "Contato removido com sucesso!";
  mensagem.style.color = "green";
  mensagem.style.display = "block";
}

// Validação de email
function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validação do formulário
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

// Eventos de validação
nome.addEventListener("input", validarFormulario);
email.addEventListener("input", validarFormulario);

// Submit do formulário
form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!validarFormulario()) return;

  const emailJaExiste = contatos.some(
    c => c.email === email.value.trim()
  );

  if (emailJaExiste) {
    mensagem.textContent = "Esse email já está cadastrado.";
    mensagem.style.color = "red";
    mensagem.style.display = "block";
    return;
  }

  const contato = {
    nome: nome.value.trim(),
    email: email.value.trim()
  };

  contatos.push(contato);
  salvarNoLocalStorage();
  renderizarLista();

  mensagem.textContent = "Contato cadastrado com sucesso!";
  mensagem.style.color = "green";
  mensagem.style.display = "block";

  form.reset();
  btn.disabled = true;
});

// Esconder mensagem ao digitar novamente
nome.addEventListener("input", () => {
  mensagem.style.display = "none";
});

email.addEventListener("input", () => {
  mensagem.style.display = "none";
});

// Renderiza lista ao carregar a página
renderizarLista();
