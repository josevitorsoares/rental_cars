import { container } from "tsyringe";

import "@shared/container/provider";

import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRespository";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository"

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { RentalRepository } from "@modules/rentals/infra/typeorm/repositories/RentalRepository";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

container.registerSingleton<ICategoriesRespository>(
    "CategoriesRepository",
    CategoryRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

container.registerSingleton<IUserRepository>(
    "UsersRepository",
    UserRepository
);

container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
);

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalRepository
);

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
);
