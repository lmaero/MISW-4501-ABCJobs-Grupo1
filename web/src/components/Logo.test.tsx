import Logo from '@/components/Logo'
import { render } from '@testing-library/react'

describe('Logo Component', () => {
  it('should render the Logo component', () => {
    const { container } = render(<Logo />)
    const svgElement = container.querySelector('svg')

    expect(svgElement).toBeInTheDocument()

    expect(svgElement).toHaveAttribute('viewBox', '0 0 63.71 60')
  })
})
