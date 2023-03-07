import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase{
    constructor(private specificationRepository: ISpecificationsRepository){}
    
    execute({name, description}: IRequest): void{
        const specificationAlreadyExist = this.specificationRepository.findByName(name);

        if (specificationAlreadyExist) {
            throw new Error('Specification already exits!');
        }
        this.specificationRepository.create({name, description})
    }

    
}

export { CreateSpecificationUseCase }