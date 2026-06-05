import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateCategoriaDto {
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @MaxLength(100, { message: 'El nombre no puede tener más de 100 caracteres' })
    nombre!: string;

    @IsString({ message: 'La descripción debe ser un texto' })
    @IsOptional() // Es opcional porque en la base de datos le pusimos nullable: true
    descripcion?: string;
}