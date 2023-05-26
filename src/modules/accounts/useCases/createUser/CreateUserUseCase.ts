import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { hash } from "bcrypt";
import { AppError } from "@shared/infra/http/errors/AppError";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository
    ) { }

    async execute({ name, username, password, email, driver_license }: ICreateUserDTO): Promise<void> {
        const usernameAlreadyExist = await this.usersRepository.findByUsername(username);
        const emailAlreadyExist = await this.usersRepository.findByEmail(email);

        const passwordHash = await hash(password, 8);

        if (usernameAlreadyExist || emailAlreadyExist) {
            throw new AppError("Username or e-mail already exist");
        }

        this.usersRepository.create({
            name,
            username,
            password: `${passwordHash}`, 
            email, 
            driver_license,
        });
    }
}

export { CreateUserUseCase };