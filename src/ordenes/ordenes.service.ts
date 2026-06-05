import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { Orden } from './entities/orden.entity';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(Orden)
    private readonly ordenRepository: Repository<Orden>,
  ) {}

  async create(createOrdenDto: CreateOrdenDto) {
    const { idCliente, ...datosOrden } = createOrdenDto;

    const nuevaOrden = this.ordenRepository.create({
      ...datosOrden,
      cliente: { idCliente: idCliente }, 
    });

    return await this.ordenRepository.save(nuevaOrden);
  }

  async findAll() {
    return await this.ordenRepository.find({
      relations: {
        cliente: true,
      },
    });
  }

  async findOne(id: number) {
    const orden = await this.ordenRepository.findOne({
      where: { idOrden: id },
      relations: {
        cliente: true, 
        ordenProductos: {
          producto: true, 
        },
      },
    });

    if (!orden) {
      throw new NotFoundException(`La orden con el ID ${id} no existe`);
    }
    return orden;
  }

  async update(id: number, updateOrdenDto: UpdateOrdenDto) {
    await this.findOne(id); 

    await this.ordenRepository.update(id, updateOrdenDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.ordenRepository.softDelete(id);
    return { message: `Orden #${id} eliminada correctamente` };
  }
}