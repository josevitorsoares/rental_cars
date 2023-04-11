import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUserRepository {
    findByUsername(username: string): Promise<User>;
    create(data: ICreateUserDTO): Promise<void>;
}

export { IUserRepository };