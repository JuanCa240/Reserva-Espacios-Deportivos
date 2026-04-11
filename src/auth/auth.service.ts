import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entity/usuario.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario) 
        private readonly usuarioRepository: Repository<Usuario>,
        private readonly jwtService: JwtService,
    ){}

    async login(usuario: Usuario){

            // 1.) Extraer los datos del usuario para el 'login'
            const {email,contrasena} = usuario;

            // 2.) Buscar el usuario en la base de datos
            const user = await this.usuarioRepository.findOne({
                where: {email},
            });

            // 3.) Validar si el usuario existe
            if(!user){
                throw new UnauthorizedException('Usuario no encontrado')
            }

            // 4.) Validar la contraseña
            if (user.contrasena !== contrasena) {
                throw new UnauthorizedException('Contraseña incorrecta');
            }

            // 5.). Crear payload
            const payload = {
                sub: user.id,
                email: user.email,
            };

            // 6.) Generar token
            const token = this.jwtService.sign(payload)

            return {
                access_token: token,
            };
    }
}
