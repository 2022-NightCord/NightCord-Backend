import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassTransformer } from '@nestjs/class-transformer';
import { ChatController } from 'src/chat/chat.controller';
import { ChatService } from 'src/chat/chat.service';
import { ChatEntity } from 'src/chat/entities/chat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatEntity]),
    ClassTransformer
  ],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
