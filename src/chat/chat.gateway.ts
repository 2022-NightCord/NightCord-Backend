import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import { socketSendDTO } from 'src/chat/dto/socket-send.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway {
    constructor(private readonly chatService: ChatService) {}

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('chat')
    async onPosition(client: Socket, dto: socketSendDTO): Promise<void> {
        const chatInfo = await this.chatService.saveChat({
            ...dto,
            date: new Date
        });
        this.server.emit('chat', chatInfo);
    }
}