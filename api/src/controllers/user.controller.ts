import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { Messages } from '../constants/messages';
import { User } from '@prisma/client';

const userService = new UserService();

interface HandlerResult<T = unknown> {
    status?: number;
    message?: string;
    data?: T;
}

interface PaginatedResult<T> {
    users: T[];
    total: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
}

export class UserController {
    static async handleRequest<T>(
        req: Request,
        res: Response,
        next: NextFunction,
        handler: (req: Request) => Promise<HandlerResult<T>>
    ): Promise<void> {
        try {
            const result = await handler(req);
            res.status(result?.status || 200).json(result?.data || result);
        } catch (error) {
            next(error);
        }
    }

    static createUser(req: Request, res: Response, next: NextFunction): void {
        UserController.handleRequest(req, res, next, async (req): Promise<HandlerResult> => {
            const data: CreateUserDTO = req.body;
            const user = await userService.createUser(data);
            return { status: 201, data: user };
        });
    }

    static getUsers(req: Request, res: Response, next: NextFunction): void {
        UserController.handleRequest(req, res, next, async (req): Promise<HandlerResult<PaginatedResult<User>>> => {
            const currentPage = parseInt(req.query.currentPage as string) || 1;
            const perPage = parseInt(req.query.perPage as string) || 10;
            const { users, total, totalPages } = await userService.getUsers(currentPage, perPage);

            const data = {
                users,
                total,
                currentPage,
                perPage,
                totalPages
            };

            return { data };
        });
    }

    static getUser(req: Request, res: Response, next: NextFunction): void {
        UserController.handleRequest(req, res, next, async (req): Promise<HandlerResult> => {
            const user = await userService.getUser(req.params.uuid);
            return { data: user };
        });
    }

    static updateUser(req: Request, res: Response, next: NextFunction): void {
        UserController.handleRequest(req, res, next, async (req): Promise<HandlerResult> => {
            const data: UpdateUserDTO = req.body;
            const user = await userService.updateUser(req.params.uuid, data);
            return { data: user };
        });
    }

    static deleteUser(req: Request, res: Response, next: NextFunction): void {
        UserController.handleRequest(req, res, next, async (req): Promise<HandlerResult<void>> => {
            await userService.deleteUser(req.params.uuid);
            return { message: Messages.User.DELETED, status: 200 };
        });
    }
}
