import { container } from "tsyringe";
import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRespository";
import { CategoryRepository } from "@modules/cars/repositories/implementations/CategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { SpecificationsRepository } from "@modules/cars/repositories/implementations/SpecificationsRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { UserRepository } from "@modules/accounts/repositories/implementations/UserRepository";

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