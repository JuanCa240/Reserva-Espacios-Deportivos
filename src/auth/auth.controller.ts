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

  // Habilitar 2FA (requiere estar logueado)
  @UseGuards(JwtAuthGuard)
  @Post('2fa/habilitar')
  habilitarDosfa(@Request() req: any, @Body() body: { pin: string }) {
    return this.authService.habilitarDosfa(req.user.userId, body.pin);
  }

  // Verificar PIN y obtener token
  @Post('2fa/verificar')
  verificarDosfa(@Body() body: { email: string; pin: string }) {
    return this.authService.verificarDosfa(body.email, body.pin);
  }
}