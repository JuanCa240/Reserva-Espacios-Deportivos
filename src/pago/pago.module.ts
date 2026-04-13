import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './entity/pago.entity';
import { PagoController } from './pago.controller';
import { PagoService } from './pago.service';
import { Reserva } from 'src/reserva/entity/reserva.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pago, Reserva])],
  controllers: [PagoController],
  providers: [PagoService],
})
export class PagoModule {}