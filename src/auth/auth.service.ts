import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entity/usuario.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


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
            const passwordValida = await bcrypt.compare(contrasena, user.contrasena);

            if (!passwordValida) {
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

    async register(data: any) {
        const { nombre, email, contrasena, telefono } = data;

        // 1️) Validar campos basicos
        if (!nombre || !email || !contrasena) {
            throw new BadRequestException('Faltan campos obligatorios');
        }

        // 2.) Verificar si el usuario ya existe
        const existe = await this.usuarioRepository.findOne({
            where: { email },
        });

        if (existe) {
            throw new BadRequestException('El usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // 3️.) Crear usuario
        const nuevoUsuario = this.usuarioRepository.create({
            nombre,
            email,
            contrasena: hashedPassword, // metemos bcrypt 
            telefono,
        });

        await this.usuarioRepository.save(nuevoUsuario);

        // 4.) Se crea el token automáticamente
        const payload = {
            sub: nuevoUsuario.id,
            email: nuevoUsuario.email,
        };

        const token = this.jwtService.sign(payload);

        return {
            message: 'Usuario creado correctamente',
            access_token: token,
        };
    }
}
