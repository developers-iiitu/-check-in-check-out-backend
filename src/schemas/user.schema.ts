import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRoles } from 'src/common/DTO';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({
    required: true,
    type: Number,
    enum: UserRoles,
    default: UserRoles.STUDENT,
  })
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
