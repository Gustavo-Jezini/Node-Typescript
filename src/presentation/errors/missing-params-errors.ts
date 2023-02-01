export class MissingParamErrors extends Error {
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamErrors'
  }
}
