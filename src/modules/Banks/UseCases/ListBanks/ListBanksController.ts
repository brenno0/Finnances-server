import { Request, Response } from "express";
import { ListBanksUseCase } from "./ListBanksUseCase";

export class ListBanksController {
    async handle(request:Request,response:Response) {
        const listBanksUseCase = new ListBanksUseCase()


        const data = await listBanksUseCase.execute(request.query)
        .catch(err => {
            return response.status(400).json({"errorMessage": err.message})
        })

        return response.status(200).json(data)
    }
}