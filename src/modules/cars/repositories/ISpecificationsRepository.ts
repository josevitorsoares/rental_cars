import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface ICreateSpecificationsDTO{
    name: string;
    description: string;
}

interface ISpecificationsRepository{
    create({name, description}: ICreateSpecificationsDTO): Promise<Specification>;
    list(): Promise<Specification[]>;
    findByName(name: string): Promise<Specification>;
    findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository, ICreateSpecificationsDTO };