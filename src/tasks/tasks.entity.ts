import { Field, Int, ObjectType } from "@nestjs/graphql";  

@ObjectType()
export class Task {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field(type => Int)
    order: number;

    @Field(type => Int)
    status: number;
}