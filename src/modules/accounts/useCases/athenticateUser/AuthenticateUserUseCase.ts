import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../repositories/IUserRepository';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AppError } from '../../../../errors/AppError';

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
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute({email, password}: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);

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