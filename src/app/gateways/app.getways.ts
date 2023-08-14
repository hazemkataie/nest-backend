import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Account } from '../models/account';
import { AccountService } from 'src/app.service';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly accountService: AccountService) {
    
  }

  @WebSocketServer()
  server: Server;

  

  async handleConnection(client: Socket) {
    // Bağlantı kurulduğunda yapılacak işlemler
  }

  async handleDisconnect(client: Socket) {
    // Bağlantı kesildiğinde yapılacak işlemler
  }

  @SubscribeMessage('getAllAccounts')
  async getAllAccounts(client: Socket): Promise<void> {
    const accounts = await this.accountService.getAllAccounts();
    client.emit('allAccounts', accounts);
  }

  async deleteAllAccounts(client: Socket): Promise<void> {
    try {
      await this.accountService.deleteAllAccounts();
      client.emit('allAccountsDeleted', true);
    } catch (error) {
      client.emit('deleteAllError', { message: 'Tüm hesaplar silinirken bir hata oluştu.' });
    }
  }

  @SubscribeMessage('getAccountById')
  async getAccountById(client: Socket, id: string): Promise<void> {
    const account = await this.accountService.getAccountById(id);
    client.emit('accountById', account);
  }

  @SubscribeMessage('deleteAccountById')
  async deleteAccountById(client: Socket, id: string): Promise<void> {
    try {
      const deletedAccount = await this.accountService.deleteAccount(id);
      client.emit('accountDeleted', deletedAccount);
    } catch (error) {
      client.emit('deleteError', { message: 'Hesap silinirken bir hata oluştu.' });
    }
  }

  @SubscribeMessage('createAccount')
  async createAccount(client: Socket, account: Account): Promise<void> {
    try {
      const createdAccount = await this.accountService.createAccount(account);
      client.emit('accountCreated', createdAccount);
    } catch (error) {
      client.emit('createError', { message: 'Hesap oluşturulurken bir hata oluştu.' });
    }
  }

  @SubscribeMessage('updateAccount')
  async updateAccount(client: Socket, payload: { id: string; account: Account }): Promise<void> {
    try {
      const updatedAccount = await this.accountService.updateAccount(payload.id, payload.account);
      client.emit('accountUpdated', updatedAccount);
    } catch (error) {
      client.emit('updateError', { message: 'Hesap güncellenirken bir hata oluştu.' });
    }
  }

}
