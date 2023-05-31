import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";


interface ICarsRepository {
    // findByName(name: string): Promise<Car>;
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    findAvaliable(brand?: string, category_id?: string, name?: string): Promise<Car[]>;
    findById(id: string): Promise<Car>;
    listAll(): Promise<Car[]>;
    updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };