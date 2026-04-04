import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Horario } from './entity/horario.entity';
import { HorarioController } from './horario.controller';
import { HorarioService } from './horario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Horario])],
  controllers: [HorarioController],
  providers: [HorarioService],
})
export class HorarioModule {}