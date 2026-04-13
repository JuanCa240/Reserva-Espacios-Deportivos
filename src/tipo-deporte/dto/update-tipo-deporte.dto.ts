import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoDeporteDto } from './create-tipo-deporte.dto';

export class UpdateTipoDeporteDto extends PartialType(CreateTipoDeporteDto) {}