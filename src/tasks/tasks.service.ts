import { Injectable } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
    async getTasksByListId(listId: string): Promise<Task[]>{
        const uri = 'mongodb+srv://klavomaster:bQnGVPXFvcYfUr2@sandbox.bzajs.mongodb.net/todo_list?retryWrites=true&w=majority';
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const data = await client.db('todo_list').collection('users').findOne({ "lists._id": new ObjectId(listId) }, { "projection": { "_id": 0, "lists._id": 1, "lists.tasks": 1 } });
            const result: Task[] = [];
            if (data.lists !== undefined){
                data.lists.forEach(list => {
                    if (list._id.toString() === listId){
                        if (list.tasks !== undefined) {
                            list.tasks.forEach(doc => {
                                const task = new Task();
                                task.id = doc._id.toString();
                                task.name = doc.name;
                                task.description = doc.description;
                                task.order = doc.order;
                                task.status = doc.status;
                                result.push(task);
                            });
                        }
                    }
                });
            }
            return result;
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
        return [];
    }

    async createTask(listId: string, name: string, description: string): Promise<Task> {

        const newId = new ObjectId();
        const task = new Task();
        task.id = newId.toString();
        task.name = name;
        task.description = description;
        task.order = 1;
        task.status = 0;

        // Быстрое решение для соединения с mongo db.
        const uri = 'mongodb+srv://klavomaster:bQnGVPXFvcYfUr2@sandbox.bzajs.mongodb.net/todo_list?retryWrites=true&w=majority';
        const client = new MongoClient(uri);

        try{
            await client.connect();
            const doc = await client.db('todo_list').collection('users')
                .updateOne(
                    { '_id': new ObjectId('62082dddd9cb349ef3f76935'), 'lists._id': new ObjectId(listId)}, 
                    { "$push": {
                        "lists.$.tasks": {
                            "_id": newId,
                            "name": task.name,
                            "description": task.description,
                            "order": task.order,
                            "status": task.status,
                        }
                    } });
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }

        return task;
    }
}
