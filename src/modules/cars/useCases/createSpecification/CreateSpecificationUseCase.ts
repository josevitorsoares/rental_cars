import { AppError } from "@shared/infra/http/errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExist = await this.specificationsRepository.findByName(name);

        if (specificationAlreadyExist) {
            throw new AppError('Specification already exits!');
        }

        this.specificationsRepository.create({ name, description });
    }


}

export { CreateSpecificationUseCase };