import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @IsString({ message: 'A senha deve ser uma string' })
  password: string;
}

export class RegisterDto {
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @IsString({ message: 'A senha deve ser uma string' })
  password: string;

  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;
}
