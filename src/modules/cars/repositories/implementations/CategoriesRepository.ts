import { DataSource, Repository } from "typeorm";
import connectionSource from "../../../../../config/ormconfig";
import { Category } from "../../entities/Category";
import { ICategorieCategoryDTO, ICategoriesRespository } from "../ICategoriesRespository";

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