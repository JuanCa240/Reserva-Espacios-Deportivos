import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago, estadoPago } from './entity/pago.entity';
import { Repository } from 'typeorm';
import { Reserva, estadoReserva } from 'src/reserva/entity/reserva.entity';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,

    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
  ) {}

  async crearPago(data: any) {
    const { 
        reserva_id, 
        monto, 
        metodo_pago, 
        referencia_pago 
    } = data;

    // 1️.) Verificar que la reserva exista
    const reserva = await this.reservaRepository.findOne({
      where: { id: reserva_id },
    });

    if (!reserva) {
      throw new BadRequestException('Reserva no existe');
    }

    // 2️.) Verificar que no tenga pago ya
    // Evita pagos duplicados para la misma reserva
    const pagoExistente = await this.pagoRepository.findOne({
      where: { reserva_id },
    });

    if (pagoExistente) {
      throw new BadRequestException('La reserva ya tiene un pago');
    }

     // 3.) Validar que el monto sea un valor numérico válido
    if (!monto || isNaN(Number(monto))) {
      throw new BadRequestException('Monto inválido');
    }

    // 4.) Valida que el monto sea mayor a 0
    if (Number(monto) <= 0) {
      throw new BadRequestException('El monto debe ser mayor a 0');
    }

    // 5.) Validar el método de pago (nequi,tarjeta,efectivo,etc)
    if (!metodo_pago) {
      throw new BadRequestException('Método de pago requerido');
    }

    // 6.) Validar el monto exacto
    if (Number(monto) !== Number(reserva.precio_total)) {
      throw new BadRequestException('Monto incorrecto');
    }

    //  Crear pago
    const nuevoPago = this.pagoRepository.create({
      reserva_id,
      monto,
      metodo_pago,
      referencia_pago,
      estado: estadoPago.APROBADO, // simulamos pago exitoso
    });

    await this.pagoRepository.save(nuevoPago);

    // Cambiar el estado de reserva
    reserva.estado = estadoReserva.CONFIRMADO;
    await this.reservaRepository.save(reserva);

    return {
      message: 'Pago realizado correctamente',
      pago: nuevoPago,
    };
  }

  async findAll() {
    return this.pagoRepository.find();
  }
}