import { Category } from "../../model/Category";
import { ICategoriesRespository } from "../../repositories/ICategoriesRespository";

class ListCategoriesUseCase{
    constructor(private categoriesRepsoitory: ICategoriesRespository){}

    execute(): Category[] {
        const categories = this.categoriesRepsoitory.list();

        return categories;
    }
}

export { ListCategoriesUseCase };