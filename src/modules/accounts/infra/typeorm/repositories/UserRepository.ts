import { Repository } from "typeorm";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import connectionSource from "@config/ormconfig";

class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = connectionSource.manager.getRepository(User);
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({where: {id}});

        return user;
    }

    async findByUsername(username: string): Promise<User> {
        const user = await this.repository.findOne({ where: { username } });

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ where: { email } });

        return user;
    }

    async create({ name, username, password, email, driver_license }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            username,
            password,
            email,
            driver_license,
        });

        await this.repository.save(user);
    }

}

export { UserRepository };