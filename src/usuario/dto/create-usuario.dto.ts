import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { rol } from '../entity/usuario.entity';

export class CreateUsuarioDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  contrasena: string;

  @IsEnum(rol)
  @IsOptional()
  rol?: rol;

  @IsString()
  telefono: string;

  @IsBoolean()
  @IsOptional()
  dosfa_habilitado?: boolean;
}