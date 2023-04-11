import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest{
    name: string;
    username: string;
    password: string;
    email: string;
    driver_license: string;
}

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ){}

    async execute({ name, username, password, email, driver_license }: IRequest): Promise<void>{
        const usernameAlreadyExist = await this.userRepository.findByUsername(username);

        if (usernameAlreadyExist){
            throw new Error("Username already exist");
        }

        this.userRepository.create({name, username, password, email, driver_license});
    }
}

export { CreateUserUseCase };