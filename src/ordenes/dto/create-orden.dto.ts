import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrdenDto {
    @IsInt({ message: 'El idCliente debe ser un número entero' })
    @IsNotEmpty({ message: 'Debe especificar a qué cliente pertenece la orden' })
    idCliente!: number;

    @IsString()
    @IsOptional()
    estado?: string; 
}