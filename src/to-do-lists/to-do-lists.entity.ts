import { Field, Int, ObjectType } from "@nestjs/graphql";  
import { Task } from "src/tasks/tasks.entity";

@ObjectType()
export class ToDoList {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field(type => Int)
    order: number;

    @Field(type => Int)
    status: number;

    @Field(type => [Task])
    tasks?: Task[];
}