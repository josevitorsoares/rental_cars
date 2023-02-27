import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationService{
    constructor(private specificationrepository: ISpecificationsRepository){}
    
    execute({name, description}: IRequest): void{
        this.specificationrepository.create({name, description})
    }
}

export { CreateSpecificationService }