import { Field, ObjectType } from "@nestjs/graphql";
import { ToDoList } from "src/to-do-lists/to-do-lists.entity";

@ObjectType()
export class User {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field(type => [ToDoList])
    lists?: ToDoList[];
}