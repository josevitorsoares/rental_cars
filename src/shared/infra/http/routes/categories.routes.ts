import { Router } from 'express';

import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesControler';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoriesController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoryController.handle);

export { categoriesRoutes };