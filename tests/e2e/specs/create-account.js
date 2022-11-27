describe("Cria conta de usuario", () => {
    it("Acessa a página de inicial e cria uma conta de usuario", () => {
        const name = "Tiririca"
        const email = "tiririca@email.com"
        const password = "abcd1234"

        cy.visit("/")
        cy.get('.criar-conta > .btn').click();
        cy.get('#registerform > :nth-child(1) > .form-control').type(name)
        cy.get('#registerform > :nth-child(2) > .form-control').type(email)
        cy.get(':nth-child(3) > .form-control').type(password)
        cy.get(':nth-child(4) > .form-control').type(password)
        cy.get('.modal-footer > .btn-info').click();
        cy.get('.v-toast__text', { timeout: 5000 }).should('contain', 'Conta criada com sucesso!');
    })
})
