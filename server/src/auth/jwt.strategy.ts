import { UserJwt } from './user-jwt.interface';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

export interface IPayload {
  sub: string;
  username: string;
  email: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SIGN_SALT,
      ignoreExpired: false,
    });
  }

  async validate(payload: IPayload) {
    // TODO add necessary info for context here

    const userInfo: UserJwt = {
      userId: payload.sub,
      username: payload.username,
      email: payload.email,
    };

    return userInfo;
  }
}
