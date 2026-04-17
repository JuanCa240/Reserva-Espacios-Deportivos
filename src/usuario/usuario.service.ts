import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario, rol } from './entity/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll() {
    return this.usuarioRepository.find({
      select: [
        'id', 
        'nombre', 
        'email', 
        'rol',
        'telefono', 
        'activo', 
        'dosfa_habilitado', 
        'fecha_creacion'],
    });
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      select: [
        'id', 
        'nombre', 
        'email', 
        'rol', 
        'telefono', 
        'activo', 
        'dosfa_habilitado', 
        'fecha_creacion'],
    });

    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async create(data: any) {
    const { nombre, email, contrasena, telefono, rol: rolUsuario } = data;

    // Validar campos
    if (!nombre || !email || !contrasena || !telefono) {
      throw new BadRequestException('Faltan campos obligatorios');
    }

    const existe = await this.usuarioRepository.findOneBy({ email });
    if (existe) throw new ConflictException('El email ya está registrado');

    if (rolUsuario && !Object.values(rol).includes(rolUsuario)) {
      throw new BadRequestException('Rol inválido');
    }

    const hash = await bcrypt.hash(contrasena, 10);

    const nuevo = this.usuarioRepository.create({
      nombre,
      email,
      contrasena: hash,
      telefono,
      rol: rol.USER,
    });

    return this.usuarioRepository.save(nuevo);
  }

  async update(id: number, data: any) {
    // Buscar usuario por ID
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    // Validar nombre
    if (data.nombre !== undefined) {
      if (data.nombre.trim() === '') {
        throw new BadRequestException('Nombre inválido');
      }
      usuario.nombre = data.nombre;
    }

    // Validar email
    if (data.email !== undefined) {
      if (!data.email.includes('@')) {
        throw new BadRequestException('Email inválido');
      }

      // Verifica que no exista otro usuario con ese email
      const existe = await this.usuarioRepository.findOne({
        where: { email: data.email },
      });

      // Evita duplicados (excepto el mismo usuario)
      if (existe && existe.id !== id) {
        throw new ConflictException('El email ya está en uso');
      }

      usuario.email = data.email;
    }

    // Actualizar teléfono
    if (data.telefono !== undefined) {
      usuario.telefono = data.telefono;
    }

    // validar rol
    if (data.rol !== undefined) {
      if (!Object.values(rol).includes(data.rol)) {
        throw new BadRequestException('Rol inválido');
      }
      usuario.rol = data.rol;
    }

    // Validar y encriptar contraseña
    if (data.contrasena !== undefined) {
      usuario.contrasena = await bcrypt.hash(data.contrasena, 10);
    }

    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return this.usuarioRepository.remove(usuario);
  }
}