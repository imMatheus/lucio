import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { PrivacyEnum } from '@Types/enums/ClassRoomPrivacy.enum';
import { RoleEnum } from '@Types/enums/ClassRoomRole.enum';
import { colors } from '@Constants/colors';

@SchemaDecorator({ timestamps: true })
export class ClassRoom {
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
    trim: true,
    unique: true,
    minlength: 7,
    maxLength: 9,
  })
  code: string;

  @Prop({
    type: [String],
    required: true,
    default: [colors.primary, colors.primary],
  })
  theme: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
    default: 'luciocode',
    immutable: true,
    enum: Object.values(PrivacyEnum),
  })
  privacy: string;

  @Prop({
    type: [
      {
        joinedAt: {
          type: Date,
          immutable: true,
          required: true,
        },
        role: {
          type: String,
          default: RoleEnum.STUDENT,
          enum: Object.values(RoleEnum),
          immutable: true,
          required: true,
        },
        userId: {
          type: Schema.Types.ObjectId,
          required: true,
          immutable: true,
          unique: true,
        },
      },
    ],
    required: true,
  })
  members: string;

  @Prop({
    type: Date,
    immutable: true,
  })
  createdAt: Date; // comes from mongoose timestamps

  @Prop({
    type: Date,
  })
  updatedAt: Date; // comes from mongoose timestamps
}

export type ClassRoomDocument = ClassRoom & Document;

export const ClassRoomSchema = SchemaFactory.createForClass(ClassRoom);
