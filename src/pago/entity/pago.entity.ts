import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pago')
export class Pago {
    @PrimaryGeneratedColumn('increment')
    id: number
    
}
