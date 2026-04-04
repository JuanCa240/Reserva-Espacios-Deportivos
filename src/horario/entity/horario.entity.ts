import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Aquí definimos cuando se puede usar un escenario (horario).

@Entity('horario')
export class Horario {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    escenario_id: number // Llave foránea

    @Column()
    diaSemana: string

    @Column({type: 'time'})
    hora_inicio: string

    @Column({type: 'time'})
    hora_fin: string
 
}
