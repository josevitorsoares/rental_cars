import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvaliableCars = new ListAvailableCarsController();
const createCarsSpecificationsController = new CreateCarSpecificationController()

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get('/available', ensureAuthenticated, listAvaliableCars.handle);
carsRoutes.post('/specifications/:car_id', ensureAuthenticated, ensureAdmin, createCarsSpecificationsController.handle);

export { carsRoutes };