import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';

@Module({
  // Registramos la entidad aquí para que TypeORM la detecte y cree la tabla
  imports: [TypeOrmModule.forFeature([Categoria])], 
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}