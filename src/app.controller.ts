import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Account } from './account/account';
import { AccountService } from './app.service';

@Controller('api/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async getAllAccounts(): Promise<Account[]> {
    return this.accountService.getAllAccounts();
  }

  @Get('/:id')
  async getAccountById(@Param('id') id: string): Promise<Account> {
    return this.accountService.getAccountById(id);
  }

  @Post()
  async createAccount(@Body() account: Account): Promise<Account> {
    return this.accountService.createAccount(account);
  }

  @Put('/:id')
  async updateAccount(@Param('id') id: string, @Body() account: Account): Promise<Account> {
    return this.accountService.updateAccount(id, account);
  }

  @Delete('/:id')
  async deleteAccount(@Param('id') id: string): Promise<Account> {
    return this.accountService.deleteAccount(id);
  }

  @Delete('/delete-all')
  async deleteAllAccounts(): Promise<void> {
    return this.accountService.deleteAllAccounts();
  }
}
