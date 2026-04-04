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

}
