import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entity/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ){}

    async findAll(){
        return this.usuarioRepository.find({
            select: [
                'id',
                'nombre',
                'email',
                'rol',
                'telefono',
                'activo',
                'dosfa_habilitado',
                'fecha_creacion'
            ],
        });
    }
}
