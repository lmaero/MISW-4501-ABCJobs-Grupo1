describe('Create Test Page', () => {
  beforeEach(() => {
    cy.visit('/company/tests/create')
  })

  it('displays all the initial inputs and buttons', () => {
    cy.get('input').should('have.length', 11)
    cy.get('button').should('have.length', 3)
  })

  it('shows the checkbox roles and the first can be checked', () => {
    cy.get('input[type="checkbox"]').first().check()
  })

  it('shows the question input and it can be typed in', () => {
    const question = 'Select the best definition for JSX'
    cy.get('input[data-cy="question"]')
      .focus()
      .invoke('val', question)
      .should('have.value', question)
  })

  it('shows the right answer input and it can be typed in', () => {
    const answer = 'JavaScript XML'
    cy.get('input[data-cy="rightAnswer"]')
      .focus()
      .invoke('val', answer)
      .should('have.value', answer)
  })

  it('shows the wrong options inputs and can be typed in', () => {
    const wrong1 = 'A new language'
    const wrong2 = 'A plugin for JavaScript'
    const wrong3 = 'An awesome library'

    cy.get('input[data-cy="wrongOptions00"]')
      .focus()
      .invoke('val', wrong1)
      .should('have.value', wrong1)

    cy.get('input[data-cy="wrongOptions01"]')
      .focus()
      .invoke('val', wrong2)
      .should('have.value', wrong2)

    cy.get('input[data-cy="wrongOptions02"]')
      .focus()
      .invoke('val', wrong3)
      .should('have.value', wrong3)
  })

  it('enables the Save button with valid data and can be clicked', () => {
    const name = 'React Advance'
    cy.get('input[data-cy="name"]')
      .focus()
      .invoke('val', name)
      .should('have.value', name)

    const question = 'Select the best definition for JSX'
    cy.get('input[data-cy="question"]')
      .focus()
      .invoke('val', question)
      .should('have.value', question)

    const answer = 'JavaScript XML'
    cy.get('input[data-cy="rightAnswer"]')
      .focus()
      .invoke('val', answer)
      .should('have.value', answer)

    const wrong1 = 'A new language'
    const wrong2 = 'A plugin for JavaScript'
    const wrong3 = 'An awesome library'

    cy.get('input[data-cy="wrongOptions00"]')
      .focus()
      .invoke('val', wrong1)
      .should('have.value', wrong1)

    cy.get('input[data-cy="wrongOptions01"]')
      .focus()
      .invoke('val', wrong2)
      .should('have.value', wrong2)

    cy.get('input[data-cy="wrongOptions02"]')
      .focus()
      .invoke('val', wrong3)
      .should('have.value', wrong3)

    cy.get('input[type="checkbox"]').first().check()
    cy.get('input[type="checkbox"]').last().check()

    cy.get('button[type="submit"]').should('be.enabled').click()
    cy.contains('Successfully created').should('be.visible')
  })
})
