import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ubicacion } from './entity/ubicacion.entity';
import { UbicacionController } from './ubicacion.controller';
import { UbicacionService } from './ubicacion.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ubicacion])],
  controllers: [UbicacionController],
  providers: [UbicacionService],
})
export class UbicacionModule {}