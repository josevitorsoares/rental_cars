import { container } from "tsyringe";

import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRespository";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository"

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";

container.registerSingleton<ICategoriesRespository>(
    "CategoryRepository",
    CategoryRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationRepository",
    SpecificationsRepository
);

container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
);

container.registerSingleton<ICarsRepository>(
    "CarRepository",
    CarsRepository
);