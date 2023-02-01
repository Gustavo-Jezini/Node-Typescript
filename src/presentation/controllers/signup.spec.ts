import { SignUpController } from './signup'
import { MissingParamErrors } from '../errors/missing-params-errors'
import { InvalidParamErrors } from '../errors/invalid-params-errors'
import { type EmailValidator } from '../protocols/email-validator'

interface systemUnderTestTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSystemUnderTest = (): systemUnderTestTypes => {
  // implements garante que será respeitado o que será definido na classe de produção
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      // Mockar o valor que funciona! E testar a excessão, o erro
      return true
    }
  }

  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const { sut: systemUnderTest } = makeSystemUnderTest()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamErrors('name'))
  })

  test('Should return 400 if no email is provided', () => {
    const { sut: systemUnderTest } = makeSystemUnderTest()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamErrors('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const { sut: systemUnderTest } = makeSystemUnderTest()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamErrors('password'))
  })

  test('Should return 400 if no password confirmation is provided', () => {
    const { sut: systemUnderTest } = makeSystemUnderTest()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        name: 'any_name'
      }
    }
    const httpResponse = systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamErrors('passwordConfirmation'))
  })

  test('Should return 400 if an invalid email is provided', () => {
    const { sut: systemUnderTest, emailValidatorStub } = makeSystemUnderTest()
    // Estou usando o Jest para mockar o valor como falso
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamErrors('email'))
  })
})
