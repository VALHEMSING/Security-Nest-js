import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/auth.schema';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signUp.dto';
import  * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { LogInDto } from './dto/logIn.dto';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    ){}


    /**
     * Metodo de registro para el user
     */
    async signUp(signUpDto: SignUpDto): Promise<{token : string}>{

        const {password, ...userData} = signUpDto;


        const hashedPassword = await bcrypt.hash(password, 10);


        

        try {
            // crear una nueva instancia de user
        const newUser = await this.userModel.create({
            ...userData,
            password: hashedPassword,
        })

        const token = this .jwtService.sign({id: newUser.id, name: newUser.name})

        return {token};
        } catch (error) {
            
        }
    }



    async logIn(logInDto: LogInDto): Promise<{ token: string }> {
        const { email, password } = logInDto;

        const user = await this.userModel.findOne({ email }).exec();

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) throw new UnauthorizedException('Invalid email or password');

        const payload = { id: user.id, name: user.name };
        const token = this.jwtService.sign(payload); // Ensure the secret is set in JwtModule

        return { token };
    }

}
