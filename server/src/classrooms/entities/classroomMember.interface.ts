import { RoleEnum } from '@/Types/enums/ClassRoomRole.enum';

export interface ClassRoomMember {
  joinedAt: Date;
  role: RoleEnum;
  userId: string;
}
