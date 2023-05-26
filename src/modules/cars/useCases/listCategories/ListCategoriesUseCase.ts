import { inject, injectable } from "tsyringe";
import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRespository";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";

@injectable()
class ListCategoriesUseCase{
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepsoitory: ICategoriesRespository
    ){}

    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepsoitory.list();

        return categories;
    }
}

export { ListCategoriesUseCase };