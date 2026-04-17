import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PagoService } from './pago.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard)
@Controller('pago')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  crear(@Body() body: any) {
    return this.pagoService.crearPago(body);
  }

  @Get()
  getAll() {
    return this.pagoService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.pagoService.remove(Number(id))
  }

}