import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { ListAllCarsController } from "@modules/cars/useCases/listAllCars/listAllCarsController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvaliableCarsController = new ListAvailableCarsController();
const createCarsSpecificationsController = new CreateCarSpecificationController();
const listAllCarsController = new ListAllCarsController();

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get('/available', ensureAuthenticated, listAvaliableCarsController.handle);
carsRoutes.post('/specifications/:car_id', ensureAuthenticated, ensureAdmin, createCarsSpecificationsController.handle);
carsRoutes.get('/', ensureAuthenticated, listAllCarsController.handle);

export { carsRoutes };