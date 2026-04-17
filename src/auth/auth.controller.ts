import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  // Verificar PIN y obtener token
  @Post('2fa/verificar')
  verificarDosfa(@Body() body: { email: string; pin: string }) {
    return this.authService.verificarDosfa(body.email, body.pin);
  }
}