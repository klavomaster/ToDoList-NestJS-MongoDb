import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { ToDoListsModule } from 'src/to-do-lists/to-do-lists.module';

@Module({
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
  imports: [ToDoListsModule],
})
export class UsersModule {}
