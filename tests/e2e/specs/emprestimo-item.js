describe("Teste emprestimo de itens", () => {
    const email = "adriano@email.com"
    const password = "abcd1234"

    // Faz login
    before(() => {
        cy.visit("/")
        cy.get('#loginform > :nth-child(1) > .form-control').type(email)
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${password}{enter}`)
    })

    it("Acessa a página inicial, faz login e realiza um emprestimo de item", () => {
        const nomeCompleto = "Adriano Matos Meier";
        const dataNascimento = "1980-02-07";
        const telefone = "48999998877";
        const emailColaborador = "teste@email.com";
        const cep = "88132373";
        const numeroDaCasa = "105";
        const complemento = "901A";
        const pontoDeReferencia = "Santa Ana Residence"; 
        
        // Cadastra o colaborador
        cy.get('.btns-div > :nth-child(2) > :nth-child(2)').click()
        cy.get('.slider').click()
        cy.get(":nth-child(1) > .col-6 > .form-control").type(nomeCompleto)
        cy.get(":nth-child(2) > .form-select").select("Masculino")
        cy.get(":nth-child(1) > :nth-child(3) > .form-control").type(dataNascimento)
        cy.get(":nth-child(2) > :nth-child(1) > .form-control").type(telefone)
        cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(emailColaborador)
        cy.get(":nth-child(3) > .form-select").select("DevOps")
        cy.get(":nth-child(4) > .col-4 > .form-control").type(cep)
        cy.get(":nth-child(5) > .col-2 > .form-control").type(numeroDaCasa)
        cy.get(":nth-child(6) > :nth-child(1) > .form-control").type(complemento)
        cy.get(":nth-child(6) > :nth-child(3) > .form-control").type(pontoDeReferencia)
        cy.get(".btn-info").click()
        cy.contains("p", "Dados do colaborador salvos com sucesso.")

        // Realiza o emprestimo do item para o colaborador cadastrado
        cy.get('.btns-div > :nth-child(3) > :nth-child(3)').click()
        cy.get('#search-item').type("AB1234-567")
        cy.get('.form-select').first().select('Adriano Matos Meier')
        cy.contains("p", "Emprestar")
    })
})
