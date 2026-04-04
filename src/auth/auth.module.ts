import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsuarioModule } from '../usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entity/usuario.entity';
import { ConfigService } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),

      TypeOrmModule.forFeature([Usuario]),
  ],


  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}