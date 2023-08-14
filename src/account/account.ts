import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Account extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  server: number;

  @Prop({ required: true })
  status: boolean;

  @Prop({ required: true })
  selected: boolean;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
