import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Escenario } from './entity/escenario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EscenarioService {
  constructor(
    @InjectRepository(Escenario)
    private readonly escenarioRepository: Repository<Escenario>,
  ) {}

  async crear(data: any) {
    const escenario = this.escenarioRepository.create(data);
    return this.escenarioRepository.save(escenario);
  }

  async findAll() {
    return this.escenarioRepository.find();
  }
}