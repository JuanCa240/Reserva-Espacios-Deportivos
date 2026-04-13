import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@UseGuards(JwtAuthGuard)
@Controller('horario')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Post()
  crear(@Body() body: any) {
    return this.horarioService.crear(body);
  }

  @Get()
  getAll() {
    return this.horarioService.findAll();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.horarioService.remove(id);
  }
}