import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"; 
import { IUser } from "../interface/user.interface";
import { Document } from "mongoose";
import { ERole } from "../enum/role.enum";
import { Roles } from "../decorators/role.decorator";



// Agrego la audotoria
@Schema({timestamps: true})
export class User extends Document implements IUser{

    @Prop({required: true})
    name: string;

    @Prop({unique: [true, 'Duplicate email entered']})     
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({
        type: [{type: String, enum: ERole}],
        default: [ERole.USER]
    })
    role: ERole[]

}

export const UserSchema = SchemaFactory.createForClass(User);