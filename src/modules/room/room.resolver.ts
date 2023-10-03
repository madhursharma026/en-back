import { Room } from "./schema/room.schema";
import { RoomService } from "./room.service";
import { AddRoomArgs } from "./args/add.room.args";
import { UpdateRoomArgs } from "./args/update.room.args";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver(of => Room)
export class RoomResolver {
    constructor(private readonly roomService: RoomService) { }

    @Mutation(returns => Room, { name: 'addRoom' })
    addRoom(@Args('addRoomArgs') addRoomArgs: AddRoomArgs) {
        return this.roomService.addRoom(addRoomArgs);
    }

    @Mutation(returns => Room, { name: 'updateRoom' })
    updateRoom(@Args('updateRoomArgs') updateRoomArgs: UpdateRoomArgs) {
        return this.roomService.updateRoom(updateRoomArgs);
    }
}