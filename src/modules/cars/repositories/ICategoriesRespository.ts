import { Category } from "../model/Category";

interface ICategorieCategoryDTO{
    name: string;
    description: string;
}

interface ICategoriesRespository{
    findByName(name: string): Category;
    list(): Category[];
    create({ name, description }: ICategorieCategoryDTO): void;
}

export { ICategoriesRespository, ICategorieCategoryDTO}