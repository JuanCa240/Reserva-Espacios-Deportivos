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

    //  Validar campos obligatorios
    if (!escenario_id || !diaSemana || !hora_inicio || !hora_fin) {
      throw new BadRequestException('Faltan datos del horario');
    }

    // Validar formato de hora
    const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!horaRegex.test(hora_inicio) || !horaRegex.test(hora_fin)) {
      throw new BadRequestException('Formato de hora inválido (HH:MM)');
    }

    //  Convertir a minutos
    const [h1, m1] = hora_inicio.split(':').map(Number);
    const [h2, m2] = hora_fin.split(':').map(Number);

    const inicioMin = h1 * 60 + m1;
    const finMin = h2 * 60 + m2;

    //  Validar lógica de horas
    if (inicioMin >= finMin) {
      throw new BadRequestException('La hora de inicio debe ser menor a la hora fin');
    }

    //  Validar que el escenario exista
    const escenario = await this.horarioRepository.manager.findOne('Escenario', {
      where: { id: escenario_id },
    });

    if (!escenario) {
      throw new BadRequestException('El escenario no existe');
    }

    //  Validar duplicados
      const existente = await this.horarioRepository.findOne({
      where: { 
        escenario_id, 
        diaSemana, 
        hora_inicio, 
        hora_fin },
    });

    if (existente) {
      throw new BadRequestException('Ese horario ya existe');
    }

    // Crear y guardar
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