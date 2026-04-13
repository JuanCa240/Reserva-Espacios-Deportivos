import { Module } from '@nestjs/common';
import { Usuario } from './usuario/entity/usuario.entity';
import { Ubicacion } from './ubicacion/entity/ubicacion.entity';
import { Escenario } from './escenario/entity/escenario.entity';
import { TipoDeporte } from './tipo-deporte/entity/tipo_deporte.entity';
import { Horario } from './horario/entity/horario.entity';
import { Reserva } from './reserva/entity/reserva.entity';
import { Pago } from './pago/entity/pago.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm' 
import { AuthModule } from './auth/auth.module';
import { EscenarioModule } from './escenario/escenario.module';
import { HorarioModule } from './horario/horario.module';
import { PagoModule } from './pago/pago.module';
import { ReservaModule } from './reserva/reserva.module';
import { TipoDeporteModule } from './tipo-deporte/tipo-deporte.module';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [

    ConfigModule.forRoot({
        isGlobal: true,
    }),
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USERNAME!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
      entities: [Usuario, Ubicacion, Escenario, TipoDeporte, Horario, Reserva, Pago],
      synchronize: true, // Solo en desarrollo
    }),

    AuthModule,

    UsuarioModule,
    UbicacionModule,
    TipoDeporteModule,
    EscenarioModule,
    HorarioModule,
    ReservaModule,
    PagoModule,

  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
