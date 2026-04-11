import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entity/reserva.entity';
import { ReservaController } from './reserva.controller';
import { ReservaService } from './reserva.service';
import { Escenario } from 'src/escenario/entity/escenario.entity';
import { Horario } from 'src/horario/entity/horario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Escenario, Horario])],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}