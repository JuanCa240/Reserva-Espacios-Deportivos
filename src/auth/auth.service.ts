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
  ) {}

  async login(usuario: Usuario) {
    const { email, contrasena } = usuario;

    const user = await this.usuarioRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const passwordValida = await bcrypt.compare(contrasena, user.contrasena);
    if (!passwordValida) throw new UnauthorizedException('Contraseña incorrecta');

    const payload = {
      sub: user.id,
      email: user.email,
      rol: user.rol, // ← agregamos el rol
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async register(data: any) {
    const { nombre, email, contrasena, telefono } = data;

    if (!nombre || !email || !contrasena)
      throw new BadRequestException('Faltan campos obligatorios');

    const existe = await this.usuarioRepository.findOne({ where: { email } });
    if (existe) throw new BadRequestException('El usuario ya existe');

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = this.usuarioRepository.create({
      nombre,
      email,
      contrasena: hashedPassword,
      telefono,
    });

    await this.usuarioRepository.save(nuevoUsuario);

    const payload = {
      sub: nuevoUsuario.id,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol, // ← agregamos el rol
    };

    return {
      message: 'Usuario creado correctamente',
      access_token: this.jwtService.sign(payload),
    };
  }
}