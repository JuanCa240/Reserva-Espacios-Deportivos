import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escenario } from './entity/escenario.entity';
import { EscenarioController } from './escenario.controller';
import { EscenarioService } from './escenario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Escenario])],
  controllers: [EscenarioController],
  providers: [EscenarioService],
})
export class EscenarioModule {}