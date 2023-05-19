import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";


interface ICarsRepository {
    // findByName(name: string): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    listAll(): Promise<Car[]>;
    findAvaliable(brand?: string, category_id?: string, name?: string): Promise<Car[]>;
    create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car>;
}

export { ICarsRepository };