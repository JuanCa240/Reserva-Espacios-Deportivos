import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Escenario } from './entity/escenario.entity';
import { Repository } from 'typeorm';
import { CreateEscenarioDto } from './dto/create-escenario.dto';

@Injectable()
export class EscenarioService {
  constructor(
    @InjectRepository(Escenario)
    private readonly escenarioRepository: Repository<Escenario>,
  ) {}

  async findAll() {
    return this.escenarioRepository.find();
  }

  async findOne(id: number) {
    const escenario = await this.escenarioRepository.findOneBy({ id });
    if (!escenario) throw new NotFoundException(`Escenario #${id} no encontrado`);
    return escenario;
  }

  async crear(dto: CreateEscenarioDto) {
    const escenario = this.escenarioRepository.create(dto);
    return this.escenarioRepository.save(escenario);
  }

  async remove(id: number) {
    const escenario = await this.escenarioRepository.findOneBy({ id });
    if (!escenario) throw new NotFoundException(`Escenario #${id} no encontrado`);
    return this.escenarioRepository.remove(escenario);
  }
}