import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('categorias') 
export class Categoria {
    @PrimaryGeneratedColumn() 
    idCategoria!: number;
    @Column({ type: 'varchar', length: 100 })
    nombre!: string; 
    @Column({ type: 'text', nullable: true })
    descripcion!: string; 
    @CreateDateColumn({ name: 'creado_en' })
    creadoEn!: Date; 
    @UpdateDateColumn({ name: 'actualizado_en' })
    actualizadoEn!: Date; 
    @DeleteDateColumn({ name: 'eliminado_en' })
    eliminadoEn!: Date; 

    @OneToMany(() => Producto, (producto) => producto.categoria)
    productos!: Producto[];
    }