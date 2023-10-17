import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import CompanyRegisterPage from './page'

let emailInput: HTMLInputElement | null
let passwordInput: HTMLInputElement | null
let companyNameInput: HTMLInputElement | null
let registerButton: HTMLElement | null

beforeEach(() => {
  render(<CompanyRegisterPage />)
  emailInput = screen.getByTestId('crp-email') as HTMLInputElement
  passwordInput = screen.getByTestId('crp-password') as HTMLInputElement
  companyNameInput = screen.getByTestId('crp-company-name') as HTMLInputElement
  registerButton = screen.getByTestId('crp-register-button')
})

test('renders the registration form', () => {
  expect(emailInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
  expect(companyNameInput).toBeInTheDocument()
  expect(registerButton).toBeInTheDocument()
})

test('submits the form with valid data', async () => {
  if (emailInput && passwordInput && companyNameInput && registerButton) {
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(companyNameInput, { target: { value: 'Amazon' } })

    fireEvent.click(registerButton)

    await waitFor(() => {
      expect(emailInput).toBeEmptyDOMElement()
      expect(passwordInput).toBeEmptyDOMElement()
      expect(companyNameInput).toBeEmptyDOMElement()
    })
  }
})
