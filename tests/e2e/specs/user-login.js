describe("Teste de login", () => {
    it("Acessa a página de inicial e faz login com uma conta existente", () => {
        const email = "adriano@email.com"
        const password = "abcd1234"

        cy.visit("/")
        cy.get('#loginform > :nth-child(1) > .form-control').type(email)
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${password}{enter}`)
        cy.contains("p", "Inventario")
    })
})
