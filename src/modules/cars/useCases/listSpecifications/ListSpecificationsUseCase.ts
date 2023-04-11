import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import { Specification } from "../../entities/Specification";

@injectable()
class ListSpecificationsUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationsRepository
    ) {}

    async execute(): Promise<Specification[]>{
        const specifications = await this.specificationRepository.list();
        
        return specifications;
    }
}

export { ListSpecificationsUseCase };