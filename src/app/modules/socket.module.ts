//socket.module.ts

import { Module } from '@nestjs/common';
import { SocketGateway } from '../gateways/app.getways';

@Module({
  providers: [SocketGateway],
})
export class SocketModule {
  
}
