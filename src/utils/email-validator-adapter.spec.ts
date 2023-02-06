import { EmailValidatorAdaptor } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const systemUnderTest = new EmailValidatorAdaptor()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = systemUnderTest.isValid('invalid_email@email.com')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const systemUnderTest = new EmailValidatorAdaptor()
    const isValid = systemUnderTest.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct email', () => {
    const systemUnderTest = new EmailValidatorAdaptor()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    systemUnderTest.isValid('any_email@mail.com')

    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
