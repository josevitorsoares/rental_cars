import { inject, injectable } from "tsyringe"

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/infra/http/errors/AppError";

interface IRequest{
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carRepository: ICarsRepository,

        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ){}

    async execute({car_id, specifications_id}: IRequest): Promise<Car>{
        const carExist = await this.carRepository.findById(car_id);

        if (!carExist) {
            throw new AppError("Car dos not exist!");
        }

        const specifications = await this.specificationsRepository.findByIds(specifications_id);

        carExist.specifications = specifications;

        await this.carRepository.create(carExist);

        return carExist;
    }
}

export {CreateCarSpecificationUseCase};