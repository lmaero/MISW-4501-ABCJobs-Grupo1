describe('CandidateCompleteProfilePage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/candidate/register/profile')
  })

  it('shows the radio roles and it can be checked', () => {
    cy.get('input[type="radio"]').first().check()
  })

  it('adds and removes education sections', () => {
    cy.contains('Add more education').click()
    cy.get('input[name="academicData.1.schoolName"]').should('exist')

    cy.get('button:contains("Remove"):eq(1)').click()
    cy.get('input[name="academicData.1.schoolName"]').should('not.exist')
  })

  it('adds and removes experience sections', () => {
    cy.contains('Add more experience').click()
    cy.get('input[name="experienceData.1.title"]').should('exist')

    cy.get('button:contains("Remove"):eq(1)').click()
    cy.get('input[name="experienceData.1.title"]').should('not.exist')
  })
})
