describe("Teste emprestimo de itens", () => {
    const email = "adriano@email.com"
    const password = "abcd1234"

    // Faz login
    before(() => {
        cy.visit("/")
        cy.get('#loginform > :nth-child(1) > .form-control').type(email)
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${password}{enter}`)
    })

    it("Acessa a página inicial, faz login, acessa pagina de inventario e faz busca por item", () => {
        cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click()
        cy.contains("h3", "Buscar itens")
        cy.get('#search-item').type("G403", {force: true})
        cy.contains("G403")
    })
})
