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

  async login(usuario: any) {
    const { 
      email, 
      contrasena 
    } = usuario;

    if (!email || !contrasena) {
      throw new BadRequestException('Email y contraseña son requeridos');
    }

    const user = await this.usuarioRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const passwordValida = await bcrypt.compare(contrasena, user.contrasena);
    if (!passwordValida) throw new UnauthorizedException('Contraseña incorrecta');

    if (user.dosfa_habilitado) {
    // generar PIN aleatorio
    const pin = Math.floor(100000 + Math.random() * 900000).toString();

    // hashear PIN
    const hash = await bcrypt.hash(pin, 10);

    user.dosfa_secret = hash;

    await this.usuarioRepository.save(user);

    // Simulacion de envio por la terminal
    console.log('PIN 2FA para', user.email, ':', pin);

    return {
      message: 'Código 2FA enviado (revisar consola)',
      dosfa_requerido: true,
      email: user.email,
    };
  }

    const payload = { sub: user.id, email: user.email, rol: user.rol };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(data: any) {
    const { 
      nombre,
      email, 
      contrasena, 
      telefono
     } = data;

     if (data.rol) {
      throw new BadRequestException('No puedes asignar roles');
    }

      // Validar campos
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
      rol: nuevoUsuario.rol
     };
    return {
      message: 'Usuario creado correctamente',
      access_token: this.jwtService.sign(payload),
    };
  }
  

  // Habilitar 2FA y guardar PIN para un usuario
  async habilitarDosfa(userId: number) {
       const user = await this.usuarioRepository.findOneBy({ id: userId });
        if (!user) throw new UnauthorizedException('Usuario no encontrado');

        user.dosfa_habilitado = true;
        await this.usuarioRepository.save(user);

        return { message: '2FA habilitado correctamente' };
    }

    // Verificar PIN 2FA y devolver token
    async verificarDosfa(email: string, pin: string) {
    if (!email || !pin) {
      throw new BadRequestException('Email y PIN son requeridos');
    }

    const user = await this.usuarioRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    if (!user.dosfa_habilitado) {
      throw new BadRequestException('Este usuario no tiene 2FA habilitado');
    }

    // 🔒 comparar hash
    const valido = await bcrypt.compare(pin, user.dosfa_secret);
    if (!valido) {
      throw new UnauthorizedException('PIN incorrecto');
    }

    await this.usuarioRepository.save(user);

    const payload = { sub: user.id, email: user.email, rol: user.rol };
    return { access_token: this.jwtService.sign(payload) };
  }
}