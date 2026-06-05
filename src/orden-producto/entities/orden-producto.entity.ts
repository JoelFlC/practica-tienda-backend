import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Orden } from '../../ordenes/entities/orden.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('orden_producto')
export class OrdenProducto {
    @PrimaryGeneratedColumn()
    idOrdenProducto!: number; 
    @Column({ type: 'int' })
    cantidad!: number; 
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio_unitario!: number; 
    @CreateDateColumn({ name: 'creado_en' })
    creadoEn!: Date; 
    @UpdateDateColumn({ name: 'actualizado_en' })
    actualizadoEn!: Date; 
    @DeleteDateColumn({ name: 'eliminado_en' })
    eliminadoEn!: Date; 
    
    @ManyToOne(() => Orden, (orden) => orden.ordenProductos)
    @JoinColumn({ name: 'idOrden' }) 
    orden!: Orden;

    @ManyToOne(() => Producto, (producto) => producto.ordenProductos)
    @JoinColumn({ name: 'idProducto' }) 
    producto!: Producto;
}