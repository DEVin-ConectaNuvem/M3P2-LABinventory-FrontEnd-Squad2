// import {routes} from '../../../src/routes/routes/routes'
// https://docs.cypress.io/api/table-of-contents
// import { TemplateView } from '../../../src/views/TemplateView.vue'

describe('Navbar tests', () => {
    it('Check NavBar title, user name, and user icon', () => {
        
        const name = 'alfredboris'
        const email = 'alfredboris@email.com'
        const password = '12345678'
        
        cy.visit('/')
        cy.get('.criar-conta > .btn').click()
        cy.get('#registerform > :nth-child(1) > .form-control').type(name)
        cy.get('#registerform > :nth-child(2) > .form-control').type(email)
        cy.get(':nth-child(3) > .form-control').type(password)
        cy.get('.modal-footer > .btn-info').click()
        cy.get('#loginform > :nth-child(1) > .form-control').type(email)
        cy.get('#loginform > :nth-child(2) > .form-control').type(password)
        cy.get('#loginform > .btn-info').click()
        cy.location().should((loc) => {
            expect(loc.toString().split('#')[1]).to.eq('/users/inventario')
        })
        cy.get('.router').children().first().get('.current-route').should('have.text', 'Inventario')
        cy.get('.router').children().first().get('#user').get('img.gravatar').should('be.visible')
        cy.get('.router').children().first().get('#user').children().first().should('have.text', 'alfredboris')
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