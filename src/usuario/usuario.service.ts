import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entity/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll() {
    return this.usuarioRepository.find({
      select: ['id', 'nombre', 'email', 'rol', 'telefono', 'activo', 'dosfa_habilitado', 'fecha_creacion'],
    });
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      select: ['id', 'nombre', 'email', 'rol', 'telefono', 'activo', 'dosfa_habilitado', 'fecha_creacion'],
    });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async create(dto: CreateUsuarioDto) {
    const existe = await this.usuarioRepository.findOneBy({ email: dto.email });
    if (existe) throw new ConflictException('El email ya está registrado');

    const hash = await bcrypt.hash(dto.contrasena, 10);
    const nuevo = this.usuarioRepository.create({ ...dto, contrasena: hash });
    return this.usuarioRepository.save(nuevo);
  }

  async update(id: number, dto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    if (dto.contrasena) {
      dto.contrasena = await bcrypt.hash(dto.contrasena, 10);
    }

    Object.assign(usuario, dto);
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return this.usuarioRepository.remove(usuario);
  }
}