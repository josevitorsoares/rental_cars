import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User"

interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByUsername(username: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export { IUserRepository };