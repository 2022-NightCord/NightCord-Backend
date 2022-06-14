import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import { socketSendDTO } from 'src/chat/dto/socket-send.dto';

type usertype = {
  id: number,
  username: string
}

@WebSocketGateway({ cors: true })
export class ChatGateway {
    constructor(private readonly chatService: ChatService) {}

  // 초깃값
  id: number = 0;

  users: usertype[] = [];

  async handleConnection(): Promise<void> {
    this.id++;
    this.users.push({
      id: this.id,
      username: "Guest" + this.id.toString()
    })
    this.server.emit('users', this.users);
  }

  async handleDisconnect(): Promise<void> {
    this.id--;
    this.users.pop();
    this.server.emit('users', this.users);
  }

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