import { IsNumber, IsOptional, Min } from "class-validator";

export class getChatListDTO {
    @IsOptional()
    @IsNumber()
    @Min(0)
    startChatId: number = 0;
}