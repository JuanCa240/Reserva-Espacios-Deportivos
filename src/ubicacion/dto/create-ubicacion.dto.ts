import { IsString } from 'class-validator';

export class CreateUbicacionDto {
  @IsString()
  nombre: string;

  @IsString()
  direccion: string;

  @IsString()
  ciudad: string;
}