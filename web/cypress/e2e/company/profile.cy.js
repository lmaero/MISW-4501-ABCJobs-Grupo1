describe('CompanyCompleteProfilePage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/company/register/profile')
  })

  it('displays all the initial inputs and buttons', () => {
    cy.get('input').should('have.length', 5)
    cy.get('select').should('have.length', 2)
    cy.get('button').should('have.length', 2)
  })

  it('shows the radio business sizes and it can be checked', () => {
    cy.get('input[type="radio"]').first().check()
  })

  it('shows the mainAddress input and can be typed in', () => {
    const address = '6621 Main Street, Suite 300, Miami, FL 33101'
    cy.get('input[id="mainAddress"]')
      .focus()
      .type(address)
      .should('have.value', address)
  })

  it('shows an error if mainAddress is too short', () => {
    cy.get('input[id="mainAddress"]').focus().type('E')

    cy.contains('String must contain at least 5 character(s)')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows an error if mainAddress is too long', () => {
    cy.get('input[id="mainAddress"]')
      .focus()
      .type(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        { delay: 0 },
      )

    cy.contains('String must contain at most 100 character(s)')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows the segments input and can be typed in', () => {
    cy.get('input[id="segments"]')
      .focus()
      .type('Aviation,Manufacturing,Industrial')
      .should('have.value', 'Aviation,Manufacturing,Industrial')
  })

  it('shows an error if segments is bad formatted', () => {
    cy.get('input[id="segments"]').focus().type('something weird', { delay: 0 })

    cy.contains(
      'Invalid format. Please use a comma-separated list of alphabetic characters.',
    )
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows the preferredLanguage select and can select a different language', () => {
    cy.get('select[id="preferredLanguage"]')
      .focus()
      .select('Greek')
      .should('have.value', 'Greek')
  })

  it('shows the mainContact select and can select a different contact', () => {
    cy.get('select[id="mainContact"]')
      .focus()
      .select('Alonso Cantu')
      .should('have.value', 'Alonso Cantu')
  })

  it('enables the Save button with valid data and can be clicked', () => {
    cy.get('input[type="radio"]').first().check()
    cy.get('input[id="mainAddress"]')
      .focus()
      .type('6621 Main Street, Suite 300, Miami, FL 33101')
    cy.get('input[id="segments"]')
      .focus()
      .type('Aviation,Manufacturing,Industrial')
    cy.get('select[id="preferredLanguage"]').focus().select('Greek')
    cy.get('select[id="mainContact"]').focus().select('Alonso Cantu')

    cy.contains('Save').should('be.enabled').click()
  })
})
