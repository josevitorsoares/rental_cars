import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { AppError } from '@shared/infra/http/errors/AppError';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import auth from 'src/configs/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/provider/DateProvider/IDateProvider';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    token: string;
    user: {
        name: string,
        email: string,
    };
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository,
        
        @inject("UsersTokensRepository")
        private usersTokenRepository: IUsersTokensRepository,
        
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        const { 
            secret_token, 
            expires_in_token, 
            secret_refresh_token, 
            expires_in_refresh_token,
            expires_refresh_token_days 
        } = auth;

        if (!user) {
            throw new AppError("Email or password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect");
        }

        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        });

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        });

        const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days)

        this.usersTokenRepository.create({
            user_id: user.id,
            expires_date: refresh_token_expires_date,
            refresh_token,
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
            refresh_token
        }

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };