import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import CompanyCompleteProfilePage from './page'

let companySegmentsInput: HTMLInputElement | null
let registerButton: HTMLElement | null

beforeEach(() => {
  render(<CompanyCompleteProfilePage />)
  companySegmentsInput = screen.getByTestId(
    'company-profile-segments',
  ) as HTMLInputElement
  registerButton = screen.getByTestId(
    'company-profile-submit-button',
  ) as HTMLElement
})

test('renders the registration form', () => {
  expect(companySegmentsInput).toBeInTheDocument()
  expect(registerButton).toBeInTheDocument()
})

test('submits the form with valid data', async () => {
  if (companySegmentsInput && registerButton) {
    fireEvent.change(companySegmentsInput, {
      target: { value: 'Aviation,Industrial' },
    })
    fireEvent.click(registerButton)

    await waitFor(() => {
      expect(companySegmentsInput).toBeEmptyDOMElement()
    })
  }
})
