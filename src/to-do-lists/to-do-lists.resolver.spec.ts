import { Test, TestingModule } from '@nestjs/testing';
import { ToDoListsResolver } from './to-do-lists.resolver';

describe('ToDoListsResolver', () => {
  let resolver: ToDoListsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToDoListsResolver],
    }).compile();

    resolver = module.get<ToDoListsResolver>(ToDoListsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
