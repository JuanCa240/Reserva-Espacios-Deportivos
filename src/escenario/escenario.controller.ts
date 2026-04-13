import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { EscenarioService } from './escenario.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CreateEscenarioDto } from './dto/create-escenario.dto';

@UseGuards(JwtAuthGuard)
@Controller('escenario')
export class EscenarioController {
  constructor(private readonly escenarioService: EscenarioService) {}

  @Get()
  findAll() {
    return this.escenarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.escenarioService.findOne(id);
  }

  @Post()
  crear(@Body() dto: CreateEscenarioDto) {
    return this.escenarioService.crear(dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.escenarioService.remove(id);
  }
}