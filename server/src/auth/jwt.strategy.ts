import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'hide-me',
      ignoreExpired: false,
    });
  }

  async validate(payload: any) {
    // TODO add necessary info for context here
    return { userId: payload.sub, username: payload.username };
  }
}
