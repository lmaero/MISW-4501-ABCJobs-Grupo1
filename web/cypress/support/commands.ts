/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { faker } from '@faker-js/faker'

export const candidateEmail = faker.internet.email().toLowerCase()
export const candidatePass = 'SuperSecret1#'
const candidateName = 'ABC Candidate'

export const companyEmail = faker.internet
  .email({ provider: 'abcjobs.com' })
  .toLowerCase()
export const companyPass = 'SuperSecret2#'
const companyName = 'ABC Company'

Cypress.Commands.add('getCy', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args)
})

Cypress.Commands.add('signOut', () => {
  cy.getCy('nav-profile').click()
  cy.getCy('signOut').click()
})

Cypress.Commands.add('loginCandidate', () => {
  cy.clearLocalStorage('token')
  cy.visit('/login')
  cy.get('[data-testid=crp-email]').type(candidateEmail)
  cy.get('[data-testid=crp-password]').type(candidatePass)
  cy.get('#candidate').click()
  cy.get('[data-testid="crp-login-button"]').click()
})

Cypress.Commands.add('loginCompany', () => {
  cy.clearLocalStorage('token')
  cy.visit('/login')
  cy.get('[data-testid=crp-email]').type(companyEmail)
  cy.get('[data-testid=crp-password]').type(companyPass)
  cy.get('#company').click()
  cy.get('[data-testid="crp-login-button"]').click()
})

Cypress.Commands.add('registerCandidate', () => {
  cy.get('[data-testid=crp-email]').type(candidateEmail)
  cy.get('[data-testid=crp-password]').type(candidatePass)
  cy.get('[data-testid=crp-full-name]').type(candidateName)

  cy.get('p.text-sm.text-red-700').should('not.be.visible')

  cy.get('button').should('be.enabled').click()

  cy.wait(2000)
  cy.url().should('include', candidateEmail)

  // Fill complete profile form
  cy.get('input[type="radio"]').first().check()
  cy.get('input[id="spokenLanguages"]').focus().type('English,Spanish,Russian')
  cy.get('input[id="mainSoftSkills"]').focus().type('Honesty,Patience')
  cy.get('select[id="location"]').focus().select(0)
  cy.get('input[id="techSkills"]').focus().type('Git,TailwindCSS')
  cy.get('input[id="programmingLanguages"]').focus().type('Git,TailwindCSS')
  cy.get('input[id="roles"]').focus().type('JavaScript,Python,CSS,HTML,Java,Go')
  cy.get('input[id="yearsOfExperience"]').focus().type('0')
  cy.get('input[id="certifications"]').focus().type('AWS,GCP,Azure')
  cy.get('input[id="schoolName"]').focus().invoke('val', 'Los Andes University')
  cy.get('input[id="obtainedDegree"]')
    .focus()
    .invoke('val', 'MSc. Software Engineer')
  cy.get('input[id="startDate"]').focus().type('1993-05-19')
  cy.get('input[id="endDate"]').focus().type('1993-05-19')
  cy.get('input[id="grade"]').focus().type('5')
  cy.get('input[id="title"]').focus().invoke('val', 'CEO')
  cy.get('input[id="company"]').focus().invoke('val', 'ABC Jobs')
  cy.get('select[id="expEmployment"]').focus().select(0)
  cy.get('select[id="expRole"]').focus().select(0)
  cy.get('input[id="expStartDate"]').focus().type('1993-05-19')
  cy.get('input[id="expEndDate"]').focus().type('1993-05-19')

  cy.get('[data-testid="ccpp-submit-button"]').should('be.enabled').click()
})

Cypress.Commands.add('registerCompany', () => {
  cy.get('[data-testid=crp-email]').type(companyEmail)
  cy.get('[data-testid=crp-password]').type(companyPass)
  cy.get('[data-testid=crp-company-name]').type(companyName)

  cy.get('p.text-sm.text-red-700').should('not.be.visible')

  cy.get('button').should('be.enabled').click()

  cy.wait(2000)
  cy.url().should('include', companyEmail)

  cy.get('input[type="radio"]').first().check()
  cy.get('input[id="mainAddress"]')
    .focus()
    .type('6621 Main Street, Suite 300, Miami, FL 33101')
  cy.get('input[id="segments"]')
    .focus()
    .type('Aviation,Manufacturing,Industrial')
  cy.get('select[id="preferredLanguage"]').focus().select(0)
  cy.get('select[id="mainContact"]').focus().select(0)

  cy.getCy('company-profile-submit-button').should('be.enabled').click()
})
