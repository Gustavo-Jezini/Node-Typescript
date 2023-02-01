import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const systemUnderTest = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })

  test('Should return 400 if no email is provided', () => {
    const systemUnderTest = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: email'))
  })

  // test('Should return 400 if no password is provided', () => {
  //   const systemUnderTest = new SignUpController()
  //   const httpRequest = {
  //     body: {
  //       email: 'any_email@mail.com',
  //       name: 'any_name',
  //       passwordConfirmation: 'any_password'
  //     }
  //   }
  //   const httpResponse = systemUnderTest.handle(httpRequest)
  //   expect(httpResponse.statusCode).toBe(400)
  //   expect(httpResponse.body).toEqual(new Error('Missing param: password'))
  // })

  // test('Should return 400 if no password confirmation is provided', () => {
  //   const systemUnderTest = new SignUpController()
  //   const httpRequest = {
  //     body: {
  //       email: 'any_email@mail.com',
  //       password: 'any_password',
  //       name: 'any_name'
  //     }
  //   }
  //   const httpResponse = systemUnderTest.handle(httpRequest)
  //   expect(httpResponse.statusCode).toBe(400)
  //   expect(httpResponse.body).toEqual(new Error('Missing param: passwordConfirmation'))
  // })
})
