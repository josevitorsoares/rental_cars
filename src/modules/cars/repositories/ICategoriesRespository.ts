import { Category } from "../entities/Category";

interface ICategorieCategoryDTO{
    name: string;
    description: string;
}

interface ICategoriesRespository{
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description }: ICategorieCategoryDTO): Promise<void>;
}

export { ICategoriesRespository, ICategorieCategoryDTO};