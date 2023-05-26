import { In, Repository } from "typeorm";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository, ICreateSpecificationsDTO } from "@modules/cars/repositories/ISpecificationsRepository";
import connectionSource from "@config/ormconfig";

class SpecificationsRepository implements ISpecificationsRepository {
    private repopsitory: Repository<Specification>;

    constructor() {
        this.repopsitory = connectionSource.manager.getRepository(Specification);
    }

    async create({ name, description }: ICreateSpecificationsDTO): Promise<Specification> {
        const specification = this.repopsitory.create({
            name,
            description,
        });

        await this.repopsitory.save(specification);

        return specification;
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.repopsitory.find();

        return specifications;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repopsitory.findOne({ where: { name } });
        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repopsitory.findBy({id: In(ids)});
        return specifications;
    }
}

export { SpecificationsRepository };