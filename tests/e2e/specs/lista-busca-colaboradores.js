describe("Teste listagem colaboradores", () => {
    const email = "mcoelho@email.com"
    const password = "@abc1234"

    before(() => {
        cy.visit("/")
        cy.get('#loginform > :nth-child(1) > .form-control').type(email)
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${password}{enter}`)
    })

    afterEach(() => {
        cy.get('.btns-div > :nth-child(1) > :nth-child(3)').click()
    })

    it("Acessa a página inicial e lista os colaboradores", () => {
        const nomeCompleto = "Deputado Tiririca";
        const dataNascimento = "1965-05-01";
        const telefone = "48999998877";
        const emailColaborador = "tiririca@email.com";
        const cep = "62500001";
        const numeroDaCasa = "10";
        const complemento = "jumento";
        const pontoDeReferencia = "pé de cajueiro"; 
        
        // Cadastra o colaborador
        cy.get('.btns-div > :nth-child(2) > :nth-child(2)').click()
        cy.get('.slider').click()
        cy.get(":nth-child(1) > .col-6 > .form-control").type(nomeCompleto)
        cy.get(":nth-child(2) > .form-select").select("Masculino")
        cy.get(":nth-child(1) > :nth-child(3) > .form-control").type(dataNascimento)
        cy.get(":nth-child(2) > :nth-child(1) > .form-control").type(telefone)
        cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(emailColaborador)
        cy.get(":nth-child(3) > .form-select").select("DevOps")
        cy.get(':nth-child(5) > .col-4 > .form-control').type(cep)
        cy.get(':nth-child(6) > .col-2 > .form-control').type(numeroDaCasa)
        cy.get(':nth-child(7) > :nth-child(1) > .form-control').type(complemento)
        cy.get(":nth-child(7) > :nth-child(3) > .form-control").type(pontoDeReferencia)
        cy.get(".btn-info").click()

        // Lista todos os colaboradores
        cy.get('.btns-div > :nth-child(2) > :nth-child(3)').click()
        cy.contains('.first', "Deputado Tiririca")

        // Faz busca por colaborador especifico
        cy.get('#search-user').type("Tiririca", {force: true})
        cy.contains('.first', "Deputado Tiririca")
    })
})
