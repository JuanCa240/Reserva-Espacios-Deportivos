import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//ubicación del escenario”

@Entity('ubicacion')
export class Ubicacion {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    nombre: string

    @Column()
    direccion: string

    @Column()
    ciudad: string

}
