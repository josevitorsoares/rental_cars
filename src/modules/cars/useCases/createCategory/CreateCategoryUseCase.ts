import { AppError } from '@shared/infra/http/errors/AppError';
import { ICategoriesRespository } from '@modules/cars/repositories/ICategoriesRespository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRespository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExist = await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExist) {
            throw new AppError('Category already exist!');
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };