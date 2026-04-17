import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, BadRequestException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { rol } from './entity/usuario.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Roles(rol.ADMIN)
  @Get()
  getUsuarios() {
    return this.usuarioService.findAll();
  }

  @Roles(rol.ADMIN)
  @Get(':id')
  getUsuario(@Param('id') id: string) {
    return this.usuarioService.findOne(Number(id));
  }

  @Roles(rol.ADMIN)
  @Post()
  create(@Body() body: any) {
    return this.usuarioService.create(body);
  }

  @Roles(rol.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.usuarioService.update(Number(id), body);
  }

  @Roles(rol.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(Number(id));
  }
}