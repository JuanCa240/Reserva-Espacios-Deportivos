import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { rol } from 'src/usuario/entity/usuario.entity';

@UseGuards(JwtAuthGuard)
@Controller('horario')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Roles(rol.ADMIN)
  @Post()
  crear(@Body() body: any) {
    return this.horarioService.crear(body);
  }

  @Get()
  getAll() {
    return this.horarioService.findAll();
  }

  @Roles(rol.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horarioService.remove(Number(id));
  }
}