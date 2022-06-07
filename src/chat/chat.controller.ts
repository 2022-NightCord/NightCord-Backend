import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from 'src/chat/chat.service';
import { getChatListDTO } from 'src/chat/dto/get-chatlist.dto';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get()
    getChatList(@Query() dto: getChatListDTO) {
        return this.chatService.getChatList(dto);
    }
}
