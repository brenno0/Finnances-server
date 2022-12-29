import { Request, Response } from "express";
import { CreateProductsUseCase } from "./CreateProductsUseCase";


export class CreateProductsController {
    async handle(request:Request,response:Response) {
        const { name, price, description, categoryId, banksId, transactionDate } = request.body
        const { userId } = request
        const createProductsUseCase = new CreateProductsUseCase()
        
        const data = await createProductsUseCase.execute({
            name,
            price,
            description,
            userId,
            categoryId,
            banksId,
            transactionDate
        })
       


        return response.status(201).send(data)
    }
}