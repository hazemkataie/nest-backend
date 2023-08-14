//app.controller.ts

import { Controller } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketGateway } from '../gateways/app.getways';
import { Account } from '../models/account';

@Controller('api/accounts')
@WebSocketGateway() // WebSocketGateway dekoratörünü ekleyin
export class AccountSocketController {
  constructor(private readonly socketGateway: SocketGateway) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('getAllAccounts')
  async getAllAccounts(client: Socket): Promise<void> {
    const accounts = await this.socketGateway.getAllAccounts(client);
    client.emit('allAccounts', accounts);
  }

  @SubscribeMessage('getAccountById')
  async getAccountById(client: Socket, id: string): Promise<void> {
    const account = await this.socketGateway.getAccountById(client, id);
    client.emit('accountById', account);
  }

  @SubscribeMessage('createAccount')
  async createAccount(client: Socket, account: Account): Promise<void> {
    const createdAccount = await this.socketGateway.createAccount(client, account);
    client.emit('accountCreated', createdAccount);
  }

  @SubscribeMessage('updateAccount')
  async updateAccount(client: Socket, payload: { id: string; account: Account }): Promise<void> {
    const updatedAccount = await this.socketGateway.updateAccount(client, payload);
    client.emit('accountUpdated', updatedAccount);
  }

  @SubscribeMessage('deleteAccount')
  async deleteAccount(client: Socket, id: string): Promise<void> {
    const deletedAccount = await this.socketGateway.deleteAccountById(client, id);
    client.emit('accountDeleted', deletedAccount);
  }

  @SubscribeMessage('deleteAllAccounts')
  async deleteAllAccounts(client: Socket): Promise<void> {
    await this.socketGateway.deleteAllAccounts(client);
    client.emit('allAccountsDeleted', true);
  }
}
