import { RoleEnum } from '@/Types/enums/ClassroomRole.enum';

export interface Classroom {
  joinedAt: Date;
  role: RoleEnum;
  userId: string;
}
