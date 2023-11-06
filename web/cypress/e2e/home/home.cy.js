describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('show the logo and the ABC Jobs title', () => {
    cy.get('svg').should('be.visible')
    cy.get('h1').should('have.text', 'ABC Jobs')
  })
})
