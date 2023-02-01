import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { MissingParamErrors } from '../errors/missing-params-errors'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamErrors('name')
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }

    if (!httpRequest.body.password) {
      return {
        statusCode: 400,
        body: new Error('Missing param: password')
      }
    }
  }
}
