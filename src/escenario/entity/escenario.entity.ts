import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('escenario')
export class Escenario {
    @PrimaryGeneratedColumn('increment')
    id: number
    
}
