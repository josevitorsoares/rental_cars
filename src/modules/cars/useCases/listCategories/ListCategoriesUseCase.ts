import { Category } from "../../entities/Category";
import { ICategoriesRespository } from "../../repositories/ICategoriesRespository";

class ListCategoriesUseCase{
    constructor(private categoriesRepsoitory: ICategoriesRespository){}

    execute(): Category[] {
        const categories = this.categoriesRepsoitory.list();

        return categories;
    }
}

export { ListCategoriesUseCase };