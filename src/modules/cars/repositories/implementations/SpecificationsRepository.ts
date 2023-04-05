import { Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository, ICreateSpecificationsDTO } from "../ISpecificationsRepository";
import connectionSource from "../../../../../config/ormconfig";

class SpecificationsRepository implements ISpecificationsRepository {
    private repopsitory: Repository<Specification>;

    constructor() {
        this.repopsitory = connectionSource.manager.getRepository(Specification);
    }

    async create({ name, description }: ICreateSpecificationsDTO): Promise<void> {
        const specification = this.repopsitory.create({
            name,
            description,
        });

        await this.repopsitory.save(specification);
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.repopsitory.find();

        return specifications;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repopsitory.findOne({ where: { name } });
        return specification;
    }
}

export { SpecificationsRepository }