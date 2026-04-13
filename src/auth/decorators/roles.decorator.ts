import { SetMetadata } from '@nestjs/common';
import { rol } from 'src/usuario/entity/usuario.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: rol[]) => SetMetadata(ROLES_KEY, roles);