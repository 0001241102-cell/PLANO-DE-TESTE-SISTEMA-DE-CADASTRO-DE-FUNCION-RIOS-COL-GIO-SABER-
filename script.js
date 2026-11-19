
const form = document.getElementById("formCadastro");

const nome = document.getElementById("nome");
const endereco = document.getElementById("endereco");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const cargo = document.getElementById("cargo");
const salario = document.getElementById("salario");
const mensagem = document.getElementById("mensagem");

function mostrarErro(id, texto) {
    document.getElementById(id).textContent = texto;
}

function limparErros() {
    document.querySelectorAll(".erro").forEach(function (erro) {
        erro.textContent = "";
    });

    mensagem.textContent = "";
    mensagem.className = "mensagem";
}

function formatarSalario(valor) {
    const numero = valor.replace(/\D/g, "");

    if (numero === "") {
        return "";
    }

    return (Number(numero) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function obterValorSalario(valor) {
    const numero = valor.replace(/\D/g, "");
    return Number(numero) / 100;
}

salario.addEventListener("input", function () {
    salario.value = formatarSalario(salario.value);
});

telefone.addEventListener("input", function () {
    let valor = telefone.value.replace(/\D/g, "").substring(0, 11);

    if (valor.length <= 10) {
        valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
        valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
        valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
    }

    telefone.value = valor;
});

form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    limparErros();

    let valido = true;

    const nomeValor = nome.value.trim();
    const enderecoValor = endereco.value.trim();
    const emailValor = email.value.trim();
    const telefoneValor = telefone.value.replace(/\D/g, "");
    const cargoValor = cargo.value;
    const salarioValor = obterValorSalario(salario.value);

    const turnoSelecionado = document.querySelector(
        'input[name="turno"]:checked'
    );

    if (nomeValor === "") {
        mostrarErro("erroNome", "O nome é obrigatório.");
        valido = false;
    }

    if (enderecoValor === "") {
        mostrarErro("erroEndereco", "O endereço é obrigatório.");
        valido = false;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(emailValor)) {
        mostrarErro("erroEmail", "Digite um e-mail válido.");
        valido = false;
    }

    if (telefoneValor.length < 10 || telefoneValor.length > 11) {
        mostrarErro("erroTelefone", "Digite um telefone válido.");
        valido = false;
    }

    if (cargoValor === "") {
        mostrarErro("erroCargo", "Selecione um cargo.");
        valido = false;
    }

    if (salario.value.trim() === "" || salarioValor <= 0) {
        mostrarErro("erroSalario", "O salário deve ser maior que zero.");
        valido = false;
    }

    if (!turnoSelecionado) {
        mostrarErro("erroTurno", "Selecione um turno.");
        valido = false;
    }

    if (!valido) {
        mensagem.textContent = "Verifique os campos destacados.";
        mensagem.className = "mensagem falha";
        return;
    }

    const funcionario = {
        nome: nomeValor,
        endereco: enderecoValor,
        email: emailValor,
        telefone: telefone.value,
        cargo: cargoValor,
        salario: salarioValor,
        turno: turnoSelecionado.value
    };

    console.log("Funcionário cadastrado:", funcionario);

    mensagem.textContent = "Funcionário cadastrado com sucesso!";
    mensagem.className = "mensagem sucesso";

    form.reset();
});
