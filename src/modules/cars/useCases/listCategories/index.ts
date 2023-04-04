import { CategoryRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesControler";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = null
const listCategoriesuseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(listCategoriesuseCase);

export { listCategoriesController };