describe('register a company', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/company/register')
  })

  it('displays the three needed inputs', () => {
    cy.get('input').should('have.length', 3)

    cy.get('label').first().should('have.text', 'Email address')
    cy.get('label').last().should('have.text', 'Company Name')
  })

  it('is possible to type an email', () => {
    const newItem = 'email@example.com'

    cy.get('[data-testid=crp-email]')
      .click()
      .should('be.focused')
      .type(newItem)
      .should('have.value', newItem)
  })

  it('shows an error label if it is an invalid email', () => {
    cy.get('[data-testid=crp-email]').type('notValidEmail')
    cy.contains('Invalid email').should('be.visible')
  })

  it('is possible to type a password', () => {
    const validPass = 'MySecret10#'
    cy.get('[data-testid=crp-password]')
      .click()
      .should('be.focused')
      .type(validPass)
      .should('have.value', validPass)
  })

  it('shows an error label if it is a short password', () => {
    cy.get('[data-testid=crp-password]').type('short')
    cy.contains('String must contain at least 8 character(s)').should(
      'be.visible',
    )
  })

  it('shows an error label if it is a long password', () => {
    cy.get('[data-testid=crp-password]').type('ReallyLongPassword')
    cy.contains('String must contain at most 16 character(s)').should(
      'be.visible',
    )
  })

  it('shows an error label if the password does not uses appropriate format', () => {
    cy.get('[data-testid=crp-password]').type('WithoutSymbol1')
    cy.contains(
      'Password must be 8-16 characters and include at least one lowercase letter, one uppercase letter, one symbol, and one number.',
    ).should('be.visible')
  })

  it('does not show an error label if the password has a valid format', () => {
    cy.get('[data-testid=crp-password]').type('WithoutSymbol1#')
    cy.get('p.text-sm.text-red-700').should('not.be.visible')
  })

  it('shows an error label if it is an invalid email', () => {
    cy.get('[data-testid=crp-email]').type('notvalidemail')

    cy.contains('Invalid email').should('be.visible')
  })

  it('shows an error label if it is a short name', () => {
    cy.get('[data-testid=crp-company-name]').type('s')
    cy.contains('String must contain at least 5 character(s)').should(
      'be.visible',
    )
  })

  it('shows an error label if it is a long name', () => {
    cy.get('[data-testid=crp-company-name]').type(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      { delay: 0 },
    )
    cy.contains('String must contain at most 100 character(s)').should(
      'be.visible',
    )
  })

  it('enables the send button if all the fields have valid data', () => {
    cy.get('[data-testid=crp-email]').type('john@abcjobs.com')
    cy.get('[data-testid=crp-password]').type('SuperSecret2#')
    cy.get('[data-testid=crp-company-name]').type('ABC Jobs')

    cy.get('p.text-sm.text-red-700').should('not.be.visible')

    cy.get('button').should('be.enabled')
  })

  it('Sends the data', () => {
    const randomEmail = `john@abcjobs${Math.random()}.com`
    cy.get('[data-testid=crp-email]').type(randomEmail)
    cy.get('[data-testid=crp-password]').type('SuperSecret2#')
    cy.get('[data-testid=crp-company-name]').type('ABC Jobs')

    cy.get('p.text-sm.text-red-700').should('not.be.visible')

    cy.get('button').should('be.enabled').click()
  })
})
