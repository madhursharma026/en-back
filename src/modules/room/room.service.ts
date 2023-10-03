import { Repository } from 'typeorm';
import { AddRoomArgs } from './args/add.room.args';
import { InjectRepository } from "@nestjs/typeorm";
import { RoomEntity } from './entities/room.entity';
import { UpdateRoomArgs } from './args/update.room.args';
import { Injectable, ConflictException } from "@nestjs/common";
import { AccessToken, RoomServiceClient } from 'livekit-server-sdk';
import moment from 'moment';

const SERVER_URL = 'wss://audio-chat-nextjs-eqg35w5o.livekit.cloud';
const client = new RoomServiceClient(SERVER_URL, 'APIRiqLzR74T8nr', 'JkBo1o58XmqpkvSZo3Juko08lybfJYyZk2bieQ9NceaB');

@Injectable()
export class RoomService {
  constructor(@InjectRepository(RoomEntity) public readonly quizRepo: Repository<RoomEntity>) { }

  async addRoom(addRoomArgs: AddRoomArgs): Promise<RoomEntity> {
    let room: RoomEntity = new RoomEntity();
    let roomName = `room-${Math.random().toFixed(2)}`
    client.createRoom({ name: roomName, emptyTimeout: 0.1 * 60, maxParticipants: 2 })
    const at = new AccessToken('APIRiqLzR74T8nr', 'JkBo1o58XmqpkvSZo3Juko08lybfJYyZk2bieQ9NceaB', { identity: addRoomArgs.username, });
    at.addGrant({ roomJoin: true, room: roomName });
    room.roomName = roomName;
    room.participants = 1;
    room.firstParticipantToken = at.toJwt();
    room.secondParticipantToken = null
    let todayDate = new Date();
    var todayDateTime = ((todayDate.getFullYear()) + "-" + (("0" + (todayDate.getMonth() + 1)).slice(-2)) + "-" + (("0" + todayDate.getDate()).slice(-2)) + " " + (todayDate.getHours()) + ":" + (todayDate.getMinutes()) + ":" + (todayDate.getSeconds()));
    room.createdDateTime = todayDateTime;
    return await this.quizRepo.save(room);
  }

  async updateRoom(updateRoomArgs: UpdateRoomArgs): Promise<RoomEntity> {
    // let room: RoomEntity = await this.quizRepo.findOne({ where: { createdAt: updateRoomArgs.createdAt } })
    let quizFound = await this.quizRepo.findOne({ where: { id: updateRoomArgs.id } });
    if (quizFound === null) {
      throw new ConflictException('Room Doesn"t Exists');
    } else {
      const at = new AccessToken('APIRiqLzR74T8nr', 'JkBo1o58XmqpkvSZo3Juko08lybfJYyZk2bieQ9NceaB', { identity: updateRoomArgs.username, });
      quizFound.participants = 2;
      at.addGrant({ roomJoin: true, room: quizFound.roomName });
      quizFound.secondParticipantToken = at.toJwt();
      return await this.quizRepo.save(quizFound);
    }
  }
}

