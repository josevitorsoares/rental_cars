import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { hash } from "bcrypt";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) { }

    async execute({ name, username, password, email, driver_license }: ICreateUserDTO): Promise<void> {
        const usernameAlreadyExist = await this.userRepository.findByUsername(username);
        const emailAlreadyExist = await this.userRepository.findByEmail(email);

        const passwordHash = await hash(password, 8);

        if (usernameAlreadyExist) {
            throw new Error("Username already exist");
        } else if (emailAlreadyExist) {
            throw new Error("E-mail already exist");
        }

        this.userRepository.create({
            name,
            username,
            password: `${passwordHash}`, 
            email, 
            driver_license,
        });
    }
}

export { CreateUserUseCase };