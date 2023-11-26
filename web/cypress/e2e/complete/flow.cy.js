describe('Complete flow', () => {
  it('should allow a complete flow', () => {
    // CANDIDATE REGISTER AND LOGIN
    cy.visit('/')
    cy.getCy('cr-signup').click()
    cy.getCy('cr-card').click()

    cy.registerCandidate()

    cy.loginCandidate()
    cy.get('span').contains('Candidate').should('be.visible')
    cy.signOut()

    // COMPANY REGISTER AND LOGIN
    cy.visit('/')
    cy.getCy('cr-signup').click()
    cy.getCy('cor-card').click()

    cy.registerCompany()

    cy.loginCompany()
    cy.get('span').contains('Company').should('be.visible')
    cy.signOut()

    // CREATE TEST AS COMPANY
    cy.loginCompany()
    cy.getCy('tests').click()
    cy.getCy('create-test').click()

    cy.getCy('name').type('React')
    cy.get('input[type="checkbox"]').first().check()

    const question = 'Select the best definition for JSX'
    cy.get('input[data-cy="question"]').type(question)

    const answer = 'JavaScript XML'
    cy.get('input[data-cy="rightAnswer"]').type(answer)

    const wrong1 = 'A new language'
    const wrong2 = 'A plugin for JavaScript'
    const wrong3 = 'An awesome library'

    cy.get('input[data-cy="wrongOptions00"]').type(wrong1)
    cy.get('input[data-cy="wrongOptions01"]').type(wrong2)
    cy.get('input[data-cy="wrongOptions02"]').type(wrong3)

    cy.getCy('ccpp-submit-button').click()
    cy.signOut()

    // PERFORM TEST AS CANDIDATE
    cy.loginCandidate()
    cy.getCy('tests').click()
    cy.get('input[type="radio"]').first().check()
    cy.getCy('scp-submit-button').click()

    // REVIEW RESULTS AS COMPANY
    cy.signOut()
    cy.loginCompany()
    cy.getCy('tests').click()

    // SCHEDULE INTERVIEW
    cy.getCy('interview-button').click()
    cy.get('.react-datepicker__time-list > :nth-child(17)').click()
    cy.getCy('ccpp-submit-button').click()

    // PUBLISH INTERVIEW RESULTS
    cy.getCy('tests').click()
    cy.getCy('publish-button').click()

    cy.getCy('skill0').type('React')
    cy.getCy('score0').type('80')
    cy.getCy('add-button').click()

    cy.getCy('skill1').type('JavaScript')
    cy.getCy('score1').type('100')
    cy.getCy('add-button').click()

    cy.getCy('skill2').type('Patience')
    cy.getCy('score2').type('70')
    cy.getCy('add-button').click()

    cy.getCy('skill3').type('Honesty')
    cy.getCy('score3').type('100')

    cy.get('#selectedTrue').click()
    cy.getCy('ccpp-submit-button').click()

    // REVIEW INTERVIEW RESULTS
    cy.signOut()
    cy.loginCandidate()

    cy.getCy('interviews').click()
    cy.getCy('results').click()
  })
})
