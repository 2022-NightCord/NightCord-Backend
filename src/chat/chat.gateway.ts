import {
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { ChatService } from 'src/chat/chat.service';
import { socketSendDTO } from 'src/chat/dto/socket-send.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway {
    constructor(private readonly chatService: ChatService) {}

    @SubscribeMessage('chat')
    async onPosition(client: any, dto: socketSendDTO): Promise<void> {
        await this.chatService.saveChat({
            ...dto,
            date: new Date
        });
        client.broadcast.emit('chat', dto);
    }
}