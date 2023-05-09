import { Category } from "@modules/cars/infra/typeorm/entities/Category";


interface ICategoriesCategoryDTO{
    name: string;
    description: string;
}

interface ICategoriesRespository{
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description }: ICategoriesCategoryDTO): Promise<void>;
}

export { ICategoriesRespository, ICategoriesCategoryDTO};