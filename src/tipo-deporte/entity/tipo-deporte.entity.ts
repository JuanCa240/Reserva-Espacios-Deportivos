import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipo-deporte')
export class TipoDeporte {
    @PrimaryGeneratedColumn('increment')
    id: number
    
}
