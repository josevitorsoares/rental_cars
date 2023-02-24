import { Category } from "../model/Category";

interface ICategorieRepositoryDTO{
    name: string;
    description: string;
}

class CategoryRepository{

    private categories: Category[];

    constructor(){
        this.categories = [];
    }

    create({ name, description }: ICategorieRepositoryDTO): void {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        })

        this.categories.push(category);
    }

    list(): Category[]{
        return this.categories;
    }

    findByName(name: string): Category{
        const category = this.categories.find(category => category.name === name);

        return category;
    }
}

export { CategoryRepository };