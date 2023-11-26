describe('Complete flow', () => {
  it('should allow the registration of a new candidate', () => {
    cy.visit('/')
    cy.getCy('cr-signup').click()
    cy.getCy('cr-card').click()

    cy.registerCandidate()
  })

  it('should allow the login of a registered candidate', () => {
    cy.loginCandidate()
    cy.get('span').contains('Candidate').should('be.visible')
    cy.signOut()
  })

  it('should allow the registration of a new company', () => {
    cy.visit('/')
    cy.getCy('cr-signup').click()
    cy.getCy('cor-card').click()

    cy.registerCompany()
  })

  it('should allow the login of a registered company', () => {
    cy.loginCompany()
    cy.get('span').contains('Company').should('be.visible')
    cy.signOut()
  })
})
