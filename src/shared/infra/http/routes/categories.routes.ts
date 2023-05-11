import { Router } from 'express';

import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesControler';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoriesController();

categoriesRoutes.post('/', ensureAuthenticated, ensureAdmin, createCategoryController.handle);

categoriesRoutes.get('/', listCategoryController.handle);

export { categoriesRoutes };