describe("Teste busca item no inventario", () => {
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

    it("Acessa a página inicial, faz login, acessa pagina de inventario e faz busca por item", () => {
        cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click()
        cy.contains("h3", "Buscar itens")
        cy.get('#search-item').type("XBOX", {force: true})
        cy.contains("Console")
    })
})
