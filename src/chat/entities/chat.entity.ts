import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chat')
export class ChatEntity {
    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn({unsigned: true})
    id: number;
    
    @Column({
        unsigned: true
    })
    guestId: number;
    
    @Column()
    date: Date;

    @Column({
        type: 'text'
    })
    content: string;
}
