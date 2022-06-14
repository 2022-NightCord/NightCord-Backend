import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('guest')
export class GuestEntity {
    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn({unsigned: true})
    id: number;
}
