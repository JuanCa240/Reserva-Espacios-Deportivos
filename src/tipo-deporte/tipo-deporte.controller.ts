import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { TipoDeporteService } from './tipo-deporte.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { rol } from 'src/usuario/entity/usuario.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tipo-deporte')
export class TipoDeporteController {
  constructor(private readonly tipoDeporteService: TipoDeporteService) {}

  @Get()
  findAll() {
    return this.tipoDeporteService.findAll();
  }

  @Roles(rol.ADMIN)
  @Post()
  create(@Body() body: any) {
    return this.tipoDeporteService.create(body);
  }

  @Roles(rol.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.tipoDeporteService.update(Number(id), body);
  }

  @Roles(rol.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoDeporteService.remove(Number(id));
  }
}