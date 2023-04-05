import { ICategoriesRespository } from '../../repositories/ICategoriesRespository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {

    constructor(
        @inject("CategoryRepository")
        private categoriesRepository: ICategoriesRespository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExist = await this.categoriesRepository.findByName(name)

        if (categoryAlreadyExist) {
            throw new Error('Category already exist!')
        }

        this.categoriesRepository.create({ name, description })
    }
}

export { CreateCategoryUseCase }