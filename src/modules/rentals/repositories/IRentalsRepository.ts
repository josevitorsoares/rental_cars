import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
    create(data: ICreateRentalDTO): Promise<Rental>;
    findOpenRentalByCars(car_id: string): Promise<Rental>;
    findOpenRentalByUsers(user_id: string): Promise<Rental>;
    findById(id: string): Promise<Rental>;
    findByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository };