import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxLength: 40,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    immutable: true,
    maxLength: 50,
  })
  email: string;

  @Prop({
    type: String,
    trim: true,
    default: 'luciocode',
    immutable: true,
    enum: ['luciocode', 'github', 'google'],
  })
  provider: string;

  @Prop({
    type: String,
    maxLength: 1000,
    trim: true,
  })
  bio: string;

  @Prop({
    type: String,
    maxLength: 50,
    trim: true,
  })
  location: string;

  @Prop({
    type: String,
    maxLength: 50,
    trim: true,
  })
  school: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: Date,
    immutable: true,
  })
  createdAt: Date;

  @Prop({
    type: Date,
  })
  updatedAt: Date;

  @Prop({
    type: Boolean,
    default: false,
  })
  email_verified: boolean;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);