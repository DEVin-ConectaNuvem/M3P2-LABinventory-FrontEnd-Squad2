describe("Cria conta e faz login", () => {
    it("Acessa a página de inicial, cria uma conta e faz login com a conta criada", () => {
        const name = "Adriano Matos Meier"
        const email = "amm@email.com"
        const password = "abcd1234"

        cy.visit("/")
        cy.get('.criar-conta > .btn').click();
        cy.get('#registerform > :nth-child(1) > .form-control').type(name)
        cy.get('#registerform > :nth-child(2) > .form-control').type(email)
        cy.get(':nth-child(3) > .form-control').type(password)
        cy.get('.modal-footer > .btn-info').click();
        cy.get('#loginform > :nth-child(1) > .form-control').type(email)
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${password}{enter}`)
        cy.contains("p", "Inventario")
    })
})
