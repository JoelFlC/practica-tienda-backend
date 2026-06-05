import { IsInt, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateOrdenProductoDto {
    @IsInt({ message: 'El idOrden debe ser un número entero' })
    @IsNotEmpty({ message: 'La orden es obligatoria' })
    idOrden!: number;

    @IsInt({ message: 'El idProducto debe ser un número entero' })
    @IsNotEmpty({ message: 'El producto es obligatorio' })
    idProducto!: number;

    @IsInt({ message: 'La cantidad debe ser un número entero' })
    @Min(1, { message: 'La cantidad mínima es 1' })
    cantidad!: number;

    @IsNumber({}, { message: 'El precio unitario debe ser un número' })
    @IsPositive({ message: 'El precio unitario debe ser positivo' })
    precio_unitario!: number;
}