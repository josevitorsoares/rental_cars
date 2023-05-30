import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IDateProvider } from "@shared/container/provider/DateProvider/IDateProvider";

interface IRequest {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental> {
        const MINIMUMHOURS = 24;

        const carUnvailable = await this.rentalsRepository.findOpenRentalByCars(car_id);

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUsers(user_id);

        if (carUnvailable) {
            throw new AppError("Car is unavailable!");
        }

        if (rentalOpenToUser) {
            throw new AppError("There's a rental in progress for this user!")
        }

        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date,
        );

        if (compare < MINIMUMHOURS) {
            throw new AppError("Invalid return time!")
        }

        const rental = await this.rentalsRepository.create({
            car_id,
            user_id,
            expected_return_date
        });

        return rental;
    }

}

export { CreateRentalUseCase };