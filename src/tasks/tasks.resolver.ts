import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Resolver()
export class TasksResolver {
    constructor(private tasksService: TasksService) {}

    @Mutation(returns => Task)
    createTask(
        @Args({ name: 'listId', type: () => String }) listId: string, 
        @Args({ name: 'name', type: () => String }) name: string, 
        @Args({ name: 'description', type: () => String }) description: string, 
        ): Promise<Task> {
        return this.tasksService.createTask(listId, name, description);
    }
}
