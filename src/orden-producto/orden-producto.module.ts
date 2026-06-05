import { Module } from '@nestjs/common';
import { OrdenProductoService } from './orden-producto.service';
import { OrdenProductoController } from './orden-producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenProducto } from './entities/orden-producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdenProducto])],
  controllers: [OrdenProductoController],
  providers: [OrdenProductoService],
})
export class OrdenProductoModule {}
