import { plainToClass } from '@nestjs/class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getChatListDTO } from 'src/chat/dto/get-chatlist.dto';
import { UploadChatDTO } from 'src/chat/dto/upload-chat.dto';
import { ChatEntity } from 'src/chat/entities/chat.entity';
import { LessThan, Repository } from 'typeorm';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ChatEntity) private chatRepository: Repository<ChatEntity>
    ) {}

    async getChatList(dto: getChatListDTO) {
        const { startChatId } = dto;
        const chatList = await this.chatRepository.find({
            where: startChatId==0? null: {id: LessThan(startChatId)},
            take: 15,
            order: {
                id: 'DESC'
            }
        });
        return chatList;
    }

    async saveChat(dto: UploadChatDTO) {
        const newChat: ChatEntity = plainToClass(ChatEntity, dto, {excludeExtraneousValues: true});
        await this.chatRepository.save(newChat);
    }
}
