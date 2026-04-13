import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ubicacion } from './entity/ubicacion.entity';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';

@Injectable()
export class UbicacionService {
  constructor(
    @InjectRepository(Ubicacion)
    private readonly ubicacionRepository: Repository<Ubicacion>,
  ) {}

  findAll() {
    return this.ubicacionRepository.find();
  }

  async create(dto: CreateUbicacionDto) {
    const nueva = this.ubicacionRepository.create(dto);
    return this.ubicacionRepository.save(nueva);
  }

  async remove(id: number) {
    const ubicacion = await this.ubicacionRepository.findOneBy({ id });
    if (!ubicacion) throw new NotFoundException(`Ubicacion #${id} no encontrada`);
    return this.ubicacionRepository.remove(ubicacion);
  }
}