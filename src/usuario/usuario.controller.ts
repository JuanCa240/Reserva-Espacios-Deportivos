import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService){}

    @UseGuards(JwtAuthGuard) // Protegida
    @Get()
    getUsuarios(){
        return this.usuarioService.findAll();
    }
}
