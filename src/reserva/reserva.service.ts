import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './entity/reserva.entity';
import { Repository } from 'typeorm';
import { Escenario } from 'src/escenario/entity/escenario.entity';

@Injectable()
export class ReservaService {
    constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,

    @InjectRepository(Escenario)
    private readonly escenarioRepository: Repository<Escenario>,
  ) {}

  async crearReserva(data: any) {
    const {
      usuario_id,
      escenario_id,
      fecha,
      hora_inicio,
      hora_fin,
      cantidad_personas,
      precio_total,
    } = data;

    // 1.) Validamos escenario existe
    const escenario = await this.escenarioRepository.findOne({
      where: { id: escenario_id },
    });

    if (!escenario) {
      throw new BadRequestException('Escenario no existe');
    }

    // 2.) Validamos capacidad
    if (cantidad_personas > escenario.capacidad_maxima) {
      throw new BadRequestException('Capacidad excedida');
    }

    // 3. Validamos traslape (parte importante)
    const conflicto = await this.reservaRepository
      .createQueryBuilder('reserva')
      .where('reserva.escenario_id = :escenario_id', { escenario_id })
      .andWhere('reserva.fecha = :fecha', { fecha })
      .andWhere(`
        (reserva.hora_inicio < :hora_fin AND reserva.hora_fin > :hora_inicio)
      `, {
        hora_inicio,
        hora_fin,
      })
      .getOne();

    if (conflicto) {
      throw new BadRequestException('Ya existe una reserva en ese horario');
    }

    // 4.) Crear reserva
    const nuevaReserva = this.reservaRepository.create({
      usuario_id,
      escenario_id,
      fecha,
      hora_inicio,
      hora_fin,
      cantidad_personas,
      precio_total,
    });

    return await this.reservaRepository.save(nuevaReserva);
  }

  async findAll() {
    return this.reservaRepository.find();
  }
}
