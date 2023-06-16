import { inject, injectable } from "tsyringe";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/provider/DateProvider/IDateProvider";
import { AppError } from "@shared/infra/http/errors/AppError";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { hash } from "bcrypt";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTrokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("UsersRepository")
        private usersRepository: IUserRepository
    ) { }
    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTrokensRepository.findByRefreshToken(token);

        if (!userToken) {
            throw new AppError("This token is invalid!");
        }

        if (
            this.dateProvider.compareIsBefore(
                userToken.expires_date,
                this.dateProvider.dateNow())
        ) {
            throw new AppError("This token has expired!");
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTrokensRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUserUseCase };