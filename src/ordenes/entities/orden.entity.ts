import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { OrdenProducto } from '../../orden-producto/entities/orden-producto.entity';

@Entity('ordenes')
export class Orden {
    @PrimaryGeneratedColumn()
    idOrden!: number;
    @Column({ type: 'varchar', length: 50, default: 'PENDIENTE' })
    estado!: string; 
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    total!: number;
    @CreateDateColumn({ name: 'creado_en' })
    creadoEn!: Date;
    @UpdateDateColumn({ name: 'actualizado_en' })
    actualizadoEn!: Date;
    @DeleteDateColumn({ name: 'eliminado_en' })
    eliminadoEn!: Date;

    @ManyToOne(() => Cliente, (cliente) => cliente.ordenes)
    @JoinColumn({ name: 'idCliente' }) 
    cliente!: Cliente;

    @OneToMany(() => OrdenProducto, (ordenProducto) => ordenProducto.orden)
    ordenProductos!: OrdenProducto[];
}