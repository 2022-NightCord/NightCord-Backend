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

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
    constructor(private readonly chatService: ChatService) {}

  // 딕셔너리
  nowGuest = {};
  users: number = 0;

  async handleConnection(): Promise<void> {
    this.users++;
    this.server.emit('users', this.users);
  }

  async handleDisconnect(client: Socket): Promise<void> {
    this.users--;
    this.server.emit('users', this.users);
    if ((client.id in this.nowGuest)){
      delete this.nowGuest[client.id];
    }
    this.server.emit('nowClients', Object.values(this.nowGuest));
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('getGuestId')
  async getGuestID(client: Socket, res: number): Promise<void> {
      // 중복이 아니면
      if (!(client.id in this.nowGuest) && !(res in Object.values(this.nowGuest))){
        this.nowGuest[client.id] = res;
      }
      this.server.emit('nowClients', Object.values(this.nowGuest));
  }

  @SubscribeMessage('chat')
  async onPosition(client: Socket, dto: socketSendDTO): Promise<void> {
      const chatInfo = await this.chatService.saveChat({
            ...dto,
            date: new Date
      });
      this.server.emit('chat', chatInfo);
  }
}