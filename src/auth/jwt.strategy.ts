import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'mi_secreto', // cámbialo por tu clave real o usa variables de entorno
    });
  }

  async validate(payload: any) {
    // Aquí decides qué datos del token quieres devolver al request
    return { userId: payload.sub, email: payload.email };
  }
}
