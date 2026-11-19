
const fs = require("fs");

const cargosValidos = [
    "Professor",
    "Diretor",
    "Coordenador Pedagógico",
    "Secretário Escolar",
    "Auxiliar Administrativo"
];

const turnosValidos = ["Manhã", "Tarde", "Noite"];

function validarDadosPessoais(nome, endereco, email, telefone) {
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numeroTelefone = String(telefone).replace(/\D/g, "");

    return (
        nome.trim() !== "" &&
        endereco.trim() !== "" &&
        emailValido.test(email) &&
        numeroTelefone.length >= 10 &&
        numeroTelefone.length <= 11
    );
}

function validarCargoETurno(cargo, turno) {
    return (
        cargosValidos.includes(cargo) &&
        turnosValidos.includes(turno)
    );
}

function validarSalario(salario) {
    return Number(salario) > 0;
}

function formatarTelefone(valor) {
    let numero = String(valor).replace(/\D/g, "").substring(0, 11);

    if (numero.length <= 10) {
        numero = numero.replace(/^(\d{2})(\d)/, "($1) $2");
        numero = numero.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
        numero = numero.replace(/^(\d{2})(\d)/, "($1) $2");
        numero = numero.replace(/(\d{5})(\d)/, "$1-$2");
    }

    return numero;
}

function formatarSalario(valor) {
    const numero = String(valor).replace(/\D/g, "");

    if (numero === "") {
        return "";
    }

    return (Number(numero) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function cadastrarFuncionario(funcionario, caminho = "funcionarios.txt") {
    const dadosValidos = validarDadosPessoais(
        funcionario.nome,
        funcionario.endereco,
        funcionario.email,
        funcionario.telefone
    );

    const profissionalValido = validarCargoETurno(
        funcionario.cargo,
        funcionario.turno
    );

    const salarioValido = validarSalario(funcionario.salario);

    if (!dadosValidos || !profissionalValido || !salarioValido) {
        return "Erro: verifique os dados do funcionário.";
    }

    fs.appendFileSync(
        caminho,
        JSON.stringify(funcionario, null, 2) + "\n\n",
        "utf8"
    );

    return "Funcionário cadastrado com sucesso!";
}

module.exports = {
    validarDadosPessoais,
    validarCargoETurno,
    validarSalario,
    formatarTelefone,
    formatarSalario,
    cadastrarFuncionario
};

