import { IsEnum, IsInt, IsString } from 'class-validator';
import { estadoEscenario } from '../entity/escenario.entity';
import { IsOptional } from 'class-validator';

export class CreateEscenarioDto {
  @IsString()
  nombre: string;

  @IsInt()
  tipo_deporte_id: number;

  @IsInt()
  ubicacion_id: number;

  @IsInt()
  capacidad_maxima: number;

  @IsString()
  descripcion: string;

  @IsEnum(estadoEscenario)
  @IsOptional()
  estado?: estadoEscenario;
}