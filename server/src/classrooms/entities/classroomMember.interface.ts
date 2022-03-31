import { RoleEnum } from '@/Types/enums/ClassroomRole.enum';

export interface ClassroomMember {
  joinedAt: Date;
  role: RoleEnum;
  userId: string;
}
