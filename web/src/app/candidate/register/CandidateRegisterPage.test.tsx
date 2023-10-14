import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import CandidateRegisterPage from './page'

let emailInput: HTMLInputElement | null,
  passwordInput: HTMLInputElement | null,
  fullNameInput: HTMLInputElement | null,
  registerButton: HTMLElement | null

beforeEach(() => {
  render(<CandidateRegisterPage />)
  emailInput = screen.getByTestId('crp-email') as HTMLInputElement
  passwordInput = screen.getByTestId('crp-password') as HTMLInputElement
  fullNameInput = screen.getByTestId('crp-full-name') as HTMLInputElement
  registerButton = screen.getByTestId('crp-register-button')
})

test('renders the registration form', () => {
  expect(emailInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
  expect(fullNameInput).toBeInTheDocument()
  expect(registerButton).toBeInTheDocument()
})

test('submits the form with valid data', async () => {
  if (emailInput && passwordInput && fullNameInput && registerButton) {
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(fullNameInput, { target: { value: 'John Smith' } })

    fireEvent.click(registerButton)

    await waitFor(() => {
      expect(emailInput).toBeEmptyDOMElement()
      expect(passwordInput).toBeEmptyDOMElement()
      expect(fullNameInput).toBeEmptyDOMElement()
    })
  }
})
