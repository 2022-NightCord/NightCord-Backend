import { IsNumber, IsString, IsNotEmpty } from "class-validator";

export class socketSendDTO {

    @IsNumber()
    guestId: number;

    @IsString()
    @IsNotEmpty()
    content: string;

}