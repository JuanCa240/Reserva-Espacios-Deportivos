import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoDeporte } from './entity/tipo_deporte.entity';
import { CreateTipoDeporteDto } from './dto/create-tipo-deporte.dto';
import { UpdateTipoDeporteDto } from './dto/update-tipo-deporte.dto';

@Injectable()
export class TipoDeporteService {
  constructor(
    @InjectRepository(TipoDeporte)
    private readonly tipoDeporteRepository: Repository<TipoDeporte>,
  ) {}

  findAll() {
    return this.tipoDeporteRepository.find();
  }

  async create(dto: CreateTipoDeporteDto) {
    const nuevo = this.tipoDeporteRepository.create(dto);
    return this.tipoDeporteRepository.save(nuevo);
  }

  async update(id: number, dto: UpdateTipoDeporteDto) {
    const tipoDeporte = await this.tipoDeporteRepository.findOneBy({ id });
    if (!tipoDeporte) throw new NotFoundException(`TipoDeporte #${id} no encontrado`);
    Object.assign(tipoDeporte, dto);
    return this.tipoDeporteRepository.save(tipoDeporte);
  }

  async remove(id: number) {
    const tipoDeporte = await this.tipoDeporteRepository.findOneBy({ id });
    if (!tipoDeporte) throw new NotFoundException(`TipoDeporte #${id} no encontrado`);
    return this.tipoDeporteRepository.remove(tipoDeporte);
  }
}