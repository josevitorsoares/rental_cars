import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { AppError } from '@shared/infra/http/errors/AppError';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing!", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, "c10db78950e5fcd5af974e3d0e831cc0") as IPayload;
        const userRepository = new UserRepository();
        
        const user = userRepository.findById(user_id);

        if (!user) {
            throw new AppError("User dos not exist!", 401);
        }

        next()
    } catch {
        throw new AppError("Invalid Token", 401);
    }
}