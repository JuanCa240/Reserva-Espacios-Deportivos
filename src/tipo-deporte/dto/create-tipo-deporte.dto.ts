import { IsEnum, IsString } from 'class-validator';
import { tiposDeporte } from '../entity/tipo_deporte.entity';

export class CreateTipoDeporteDto {
  @IsEnum(tiposDeporte)
  tipoDeporte: tiposDeporte;

  @IsString()
  descripcion: string;
}