import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { EscenarioService } from './escenario.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Controller('escenario')
export class EscenarioController {
  constructor(private readonly escenarioService: EscenarioService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Body() body: any) {
    return this.escenarioService.crear(body);
  }

  @Get()
  getAll() {
    return this.escenarioService.findAll();
  }
}