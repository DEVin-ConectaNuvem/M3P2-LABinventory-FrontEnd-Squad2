describe("Teste de login", () => {

    afterEach(() => {
        cy.get('.btns-div > :nth-child(1) > :nth-child(3)').click()
    })
    
    it("Acessa a página de inicial e faz login com uma conta existente", () => {
        const email = "mcoelho@email.com"
        const password = "@abc1234"

        cy.visit("/")
        cy.get('#loginform > :nth-child(1) > .form-control').type(email)
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${password}{enter}`)
        cy.contains("p", "Inventario")
    })
})
