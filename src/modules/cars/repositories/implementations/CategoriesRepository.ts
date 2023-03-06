import { Category } from "../../model/Category";
import { ICategorieCategoryDTO, ICategoriesRespository } from "../ICategoriesRespository";

class CategoryRepository implements ICategoriesRespository{

    private categories: Category[];

    private static INSTANCE: CategoryRepository;

    private constructor(){
        this.categories = [];
    }

    public static getInstance(): CategoryRepository{
        if (!CategoryRepository.INSTANCE) {
            CategoryRepository.INSTANCE = new CategoryRepository();
        }
        
        return CategoryRepository.INSTANCE;
    }

    create({ name, description }: ICategorieCategoryDTO): void {
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