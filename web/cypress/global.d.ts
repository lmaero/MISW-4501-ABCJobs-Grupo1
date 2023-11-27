/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getCy(
      dataTestAttribute: string,
      args?: undefined,
    ): Chainable<JQuery<HTMLElement>>

    clearDatabase(): Chainable<JQuery<HTMLElement>>
    loginCandidate(): Chainable<JQuery<HTMLElement>>
    loginCompany(): Chainable<JQuery<HTMLElement>>
    signOut(): Chainable<JQuery<HTMLElement>>
    registerCandidate(): Chainable<JQuery<HTMLElement>>
    registerCompany(): Chainable<JQuery<HTMLElement>>
  }
}
