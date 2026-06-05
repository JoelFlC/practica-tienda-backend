import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Orden } from '../../ordenes/entities/orden.entity';

@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn()
    idCliente!: number;
    @Column({ type: 'varchar', length: 100 })
    nombres!: string;
    @Column({ type: 'varchar', length: 100 })
    paterno!: string;
    @Column({ type: 'varchar', length: 100, nullable: true })
    materno!: string; 
    @Column({ type: 'varchar', length: 150, unique: true })
    email!: string; 
    @CreateDateColumn({ name: 'creado_en' })
    creadoEn!: Date;
    @UpdateDateColumn({ name: 'actualizado_en' })
    actualizadoEn!: Date;
    @DeleteDateColumn({ name: 'eliminado_en' })
    eliminadoEn!: Date;

    @OneToMany(() => Orden, (orden) => orden.cliente)
    ordenes!: Orden[];
}