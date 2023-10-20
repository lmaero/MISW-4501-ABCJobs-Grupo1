import { roles } from '../../../src/lib/roles'

describe('Create Project Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/projects/create')
  })

  it('displays all the initial inputs and buttons', () => {
    cy.get('input').should('have.length', 8)
    cy.get('textarea').should('have.length', 1)
    cy.get('select').should('have.length', 1)
    cy.get('button').should('have.length', 2)
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

    cy.get('#price').type('100').should('have.value', 100)
    cy.get('#budget').type('-50').should('have.value', -50)
  })

  it('shows an error if the price is below the limit', () => {
    cy.get('#price').focus().type('-1')

    cy.contains('Number must be greater than or equal to 0')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows an error if the price is above the limit', () => {
    cy.get('#price').focus().type('1000000000000000')

    cy.contains('Number must be less than or equal to 100000000000')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows an error if the budget is below the limit', () => {
    cy.get('#budget').focus().type('-1')

    cy.contains('Number must be greater than or equal to 0')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows an error if the budget is above the limit', () => {
    cy.get('#budget').focus().type('1000000000000000')

    cy.contains('Number must be less than or equal to 100000000000')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows the deadline input and can be typed in', () => {
    cy.get('input[id="deadline"]')
      .focus()
      .type('1993-05-19')
      .should('have.value', '1993-05-19')
  })

  it('shows an error if date is the past but it is hidden if is right', () => {
    cy.get('input[id="deadline"]')
      .focus()
      .type('1993-05-19')
      .should('have.value', '1993-05-19')

    cy.contains('Invalid input')
      .should('be.visible')
      .should('have.class', 'text-red-700')

    cy.get('input[id="deadline"]')
      .focus()
      .type('2024-05-19')
      .should('have.value', '2024-05-19')

    cy.get('.text-red-700').should('not.exist')
  })

  it('shows an error if description is too long', () => {
    cy.get('textarea[id="description"]')
      .focus()
      .type(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        { delay: 0 },
      )

    cy.contains('String must contain at most 500 character(s)')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows the stakeholders select and can select a different stakeholder', () => {
    cy.get('select[id="stakeholders"]')
      .focus()
      .select('ABC Jobs')
      .should('have.value', 'ABC Jobs')
  })

  it('tests the buttons', () => {
    cy.get('button[type="reset"]').should('exist').should('be.enabled')
    cy.get('[data-testid=ccpp-submit-button]')
      .should('exist')
      .should('be.disabled')
  })

  it.only('enables the Save button with valid data and can be clicked', () => {
    cy.get(`input[type="checkbox"]`).first().check().should('be.checked')
    cy.get(`input[type="checkbox"]`).last().check().should('be.checked')
    cy.get('#price').type('10000').should('have.value', 10000)
    cy.get('#budget').type('100000').should('have.value', 100000)
    cy.get('input[id="deadline"]')
      .focus()
      .type('2024-05-19')
      .should('have.value', '2024-05-19')
    cy.get('textarea[id="description"]')
      .focus()
      .type('An amazing good description', { delay: 0 })
    cy.get('select[id="stakeholders"]')
      .focus()
      .select('ABC Jobs')
      .should('have.value', 'ABC Jobs')

    cy.contains('Save').should('be.enabled').click()
  })
})
