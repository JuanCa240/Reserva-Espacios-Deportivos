import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
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
    } = data;

    // 1. Validar horas
    if (hora_inicio >= hora_fin) {
      throw new BadRequestException('La hora de inicio debe ser menor a la hora fin');
    }

    // 2. Validar que el escenario existe
    const escenario = await this.escenarioRepository.findOne({
      where: { id: escenario_id },
    });
    if (!escenario) throw new BadRequestException('Escenario no existe');

    // 3. Validar cantidad de personas
    if (!cantidad_personas || cantidad_personas <= 0) {
      throw new BadRequestException('La cantidad de personas debe ser mayor a 0');
    }

    // 4. Validar capacidad
    if (cantidad_personas > escenario.capacidad_maxima) {
      throw new BadRequestException('Capacidad excedida');
    }

    // 5. Validar horario permitido
    const fechaObj = new Date(fecha + 'T00:00:00');
    const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const diaSemana = dias[fechaObj.getDay()];

    const horario = await this.horarioRepository.findOne({
      where: { escenario_id, diaSemana },
    });
    if (!horario) throw new BadRequestException('No hay horario disponible para este día');

    if (hora_inicio < horario.hora_inicio || hora_fin > horario.hora_fin) {
      throw new BadRequestException('Horario fuera del rango permitido');
    }

    // 6. Validar traslape
    const conflicto = await this.reservaRepository
      .createQueryBuilder('reserva')
      .where('reserva.escenario_id = :escenario_id', { escenario_id })
      .andWhere('reserva.fecha = :fecha', { fecha })
      .andWhere('NOT (reserva.hora_fin <= :hora_inicio OR reserva.hora_inicio >= :hora_fin)', {
        hora_inicio,
        hora_fin,
      })
      .getOne();
    if (conflicto) throw new BadRequestException('Ya existe una reserva en ese horario');

    // 7. Contar reservas activas del escenario en esa fecha
    const totalReservas = await this.reservaRepository.count({
      where: { escenario_id, fecha },
    });

    // 8. Calcular precio_total automáticamente
    const inicio = hora_inicio.split(':');
    const fin = hora_fin.split(':');

    const inicioMin = Number(inicio[0]) * 60 + Number(inicio[1]);
    const finMin = Number(fin[0]) * 60 + Number(fin[1]);

    const horas = (finMin - inicioMin) / 60;

    const precio_total = Number(escenario.precio_por_hora) * horas;

    // 9. Crear reserva
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

  async findOne(id: number) {
    const reserva = await this.reservaRepository.findOne({ where: { id } });
    if (!reserva) throw new NotFoundException(`Reserva #${id} no encontrada`);
    return reserva;
  }

  async eliminarReserva(id: number) {
    const reserva = await this.reservaRepository.findOne({ where: { id } });
    if (!reserva) throw new BadRequestException('Reserva no existe');
    await this.reservaRepository.delete(id);
    return { message: 'Reserva eliminada correctamente' };
  } 
}
