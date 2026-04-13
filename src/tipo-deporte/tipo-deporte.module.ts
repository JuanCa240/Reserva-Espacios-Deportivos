import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDeporte } from './entity/tipo_deporte.entity';
import { TipoDeporteService } from './tipo-deporte.service';
import { TipoDeporteController } from './tipo-deporte.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TipoDeporte])],
  controllers: [TipoDeporteController],
  providers: [TipoDeporteService],
  exports: [TipoDeporteService],
})
export class TipoDeporteModule {}