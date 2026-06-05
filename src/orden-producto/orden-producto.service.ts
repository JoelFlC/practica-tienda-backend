import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrdenProductoDto } from './dto/create-orden-producto.dto';
import { UpdateOrdenProductoDto } from './dto/update-orden-producto.dto';
import { OrdenProducto } from './entities/orden-producto.entity';

@Injectable()
export class OrdenProductoService {
  constructor(
    @InjectRepository(OrdenProducto)
    private readonly ordenProductoRepository: Repository<OrdenProducto>,
  ) {}

  async create(createOrdenProductoDto: CreateOrdenProductoDto) {

    const { idOrden, idProducto, ...datos } = createOrdenProductoDto;

    const nuevoRegistro = this.ordenProductoRepository.create({
      ...datos,
      orden: { idOrden: idOrden }, 
      producto: { idProducto: idProducto },
    });

    return await this.ordenProductoRepository.save(nuevoRegistro);
  }

  async findAll() {
    return await this.ordenProductoRepository.find({
      relations: {
        orden: true,
        producto: true,
      },
    });
  }

  async findOne(id: number) {
    const registro = await this.ordenProductoRepository.findOne({
      where: { idOrdenProducto: id },
      relations: {
        orden: true,
        producto: true,
      },
    });

    if (!registro) {
      throw new NotFoundException(`El registro con ID ${id} no existe`);
    }
    return registro;
  }

  async update(id: number, updateOrdenProductoDto: UpdateOrdenProductoDto) {
    await this.findOne(id); // Validamos que exista
    
    const { idOrden, idProducto, ...datosActualizar } = updateOrdenProductoDto;

    const actualizacion: any = { ...datosActualizar };

    if (idOrden) actualizacion.orden = { idOrden };
    if (idProducto) actualizacion.producto = { idProducto };

    await this.ordenProductoRepository.update(id, actualizacion);
    return this.findOne(id);
  }


  async removeProductFromOrder(idOrden: number, idProducto: number) {

    const registro = await this.ordenProductoRepository.findOne({
      where: {
        orden: { idOrden: idOrden },
        producto: { idProducto: idProducto }
      }
    });

    if (!registro) {
      throw new NotFoundException(`No se encontró el producto #${idProducto} en la orden #${idOrden}`);
    }

    await this.ordenProductoRepository.softDelete(registro.idOrdenProducto);
    return { message: `Producto #${idProducto} removido de la orden #${idOrden} exitosamente` };
  }
}