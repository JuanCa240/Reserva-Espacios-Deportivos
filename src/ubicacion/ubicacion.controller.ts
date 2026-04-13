import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@UseGuards(JwtAuthGuard)
@Controller('ubicacion')
export class UbicacionController {
  constructor(private readonly ubicacionService: UbicacionService) {}

  @Get()
  findAll() {
    return this.ubicacionService.findAll();
  }

  @Post()
  create(@Body() dto: CreateUbicacionDto) {
    return this.ubicacionService.create(dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ubicacionService.remove(id);
  }
}