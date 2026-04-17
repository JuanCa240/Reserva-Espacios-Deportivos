import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { rol } from 'src/usuario/entity/usuario.entity';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ubicacion')
export class UbicacionController {
  constructor(private readonly ubicacionService: UbicacionService) {}

  @Get()
  findAll() {
    return this.ubicacionService.findAll();
  }

  @Roles(rol.ADMIN)
  @Post()
  create(@Body() body: any) {
    return this.ubicacionService.create(body);
  }

  @Roles(rol.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ubicacionService.remove(Number(id));
  }
}