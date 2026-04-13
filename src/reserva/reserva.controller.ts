import { Body, Controller, Get, Post, Delete, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@UseGuards(JwtAuthGuard)
@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  crearReserva(@Body() body: any) {
    return this.reservaService.crearReserva(body);
  }

  @Get()
  getReservas() {
    return this.reservaService.findAll();
  }

  @Get(':id')
  getReserva(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.findOne(id);
  }

  @Delete(':id')
  deleteReserva(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.eliminarReserva(id);
  }
}
