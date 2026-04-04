import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Para controlar “horarios del deporte”.

export enum tiposDeporte{
    FUTBOL = 'futbol',
    TENIS = 'tenis',
    BASQUET = 'basquet',
    VOLEY = 'voley'
}

@Entity('tipo-deporte')
export class TipoDeporte {
    @PrimaryGeneratedColumn('increment')
    id: number
    
    @Column({type: 'enum', enum: tiposDeporte})
    tipoDeporte: tiposDeporte

    @Column()
    descripcion: string
}
