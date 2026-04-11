import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Horario } from './entity/horario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HorarioService {
  constructor(
    @InjectRepository(Horario)
    private readonly horarioRepository: Repository<Horario>,
  ) {}

  async crear(data: any) {
    const { 
        escenario_id, 
        diaSemana, 
        hora_inicio, 
        hora_fin 
    } = data;

    // Validar camos vacios
    if (!escenario_id || !diaSemana || !hora_inicio || !hora_fin) {
      throw new BadRequestException('Faltan datos del horario');
    }

    // validar la hora de inicio
    if (hora_inicio >= hora_fin) {
      throw new BadRequestException('La hora de inicio debe ser menor a la hora fin');
    }

    const nuevoHorario = this.horarioRepository.create({
      escenario_id,
      diaSemana,
      hora_inicio,
      hora_fin,
    });

    return await this.horarioRepository.save(nuevoHorario);
  }

  async findAll() {
    return this.horarioRepository.find();
  }
}