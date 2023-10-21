import { FieldDescription } from './FieldDescription'

describe('<FieldDescription />', () => {
  it('renders the title', () => {
    const title = 'Title'
    cy.mount(<FieldDescription title={title} />)

    cy.get('h4').should('be.visible').should('have.text', title)
  })

  it('renders the description and the title', () => {
    const title = 'Title'
    const description = 'Description'
    cy.mount(<FieldDescription title={title} description={description} />)

    cy.get('h4').should('be.visible').should('have.text', title)
    cy.get('p').should('be.visible').should('have.text', description)
  })
})
