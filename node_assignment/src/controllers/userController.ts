import { Request, Response } from 'express';
import { loadUsers, deleteAllUsers, deleteUserById, getUserById, createUser } from '../services/userService';

export const loadUsersHandler = async (req: Request, res: Response) => {
    try {
        await loadUsers();
        res.status(200).send();
    } catch (error) {
        res.status(500).send({message:error});
    }
};

export const deleteAllUsersHandler = async (req: Request, res: Response) => {
    try {
        await deleteAllUsers();
        res.status(200).send();
    } catch (error) {
        res.status(500).send({message:error});
    }
};

export const deleteUserByIdHandler = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        await deleteUserById(userId);
        res.status(200).send();
    } catch (error) {
        res.status(500).send({message:error});
    }
};

export const getUserByIdHandler = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const user = await getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send({message:error});
    }
};

export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        await createUser(user);
        res.status(201).send();
    } catch (error) {
        res.status(400).send({message:error});
    }
};