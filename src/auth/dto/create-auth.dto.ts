import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({ message: "email ko được để trống" })
    email: string;

    @IsNotEmpty({ message: "password ko được để trống" })
    password: string

    @IsOptional()
    name: string;

}
export class CodeAuthDto {
    @IsNotEmpty({ message: "_id ko được để trống" })
    _id: string;

    @IsNotEmpty({ message: "code ko được để trống" })
    code: string;
}
