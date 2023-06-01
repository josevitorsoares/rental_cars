import { Request, Response } from "express"
import { container } from "tsyringe"

import { ListAllCarsUseCase } from "./listAllCarsUseCase"

class ListAllCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listAllCarsUseCase = container.resolve(ListAllCarsUseCase);
        const all = await listAllCarsUseCase.execute();

        return response.status(201).json(all);
    }
}

export { ListAllCarsController }