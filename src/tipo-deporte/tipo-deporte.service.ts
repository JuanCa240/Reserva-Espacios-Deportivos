import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoDeporte, tiposDeporte } from './entity/tipo_deporte.entity';

@Injectable()
export class TipoDeporteService {
  constructor(
    @InjectRepository(TipoDeporte)
    private readonly tipoDeporteRepository: Repository<TipoDeporte>,
  ) {}

  findAll() {
    return this.tipoDeporteRepository.find();
  }

  async create(data: any) {
    const { 
      tipoDeporte, 
      descripcion
    } = data;

    // Validacion de campo vacio
    if (!tipoDeporte) {
      throw new BadRequestException('Faltan campos obligatorios');
    }

    if (!Object.values(tiposDeporte).includes(tipoDeporte)) {
      throw new BadRequestException('Tipo de deporte inválido');
    }

    const nuevo = this.tipoDeporteRepository.create(data);
    return this.tipoDeporteRepository.save(nuevo);
  }

  async update(id: number, data: any) {
    const tipo = await this.tipoDeporteRepository.findOneBy({ id });
    if (!tipo) throw new NotFoundException(`TipoDeporte #${id} no encontrado`);

    if (data.tipoDeporte) {
      if (!Object.values(tiposDeporte).includes(data.tipoDeporte)) {
        throw new BadRequestException('Tipo de deporte inválido');
      }
      tipo.tipoDeporte = data.tipoDeporte;
    }

    if (data.descripcion) {
      tipo.descripcion = data.descripcion;
    }

    return this.tipoDeporteRepository.save(tipo);
  }

  async remove(id: number) {
    const tipo = await this.tipoDeporteRepository.findOneBy({ id });
    if (!tipo) throw new NotFoundException(`TipoDeporte #${id} no encontrado`);
    return this.tipoDeporteRepository.remove(tipo);
  }
}