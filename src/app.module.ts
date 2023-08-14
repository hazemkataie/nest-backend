//app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './app/models/account';
import { AccountSocketController } from './app/controllers/app.controller';
import { AccountService } from './app.service';
import { SocketModule } from './app/modules/socket.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:123123123@cluster0.plas4qd.mongodb.net/account_db?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
     // Yeni eklenen modül
  ],
  controllers: [AccountSocketController],
  providers: [AccountService],
})
export class AppModule {}
