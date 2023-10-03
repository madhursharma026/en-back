import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class AddRoomArgs {
    @Field()
    username: string;
}

