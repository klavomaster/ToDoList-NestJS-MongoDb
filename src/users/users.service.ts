import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    async findAll(): Promise<User[]> {

        // Быстрое решение для соединения с mongo db.
        const uri = 'mongodb+srv://klavomaster:bQnGVPXFvcYfUr2@sandbox.bzajs.mongodb.net/todo_list?retryWrites=true&w=majority';
        const client = new MongoClient(uri);

        try {
            await client.connect();
            const docs = await client.db('todo_list').collection('users').find().toArray();
            const result: User[] = [];
            docs.forEach(doc => {
                const user = new User();
                user.id = doc._id.toString();
                user.name = doc.name;
                user.email = doc.email;
                user.password = doc.password;
                result.push(user);
            });
            return result;
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
        return [];
    }
}
