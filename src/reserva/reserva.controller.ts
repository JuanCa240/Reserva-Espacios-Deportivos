import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  crearReserva(@Body() body: any) {
    return this.reservaService.crearReserva(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getReservas() {
    return this.reservaService.findAll();
  }
}
