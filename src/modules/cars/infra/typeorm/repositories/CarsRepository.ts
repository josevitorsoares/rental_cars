import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "../entities/Car";
import { Repository } from "typeorm";
import connectionSource from "@config/ormconfig";

class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>;

    constructor() {
        this.repository = connectionSource.manager.getRepository(Car);
    }
    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne({where: {id}});
        return car;
    }

    async findAvaliable(brand?: string,  name?: string, category_id?: string,): Promise<Car[]> {
        const carsQuery = this.repository.createQueryBuilder("cars")
            .where("avaliable = :avaliable", { avaliable: true });

        if (brand) {
            carsQuery.andWhere("cars.brand = :brand", { brand });
        }

        if (name) {
            carsQuery.andWhere("cars.name = :name", { name });
        }

        if (category_id) {
            carsQuery.andWhere("cars.category_id = :category_id", { category_id })
        }

        const cars = await carsQuery.getMany();

        return cars;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ where: { license_plate } });

        return car;
    }

    async listAll(): Promise<Car[]> {
        const cars = await this.repository.find();

        return cars;
    }

    async create({ 
        name, 
        description, 
        daily_rate, 
        license_plate, 
        fine_amount, 
        brand, 
        category_id, 
        specifications,
        id
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications,
            id
        });

        await this.repository.save(car);

        return car;
    }

}

export { CarsRepository };