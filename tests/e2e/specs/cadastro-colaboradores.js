import { faker } from '@faker-js/faker';

describe("Testando Tela de cadastro de colaboradores", () => {
    const email = "mcoelho@email.com"
    const senha = "@abc1234"

    beforeEach(() => {
        cy.visit("/")
        cy.get('#loginform > :nth-child(1) > .form-control').type(email)
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${senha}{enter}`)
    })

    afterEach(() => {
        cy.get('.btns-div > :nth-child(1) > :nth-child(3)').click()
    })

    it("Deve retornar que os campos são obrigatórios", () => {
        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > .col-6 > .form-control").click();
        cy.get(".container").click();
        cy.contains("span", "Campo obrigatório.");

        cy.get(":nth-child(1) > :nth-child(3) > .form-control").click();
        cy.get(".container").click();
        cy.contains("span", "Campo obrigatório.");

        cy.get(":nth-child(2) > :nth-child(1) > .form-control").click();
        cy.get(".container").click();
        cy.contains("span", "Campo obrigatório.");

        cy.get(":nth-child(2) > :nth-child(2) > .form-control").click();
        cy.get(".container").click();
        cy.contains("span", "Campo obrigatório.");

        cy.get(":nth-child(5) > .col-4 > .form-control").click();
        cy.get(".container").click();
        cy.contains("span", "Campo obrigatório.");
    })

    it("Deve retornar que eu devo inserir meu nome completo", () => {
        const nomeInvalido = "Kauã";

        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > .col-6 > .form-control").type(nomeInvalido)
        cy.get(".container").click();
        cy.contains("span", "Informe o nome completo");
    })

    it("Deve retornar que eu devo inserir um número de telefone válido", () => {
        const numeroTelefoneInvalido = "40028922";

        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(2) > :nth-child(1) > .form-control").type(numeroTelefoneInvalido)
        cy.get(".container").click();
        cy.contains("span", "Favor digitar um telefone válido");
    })

    it("Deve retornar que o email inserido é inválido", () => {
        const emailInvalido = "kauaemailinvalido";

        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(emailInvalido)
        cy.get(".container").click();
        cy.contains("span", "Email inválido.");
    })

    it("Deve retornar que o colaborador foi inserido com sucesso quando passada todas as informações", () => {
        const nomeCompleto = "Kauã Kirchner de Souza";
        const dataNascimento = "2005-01-07";
        const telefone = "48984995578";
        const emailColaborador = faker.internet.email();
        const cep = "88010-400";
        const numeroDaCasa = "96";
        const complemento = "anyway";
        const pontoDeReferencia = "Árvores";

        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > .col-6 > .form-control").type(nomeCompleto);
        cy.get(":nth-child(2) > .form-select").select("Masculino");
        cy.get(":nth-child(1) > :nth-child(3) > .form-control").type(dataNascimento);
        cy.get(":nth-child(2) > :nth-child(1) > .form-control").type(telefone);
        cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(emailColaborador)
        cy.get(":nth-child(3) > .form-select").select("Front-end dev");

        cy.get(":nth-child(5) > .col-4 > .form-control").type(cep);
        cy.get(":nth-child(6) > .col-2 > .form-control").type(numeroDaCasa);
        cy.get(":nth-child(7) > :nth-child(1) > .form-control").type(complemento);
        cy.get(":nth-child(7) > :nth-child(3) > .form-control").type(pontoDeReferencia);
        cy.get(".btn-info").click();
        cy.get('.v-toast__text', { timeout: 5000 }).should('contain', 'Colaborador inserido com sucesso!');

    })

    it("Deve retornar que o usuário já existe na base de dados.", () => {
        const nomeCompleto = "Kauã Kirchner de Souza";
        const dataNascimento = "2005-01-07";
        const telefone = "48984995578";
        const emailColaborador = "kauakirchner@email.com";
        const cep = "88010-400";
        const numeroDaCasa = "96";
        const complemento = "anyway";
        const pontoDeReferencia = "Árvores";

        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > .col-6 > .form-control").type(nomeCompleto);
        cy.get(":nth-child(2) > .form-select").select("Masculino");
        cy.get(":nth-child(1) > :nth-child(3) > .form-control").type(dataNascimento);
        cy.get(":nth-child(2) > :nth-child(1) > .form-control").type(telefone);
        cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(emailColaborador)
        cy.get(":nth-child(3) > .form-select").select("Front-end dev");
        cy.get(":nth-child(5) > .col-4 > .form-control").type(cep);
        cy.get(":nth-child(6) > .col-2 > .form-control").type(numeroDaCasa);
        cy.get(":nth-child(7) > :nth-child(1) > .form-control").type(complemento);
        cy.get(":nth-child(7) > :nth-child(3) > .form-control").type(pontoDeReferencia);
        cy.get(".btn-info").click();
        cy.get('.v-toast__text', { timeout: 5000 }).should('contain', 'Colaborador com email kauakirchner@email.com já existe.');
        
    })
})
