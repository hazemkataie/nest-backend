import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './account/account';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
  ) {}

  async getAllAccounts(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async getAccountById(id: string): Promise<Account> {
    return this.accountModel.findOne({ id }).exec();
  }

  async createAccount(account: Account): Promise<Account> {
    const createdAccount = new this.accountModel(account);
    return createdAccount.save();
  }

  async updateAccount(id: string, account: Account): Promise<Account> {
    return this.accountModel.findOneAndUpdate({ id }, account, { new: true }).exec();
  }

  async deleteAccount(id: string): Promise<Account> {
    return this.accountModel.findOneAndDelete({ id }).exec();
  }

  async deleteAllAccounts(): Promise<void> {
    await this.accountModel.deleteMany().exec();
  }
}
