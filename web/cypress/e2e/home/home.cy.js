describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('show the logo and the ABC Jobs title', () => {
    cy.get('svg').should('be.visible')
    cy.get('h1').should('have.text', 'ABC Jobs')
  })

  it('redirect to /register if no token exists', () => {
    cy.wait(1000)
    cy.get('h1').should('have.text', 'Register')

    cy.get('a[href="/candidate/register"]')
      .should('be.visible')
      .should('have.attr', 'href')
      .and('include', '/candidate/register')

    cy.get('a[href="/company/register"]')
      .should('be.visible')
      .should('have.attr', 'href')
      .and('include', '/company/register')
  })
})
