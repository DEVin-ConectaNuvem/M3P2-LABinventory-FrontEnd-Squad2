describe('Navbar tests', () => {
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

    it('Check NavBar title, user name, and user icon', () => {
        cy.location().should((loc) => {
            expect(loc.toString().split('#')[1]).to.eq('/users/inventario')
        })
        cy.get('.router').children().first().get('.current-route').should('have.text', 'Inventario')
        cy.get('.router').children().first().get('#user').get('img.gravatar').should('be.visible')
        cy.get('.router').children().first().get('#user').children().first().should('have.text', 'Marcelo Coelho')
        cy.get('.btns-div > :nth-child(2) > :nth-child(3)').click()
        cy.get('.router').children().first().get('.current-route').should('have.text', 'Colaboradores')
        cy.get('.btns-div > :nth-child(3) > :nth-child(3)').click()
        cy.get('.router').children().first().get('.current-route').should('have.text', 'Emprestar')
        cy.get('.btns-div > :nth-child(2) > :nth-child(2)').click()
        cy.get('.router').children().first().get('.current-route').should('have.text', 'Cadastro de colaborador')
        cy.get('.btns-div > :nth-child(3) > :nth-child(2)').click()
        cy.get('.router').children().first().get('.current-route').should('have.text', 'Cadastro de item')
    })
  })