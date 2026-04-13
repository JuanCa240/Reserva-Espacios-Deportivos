import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// El lugar físico donde se reserva.

export enum estadoEscenario{
    ACTIVO = 'activo',
    INACTIVO = 'inactivo',

}

@Entity('escenario')
export class Escenario {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    nombre: string

    @Column()
    tipo_deporte_id: number // Llave foránea

    @Column()
    ubicacion_id: number // Llave foránea

    @Column()
    capacidad_maxima: number

    @Column()
    descripcion: string

    @Column({type: 'enum', enum: estadoEscenario, default: estadoEscenario.INACTIVO})
    estado: estadoEscenario

}
