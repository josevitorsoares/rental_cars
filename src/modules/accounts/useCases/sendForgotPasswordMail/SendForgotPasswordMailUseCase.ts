import { inject, injectable } from "tsyringe"
import {v4 as uuidV4} from "uuid";
import { resolve } from "path";

import * as dotenv from "dotenv";
dotenv.config();

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository"
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/provider/DateProvider/IDateProvider"
import { IMailProvider } from "@shared/container/provider/MailProvider/IMailProvider";
import { AppError } from "@shared/infra/http/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ){}

    async execute(email: string): Promise<void>{
        const user = await this.usersRepository.findByEmail(email);

        const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs");

        if (!user) {
            throw new AppError("User doesn't exist!");
        }

        const token = uuidV4();

        const expires_date = this.dateProvider.addHours(3);

        await this.usersTokensRepository.create({
            user_id: user.id,
            expires_date: expires_date,
            refresh_token: token
        });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_PASSWORD_URL}${token}`
        }

        await this.mailProvider.sendMail(email, "Forgot Password", variables, templatePath);
    }
}

export { SendForgotPasswordMailUseCase };