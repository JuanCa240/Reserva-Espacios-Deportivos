import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Escenario } from './entity/escenario.entity';
import { Repository } from 'typeorm';
import { Ubicacion } from 'src/ubicacion/entity/ubicacion.entity';
import { TipoDeporte } from 'src/tipo-deporte/entity/tipo_deporte.entity';

@Injectable()
export class EscenarioService {
  constructor(
    @InjectRepository(Escenario)
    private readonly escenarioRepository: Repository<Escenario>,

    @InjectRepository(Ubicacion)
    private readonly ubicacionRepository: Repository<Ubicacion>,

    @InjectRepository(TipoDeporte)
    private readonly tipoDeporteRepository: Repository<TipoDeporte>,

  ) {}

  async findAll() {
    return this.escenarioRepository.find();
  }

  async findOne(id: number) {
    const escenario = await this.escenarioRepository.findOneBy({ id });
    if (!escenario) throw new NotFoundException(`Escenario #${id} no encontrado`);
    return escenario;
  }

  async crear(data: any) {
    const { 
      nombre, 
      tipo_deporte_id, 
      ubicacion_id, 
      capacidad_maxima, 
      descripcion,
      precio_por_hora
    } = data;

    // Validaciones

    if (!nombre || !tipo_deporte_id || !ubicacion_id || !capacidad_maxima || !descripcion) {
      throw new BadRequestException('Faltan campos obligatorios');
    }

    if (capacidad_maxima <= 0) {
      throw new BadRequestException('Capacidad inválida');
    }

    if (!precio_por_hora || Number(precio_por_hora) <= 0) {
      throw new BadRequestException('El precio debe ser mayor a 0');
    }

    const ubicacion = await this.ubicacionRepository.findOneBy({ id: ubicacion_id });
    if (!ubicacion) {
      throw new BadRequestException('Ubicación no existe');
    }

    const tipo = await this.tipoDeporteRepository.findOneBy({ id: tipo_deporte_id });
    if (!tipo) {
      throw new BadRequestException('Tipo de deporte no existe');
    }

    const existente = await this.escenarioRepository.findOne({
      where: { nombre, ubicacion_id }
    });

    if (existente) {
      throw new BadRequestException('Ya existe un escenario con ese nombre en esa ubicación');
    }

    const escenario = this.escenarioRepository.create(data);
    return this.escenarioRepository.save(escenario);
  }

  async remove(id: number) {
    const escenario = await this.escenarioRepository.findOneBy({ id });
    if (!escenario) throw new NotFoundException(`Escenario #${id} no encontrado`);
    return this.escenarioRepository.remove(escenario);
  }
}