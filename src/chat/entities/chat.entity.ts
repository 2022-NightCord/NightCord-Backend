import { Expose } from '@nestjs/class-transformer';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chat')
export class ChatEntity {
    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn({unsigned: true})
    id: number;
    
    @Column({
        unsigned: true
    })
    @Expose()
    guestId: number;
    
    @Column()
    @Expose()
    date: Date;

    @Column({
        type: 'text'
    })
    @Expose()
    content: string;
}
