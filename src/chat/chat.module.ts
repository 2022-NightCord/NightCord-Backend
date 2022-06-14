import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassTransformer } from '@nestjs/class-transformer';
import { ChatController } from 'src/chat/chat.controller';
import { ChatService } from 'src/chat/chat.service';
import { ChatEntity } from 'src/chat/entities/chat.entity';
import { ChatGateway } from './chat.gateway';
import { GuestEntity } from 'src/chat/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatEntity, GuestEntity]),
    ClassTransformer
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway]
})
export class ChatModule {}
