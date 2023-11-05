import { ErrorMessage } from './ErrorMessage'

describe('<ErrorMessage />', () => {
  it('renders the message in appropriate style', () => {
    const message = 'An error message'
    cy.mount(<ErrorMessage message={message} />)

    cy.get('p')
      .should('be.visible')
      .should('have.class', 'text-red-700')
      .should('have.text', message)
  })
})
