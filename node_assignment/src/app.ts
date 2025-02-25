 
 import express from 'express';
 import { loadUsersHandler, deleteAllUsersHandler, deleteUserByIdHandler, getUserByIdHandler, createUserHandler } from './controllers/userController';
 
 const app = express();
 app.use(express.json());
 
 app.get('/load', loadUsersHandler);
 app.delete('/users', deleteAllUsersHandler);
 app.delete('/users/:userId', deleteUserByIdHandler);
 app.get('/users/:userId', getUserByIdHandler);
 app.put('/users', createUserHandler);
 
 export default app;

 