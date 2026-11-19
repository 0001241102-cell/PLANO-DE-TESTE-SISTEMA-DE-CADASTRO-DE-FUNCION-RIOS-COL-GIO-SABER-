
const fs = require("fs");

const {
    validarDadosPessoais,
    validarCargoETurno,
    validarSalario,
    formatarTelefone,
    formatarSalario,
    cadastrarFuncionario
} = require("./cadastro");

const caminhoTeste = "funcionario-teste.txt";

const funcionarioValido = {
    nome: "João da Silva",
    endereco: "Rua das Flores, 100",
    email: "joao@email.com",
    telefone: "32999999999",
    cargo: "Professor",
    salario: 2500,
    turno: "Manhã"
};

afterEach(() => {
    if (fs.existsSync(caminhoTeste)) {
        fs.unlinkSync(caminhoTeste);
    }
});

describe("CT01 - Testes Funcionais Básicos", () => {

    test("1.1 - Deve aceitar dados pessoais válidos", () => {
        expect(
            validarDadosPessoais(
                "João da Silva",
                "Rua das Flores, 100",
                "joao@email.com",
                "32999999999"
            )
        ).toBe(true);
    });

    test("1.2 - Deve aceitar o cargo Professor", () => {
        expect(
            validarCargoETurno("Professor", "Manhã")
        ).toBe(true);
    });

    test("1.3 - Deve aceitar o turno Manhã", () => {
        expect(
            validarCargoETurno("Professor", "Manhã")
        ).toBe(true);
    });

    test("1.4 - Deve cadastrar e salvar o funcionário em TXT", () => {
        const resultado = cadastrarFuncionario(
            funcionarioValido,
            caminhoTeste
        );

        expect(resultado).toBe(
            "Funcionário cadastrado com sucesso!"
        );

        expect(fs.existsSync(caminhoTeste)).toBe(true);

        const conteudo = fs.readFileSync(caminhoTeste, "utf8");

        expect(conteudo).toContain("João da Silva");
        expect(conteudo).toContain("Professor");
    });
});

describe("CT02 - Formatação e Validação", () => {

    test("2.1 - Deve rejeitar e-mail inválido", () => {
        expect(
            validarDadosPessoais(
                "João da Silva",
                "Rua A, 10",
                "joao.email",
                "32999999999"
            )
        ).toBe(false);
    });

    test("2.2 - Deve rejeitar telefone com quantidade incorreta", () => {
        expect(
            validarDadosPessoais(
                "João da Silva",
                "Rua A, 10",
                "joao@email.com",
                "99999"
            )
        ).toBe(false);
    });

    test("2.3 - Deve formatar o telefone automaticamente", () => {
        expect(
            formatarTelefone("32999999999")
        ).toBe("(32) 99999-9999");
    });

    test("2.4 - Deve formatar o salário em moeda brasileira", () => {
        expect(
            formatarSalario("2500").replace(/\s/g, " ")
        ).toContain("25,00");
        
        expect(
            formatarSalario("2500")
        ).toContain("R$");
    });
});

describe("CT03 - Tratamento de Erros e Exceções", () => {

    test("3.1 - Deve rejeitar o nome vazio", () => {
        expect(
            validarDadosPessoais(
                "",
                "Rua A, 10",
                "teste@email.com",
                "32999999999"
            )
        ).toBe(false);
    });

    test("3.2 - Deve rejeitar cargo não selecionado", () => {
        expect(
            validarCargoETurno("", "Manhã")
        ).toBe(false);
    });

    test("3.3 - Deve rejeitar salário igual a zero", () => {
        expect(validarSalario(0)).toBe(false);
    });

    test("3.4 - Deve rejeitar salário negativo", () => {
        expect(validarSalario(-1500)).toBe(false);
    });

    test("3.5 - Deve rejeitar turno não selecionado", () => {
        expect(
            validarCargoETurno("Professor", "")
        ).toBe(false);
    });
});
