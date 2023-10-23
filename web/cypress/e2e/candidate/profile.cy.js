describe('CandidateCompleteProfilePage', () => {
  beforeEach(() => {
    cy.visit('/candidate/register/profile')
  })

  it('displays all the initial inputs and buttons', () => {
    cy.get('input').should('have.length', 21)
    cy.get('select').should('have.length', 3)
    cy.get('button').should('have.length', 6)
  })

  it('shows the radio roles and it can be checked', () => {
    cy.get('input[type="radio"]').first().check()
  })

  it('shows the spokenLanguages input and can be typed in', () => {
    cy.get('input[id="spokenLanguages"]')
      .focus()
      .type('English,Spanish,Russian')
  })

  it('shows an error if spokenLanguages is bad formatted', () => {
    cy.get('input[id="spokenLanguages"]')
      .focus()
      .type('English,Spanish, Russian')

    cy.contains('Invalid format')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows the mainSoftSkills input and can be typed in', () => {
    cy.get('input[id="mainSoftSkills"]').focus().type('Honesty,Patience')
  })

  it('shows an error if mainSoftSkills is bad formatted', () => {
    cy.get('input[id="mainSoftSkills"]').focus().type('Honesty, Patience')

    cy.contains('Invalid format')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows the location select and can select a different country', () => {
    cy.get('select[id="location"]')
      .focus()
      .select('Switzerland')
      .should('have.value', 'Switzerland')
  })

  it('shows the techSkills input and can be typed in', () => {
    cy.get('input[id="techSkills"]').focus().type('Git,TailwindCSS')
  })

  it('shows an error if techSkills is bad formatted', () => {
    cy.get('input[id="techSkills"]').focus().type('Git, TailwindCSS')

    cy.contains('Invalid format')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows the programmingLanguages input and can be typed in', () => {
    cy.get('input[id="programmingLanguages"]').focus().type('Git,TailwindCSS')
  })

  it('shows an error if programmingLanguages is bad formatted', () => {
    cy.get('input[id="programmingLanguages"]').focus().type('Git, TailwindCSS')

    cy.contains('Invalid format')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows the roles input and can be typed in', () => {
    cy.get('input[id="roles"]')
      .focus()
      .type('JavaScript,Python,CSS,HTML,Java,Go')
  })

  it('shows an error if roles is bad formatted', () => {
    cy.get('input[id="roles"]')
      .focus()
      .type('JavaScript, Python,CSS,HTML,Java,Go')

    cy.contains('Invalid format')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows the yearsOfExperience input and can be typed in', () => {
    cy.get('input[id="yearsOfExperience"]').focus().type('0')
  })

  it('shows an error if yearsOfExperience is above allowed limit', () => {
    cy.get('input[id="yearsOfExperience"]').focus().type('51')

    cy.contains('Number must be less than or equal to 50')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows an error if yearsOfExperience is below allowed limit', () => {
    cy.get('input[id="yearsOfExperience"]').focus().type('-1')

    cy.contains('Number must be greater than or equal to 0')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows the certifications input and can be typed in', () => {
    cy.get('input[id="certifications"]').focus().type('AWS,GCP,Azure')
  })

  it('shows an error if certifications is bad formatted', () => {
    cy.get('input[id="certifications"]').focus().type('AWS,GCP, Azure')

    cy.contains('Invalid format')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows the schoolName input and can be typed in', () => {
    cy.get('input[id="schoolName"]').focus().type('Los Andes University')
  })

  it('shows an error if schoolName is too short', () => {
    cy.get('input[id="schoolName"]').focus().type('Lo')

    cy.contains('String must contain at least 3 character(s)')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows the obtainedDegree input and can be typed in', () => {
    cy.get('input[id="obtainedDegree"]').focus().type('MSc. Software Engineer')
  })

  it('shows an error if obtainedDegree is too short', () => {
    cy.get('input[id="obtainedDegree"]').focus().type('MSc.')

    cy.contains('String must contain at least 10 character(s)')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows the startDate input and can be typed in', () => {
    cy.get('input[id="startDate"]')
      .focus()
      .type('1993-05-19')
      .should('have.value', '1993-05-19')
  })

  it('shows an error if startDate is in the future', () => {
    cy.get('input[id="startDate"]').focus().type('2125-05-19')

    cy.contains('Start date should be in the past.')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows the endDate input and can be typed in', () => {
    cy.get('input[id="endDate"]')
      .focus()
      .type('1993-05-19')
      .should('have.value', '1993-05-19')
  })

  it('shows the grade input and can be typed in', () => {
    cy.get('input[id="grade"]').focus().type('0')
  })

  it('shows an error if grade is above allowed limit', () => {
    cy.get('input[id="grade"]').focus().type('6')

    cy.contains('Number must be less than or equal to 5')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows an error if grade is below allowed limit', () => {
    cy.get('input[id="grade"]').focus().type('-1')

    cy.contains('Number must be greater than or equal to 0')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('adds and removes education sections', () => {
    cy.contains('Add more education').click()
    cy.get('input[name="academicData.1.schoolName"]').should('exist')

    cy.get('button:contains("Remove"):eq(1)').click()
    cy.get('input[name="academicData.1.schoolName"]').should('not.exist')
  })

  it('shows the title input and can be typed in', () => {
    cy.get('input[id="title"]').focus().type('CEO')
  })

  it('shows an error if title is too short', () => {
    cy.get('input[id="title"]').focus().type('V')

    cy.contains('String must contain at least 2 character(s)')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows the company input and can be typed in', () => {
    cy.get('input[id="company"]').focus().type('ABC Jobs')
  })

  it('shows an error if company is too short', () => {
    cy.get('input[id="company"]').focus().type('V')

    cy.contains('String must contain at least 2 character(s)')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows the expEmployment select and can select a different employment type', () => {
    cy.get('select[id="expEmployment"]')
      .focus()
      .select('Contract')
      .should('have.value', 'Contract')
  })

  it('shows the expRole select and can select a different role', () => {
    cy.get('select[id="expRole"]')
      .focus()
      .select('Architect')
      .should('have.value', 'architect')
  })

  it('shows the expStartDate input and can be typed in', () => {
    cy.get('input[id="expStartDate"]')
      .focus()
      .type('1993-05-19')
      .should('have.value', '1993-05-19')
  })

  it('shows an error if expStartDate is in the future', () => {
    cy.get('input[id="expStartDate"]').focus().type('2125-05-19')

    cy.contains('Start date should be in the past.')
      .should('be.visible')
      .should('have.class', 'text-red-700')
  })

  it('shows the expEndDate input and can be typed in', () => {
    cy.get('input[id="expEndDate"]')
      .focus()
      .type('1993-05-19')
      .should('have.value', '1993-05-19')
  })

  it('adds and removes experience sections', () => {
    cy.contains('Add more experience').click()
    cy.get('input[name="experienceData.1.title"]').should('exist')

    cy.get('button:contains("Remove"):eq(1)').click()
    cy.get('input[name="experienceData.1.title"]').should('not.exist')
  })

  it('enables the Save button with valid data and can be clicked', () => {
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
