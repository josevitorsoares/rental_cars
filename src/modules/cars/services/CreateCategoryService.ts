import { ICategoriesRespository } from "../repositories/ICategoriesRespository";

interface IRequest{
    name: string;
    description: string;
}

class CreateCategoryService{

    constructor(private categoriesRepository: ICategoriesRespository){}

    execute({ name, description}: IRequest): void{
        const categoryAlreadyExist = this.categoriesRepository.findByName(name)
        
        if (categoryAlreadyExist) {
            throw new Error('Category already exist!')
        }    

        this.categoriesRepository.create({name, description})
    }
}

export { CreateCategoryService }