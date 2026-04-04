import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//Representa a cualquier persona que usa el sistema.

export enum rol {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity("usuario")
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  nombre: string

  @Column({unique: true})
  email: string

  @Column()
  contrasena: string

  @Column({type: 'enum', enum: rol, default: rol.USER})
  rol: rol

  @Column()
  telefono: string

  @Column({type: 'boolean', default: true})
  activo: boolean

  @Column({type: 'boolean', default: false})
  dosfa_habilitado: boolean

  @Column({ type: 'text', nullable: true })
  dosfa_secret: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date

}
