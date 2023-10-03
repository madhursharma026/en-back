import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'room' })
export class RoomEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roomName: string;

    @Column({ default: 0, nullable: true })
    participants: number;

    @Column({ nullable: true, length: 1000 })
    firstParticipantToken: string;

    @Column({ nullable: true, length: 1000 })
    secondParticipantToken: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: String;

    @Column({ nullable: true, length: 1000 })
    createdDateTime: string;
}

