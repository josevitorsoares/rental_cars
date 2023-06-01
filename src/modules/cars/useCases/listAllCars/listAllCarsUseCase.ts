import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";

@injectable()
class ListAllCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: CarsRepository
    ){}

    async execute(): Promise<Car[]>{
        const allCars = this.carsRepository.listAll();

        return allCars;
    }
}

export { ListAllCarsUseCase }