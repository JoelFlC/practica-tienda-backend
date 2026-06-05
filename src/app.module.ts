import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from './categorias/categorias.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProductosModule } from './productos/productos.module';
import { OrdenesModule } from './ordenes/ordenes.module';
import { OrdenProductoModule } from './orden-producto/orden-producto.module';

@Module({
  imports: [
    // 1. Inicializamos el lector de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, // Para que esté disponible en toda la app sin volver a importarlo
    }),
    
    // 2. Configuramos TypeORM leyendo el archivo .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, // Carga las entidades automáticamente sin declararlas una por una
      synchronize: true, // TRUE SOLO EN DESARROLLO: Crea/actualiza las tablas automáticamente
    }),
    
    CategoriasModule,
    
    ClientesModule,
    
    ProductosModule,
    
    OrdenesModule,
    
    OrdenProductoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}