import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


export enum estadoReserva{
    PENDIENTE = 'pendiente',
    CONFIRMADO = 'confirmado',
    CANCELADA = 'cancelada',
}

@Entity('reserva')
export class Reserva {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    usuario_id: number // Llave foránea

    @Column()
    escenario_id: number // Llave foránea

    @Column({type: 'date'})
    fecha: Date         // TypeORM usa Date para mapear el tipo DATE de la base de datos.

    @Column({type: 'time'})
    hora_inicio: string

    @Column({type: 'time'})
    hora_fin: string

    @Column()
    cantidad_personas: number

    @Column({type: 'enum', enum: estadoReserva, default: estadoReserva.PENDIENTE})
    estado: estadoReserva

    @Column()
    precio_total: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_creacion: Date
    
}