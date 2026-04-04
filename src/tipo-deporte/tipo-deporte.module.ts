import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDeporte } from './entity/tipo-deporte.entity';
import { TipoDeporteController } from './tipo-deporte.controller';
import { TipoDeporteService } from './tipo-deporte.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoDeporte])],
  controllers: [TipoDeporteController],
  providers: [TipoDeporteService],
})
export class TipoDeporteModule {}