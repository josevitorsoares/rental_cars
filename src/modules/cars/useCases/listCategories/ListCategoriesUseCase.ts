import { inject, injectable } from "tsyringe";
import { Category } from "@modules/cars/entities/Category";
import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRespository";

@injectable()
class ListCategoriesUseCase{
    constructor(
        @inject("CategoryRepository")
        private categoriesRepsoitory: ICategoriesRespository
    ){}

    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepsoitory.list();

        return categories;
    }
}

export { ListCategoriesUseCase };