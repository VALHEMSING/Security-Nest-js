import { IUser } from "../interface/user.interface";
import { IsNotEmpty, IsString, IsEmail, MinLength, IsOptional } from "class-validator";




export class LogInDto implements IUser{


    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message: 'La contraseña debe tener al menos 6 caracteres'})
    password: string;
}