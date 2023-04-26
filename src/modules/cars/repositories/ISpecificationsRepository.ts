import { Specification } from "@modules/cars/entities/Specification";

interface ICreateSpecificationsDTO{
    name: string;
    description: string;
}

interface ISpecificationsRepository{
    create({name, description}: ICreateSpecificationsDTO): Promise<void>;
    list(): Promise<Specification[]>;
    findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, ICreateSpecificationsDTO };