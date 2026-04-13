import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
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
    const { escenario_id, diaSemana, hora_inicio, hora_fin } = data;

    if (!escenario_id || !diaSemana || !hora_inicio || !hora_fin) {
      throw new BadRequestException('Faltan datos del horario');
    }

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

  async remove(id: number) {
    const horario = await this.horarioRepository.findOneBy({ id });
    if (!horario) throw new NotFoundException(`Horario #${id} no encontrado`);
    return this.horarioRepository.remove(horario);
  }
}