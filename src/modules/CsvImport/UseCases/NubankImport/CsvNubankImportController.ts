
import { Request, Response } from 'express';
import { Readable,Writable } from 'stream';
import readline from 'readline';
import { CsvNubankImportUseCase } from './CsvNubankImportUseCase';


export class CsvNubankImportController {
    async handle(request: Request, response:Response){
        const { file:{buffer} } = request;

        const { userId } = request
        

        const readableFile = new Readable();

        readableFile.push(buffer);
        readableFile.push(null);

        const NuItemLine = readline.createInterface({
            input:readableFile,
        })

        const products = [];


        for await (let line of NuItemLine){
            
                        

            let nuLineSplit = line.split(";");

            products.push({
                date:nuLineSplit[0],
                name:nuLineSplit[1],
                price:nuLineSplit[2],
                userId
            })

            if(nuLineSplit[1] === "Estabelecimento" || nuLineSplit[2] === " Valor " || nuLineSplit[0] === "﻿Data"){
                products.shift()
            }
            
        }
        const csvNubankImportUseCase = new CsvNubankImportUseCase()
        const data = await csvNubankImportUseCase.execute(products)

       
        response.send(data)
        
    }
}