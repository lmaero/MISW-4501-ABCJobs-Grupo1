describe('search for candidates', () => {
  beforeEach(() => {
    cy.visit('/candidate/search')
  })

  it('displays all the initial inputs and buttons', () => {
    cy.get('input').should('have.length', 15)
    cy.get('button').should('have.length', 2)
  })

  it('is possible to check/uncheck any filter', () => {
    cy.get('input[type="checkbox"]').check().should('be.checked')
    cy.get('input[type="checkbox"]').uncheck().should('not.be.checked')
  })

  it('shows cancel button as enabled and Search as disabled', () => {
    cy.get('button').first().should('be.enabled')
    cy.get('button').last().should('not.be.enabled')
  })

  it('checks elements for each category an enables the Search button', () => {
    cy.get('input[name="roles"]').first().check().should('be.checked')
    cy.get('input[name="programmingLanguages"]')
      .first()
      .check()
      .should('be.checked')
    cy.get('input[name="softSkills"]').first().check().should('be.checked')
    cy.get('input[name="spokenLanguages"]').first().check().should('be.checked')

    cy.get('button').last().should('be.enabled')
  })

  it.only('Sends the data', () => {
    cy.get('input[name="roles"]').first().check().should('be.checked')
    cy.get('input[name="roles"]').last().check().should('be.checked')
    cy.get('input[name="programmingLanguages"]')
      .last()
      .check()
      .should('be.checked')
    cy.get('input[name="programmingLanguages"]')
      .first()
      .check()
      .should('be.checked')
    cy.get('input[name="softSkills"]').first().check().should('be.checked')
    cy.get('input[name="softSkills"]').last().check().should('be.checked')
    cy.get('input[name="spokenLanguages"]').first().check().should('be.checked')
    cy.get('input[name="spokenLanguages"]').last().check().should('be.checked')

    cy.get('button').last().click()

    cy.wait(5000)

    cy.url().should('include', 'results')
  })
})
