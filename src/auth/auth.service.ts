import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entity/usuario.entity';
import { Repository } from 'typeorm';
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

    // Si tiene 2FA habilitado, no devolvemos token todavía
    if (user.dosfa_habilitado) {
      return {
        message: 'Se requiere verificación 2FA. Ingresa tu PIN en /auth/2fa/verificar',
        dosfa_requerido: true,
        email: user.email,
      };
    }

    const payload = { sub: user.id, email: user.email, rol: user.rol };
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

    const payload = { sub: nuevoUsuario.id, email: nuevoUsuario.email, rol: nuevoUsuario.rol };
    return {
      message: 'Usuario creado correctamente',
      access_token: this.jwtService.sign(payload),
    };
  }

  // Habilitar 2FA y guardar PIN para un usuario
  async habilitarDosfa(userId: number, pin: string) {
    if (!pin || pin.length < 4)
      throw new BadRequestException('El PIN debe tener al menos 4 caracteres');

    const user = await this.usuarioRepository.findOneBy({ id: userId });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    user.dosfa_habilitado = true;
    user.dosfa_secret = pin; // guardamos el PIN en dosfa_secret
    await this.usuarioRepository.save(user);

    return { message: '2FA habilitado correctamente' };
  }

  // Verificar PIN 2FA y devolver token
  async verificarDosfa(email: string, pin: string) {
    if (!email || !pin)
      throw new BadRequestException('Email y PIN son requeridos');

    const user = await this.usuarioRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    if (!user.dosfa_habilitado)
      throw new BadRequestException('Este usuario no tiene 2FA habilitado');

    if (user.dosfa_secret !== pin)
      throw new UnauthorizedException('PIN incorrecto');

    const payload = { sub: user.id, email: user.email, rol: user.rol };
    return { access_token: this.jwtService.sign(payload) };
  }
}