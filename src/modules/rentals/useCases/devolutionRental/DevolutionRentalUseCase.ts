import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/infra/http/errors/AppError";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IDateProvider } from "@shared/container/provider/DateProvider/IDateProvider";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

interface IRequest{
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,

        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("DayjsDateProvider")
        private dayjsDateRepository: IDateProvider
    ){}

    async execute({id, user_id}: IRequest): Promise<Rental>{
        const MINIMUM_DAILY = 1

        const rental = await this.rentalsRepository.findById(id);
        
        if (!rental) {
            throw new AppError("Rental dos not exist!")
        }
        
        const car = await this.carsRepository.findById(rental.car_id);

        const dateNow = this.dayjsDateRepository.dateNow();

        let daily = this.dayjsDateRepository.compareInDays(
            rental.start_date,
            dateNow
        ); 

        if (daily <= 0) {
            daily = MINIMUM_DAILY;
        }

        const delay = this.dayjsDateRepository.compareInDays(
            dateNow,
            rental.expected_return_date
        );
        
        let total = 0;
        
        if (delay > 0) {
            const cauculatFine = delay * car.fine_amount;
            total = cauculatFine;
        }

        total += daily * car.daily_rate;

        rental.end_date = dateNow;
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase };