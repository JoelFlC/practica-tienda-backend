import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    const { idCategoria, ...datosProducto } = createProductoDto;

    const nuevoProducto = this.productoRepository.create({
      ...datosProducto,
      categoria: { idCategoria: idCategoria }
    });

    return await this.productoRepository.save(nuevoProducto);
  }

  async findAll() {
    return await this.productoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({
      where: { idProducto: id },
      relations: {
        categoria: true, 
      },
    });

    if (!producto) {
      throw new NotFoundException(`El producto con el ID ${id} no existe en el catálogo`);
    }
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    await this.findOne(id);
    

    const { idCategoria, ...datosProducto } = updateProductoDto;
    
    const datosActualizar: any = { ...datosProducto };
    if (idCategoria) {
      datosActualizar.categoria = { idCategoria: idCategoria };
    }

    await this.productoRepository.update(id, datosActualizar);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.productoRepository.softDelete(id);
    return { message: `Producto #${id} eliminado correctamente del catálogo` };
  }
}