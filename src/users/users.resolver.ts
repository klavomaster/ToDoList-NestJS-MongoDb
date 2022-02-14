import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ToDoList } from 'src/to-do-lists/to-do-lists.entity';
import { ToDoListsService } from 'src/to-do-lists/to-do-lists.service';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver {
    constructor(private usersService: UsersService, private toDoListsService: ToDoListsService) { }

    @Query(p => [User])
    users(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @ResolveField(returns => [ToDoList])
    lists(@Parent() user: User): Promise<ToDoList[]> {
        return this.toDoListsService.getByUserId(user.id);
    }
}
