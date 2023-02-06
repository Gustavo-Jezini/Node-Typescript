import { type AddAccount, type Encrypter, type AddAccountModel, type AccountModel } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    this.encrypter.encrypt(account.password)
    return await new Promise(resolve => { resolve(null) })
  }
}
