import { Request, Response } from "express";
import { ListAvaliableCarsUseCase } from "./ListAvaliableCarsUseCase";
import { container } from "tsyringe";

class ListAvaliableCarsController {
    async handle(request: Request, response: Response): Promise<Response>{
        const {brand, name, category_id} = request.query;
        const listAvaliableCars = container.resolve(ListAvaliableCarsUseCase);
        
        const cars = await listAvaliableCars.execute({
            brand: brand as string,
            name: name as string,
            category_id: category_id as string,
        });

        return response.status(201).json(cars);
    }
}

export { ListAvaliableCarsController }