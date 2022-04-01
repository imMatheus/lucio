import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { PrivacyEnum } from '@Types/enums/ClassroomPrivacy.enum';
import { RoleEnum } from '@Types/enums/ClassroomRole.enum';
import { colors } from '@Constants/colors';
import { User } from '../users/users.schema';
import { ClassroomMember } from './entities/classroomMember.interface';
import { BaseClassroom } from './entities/classroom.interface';
@SchemaDecorator({ timestamps: true })
export class Classroom implements BaseClassroom {
  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxLength: 40,
  })
  name: string;

  @Prop({
    type: Schema.Types.ObjectId,
    ref: User.name,
    required: true,
    trim: true,
    immutable: true,
  })
  owner: string;

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
    default: [colors.theme, colors.theme],
  })
  theme: [string, string];

  @Prop({
    type: String,
    trim: true,
    required: true,
    default: 'luciocode',
    immutable: true,
    enum: Object.values(PrivacyEnum),
  })
  privacy: PrivacyEnum;

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
          ref: User.name,
          required: true,
          immutable: true,
        },
        name: {
          type: String,
          required: true,
          trim: true,
          minlength: 2,
          maxLength: 40,
        },
        email: {
          type: String,
          required: true,
          trim: true,
          lowercase: true,
          immutable: true,
          maxLength: 50,
        },
      },
    ],
    required: true,
  })
  members: ClassroomMember[];

  // @Prop({
  //   type: Date,
  //   immutable: true,
  // })
  // createdAt: Date; // comes from mongoose timestamps

  // @Prop({
  //   type: Date,
  // })
  // updatedAt: Date; // comes from mongoose timestamps
}

export type ClassroomDocument = Classroom & Document;

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);
