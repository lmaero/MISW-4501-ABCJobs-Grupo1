import { Navbar } from './Navbar'

describe('<Navbar />', () => {
  it('renders null without token', () => {
    cy.mount(<Navbar params={{ lang: 'en' }} />)
    cy.get('[data-cy-root]').should('be.empty')
  })

  it('renders the Navbar with a token', () => {
    localStorage.setItem('token', 'something')

    cy.mount(<Navbar params={{ lang: 'en' }} />)
    cy.get('[data-cy-root]').should('not.be.empty')
    cy.contains('Projects').should('be.visible')
  })
})
