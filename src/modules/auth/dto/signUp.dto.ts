import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { IUser } from "../interface/user.interface";




export class SignUpDto implements IUser{

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message: 'La contraseña debe tener al menos 6 caracteres'})
    password: string;

    @IsOptional()
    role: string[]
}