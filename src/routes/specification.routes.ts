import { Router } from 'express';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
// const listSpecificationControllerController = new ListSpeci

specificationRoutes.post('/', createSpecificationController.handle);
// specificationRoutes.post('/', listSpecificationController.handle);

export { specificationRoutes };