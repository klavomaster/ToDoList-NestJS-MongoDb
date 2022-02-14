import { Injectable } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import { ToDoList } from './to-do-lists.entity';

@Injectable()
export class ToDoListsService {
    async getByUserId(userId: string): Promise<ToDoList[]> {
        
        const uri = 'mongodb+srv://klavomaster:bQnGVPXFvcYfUr2@sandbox.bzajs.mongodb.net/todo_list?retryWrites=true&w=majority';
        const client = new MongoClient(uri);

        try{
            await client.connect();
            const data = await client.db('todo_list').collection('users').findOne({ "_id": new ObjectId(userId) }, { "projection": { "_id": 0, "lists": 1 } });
            const result: ToDoList[] = [];
            if (data.lists !== undefined){
                data.lists.forEach(doc => {
                    const list = new ToDoList();
                    list.id = doc._id.toString();
                    list.name = doc.name;
                    list.order = doc.order;
                    list.status = doc.status;
                    result.push(list);
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

    async createList(name: string): Promise<ToDoList> {

        const list = new ToDoList();
        const newId = new ObjectId();
        list.name = name;
        list.order = 1;
        list.status = 0;
        list.id = newId.toString();

        // Быстрое решение для соединения с mongo db.
        const uri = 'mongodb+srv://klavomaster:bQnGVPXFvcYfUr2@sandbox.bzajs.mongodb.net/todo_list?retryWrites=true&w=majority';
        const client = new MongoClient(uri);

        try{
            await client.connect();
            await client
                .db('todo_list')
                .collection('users')
                .updateOne(
                    { '_id': new ObjectId('62082dddd9cb349ef3f76935')}, 
                    { "$push": {
                        "lists": {
                            "name": list.name,
                            "order": list.order,
                            "status": list.status,
                            "_id": newId
                        }
                    } });
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }

        return list;
    }
}
