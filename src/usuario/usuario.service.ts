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

    // Validaciones
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
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    
    if (data.nombre) usuario.nombre = data.nombre;
    if (data.email) usuario.email = data.email;
    if (data.telefono) usuario.telefono = data.telefono;

    if (data.rol) {
      if (!Object.values(rol).includes(data.rol)) {
        throw new BadRequestException('Rol inválido');
      }
      usuario.rol = data.rol;
    }

    if (data.contrasena) {
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