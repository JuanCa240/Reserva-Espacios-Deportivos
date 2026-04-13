import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum estadoEscenario {
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
  tipo_deporte_id: number

  @Column()
  ubicacion_id: number

  @Column()
  capacidad_maxima: number

  @Column()
  descripcion: string

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  precio_por_hora: number  // ← nuevo campo

  @Column({ type: 'enum', enum: estadoEscenario, default: estadoEscenario.INACTIVO })
  estado: estadoEscenario
}