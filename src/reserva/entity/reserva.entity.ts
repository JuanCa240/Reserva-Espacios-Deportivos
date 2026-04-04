import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


export enum estado{
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

    @Column()
    hora_inicio: string

    @Column()
    hora_fin: string

    @Column()
    cantidad_personas: number

    @Column()
    precio_total: number

    @Column({type: 'date'})
    fecha_creacion: Date
    
}