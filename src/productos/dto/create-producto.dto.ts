import { IsString, IsNotEmpty, IsOptional, IsNumber, IsInt, Min, IsPositive } from 'class-validator';

export class CreateProductoDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
    nombre!: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @IsPositive({ message: 'El precio debe ser un valor positivo' })
    precio!: number;

    @IsInt({ message: 'El stock debe ser un número entero' })
    @Min(0, { message: 'El stock no puede ser negativo' })
    stock!: number;

    @IsInt({ message: 'El idCategoria debe ser un número entero' })
    @IsNotEmpty({ message: 'Debe especificar a qué categoría pertenece el producto' })
    idCategoria!: number;
}