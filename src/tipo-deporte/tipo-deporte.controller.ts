import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { TipoDeporteService } from './tipo-deporte.service';
import { CreateTipoDeporteDto } from './dto/create-tipo-deporte.dto';
import { UpdateTipoDeporteDto } from './dto/update-tipo-deporte.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@UseGuards(JwtAuthGuard)
@Controller('tipo-deporte')
export class TipoDeporteController {
  constructor(private readonly tipoDeporteService: TipoDeporteService) {}

  @Get()
  findAll() {
    return this.tipoDeporteService.findAll();
  }

  @Post()
  create(@Body() dto: CreateTipoDeporteDto) {
    return this.tipoDeporteService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTipoDeporteDto) {
    return this.tipoDeporteService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tipoDeporteService.remove(id);
  }
}