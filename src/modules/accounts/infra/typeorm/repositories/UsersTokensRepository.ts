import { Repository } from "typeorm";
import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UserTokens } from "../entities/UserTokens";
import connectionSource from "@config/ormconfig";

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = connectionSource.manager.getRepository(UserTokens);
    }

    async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            user_id,
            expires_date,
            refresh_token
        });

        await this.repository.save(userToken);

        return userToken;
    }

    async findByIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        const userToken = await this.repository.findOne({
            where: {
                user_id,
                refresh_token
            }
        });

        return userToken;
    }

    async deleteById(user_id: string): Promise<void> {
        await this.repository.delete(user_id);
    }
}

export { UsersTokensRepository };