import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Task } from 'src/tasks/tasks.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { ToDoList } from './to-do-lists.entity';
import { ToDoListsService } from './to-do-lists.service';

@Resolver(of => ToDoList)
export class ToDoListsResolver {
    constructor(private toDoListsService: ToDoListsService, private tasksService: TasksService) { }

    @ResolveField(returns => [Task])
    tasks(@Parent() list: ToDoList): Promise<Task[]>{
        return this.tasksService.getTasksByListId(list.id);
    }

    @Mutation(returns => ToDoList)
    createList(@Args({ name: 'name', type: () => String }) name: string): Promise<ToDoList> {
        return this.toDoListsService.createList(name);
    }

    @Query(returns => [ToDoList])
    lists(): Promise<ToDoList[]> {
        // Временное решение. Авторизация пользователя не реализовывалась.
        const userId = '62082dddd9cb349ef3f76935';
        return this.toDoListsService.getByUserId(userId);
    }
}
