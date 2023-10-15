import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import CandidateCompleteProfilePage from './page'

let spokenLanguagesInput: HTMLInputElement | null
let registerButton: HTMLElement | null

beforeEach(() => {
  render(<CandidateCompleteProfilePage />)
  spokenLanguagesInput = screen.getByTestId(
    'ccpp-spoken-languages',
  ) as HTMLInputElement
  registerButton = screen.getByTestId('ccpp-submit-button') as HTMLElement
})

test('renders the registration form', () => {
  expect(spokenLanguagesInput).toBeInTheDocument()
  expect(registerButton).toBeInTheDocument()
})

test('submits the form with valid data', async () => {
  if (spokenLanguagesInput && registerButton) {
    fireEvent.change(spokenLanguagesInput, {
      target: { value: 'English,Spanish' },
    })
    fireEvent.click(registerButton)

    await waitFor(() => {
      expect(spokenLanguagesInput).toBeEmptyDOMElement()
    })
  }
})
