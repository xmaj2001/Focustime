import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O atributo [name] deve ser uma string' })
  @IsNotEmpty({ message: 'O atributo [name] é obrigatório' })
  name: string;

  @IsEmail({}, { message: 'O atributo [email] deve ser um email válido' })
  email: string;

  @IsString({ message: 'O atributo [password] deve ser uma string' })
  @IsNotEmpty({ message: 'O atributo [password] é obrigatório' })
  password: string;

  @IsOptional()
  @IsString({ message: 'O atributo [avatarUrl] deve ser uma string' })
  avatarUrl?: string;
}
export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'O atributo [name] deve ser uma string' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O atributo [email] deve ser um email válido' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'O atributo [password] deve ser uma string' })
  password?: string;

  @IsOptional()
  @IsString({ message: 'O atributo [avatarUrl] deve ser uma string' })
  avatarUrl?: string;
}
