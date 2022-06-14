import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { socketSendDTO } from 'src/chat/dto/socket-send.dto';

type usertype = {
  id: number,
  username: string 
}

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: any;

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

  @SubscribeMessage('chat')
  async onPosition(client: any, dto: socketSendDTO): Promise<void> {
    client.broadcast.emit('chat', dto);
  }

}