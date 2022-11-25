describe("Teste emprestimo de itens", () => {
    const email = "mcoelho@email.com"
    const password = "@abc1234"

    // Faz login
    before(() => {
        cy.visit("/")
        cy.get('#loginform > :nth-child(1) > .form-control').type(email)
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${password}{enter}`)
    })

    it("Acessa a página inicial, faz login e realiza um emprestimo de item", () => {
        const nomeCompleto = "Ana Banana";
        const dataNascimento = "1980-02-07";
        const telefone = "48999998877";
        const emailColaborador = "ana@email.com";
        const cep = "88132373";
        const numeroDaCasa = "105";
        const complemento = "901A";
        const pontoDeReferencia = "Santa Ana Residence"; 
        
        // Cadastra o colaborador
        cy.get('.btns-div > :nth-child(2) > :nth-child(2)').click()
        cy.get('.slider').click()
        cy.get(":nth-child(1) > .col-6 > .form-control").type(nomeCompleto)
        cy.get(":nth-child(2) > .form-select").select("Feminino")
        cy.get(":nth-child(1) > :nth-child(3) > .form-control").type(dataNascimento)
        cy.get(":nth-child(2) > :nth-child(1) > .form-control").type(telefone)
        cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(emailColaborador)
        cy.get(":nth-child(3) > .form-select").select("DevOps")
        cy.get(':nth-child(5) > .col-4 > .form-control').type(cep)
        cy.get(':nth-child(6) > .col-2 > .form-control').type(numeroDaCasa)
        cy.get(':nth-child(7) > :nth-child(1) > .form-control').type(complemento)
        cy.get(":nth-child(7) > :nth-child(3) > .form-control").type(pontoDeReferencia)
        cy.get(".btn-info").click()

        // Realiza o emprestimo do item para o colaborador cadastrado
        cy.get('.btns-div > :nth-child(3) > :nth-child(3)').click()
        cy.get('#search-item').type("PS9999-999", {force: true})
        cy.get('.form-select').first().select('Ana Banana')
        cy.contains("p", "Emprestar")
    })
})
