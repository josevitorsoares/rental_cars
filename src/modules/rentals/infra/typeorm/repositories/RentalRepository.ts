import { Repository } from "typeorm";
import connectionSource from "@config/ormconfig";

import { Rental } from "../entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";

class RentalRepository implements IRentalsRepository {

    private repository: Repository<Rental>;

    constructor(){
        this.repository = connectionSource.manager.getRepository(Rental);
    }

    async create({car_id, user_id, expected_return_date, id, end_date, total}: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date,
            id,
            end_date,
            total
        });

        this.repository.save(rental);

        return rental;
    }

    async findOpenRentalByCars(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({
            where: {car_id, total: null},
        });
        
        return openByCar;
    }

    async findOpenRentalByUsers(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({
            where: {user_id, total: null},
        });
        
        return openByUser;
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne({where: {id}});

        return rental;
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rentalsByUser = await this.repository.find({where: {user_id}});

        return rentalsByUser;
    }
}

export { RentalRepository };