import {
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { socketSendDTO } from 'src/chat/dto/socket-send.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway {

  @SubscribeMessage('chat')
  async onPosition(client: any, dto: socketSendDTO): Promise<void> {
      client.broadcast.emit('chat', dto);
  }
}