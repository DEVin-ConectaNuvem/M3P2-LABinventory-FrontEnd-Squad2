describe("Testa tela inventory book colaboradores e emprestimos", () => {
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
        
    it("Deve visualizar colaborador cadastrado na tela inventário", () => {

        const nomeCompleto = "Paula Moura"; 
        const dataNascimento = "1998-07-14";
        const telefone = "48984995578";
        const emailColaborador = "julia@gmail.com";
        const cep = "16201169";
        const numeroDaCasa = "992";
        const complemento = "anyway";
        const pontoDeReferencia = "Casa";

        // Cadastrando um colaborador para verificar cards: colaboradores, itens, total e emprestados
        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > .col-6 > .form-control").type(nomeCompleto);
        cy.get(":nth-child(2) > .form-select").select("Feminino");
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

        //Voltar Tela 
        cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click();
    })

    it("Deve visualizar item emprestado na tela inventário", () => {

        //Realizar emprestimo
        cy.get('.btns-div > :nth-child(3) > :nth-child(3)').click()
        cy.get('#search-item').type("AB5214-567", {force: true})
        cy.get('.form-select').first().select('Paula Moura')
        

        //Voltar Tela inventario
        cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click();
        cy.get('#search-item').type("Monitor 23'' Samsumg", {force: true})

        // Desfaço emprestimo - COM ERRO ao colocar item disponível
        cy.get('.btns-div > :nth-child(3) > :nth-child(3)').click()
        cy.get('#search-item').type("AB5214-567", {force: true}) 
        cy.get('.form-select').first().select('Item disponível')

        //Voltar Tela inventario
        cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click();
        cy.get('#search-item').type("Monitor 23'' Samsumg", {force: true})
    })

    it("Deve excluir colaborador", () => {
       
        cy.get('.btns-div > :nth-child(2) > :nth-child(3)').click()
        cy.get('#search-user').type("Paula Moura", {force: true})
        cy.get('#modal-btn > .gravatar').click();

        cy.get('.btn-outline-danger').click()
    })
    
})
