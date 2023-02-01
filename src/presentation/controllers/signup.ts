import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { MissingParamErrors } from '../errors/missing-params-errors'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfimation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamErrors(field))
      }
    }
  }
}
