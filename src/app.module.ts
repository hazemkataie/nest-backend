import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account/account';
import { AccountController } from './app.controller';
import { AccountService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:123123123@cluster0.plas4qd.mongodb.net/account_db?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AppModule {}
