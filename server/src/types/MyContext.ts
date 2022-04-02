import { Request } from 'express';
import { UserJwt } from '../auth/user-jwt.interface';

export type MyContext = {
  req: Request & { user: UserJwt };
};
