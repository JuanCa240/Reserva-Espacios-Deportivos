import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './entity/reserva.entity';
import { Repository } from 'typeorm';
import { Escenario } from 'src/escenario/entity/escenario.entity';
import { Horario } from 'src/horario/entity/horario.entity';


@Injectable()
export class ReservaService {
    constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,

    @InjectRepository(Escenario)
    private readonly escenarioRepository: Repository<Escenario>,

    @InjectRepository(Horario)
    private readonly horarioRepository: Repository<Horario>,
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

    // 1.) Validamos las horas
    if (hora_inicio >= hora_fin) {
      throw new BadRequestException('Hora inválida');
    }

    // 2.) Validamos escenario existe
    const escenario = await this.escenarioRepository.findOne({
      where: { id: escenario_id },
    });

    if (!escenario) {
      throw new BadRequestException('Escenario no existe');
    }

    // 3.) Validar la capacidad
    if (cantidad_personas > escenario.capacidad_maxima) {
      throw new BadRequestException('Capacidad excedida');
    }

    // Validación del horario

    const fechaObj = new Date(fecha);
    const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const diaSemana = dias[fechaObj.getDay()];

    // Buscar horario del escenario
    const horario = await this.horarioRepository.findOne({
      where: {
        escenario_id,
        diaSemana,
      },
    });

    if (!horario) {
      throw new BadRequestException('No hay horario disponible para este día');
    }

    // 4.) Validar que la hora esté dentro del rango permitido
    if (hora_inicio < horario.hora_inicio || hora_fin > horario.hora_fin) {
      throw new BadRequestException('Horario fuera del rango permitido');
    }

    // 5.) Validar traslape (parte importante)
    const conflicto = await this.reservaRepository
    .createQueryBuilder('reserva')
    .where('reserva.escenario_id = :escenario_id', { escenario_id })
    .andWhere('reserva.fecha = :fecha', { fecha })
    .andWhere(`NOT ( reserva.hora_fin <= :hora_inicio OR reserva.hora_inicio >= :hora_fin
      )
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
