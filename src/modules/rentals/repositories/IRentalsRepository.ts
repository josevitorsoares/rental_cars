import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
    findOpenRentalByCars(car_id: string): Promise<Rental>;
    findOpenRentalByUsers(user_id: string): Promise<Rental>;
    create(data: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };