import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Controller('horario')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Body() body: any) {
    return this.horarioService.crear(body);
  }

  @Get()
  getAll() {
    return this.horarioService.findAll();
  }
}