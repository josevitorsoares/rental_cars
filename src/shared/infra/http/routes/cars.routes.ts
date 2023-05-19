import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvaliableCars/ListAvailableCarsController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvaliableCars = new ListAvailableCarsController();

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get('/available', ensureAuthenticated, listAvaliableCars.handle)

export { carsRoutes };