import { DataSource, Repository } from "typeorm";
import connectionSource from "../../../../../config/ormconfig";
import { Category } from "@modules/cars/entities/Category";
import { ICategorieCategoryDTO, ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRespository";

class CategoryRepository implements ICategoriesRespository {

    private repopsitory: Repository<Category>;

    // private static INSTANCE: CategoryRepository;

    constructor() {
        this.repopsitory = connectionSource.manager.getRepository(Category);
    }

    // public static getInstance(): CategoryRepository {
    //     if (!CategoryRepository.INSTANCE) {
    //         CategoryRepository.INSTANCE = new CategoryRepository();
    //     }

    //     return CategoryRepository.INSTANCE;
    // }

    async create({ name, description }: ICategorieCategoryDTO): Promise<void> {
        const category = this.repopsitory.create({
            name,
            description,
        });

        await this.repopsitory.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repopsitory.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repopsitory.findOne({ where: { name } });

        return category;
    }
}

export { CategoryRepository };