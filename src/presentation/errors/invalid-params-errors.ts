export class InvalidParamErrors extends Error {
  constructor (paramName: string) {
    super(`Invalid param: ${paramName}`)
    this.name = 'InvalidParamErrors'
  }
}
