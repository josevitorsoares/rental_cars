import { CategoryRepository } from "../../repositories/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesControler";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = new CategoryRepository();
const listCategoriesuseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(listCategoriesuseCase);

export { listCategoriesController };