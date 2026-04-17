import { Body, Controller, Get, Post, Delete, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { rol } from 'src/usuario/entity/usuario.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  crearReserva(@Body() body: any) {
    return this.reservaService.crearReserva(body);
  }

  @Roles(rol.ADMIN)
  @Get()
  getReservas() {
    return this.reservaService.findAll();
  }

  @Get(':id')
  getReserva(@Param('id') id: number) {
    return this.reservaService.findOne(Number(id));
  }

  @Roles(rol.ADMIN)
  @Delete(':id')
  deleteReserva(@Param('id') id: string) {
    return this.reservaService.eliminarReserva(Number(id));
  }
}
