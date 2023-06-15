import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import auth from "src/configs/auth";
import { AppError } from "@shared/infra/http/errors/AppError";
import { IDateProvider } from "@shared/container/provider/DateProvider/IDateProvider";

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async excute(token: string): Promise<string> {
        const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

        const user_id = sub;

        const userToken = await this.usersTokensRepository.findByIdAndRefreshToken(
            user_id,
            token
        );

        if (!userToken) {
            throw new AppError("Refresh Token doesn't exist")
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token
        });

        const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days);

        await this.usersTokensRepository.create({
            user_id,
            expires_date,
            refresh_token
        });

        return refresh_token;
    }
}

export { RefreshTokenUseCase };