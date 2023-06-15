import { inject, injectable } from "tsyringe"
import {v4 as uuidV4} from "uuid";

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository"
import { IDateProvider } from "@shared/container/provider/DateProvider/IDateProvider"
import { AppError } from "@shared/infra/http/errors/AppError";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";


injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ){}

    async execute(email: string){
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User doesn't exist!");
        }

        const token = uuidV4();

        const expires_date = this.dateProvider.addHours(3);

        await this.usersTokensRepository.create({
            user_id: user.id,
            expires_date,
            refresh_token: token
        })

    }
}

export { SendForgotPasswordMailUseCase }