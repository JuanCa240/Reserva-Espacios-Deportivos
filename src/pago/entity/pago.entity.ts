import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Realizar los pagos seguros

export enum metodoPago{
    NEQUI = 'nequi',
    TARJETA = 'tarjeta',
    EFECTIVO = 'efectivo',
    DAVIPLATA = 'daviplata',
}

export enum estadoPago{
    PENDIENTE = 'pendiente',
    APROBADO = 'aprobado',
    RECHAZADO = 'rechazado'
}

@Entity('pago')
export class Pago {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    reserva_id: number

    @Column()
    monto: number

    @Column({type: 'enum', enum: metodoPago})
    metodo_pago: metodoPago

    @Column({type: 'enum', enum: estadoPago, default: estadoPago.PENDIENTE})
    estado: estadoPago

    @Column()
    referencia_pago: string

    @Column({type: 'date'})
    fecha_pago: Date
    
}
