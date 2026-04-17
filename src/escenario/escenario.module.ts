import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escenario } from './entity/escenario.entity';
import { EscenarioController } from './escenario.controller';
import { EscenarioService } from './escenario.service';
import { Ubicacion } from 'src/ubicacion/entity/ubicacion.entity';
import { TipoDeporte } from 'src/tipo-deporte/entity/tipo_deporte.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Escenario, Ubicacion, TipoDeporte])],
  controllers: [EscenarioController],
  providers: [EscenarioService],
})
export class EscenarioModule {}