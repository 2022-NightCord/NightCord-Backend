import { Expose } from "@nestjs/class-transformer";

export class UploadChatDTO {
    @Expose()
    guestId: number;
    @Expose()
    content: string;
    @Expose()
    date: Date
}