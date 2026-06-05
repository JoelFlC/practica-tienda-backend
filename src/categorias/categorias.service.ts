import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const nuevaCategoria = this.categoriaRepository.create(createCategoriaDto);
    return await this.categoriaRepository.save(nuevaCategoria);
  }

  async findAll() {
    return await this.categoriaRepository.find();
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepository.findOne({
      where: { idCategoria: id },
      relations: {
        productos: true, 
      }, 
    });

    if (!categoria) {
      throw new NotFoundException(`La categoría con el ID ${id} no existe`);
    }
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    await this.findOne(id); 
    
    await this.categoriaRepository.update(id, updateCategoriaDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    
    await this.categoriaRepository.softDelete(id);
    return { message: `Categoría #${id} eliminada correctamente` };
  }
}