import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { rol } from 'src/usuario/entity/usuario.entity';
import { EscenarioService } from './escenario.service';

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('escenario')
export class EscenarioController {
  constructor(private readonly escenarioService: EscenarioService) {}

  @Roles(rol.ADMIN)
  @Post()
  crear(@Body() body: any) {
    return this.escenarioService.crear(body);
  }

  @Roles(rol.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.escenarioService.remove(Number(id));
  }

  @Roles(rol.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any,) {
    return this.escenarioService.update(Number(id), body);
  }

  @Get(':id')
    findById(@Param('id') id: number) {
      return this.escenarioService.findOne(Number(id));
  }

  @Get()
  findAll() {
    return this.escenarioService.findAll();
  }
}