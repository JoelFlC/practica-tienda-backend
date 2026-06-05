import { IsString, IsNotEmpty, IsOptional, MaxLength, IsEmail } from 'class-validator';

export class CreateClienteDto {
    @IsString({ message: 'Los nombres deben ser un texto' })
    @IsNotEmpty({ message: 'Los nombres son obligatorios' })
    @MaxLength(100)
    nombres!: string;

    @IsString({ message: 'El apellido paterno debe ser un texto' })
    @IsNotEmpty({ message: 'El apellido paterno es obligatorio' })
    @MaxLength(100)
    paterno!: string;

    @IsString({ message: 'El apellido materno debe ser un texto' })
    @IsOptional()
    @MaxLength(100)
    materno?: string;

    @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    @MaxLength(150)
    email!: string;
}