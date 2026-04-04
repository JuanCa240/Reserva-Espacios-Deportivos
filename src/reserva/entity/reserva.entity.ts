import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reserva')
export class Reserva {
    @PrimaryGeneratedColumn('increment')
    id: number
    
}
