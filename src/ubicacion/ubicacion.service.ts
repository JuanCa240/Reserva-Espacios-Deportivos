import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ubicacion } from './entity/ubicacion.entity';

@Injectable()
export class UbicacionService {
  constructor(
    @InjectRepository(Ubicacion)
    private readonly ubicacionRepository: Repository<Ubicacion>,
  ) {}

  findAll() {
    return this.ubicacionRepository.find();
  }

  async create(data: any) {
    const {
      nombre, 
      direccion, 
      ciudad 
    } = data;

    // Validación
    if (!nombre || !direccion || !ciudad) {
      throw new BadRequestException('Faltan campos obligatorios');
    }

    const nueva = this.ubicacionRepository.create(data);
    return this.ubicacionRepository.save(nueva);
  }

  async remove(id: number) {
    const ubicacion = await this.ubicacionRepository.findOneBy({ id });
    if (!ubicacion) throw new NotFoundException(`Ubicacion #${id} no encontrada`);
    return this.ubicacionRepository.remove(ubicacion);
  }

}