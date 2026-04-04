import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//ubicación del escenario”

@Entity('ubicacion')
export class Ubicacion {
    @PrimaryGeneratedColumn('increment')
    id: number

}
