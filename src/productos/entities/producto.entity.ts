import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { OrdenProducto } from '../../orden-producto/entities/orden-producto.entity';

@Entity('productos')
export class Producto {
    @PrimaryGeneratedColumn()
    idProducto!: number; 
    @Column({ type: 'varchar', length: 100 })
    nombre!: string; 
    @Column({ type: 'text', nullable: true })
    descripcion!: string; 
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio!: number; 
    @Column({ type: 'int', default: 0 })
    stock!: number; 
    @CreateDateColumn({ name: 'creado_en' })
    creadoEn!: Date; 
    @UpdateDateColumn({ name: 'actualizado_en' })
    actualizadoEn!: Date; 
    @DeleteDateColumn({ name: 'eliminado_en' })
    eliminadoEn!: Date; 

    @ManyToOne(() => Categoria, (categoria) => categoria.productos)
    @JoinColumn({ name: 'idCategoria' }) 
    categoria!: Categoria;

    @OneToMany(() => OrdenProducto, (ordenProducto) => ordenProducto.producto)
    ordenProductos!: OrdenProducto[];
    }