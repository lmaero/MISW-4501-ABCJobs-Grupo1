import { roles } from '../../../src/lib/roles'

describe('Create Project Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/projects/create')
  })

  it('displays the page title and description', () => {
    cy.contains('Create Project')
    cy.contains('Establish the requirements for the new project')
  })

  it('shows all the roles checkboxes', () => {
    for (const role of roles) {
      cy.get(`input[id=${role.id}]`).should('exist')
      cy.get(`label[for=${role.id}]`).should('exist')
    }

    cy.get(`input[id=${roles[0].id}]`).check()
  })

  it('shows the price and budget fields', () => {
    cy.get('#price').should('exist')
    cy.get('#budget').should('exist')

    cy.get('#price').type('100')
    cy.get('#budget').type('-50')
  })

  it('tests the buttons', () => {
    cy.get('button[type="reset"]').should('exist')
    cy.get('[data-testid=ccpp-submit-button]')
      .should('exist')
      .should('be.disabled')
  })
})
