import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';


interface IRequest{
    brand?: string;
    name?: string;
    category_id?: string;
}

@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject("CarRepository")
        private carRepository: ICarsRepository
    ){}

    async execute({brand, name, category_id}: IRequest): Promise<Car[]>{
        const cars = await this.carRepository.findAvaliable(
            brand,
            name,
            category_id,
        );

        return cars;
    }
}

export { ListAvailableCarsUseCase }