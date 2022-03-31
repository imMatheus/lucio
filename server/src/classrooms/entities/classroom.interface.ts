import { PrivacyEnum } from '@Types/enums/ClassroomPrivacy.enum';
import { ClassroomMember } from './classroomMember.interface';

export interface BaseClassroom {
  name: string;
  owner: string;
  code: string;
  theme: [string, string];
  privacy: PrivacyEnum;
  members: ClassroomMember[];
}

export interface Classroom extends BaseClassroom {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
