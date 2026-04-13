import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PagoService } from './pago.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Controller('pago')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Body() body: any) {
    return this.pagoService.crearPago(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.pagoService.findAll();
  }
}