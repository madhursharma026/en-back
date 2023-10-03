import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class UpdateRoomArgs {
    @Field((type) => Int)
    id: number;

    @Field({nullable: false})
    username: string;
}
