import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name?: string;

  @IsString()
  @IsNotEmpty()
  readonly surname?: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password?: string;
}
