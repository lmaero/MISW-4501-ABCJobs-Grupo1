import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import CandidateRegisterPage from './page'
import LoginPage from "./page";

let emailInput: HTMLInputElement | null,
  passwordInput: HTMLInputElement | null,
  loginButton: HTMLElement | null

beforeEach(() => {
  render(<LoginPage />)
  emailInput = screen.getByTestId('crp-email') as HTMLInputElement
  passwordInput = screen.getByTestId('crp-password') as HTMLInputElement
  loginButton = screen.getByTestId('crp-login-button')
})

test('renders the login form', () => {
  expect(emailInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
})

test('submits the login form with valid data', async () => {
  if (emailInput && passwordInput && loginButton) {
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } })

    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(emailInput).toBeEmptyDOMElement()
      expect(passwordInput).toBeEmptyDOMElement()
    })
  }
})
