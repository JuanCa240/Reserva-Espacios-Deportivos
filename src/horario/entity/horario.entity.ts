import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//ubicación del escenario”

@Entity('horario')
export class Horario {
    @PrimaryGeneratedColumn('increment')
    id: number
   
    
}
