import { connectToDatabase } from '../utils/db';
import { User, Post, Comment } from '../models/user';

export async function loadUsers() {
    const db = await connectToDatabase();
    const usersCollection = db.collection<User>('users');
    const postsCollection = db.collection<Post>('posts');
    const commentsCollection = db.collection<Comment>('comments');

 
    const [users, posts, comments] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
        fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()),
        fetch('https://jsonplaceholder.typicode.com/comments').then(res => res.json())
    ]);
 
    await usersCollection.insertMany(users);
    await postsCollection.insertMany(posts);
    await commentsCollection.insertMany(comments);
}

export async function deleteAllUsers() {
    const db = await connectToDatabase();
    await db.collection('users').deleteMany({});
}

export async function deleteUserById(userId: number) {
    const db = await connectToDatabase();
    await db.collection('users').deleteOne({ id: userId });
}

export async function getUserById(userId: number) {
    const db = await connectToDatabase();
    const user = await db.collection<User>('users').findOne({ id: userId });
    if (user) {
        const posts = await db.collection<Post>('posts').find({ userId: userId }).toArray();
        user.posts = posts;
        for (const post of posts) {
            post.comments = await db.collection<Comment>('comments').find({ postId: post.id }).toArray();
        }
    }
    return user;
}

export async function createUser(user: User) {
    const db = await connectToDatabase();
    const existingUser = await db.collection<User>('users').findOne({ id: user.id });
    if (existingUser) {
        throw new Error('User already exists');
    }
    await db.collection<User>('users').insertOne(user);
}