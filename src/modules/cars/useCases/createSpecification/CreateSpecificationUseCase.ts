import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationsRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExist = await this.specificationRepository.findByName(name);

        if (specificationAlreadyExist) {
            throw new Error('Specification already exits!');
        }

        this.specificationRepository.create({ name, description });
    }


}

export { CreateSpecificationUseCase }