import { Module } from '@nestjs/common';
import { ToDoListsService } from './to-do-lists.service';
import { ToDoListsResolver } from './to-do-lists.resolver';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  providers: [ToDoListsService, ToDoListsResolver],
  exports: [ToDoListsService],
  imports: [TasksModule],
})
export class ToDoListsModule {}
