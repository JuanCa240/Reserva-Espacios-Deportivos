import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum estadoReserva {
  PENDIENTE = 'pendiente',
  CONFIRMADO = 'confirmado',
  CANCELADA = 'cancelada',
}

@Entity('reserva')
export class Reserva {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  usuario_id: number

  @Column()
  escenario_id: number

  @Column({ type: 'date' })
  fecha: Date

  @Column({ type: 'time' })
  hora_inicio: string

  @Column({ type: 'time' })
  hora_fin: string

  @Column()
  cantidad_personas: number

  @Column({ type: 'enum', enum: estadoReserva, default: estadoReserva.PENDIENTE })
  estado: estadoReserva

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_total: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date
}