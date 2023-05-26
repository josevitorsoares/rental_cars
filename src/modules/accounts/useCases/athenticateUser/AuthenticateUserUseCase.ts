import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { AppError } from '@shared/infra/http/errors/AppError';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';

interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    token: string;
    user:{
        name: string,
        email: string,
    };
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository
    ) {}

    async execute({email, password}: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect!");
        }
    
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect");
        }

        const token = sign({}, "c10db78950e5fcd5af974e3d0e831cc0", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        }

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };