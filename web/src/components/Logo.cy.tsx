import Logo from './Logo'

describe('<Logo />', () => {
  it('renders', () => {
    cy.mount(<Logo />)
    cy.get('svg').should('be.visible')
  })
})
