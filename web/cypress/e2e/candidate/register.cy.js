describe('register a candidate', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/candidate/register')
  })

  it('displays the three needed inputs', () => {
    cy.get('input').should('have.length', 3)

    cy.get('label').first().should('have.text', 'Email address')
    cy.get('label').last().should('have.text', 'Full Name')
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
    cy.get('[data-testid=crp-full-name]').type('s')
    cy.contains(
      'Full Name should be two words separated by a space, with each word being 2-20 characters long.',
    ).should('be.visible')
  })

  it('shows an error label if it is a long name', () => {
    cy.get('[data-testid=crp-full-name]').type(
      'Super Long Name With a Lot of words',
    )
    cy.contains(
      'Full Name should be two words separated by a space, with each word being 2-20 characters long.',
    ).should('be.visible')
  })

  it('shows an error label if it does not contain a space', () => {
    cy.get('[data-testid=crp-full-name]').type('JohnSmith')
    cy.contains(
      'Full Name should be two words separated by a space, with each word being 2-20 characters long.',
    ).should('be.visible')
  })

  it('does not show an error label if the password has a valid format', () => {
    cy.get('[data-testid=crp-full-name]').type('John Smith')
    cy.get('p.text-sm.text-red-700').should('not.be.visible')
  })

  it('enables the send button if all the fields have valid data', () => {
    cy.get('[data-testid=crp-email]').type('john@smith.org')
    cy.get('[data-testid=crp-password]').type('SuperSecret1#')
    cy.get('[data-testid=crp-full-name]').type('John Smith')

    cy.get('p.text-sm.text-red-700').should('not.be.visible')

    cy.get('button').should('be.enabled')
  })

  it('Sends the data', () => {
    const randomEmail = `john@smith${Math.random()}.org`
    cy.get('[data-testid=crp-email]').type(randomEmail)
    cy.get('[data-testid=crp-password]').type('SuperSecret1#')
    cy.get('[data-testid=crp-full-name]').type('John Smith')

    cy.get('p.text-sm.text-red-700').should('not.be.visible')

    cy.get('button').should('be.enabled').click()
    cy.wait(5000)

    cy.url().should('include', randomEmail)

    // Fill complete profile form
    cy.get('input[type="radio"]').first().check()
    cy.get('input[id="spokenLanguages"]')
      .focus()
      .type('English,Spanish,Russian')
    cy.get('input[id="mainSoftSkills"]').focus().type('Honesty,Patience')
    cy.get('select[id="location"]').focus().select('Switzerland')
    cy.get('input[id="techSkills"]').focus().type('Git,TailwindCSS')
    cy.get('input[id="programmingLanguages"]').focus().type('Git,TailwindCSS')
    cy.get('input[id="roles"]')
      .focus()
      .type('JavaScript,Python,CSS,HTML,Java,Go')
    cy.get('input[id="yearsOfExperience"]').focus().type('0')
    cy.get('input[id="certifications"]').focus().type('AWS,GCP,Azure')
    cy.get('input[id="schoolName"]')
      .focus()
      .invoke('val', 'Los Andes University')
    cy.get('input[id="obtainedDegree"]')
      .focus()
      .invoke('val', 'MSc. Software Engineer')
    cy.get('input[id="startDate"]').focus().type('1993-05-19')
    cy.get('input[id="endDate"]').focus().type('1993-05-19')
    cy.get('input[id="grade"]').focus().type('5')
    cy.get('input[id="title"]').focus().invoke('val', 'CEO')
    cy.get('input[id="company"]').focus().invoke('val', 'ABC Jobs')
    cy.get('select[id="expEmployment"]').focus().select('Contract')
    cy.get('select[id="expRole"]').focus().select('Architect')
    cy.get('input[id="expStartDate"]').focus().type('1993-05-19')
    cy.get('input[id="expEndDate"]').focus().type('1993-05-19')

    cy.contains('Save').should('be.enabled').click()
  })
})
